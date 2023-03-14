from django.urls import path
from . import views

urlpatterns = [
    path('recommend/games/<int:user_id>', views.get_recommended_games , name='recommend_games')
]
