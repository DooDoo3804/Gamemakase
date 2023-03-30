import pandas as pd
import pymysql
import pymysql.cursors
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK
from django.http import HttpResponse
from .models import GameHistory, Game, Image, GameSmall, Recommendation
from sklearn.metrics.pairwise import cosine_similarity
from .serializers import *
import logging
from .tasks import update_recommed, profile_schedule
from apscheduler.schedulers.background import BackgroundScheduler
import time, requests
from django.db import connection
# user_id : 유저 모델 의 아이디 값 > user_steam_id 로 대체
# user_steam_id : 유저 스팀 아이디
# steam_id : 스팀 아이디
# recommendation steam_id, game_id
# rating steam_id, game_id


def A(df, userid, steamid):
    user_game = GameHistory.objects.filter(user=userid)
    print(user_game)
    # 순회를 돌면서 모든 게임
    dtypes = {'steam_id': int, 'game_id': int,
              'playtime': int}
    for game in user_game:
        exists_game = GameSmall.objects.filter(game_id=game.game.game_id)
        print(exists_game)
        # 없는 게임에 대한 예외처리
        try:
            if exists_game:
                gameid = game.game.game_id
                playtime = game.total_play_game
                # 가까운 유저 찾기
                game_df = df[df['game_id'] == gameid]
                game_df['playtime_diff'] = abs(game_df['playtime'] - playtime)
                game_df_sorted = game_df.sort_values('playtime_diff')
                closest_rating = game_df_sorted[game_df_sorted['steam_id']
                                                != steamid].iloc[0]['rating']

                # 기존 테이블에 추가
                new_row = {'steam_id': steamid, 'game_id': gameid,
                        'playtime': playtime, 'rating': closest_rating}

                df = df.astype(dtypes).append(new_row, ignore_index=True)
            else:
                print(f"None : {exists_game}")
        except:
            pass

    df = df.astype({'steam_id': int, 'game_id': int,
                    'playtime': int})
    return df


def get_recommend(user, neighbor_list, df):
    user_games = df[df['steam_id'] == user]
    candidates = []
    for neighbor in neighbor_list:
        temp = df[(df['steam_id'] == neighbor) & (
            ~df['game_id'].isin(user_games['game_id']))]
        for index, game in temp.iterrows():
            candidates.append((int(game['game_id']), game['rating']))
    candidates.sort(key=lambda x: x[0])
    flag = ""
    running_sum = 0
    rec_list = []
    count = 0
    for dis in candidates:
        if flag != dis[0]:
            if flag != "":
                rec_list.append((flag, running_sum/count))
            flag = dis[0]
            running_sum = dis[1]
            count = 1
        else:
            running_sum += dis[1]
            count += 1
    sort_list = sorted(rec_list, key=lambda x: x[1], reverse=True)
    return (sort_list)


# small 데이터 추천 결과
# userid : 유저 스팀 아이디

def get_recommended_games_small(request, user_id):
    # 데이터 불러와서 테이블 만들기
    conn = pymysql.connect(
        host="43.201.61.185",
        user="root",
        password="banapresso77",
        db="gamemakase",
        charset="utf8",
        cursorclass=pymysql.cursors.DictCursor
    )
    cursor = conn.cursor()
    sql = "select * from gamemakase.rating_small"
    cursor.execute(sql)
    result = cursor.fetchall()

    df = pd.DataFrame(result)

    # 가까운 유저 찾아서 테이블에 반영
    print(df.tail(10))
    user_steamid = user_id
    print(user_steamid)
    df = A(df, user_id, user_steamid)
    print(df.tail(10))

    pivot_table = pd.pivot_table(df, values='rating', index=[
                                 'steam_id'], columns=['game_id'])
    cos_sim_matrix = cosine_similarity(pivot_table.fillna(0))
    cos_sim_df = pd.DataFrame(
        cos_sim_matrix, columns=pivot_table.index, index=pivot_table.index)
    try:
        knn = cos_sim_df[user_steamid].sort_values(ascending=False)[:30]
        knn = list(knn.index)
    except Exception as e:
        print(user_steamid, e)
        return HttpResponse(status=HTTP_201_CREATED)

    json_data_2 = df
    json_data_2.sort_values(by=['steam_id', 'game_id'], ignore_index=True)
    recommend = get_recommend(user_steamid, knn, json_data_2)
    print(recommend)

    Recommendation.objects.filter(steam_id=user_steamid).delete()
    for game_id, rating in recommend[:100]:
        try:
            game = Game.objects.get(game_id=game_id)
            images = Image.objects.filter(type_id=game_id)
            recommendation = Recommendation(
                steam_id=user_steamid, game_id=game.game_id, rating=rating)
            recommendation.save()
        except Exception as e:
            print(game_id, e)

    # DB 연결 해제
    connection.close()

    return HttpResponse(status=HTTP_201_CREATED)


# 오늘의 추천
def today_games():
    pass


# 스케줄러 관련
def job():
    print("***********************************************************************************")
    update_recommed()
    print(f"End Time : {time.strftime('%c')}")
    print("***********************************************************************************")


def profile():
    print("***********************************************************************************")
    profile_schedule()
    print(f"End Time : {time.strftime('%c')}")
    print("***********************************************************************************")
    

def schedule_api():
    print("start big data recommend start")
    sched = BackgroundScheduler()
    sched.add_job(job, 'cron', hour='03', minute='0', second='0')
    sched.add_job(profile, 'cron', hour='15', minute='37', second='0')
    try:
        sched.start()
    except Exception as e:
        logging.exception(f"Error in background job: {str(e)}")


schedule_api()
