from django.urls import path
from media.views.song import (
    SongCreateAPIView,
    SongListAPIView,
    SongDetailAPIView,
    SongSearchSerializer,
    SongDeleteAPIView,
    SongUpdateAPIView,
    SongListenAPIView,
)

urlpatterns = [
    path("song/create/", SongCreateAPIView.as_view()),
    path("song/update/<str:song_id>/", SongUpdateAPIView.as_view()),
    path("song/delete/<str:song_id>/", SongDeleteAPIView.as_view()),
    path("song/list/", SongListAPIView.as_view()),
    path("song/detail/<str:song_id>/", SongDetailAPIView.as_view()),
    path("song/search/<str:search>/", SongSearchSerializer.as_view()),
    path("song/listen/<str:song_id>/", SongListenAPIView.as_view()),
]
