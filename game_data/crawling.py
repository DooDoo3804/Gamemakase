import requests
import json
import os

base_url = "https://store.steampowered.com/appreviews/"

# 전체 게임 데이터
total_game_data = []
tc = 1
info = []
with open(".\\exceptions.json", 'r', encoding='UTF-8') as f:
    raw_data = json.load(f)
for data in raw_data:
    # 각 게임 데이터
    each_game_data = []
    c = 0
    game_id = data["fields"]["gameid"]

    # 게임 아이디로 폴더 없으면 생성
    if not os.path.exists(f"crawling\\{game_id}"):
        os.makedirs(f"crawling\\{game_id}")

    params_id = f"{game_id}/"
    params_cursor = "*"
    max_reviews = 0

    while True:

        nuns = 0
        # API 호출
        requestData = requests.get(
            f"{base_url}"+f"{params_id}"+"?json=1&num_per_page=100&filter=recent&cursor="+f"{params_cursor}").json()
        nums = requestData["query_summary"]["num_reviews"]
        if params_cursor == "*":
            max_reviews = requestData["query_summary"]["total_reviews"]
        # 다음 커서 만들기
        params_cursor = ""
        next_cursor = requestData["cursor"]
        for char in next_cursor:
            if char == "+":
                params_cursor += "/"
            else:
                params_cursor += char

        for r in requestData["reviews"]:
            c += 1
            review_field = {
                "gameid": game_id,
                "steamid": r["author"]["steamid"],
                "playtime": r["author"]["playtime_forever"],
            }
            review_data = {
                "pk": c,
                "models": "reviews.review",
                "fields": review_field
            }
            each_game_data.append(review_data)
            total_game_data.append(review_data)
            print(c)

        # 100개 단위인데 내용물이 100개가 안된다면 마지막페이지이므로 종료

        if c >= max_reviews-5:
            break

    info.append([game_id, c])
    print(f"{game_id} : {c}개")

    # 각 게임의 리뷰 데이터
    with open(f"crawling\\{game_id}\\each_game_reviews.json", 'w', encoding="UTF-8") as make_file:
        json.dump(each_game_data, make_file,
                  ensure_ascii=False, indent="\t")

# 모든 게임의 리뷰 데이터
with open("crawling\\total_game_reviews.json", 'w', encoding="UTF-8") as make_file:
    json.dump(total_game_data, make_file,
              ensure_ascii=False, indent="\t")

with open("crawling\\info.json", 'w', encoding="UTF-8") as make_file:
    json.dump(info, make_file,
              ensure_ascii=False, indent="\t")
