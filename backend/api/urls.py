from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import (
    LoginAPIView,
    RegisterAPIView,
    ProfileAPIView,
    UpdateProfileAPIView,
)

urlpatterns = [
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", RegisterAPIView.as_view()),
    path("login/", LoginAPIView.as_view()),
    path("login/profile/", ProfileAPIView.as_view()),
    path("login/profile/update/", UpdateProfileAPIView.as_view()),
]
