from django.urls import path
from ..views.favorite import (
    FavoriteListAPIView,
    FavoriteCreateAPIView,
    FavoriteDeleteAPIView,
)

urlpatterns = [
    path("favorite/list/", FavoriteListAPIView.as_view()),
    path("favorite/create/<str:song_id>/", FavoriteCreateAPIView.as_view()),
    path("favorite/delete/<str:song_id>/", FavoriteDeleteAPIView.as_view()),
]
