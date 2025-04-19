from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import (
    LoginAPIView,
    RegisterAPIView,
    ProfileAPIView,
    ProfileUpdateAPIView,
    UserListAPIView,
    UserSearchAPIView,
    BanUserAPIView,
    UnbanUserAPIView,
)
from media.view.song import SongCreateAPIView,SongListAPIView,SongDetailAPIView,SongSearchSerializer,SongDeleteAPIView,SongUpdateAPIView,SongListenAPIView
from media.view.download import DownloadCreateAPIView,DownloadListAPIView,DownloadDetailAPIView,DownloadDeleteAPIView

urlpatterns = [
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", RegisterAPIView.as_view()),
    path("login/", LoginAPIView.as_view()),
    path("profile/", ProfileAPIView.as_view()),
    path("profile/update/", ProfileUpdateAPIView.as_view()),
    path("users/", UserListAPIView.as_view()),
    path("users/search/<str:search>/", UserSearchAPIView.as_view()),
    path("users/ban/<int:user_id>/", BanUserAPIView.as_view()),
    path("users/unban/<int:user_id>/", UnbanUserAPIView.as_view()),
    path("song/upload/", SongCreateAPIView.as_view()),
    path("song/list/", SongListAPIView.as_view()),
    path("song/detail/<str:song_id>/", SongDetailAPIView.as_view()),
    path("song/search/<str:search>/", SongSearchSerializer.as_view()),
    path("song/delete/<str:song_id>/", SongDeleteAPIView.as_view()),
    path("song/update/<str:song_id>/", SongUpdateAPIView.as_view()),
    path('song/listen/<str:song_id>/', SongListenAPIView.as_view()),
    path('download/create/<str:song_id>/', DownloadCreateAPIView.as_view()),
    path('download/list/', DownloadListAPIView.as_view()),
    path('download/detail/<int:download_id>/', DownloadDetailAPIView.as_view()),
    path('download/delete/<int:download_id>/', DownloadDeleteAPIView.as_view()),
]
