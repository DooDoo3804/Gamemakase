import json
from datetime import datetime

def condition(data):

    
    if data["recommendations"] and data["positive"]:
        if "korean" in data["supported_languages"] or "English" in data["supported_languages"]:
            if data["positive"] + data["negative"] >= 10000:
                return True
    
    return False



def get_game_data():
    with open('archive/games.json', 'r', encoding='UTF-8') as f:
        raw_data = json.load(f)
    
    game_data = []
    genre_data = []

    idx = 1

    for id in raw_data:
        
        temp = raw_data[id]
        # print(id)

        if not condition(temp):
            continue

        try:        
            dt = temp['release_date']
            dt = datetime.strptime(dt, "%b %d, %Y")
            formatted_date = dt.strftime("%Y-%m-%d")

            is_korean = False
            if "Korean" in temp["supported_languages"]:
                is_korean = True   

            score = int (100 * temp['positive'] / (temp['positive'] + temp['negative']))


            fields = {
                # 'movie_id': movie['id'],
                'game_name': temp['name'],
                'game_price': temp['price'],
                'released_date': formatted_date,
                'game_description': temp['short_description'],
                'score': score,
                'average_playtime': temp['average_playtime_forever'],
                'publisher': temp['publishers'][0],
                'is_korean': is_korean
            }

            data = {
                'pk': id,
                'model': 'games.game',
                'fields': fields
            }

            game_data.append(data)

            for genre in temp['genres']:
                print(genre)
                
                fields_genre = {
                    "game_id": id,
                    "genre": genre
                }

                data = {
                    "pk": idx,
                    "model": 'games.genre',
                    "fields": fields_genre
                }

                genre_data.append(data)
                idx += 1


        except:
            print(id)

    with open('game_data_small.json', 'w', encoding="utf-8") as make_file:
        json.dump(game_data, make_file, ensure_ascii=False, indent="\t")

    with open('genre_data.json', 'w', encoding="utf-8") as make_file:
        json.dump(genre_data, make_file, ensure_ascii=False, indent="\t")

get_game_data()

game_pk = set()

def get_pk():
    with open('small_game_data.json', 'r', encoding='UTF-8') as f:
        raw_data = json.load(f)

    for data in raw_data:
        print(data["pk"])
        game_pk.add(data["pk"])

# get_pk()

