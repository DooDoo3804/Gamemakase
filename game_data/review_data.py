import json

def get_game_data():
    with open('reviews/10/416F4A342B2B663375766F43633454673667493D.json', 'r', encoding='UTF-8') as f:
        raw_data = json.load(f)

    review_data = []
    idx = 1

    if raw_data['reviews']:
        
        try:
            for review in raw_data['reviews']:
                try:
                    fields = {
                        "steamid": review["author"]["steamid"],
                        "playtime": review["author"]["playtime_forever"]
                    }

                    data = {
                        "pk": idx,
                        "model": 'games.review',
                        "fields": fields
                    }

                    review_data.append(data)
                    idx += 1
                    

                except:
                    print(f'error: {review["recommendationid"]}')

        except:
            print("no reviews")
        
        with open('review_data_small.json', 'w', encoding="utf-8") as make_file:
            json.dump(review_data, make_file, ensure_ascii=False, indent="\t")

get_game_data()