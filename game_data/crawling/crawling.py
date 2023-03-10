import requests
import json
import os

base_url = "https://store.steampowered.com/appreviews/"

# 전체 게임 데이터
total_game_data = []
tc = 1
info = []
no_reviews = []
with open("final\\exceptions.json", 'r', encoding='UTF-8') as f:
    raw_data = json.load(f)
for data in raw_data:
    # 각 게임 데이터
    each_game_data = []
    c = 0
    game_id = data["fields"]["gameid"]

    # if game_id == "1015730":
    #     break

    # 게임 아이디로 폴더 없으면 생성
    if not os.path.exists(f"crawling\\{game_id}"):
        os.makedirs(f"crawling\\{game_id}")

    params_id = f"{game_id}/"
    params_cursor = "*"
    max_reviews = 0
    page_count = 0

    while True:

        # API 호출
        try:
            requestData = requests.get(
                f"{base_url}"+f"{params_id}"+"?json=1&num_per_page=100&filter=recent&cursor="+f"{params_cursor}").json()
        except:
            print(
                f"{base_url}"+f"{params_id}"+"?json=1&num_per_page=100&filter=recent&cursor="+f"{params_cursor}")

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
            # 리뷰 20개 미만 컷
            c += 1
            if r["author"]["num_reviews"] < 20:
                continue

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
            print(c, end="\r")

        # 리뷰 없는 게임
        if max_reviews == 0:
            no_reviews.append({
                "id": game_id,
            })

        # 100개 단위인데 내용물이 100개가 안된다면 마지막페이지이므로 종료
        if c >= max_reviews-10:
            break

        if page_count == 10:
            break
        page_count += 1
    info.append([game_id, c])
    print(f"{game_id} : {c}개")

    # 각 게임의 리뷰 데이터
    with open(f"crawling\\{game_id}\\{game_id}.json", 'w', encoding="UTF-8") as make_file:
        json.dump(each_game_data, make_file,
                  ensure_ascii=False, indent="\t")

# 모든 게임의 리뷰 데이터
with open("crawling\\total_game_reviews.json", 'w', encoding="UTF-8") as make_file:
    json.dump(total_game_data, make_file,
              ensure_ascii=False, indent="\t")

with open("crawling\\info.json", 'w', encoding="UTF-8") as make_file:
    json.dump(info, make_file,
              ensure_ascii=False, indent="\t")

# 없는 리뷰 목록
with open("crawling\\no_reviews.json", 'w', encoding="UTF-8") as make_file:
    json.dump(no_reviews, make_file,
              ensure_ascii=False, indent="\t")
