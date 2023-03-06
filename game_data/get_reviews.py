import json
import os

# 게임 아이디
# 파일 하나로...?


def get_games():
    array = set()
    with open('games/game_data.json', 'r', encoding='UTF-8') as f:
        raw_data = json.load(f)
    for data in raw_data:
        array.add(data["pk"])
    return array


def get_folder_name():
    dir_path = "reviews\\reviews\\"
    dir_sample = "final\\"
    array = []
    for (root, directtories, files) in os.walk(dir_path):
        for d in directtories:
            # 폴더 생성
            # s_path = os.path.join(dir_sample, d)
            # if not os.path.exists(s_path):
            #     os.makedirs(s_path)
            # 경로 추가
            d_path = os.path.join(root, d)
            array.append([d_path, d])
    return array


def get_file_name():
    folder_list = get_folder_name()
    array = []
    for f in folder_list:
        for (root, directories, files) in os.walk(f[0]):
            for file in files:
                files_path = os.path.join(root, file)
                array.append([files_path, f[1], file])
    return array


def get_times():
    game_list = get_games()
    files_list = get_file_name()
    c = 1
    for g in game_list:
        r_path = f"reviews\\reviews\\{g}"
        save_dir = ""
        if os.path.exists(r_path):
            time_data = []
            for f in files_list:
                if f[1] == g:
                    with open(f[0], 'r', encoding='utf8') as file:
                        datas = json.load(file)
                    if datas["reviews"]["author"]["num_reviews"] < 10:
                        continue
                    try:
                        for r in datas["reviews"]:
                            fields = {
                                "gameid": g,
                                "steamid": r["author"]["steamid"],
                                "playtime": r["author"]["playtime_forever"],
                            }
                            data = {
                                "pk": c,
                                "models": 'reviews.review',
                                "fields": fields
                            }
                            time_data.append(data)
                            c += 1
                            print(c)
                        save_dir = f"final\\{f[1]}.json"
                    except:
                        print(f)

            # print(save_dir)
            with open(save_dir, 'w', encoding="utf") as make_file:
                json.dump(time_data, make_file,
                          ensure_ascii=False, indent="\t")
        else:
            exceptions.append(g)
            print(f"{g} : don\'t have reviews!")


exceptions = []
get_times()
print(exceptions)
