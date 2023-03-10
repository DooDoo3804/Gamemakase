import mysql.connector
import json

# Connect to the MySQL database
mydb = mysql.connector.connect(
    host="43.201.61.185",
    port=3306,
    user="root",
    password="banapresso77",
    database="gamemakase"
)

# Open the JSON file and parse the data
with open('output.json', 'r', encoding='UTF-8') as f:
    data = json.load(f)

cnt = 1

# Loop through the JSON data and insert each record into the MySQL database
for record in data:
    game_id = record['gameid']
    steam_id = record['steamid']
    playtime = record['playtime']
    frequency = record['frequency']
    rating = record['rating']

    try:
        sql = "INSERT INTO rating (game_id, steam_id, playtime, frequency, rating) VALUES (%s, %s, %s, %s, %s)"
        val = (game_id, steam_id, playtime, frequency, rating)
        mycursor = mydb.cursor()
        mycursor.execute(sql, val)
        print(f"{cnt/len(data)*100}", end="\r", flush=True)
        cnt += 1
    except:
        print(game_id, steam_id, playtime, frequency, rating)
        # break
    # Commit the changes to the database and close the connection
mydb.commit()
mydb.close()
