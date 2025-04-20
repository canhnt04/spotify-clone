from django.urls import path
from media.views.download import (
    DownloadCreateAPIView,
    DownloadListAPIView,
    DownloadDetailAPIView,
    DownloadDeleteAPIView,
)

urlpatterns = [
    path("download/create/<str:song_id>/", DownloadCreateAPIView.as_view()),
    path("download/list/", DownloadListAPIView.as_view()),
    path("download/detail/<int:download_id>/", DownloadDetailAPIView.as_view()),
    path("download/delete/<int:download_id>/", DownloadDeleteAPIView.as_view()),
]
