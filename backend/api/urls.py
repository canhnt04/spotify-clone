from django.urls import path, include


urlpatterns = [
    path("", include("accounts.urls")),
    path("", include("media.urls.song")),
    path("", include("media.urls.album")),
]
