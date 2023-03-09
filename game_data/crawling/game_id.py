import requests
import json

base_url = "https://store.steampowered.com/app/"

game_id = "3447"

data = requests.get(base_url+f"{game_id}").json
print(data)
