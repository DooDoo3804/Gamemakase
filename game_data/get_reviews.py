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
    total_reviews_list = []
    exceptions = []
    c = 1
    ec = 1
    for g in game_list:
        r_path = f"reviews\\reviews\\{g}"
        save_dir = ""
        if os.path.exists(r_path):
            time_data = []
            for f in files_list:
                if f[1] == g:
                    with open(f[0], 'r', encoding='UTF-8') as file:
                        datas = json.load(file)
                    try:
                        # 데이터 파싱
                        for r in datas["reviews"]:
                            # 남긴 리뷰 10개 미만 거르기
                            if r["author"]["num_reviews"] < 10:
                                continue

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
                            # 게임 아이디 별로 저장
                            time_data.append(data)
                            # 전체 게임을 하나의 파일로 저장
                            total_reviews_list.append(data)
                            c += 1
                            r_n = r["author"]["num_reviews"]
                            print(f"{c} : {r_n}")
                        save_dir = f"final\\{f[1]}.json"
                    except:
                        print(f)

            # 게임 아이디 별로 폴더 만들어 저장
            with open(save_dir, 'w', encoding="UTF-8") as make_file:
                json.dump(time_data, make_file,
                          ensure_ascii=False, indent="\t")
        else:
            # 리뷰가 없는 예외인 경우
            e_fields = {
                "gameid": g,
            }
            e_data = {
                "pk": c,
                "models": 'reviews.exception',
                "fields": e_fields
            }
            ec += 1
            exceptions.append(e_data)
            print(f"{g} : don\'t have reviews!")

    # 하나로 통합한 파일 생성
    with open("total_reviews.json", 'w', encoding="UTF-8") as make_file:
        json.dump(total_reviews_list, make_file,
                  ensure_ascii=False, indent="\t")

    # 예외 파일 생성
    with open("exceptions.json", 'w', encoding="UTF-8") as make_file:
        json.dump(exceptions, make_file,
                  ensure_ascii=False, indent="\t")


get_times()
