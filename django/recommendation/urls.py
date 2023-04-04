from django.urls import path
from . import views

app_name = "recommendation"

urlpatterns = [
    path('games/small/<int:user_id>', views.get_recommended_games_small , name='recommend_games'),
    path('games/today/', views.today_games , name='today_games'),
]
