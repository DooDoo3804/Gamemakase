import json

with open('games/game_data.json', 'r', encoding='UTF-8') as f:
    game_data = json.load(f)

with open('games/games.json', 'r', encoding='UTF-8') as f:
    total_game_data = json.load(f)

genre = []

c = 1
t = len(game_data)
for game in game_data:
    target = game["pk"]
    for g in total_game_data:
        if g == target:
            for game_genre in total_game_data[g]["genres"]:
                for gg in genre:
                    if gg["genre_name"] == game_genre:
                        break
                data = {
                    "game_id": g,
                    "genre_name": game_genre,
                }
                genre.append(data)
                print(c, end="\r", flush=True)
                c += 1

with open("gameGenre.json", 'w', encoding="UTF-8") as make_file:
    json.dump(genre, make_file, ensure_ascii=False, indent="\t")
