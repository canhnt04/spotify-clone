from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterAPIView,
    LoginAPIView,
    ProfileAPIView,
    ProfileUpdateAPIView,
    UserListAPIView,
    UserDetailAPIView,
    UserSearchAPIView,
    ProfileAllAPIView,
    ProfileOtherAPIView,
    BanUserAPIView,
    UnbanUserAPIView,
)

urlpatterns = [
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", RegisterAPIView.as_view()),
    path("login/", LoginAPIView.as_view()),
    path("profile/", ProfileAPIView.as_view()),
    path("profile/all/", ProfileAllAPIView.as_view()),
    path("profile/other/<str:user_id>/", ProfileOtherAPIView.as_view()),
    path("profile/update/", ProfileUpdateAPIView.as_view()),
    path("user-list/", UserListAPIView.as_view()),
    path("user-detail/", UserDetailAPIView.as_view()),
    path("user-search/<str:search>/", UserSearchAPIView.as_view()),
    path("user-ban/<str:user_id>/", BanUserAPIView.as_view()),
    path("user-unban/<str:user_id>/", UnbanUserAPIView.as_view()),
]
