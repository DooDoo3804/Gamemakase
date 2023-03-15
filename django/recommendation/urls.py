from django.urls import path
from . import views

app_name = "recommendation"

urlpatterns = [
    path('games/<int:userid>', views.get_recommended_games , name='recommend_games'),
]
