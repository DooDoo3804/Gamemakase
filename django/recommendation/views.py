import pandas as pd
import numpy as np
import pymysql
import pymysql.cursors
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from django.http import HttpResponse, JsonResponse
from .models import GameHistory, Game, Image, GameSmall, Recommendation, User
from sklearn.metrics.pairwise import cosine_similarity
from .serializers import *
from django.core.paginator import Paginator


def A(df, steamid):
    user_game = GameHistory.objects.filter(user=steamid)
    print(user_game)
    # 순회를 돌면서 모든 게임
    dtypes = {'steam_id': int, 'game_id': int,
                'playtime': int}
    for game in user_game:
        exists_game = GameSmall.objects.filter(game_id=game.game.game_id)
        print(exists_game)
        # 없는 게임에 대한 예외처리
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


# big 데이터 추천 결과
def get_recommended_games(userid):
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
    sql = "select * from gamemakase.rating"
    cursor.execute(sql)
    result = cursor.fetchall()

    df = pd.DataFrame(result)

    # 가까운 유저 찾아서 테이블에 반영
    print(df.tail(10))
    df = A(df, userid)
    print(df.tail(10))

    pivot_table = pd.pivot_table(df, values='rating', index=[
                                 'steam_id'], columns=['game_id'])
    print(f"pivot_table:{pivot_table}")
    cos_sim_matrix = cosine_similarity(pivot_table.fillna(0))
    print(f"cos_sim_matrix:{cos_sim_matrix}")
    cos_sim_df = pd.DataFrame(
        cos_sim_matrix, columns=pivot_table.index, index=pivot_table.index)
    print(f"cos_sim_df:{cos_sim_df}")
    knn = cos_sim_df[userid].sort_values(ascending=False)[:30]
    knn = list(knn.index)
    print(knn)

    json_data_2 = df
    json_data_2.sort_values(by=['steam_id', 'game_id'], ignore_index=True)
    print(json_data_2)
    recommend = get_recommend(userid, knn, json_data_2)
    print(recommend[:5])

    games = []
    for game_id, rating in recommend[:15]:
        game = Game.objects.get(game_id=game_id)
        images = Image.objects.filter(type_id = game_id)
        new_game = {
            'game_id' : game_id,
            "game_name" : game.game_name, 
            "score" : rating,
            "game_image" : images
        }
        games.append(new_game)
    serializer = GameRecommendationSerializer(games, many=True)
    
    # pagination
    p = Paginator(serializer.data, 5)
    page = {
        'pageNum' : 1,
        'size' : 5,
        'count' : len(p.page(1)),
    }
    
    context = {
        'results' : serializer.data,
        'page' : page
    }
    print(context)
    return JsonResponse(context, safe=False)


# small 데이터 추천 결과
def get_recommended_games_small(request, userid):
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
    df = A(df, userid)
    print(df.tail(10))

    pivot_table = pd.pivot_table(df, values='rating', index=[
                                 'steam_id'], columns=['game_id'])
    # print(f"pivot_table:{pivot_table}")
    cos_sim_matrix = cosine_similarity(pivot_table.fillna(0))
    # print(f"cos_sim_matrix:{cos_sim_matrix}")
    cos_sim_df = pd.DataFrame(
        cos_sim_matrix, columns=pivot_table.index, index=pivot_table.index)
    # print(f"cos_sim_df:{cos_sim_df}")
    knn = cos_sim_df[userid].sort_values(ascending=False)[:30]
    knn = list(knn.index)
    # print(knn)

    json_data_2 = df
    json_data_2.sort_values(by=['steam_id', 'game_id'], ignore_index=True)
    # print(json_data_2)
    recommend = get_recommend(userid, knn, json_data_2)
    # print(recommend[:5])

    Recommendation.objects.filter(steam_id=userid).delete()
    for game_id, rating in recommend[:10]:
        game = Game.objects.get(game_id=game_id)
        images = Image.objects.filter(type_id = game_id)
        # new_game = {
        #     'game_id' : game_id,
        #     "game_name" : game.game_name, 
        #     "score" : rating,
        #     "game_image" : images
        # }
        # games.append(new_game)

        # recommendation 테이블에 저장
        recommendation = Recommendation(steam_id = userid, game_id = game.game_id, rating = rating)
        recommendation.save()


# 주석 처리
    # serializer = GameRecommendationSerializer(games, many=True)
    
    # # pagination
    # p = Paginator(serializer.data, 5)
    # page = {
    #     'pageNum' : 1,
    #     'size' : 5,
    #     'count' : len(p.page(1)),
    # }
    
    # context = {
    #     'results' : serializer.data,
    #     'page' : page
    # }
    # print(context)
    return HttpResponse(status=HTTP_201_CREATED)


def schedule_api():
    
    print("start big data recommend start")
    users = User.objects.all()
    # users = User.objects.order_by('user_id').distinct()
    print(users)
    for user in users:
        get_recommended_games(user.user_steam_id)
