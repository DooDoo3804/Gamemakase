import mysql.connector
import json
import time
import datetime

# Connect to the MySQL database
mydb = mysql.connector.connect(
    host="43.201.61.185",
    port=3306,
    user="root",
    password="banapresso77",
    database="gamemakase"
)

# Open the JSON file and parse the data
with open('gameGenre.json', 'r', encoding='UTF-8') as f:
    data = json.load(f)

cnt = 1
start = time.time()
# Loop through the JSON data and insert each record into the MySQL database
for record in data:
    game_id = record['game_id']
    genre_name = record['genre_name']

    try:
        sql = "INSERT INTO genre (game_id, genre_name) VALUES (%s, %s)"
        val = (game_id, genre_name)
        mycursor = mydb.cursor()
        mycursor.execute(sql, val)
        end = time.time() - start
        times = str(datetime.timedelta(seconds=end)).split(".")
        times = times[0]
        print(f"{round(cnt/len(data)*100, 3)}% // 소요시간 : {times}",
              end="\r", flush=True)
        cnt += 1
    except:
        print(game_id, genre_name)
        # break
    # Commit the changes to the database and close the connection
mydb.commit()
mydb.close()
