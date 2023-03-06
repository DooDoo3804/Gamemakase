import json


def get_movie_url():
    with open("games.json", "r", encoding="utf8") as file:
        datas = json.load(file)

    game_data = []
    c = 1
    for i, d in enumerate(datas):
        if datas[d]["recommendations"] and datas[d]["positive"]:
            if "Korean" in datas[d]["supported_languages"] or "English" in datas[d]["supported_languages"]:
                fields = {
                    "type": "GAME_HEADER",
                    "type_id": d,
                    "header_image": datas[d]["header_image"],
                }
                data = {
                    "pk": c,
                    "models": "games.image",
                    "fields": fields
                }
                game_data.append(data)
                c += 1
                for sc in datas[d]["screenshots"]:
                    fields = {
                        "type": "GAME_SCREENSHOTS",
                        "type_id": d,
                        "screenshot": sc,
                    }
                    data = {
                        "pk": c,
                        "models": "games.image",
                        "fields": fields
                    }
                    game_data.append(data)
                    c += 1

    with open('games_images.json', 'w', encoding="utf") as make_file:
        json.dump(game_data, make_file, ensure_ascii=False, indent="\t")


get_movie_url()
