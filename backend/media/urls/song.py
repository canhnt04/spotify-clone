from django.urls import path
from ..views.song import SongCreateAPIView

urlpatterns = [
    path("song/create/", SongCreateAPIView.as_view()),
]
