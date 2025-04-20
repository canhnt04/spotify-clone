from django.urls import path
from ..views.favorite import (
    FavoriteListAPIView,
    FavoriteCreateAPIView,
    FavoriteDeleteAPIView,
    # FavoriteDeleteDetailAPIView,
)

urlpatterns = [
    path("favorite/list/", FavoriteListAPIView.as_view()),
    path("favorite/create/<str:song_id>/", FavoriteCreateAPIView.as_view()),
    path("favorite/delete/", FavoriteDeleteAPIView.as_view()),
    # path("favorite/delete/<int:favorite_id>/", FavoriteDeleteDetailAPIView.as_view()),
]
