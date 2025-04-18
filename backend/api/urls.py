from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import (
    LoginAPIView,
    RegisterAPIView,
    ProfileAPIView,
    UpdateProfileAPIView,
    UserListAPIView,
    UserSearchAPIView,
    BanUserAPIView,
    UnbanUserAPIView,
)
from media.views import SongCreateAPIView

urlpatterns = [
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", RegisterAPIView.as_view()),
    path("login/", LoginAPIView.as_view()),
    path("profile/", ProfileAPIView.as_view()),
    path("profile/update/", UpdateProfileAPIView.as_view()),
    path('users/', UserListAPIView.as_view()),
    path("users/search/<str:search>/", UserSearchAPIView.as_view()),
    path("users/ban/<int:user_id>/", BanUserAPIView.as_view()),
    path("users/unban/<int:user_id>/", UnbanUserAPIView.as_view()),
    path('song/', SongCreateAPIView.as_view()),
]
