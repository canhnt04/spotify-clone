from django.urls import path
from ..views.album import (
    AlbumListAPIView,
    AlbumDetailAPIView,
    AlbumCreateAPIView,
    AlbumUpdateAPIView,
    AlbumDeleteAPIView,
    AlbumAddSongAPIView,
    AlbumDeleteSongAPIView,
    AlbumSearchAPIView,
)

urlpatterns = [
    path("album/list/", AlbumListAPIView.as_view()),
    path("album/detail/<str:album_id>/", AlbumDetailAPIView.as_view()),
    path("album/create/", AlbumCreateAPIView.as_view()),
    path("album/update/<str:album_id>/", AlbumUpdateAPIView.as_view()),
    path("album/delete/<str:album_id>/", AlbumDeleteAPIView.as_view()),
    path("album/<str:album_id>/add-song/<str:song_id>/", AlbumAddSongAPIView.as_view()),
    path(
        "album/<str:album_id>/delete-song/<str:song_id>/",
        AlbumDeleteSongAPIView.as_view(),
    ),
    path("album/search/<str:request>/", AlbumSearchAPIView.as_view()),
]
