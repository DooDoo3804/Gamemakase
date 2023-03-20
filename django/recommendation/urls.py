from django.urls import path
from . import views

app_name = "recommendation"

urlpatterns = [
    path('games/<int:userid>', views.get_recommended_games , name='recommend_games'),
    path('games/small/<int:user_id>', views.get_recommended_games_small , name='recommend_games'),
]
