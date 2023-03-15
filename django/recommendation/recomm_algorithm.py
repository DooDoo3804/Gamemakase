import pandas as pd
import numpy
from sklearn.metrics.pairwise import cosine_similarity
from models import GameHistory

# json_data = pd.read_json("output.json")


def find_closest_user(df, steamid, gameid, playtime):
    game_df = df[df['gameid'] == gameid]
    game_df['playtime_diff'] = abs(game_df['playtime'] - playtime)
    game_df_sorted = game_df.sort_values('playtime_diff')
    closest_rating = game_df_sorted[game_df_sorted['steamid']
                                    != steamid].iloc[0]['rating']

    new_row = {'steamid': steamid, 'gameid': gameid,
               'playtime': playtime, 'rating': closest_rating}
    json_data = json_data.append(new_row, ignore_index=True)


def get_recommend(user, neighbor_list, df):
    user_games = df[df['steamid'] == user]
    candidates = []
    for neighbor in neighbor_list:
        temp = df[(df['steamid'] == neighbor) & (
            ~df['gameid'].isin(user_games['gameid']))]
        for index, game in temp.iterrows():
            candidates.append((int(game['gameid']), game['rating']))
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


def A(df, steamid):
    user_game = GameHistory.objects.filter(user=steamid)
    # 순회를 돌면서 모든 게임
    for game in user_game:
        gameid = game.game
        playtime = game.total_play_game

        find_closest_user(df, steamid, gameid, playtime)

    pivot_table = pd.pivot_table(df, values='rating', index=[
                                 'steamid'], columns=['gameid'])
    cos_sim_matrix = cosine_similarity(pivot_table.fillna(0))
    cos_sim_df = pd.DataFrame(
        cos_sim_matrix, columns=pivot_table.index, index=pivot_table.index)
    knn = cos_sim_df[steamid].sort_values(ascending=False)[1:30]
    knn = list(knn.index)
    json_data_2 = df
    json_data_2.sort_values(by=['steamid', 'gameid'], ignore_index=True)
    recommend = get_recommend(steamid, knn, json_data_2)
    print(len(recommend))
    print(recommend[:30])
    return recommend


# 최종 함수 실행
# A(json_data, )
