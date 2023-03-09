import json

base_url = "crawling\\"

final_list = []
pk = 1

with open(base_url+"total_game_reviews.json", 'r', encoding='UTF-8') as file:
    datas = json.load(file)
    for d in datas:

        fields = {
            "gameid": d["fields"]["gameid"],
            "steamid": d["fields"]["steamid"],
            "playtime": d["fields"]["playtime"],
        }
        data = {
            "pk": pk,
            "models": 'reviews.review',
            "fields": fields
        }

        final_list.append(data)
        print(pk, end="\r", flush=True)
        pk += 1


with open(base_url+"no\\total_game_reviews.json", 'r', encoding='UTF-8') as file:
    datas = json.load(file)
    for d in datas:

        fields = {
            "gameid": d["fields"]["gameid"],
            "steamid": d["fields"]["steamid"],
            "playtime": d["fields"]["playtime"],
        }
        data = {
            "pk": pk,
            "models": 'reviews.review',
            "fields": fields
        }

        final_list.append(data)
        print(pk, end="\r", flush=True)
        pk += 1

with open(base_url+"exception_reviews.json", 'w', encoding="UTF-8") as make_file:
    json.dump(final_list, make_file,
              ensure_ascii=False, indent="\t")
