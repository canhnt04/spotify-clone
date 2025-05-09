from django.urls import path
from ..views.library import (
    LibraryListAPIView,
    addAlbumLibraryAPIView,
    addUserLibraryAPIView,
    deleteAlbumLibraryAPIView,
    deleteUserLibraryAPIView,
)

urlpatterns = [
    path("library/list/", LibraryListAPIView.as_view()),
    path("library/add-album/<str:album_id>/", addAlbumLibraryAPIView.as_view()),
    path("library/add-user/<str:saved_user_id>/", addUserLibraryAPIView.as_view()),
    path(
        "library/delete-album/<str:album_id>/",
        deleteAlbumLibraryAPIView.as_view(),
    ),
    path(
        "library/delete-user/<str:saved_user_id>/",
        deleteUserLibraryAPIView.as_view(),
    ),
]
