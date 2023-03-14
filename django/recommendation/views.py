from django.shortcuts import render
import pandas as pd
import pymysql
import pymysql.cursors

# Create your views here.


def get_recommended_games(request, user_id):
    conn = pymysql.connect(
        host="43.201.61.185",
        user="root",
        password="banapresso77",
        db="gamemakase",
        charset="utf8",
        cursorclass=pymysql.cursors.DictCursor        
    )
    cursor = conn.cursor()
    sql = "select * from gamemakase.rating"
    cursor.execute(sql)
    result = cursor.fetchall()

    df = pd.DataFrame(result)
    print(df.head(20))

    # result = A(df, 1)
    print(result)

    pass


# get_recommended_games(True, True)