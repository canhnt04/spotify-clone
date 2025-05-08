from django.urls import path
from ..views.library import LibraryListAPIView, addAlbumLibraryAPIView

urlpatterns = [
    path("library/list/", LibraryListAPIView.as_view()),
    path("library/add/<str:album_id>/", addAlbumLibraryAPIView.as_view()),
]
