from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from media.models import Library, Album
from accounts.models import User
from accounts.serializers import UserSerializer
from media.serializers.album import AlbumListSerializer
from accounts.validators import FileValidator
from media.serializers.library import (
    addAlbumLibrarySerializer,
    addUserLibrarySerializer,
)


class LibraryListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        libraries = Library.objects.filter(user=request.user).select_related(
            "saved_user", "album"
        )
        validator = FileValidator()

        res_data = {"users": [], "albums": []}

        for lib in libraries:
            if lib.saved_user:
                user_data = UserSerializer(lib.saved_user).data
                user_data["avatar"] = validator.validate_url(
                    data={"avatar": user_data.get("avatar")},
                    field_name="avatar",
                    default_url=None,
                )
                res_data["users"].append(user_data)

            if lib.album:
                album_data = AlbumListSerializer(lib.album).data
                album_data["thumbnail_url"] = validator.validate_url(
                    data={"thumbnail_url": album_data.get("thumbnail_url")},
                    field_name="thumbnail_url",
                    default_url=None,
                )
                res_data["albums"].append(album_data)

        return Response(
            {
                "message": "Lấy danh sách library thành công!",
                "data": res_data,
            },
            status=status.HTTP_200_OK,
        )


class addAlbumLibraryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, album_id):
        try:
            album = Album.objects.get(id=album_id)
        except Album.DoesNotExist:
            return Response(
                {
                    "message": "Album không tồn tại!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = addAlbumLibrarySerializer(
            data=request.data, context={"user": request.user, "album": album}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Thêm album vào library thành công!",
                    "library": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {
                    "message": "Thêm album vào library thất bại!",
                    "error": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class addUserLibraryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, saved_user_id):
        try:
            saved_user = User.objects.get(id=saved_user_id)
        except User.DoesNotExist:
            return Response(
                {
                    "message": "User không tồn tại!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = addUserLibrarySerializer(
            data=request.data, context={"user": request.user, "saved_user": saved_user}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Thêm user vào library thành công!",
                    "library": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {
                    "message": "Thêm user vào library thất bại!",
                    "error": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class deleteAlbumLibraryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, album_id):
        try:
            library = Library.objects.get(user=request.user, album__id=album_id)
            album = library.album
        except Library.DoesNotExist:
            return Response(
                {
                    "message": "Album không tồn tại trong thư viện của bạn!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        library.delete()

        return Response(
            {
                "message": "Album đã được xóa khỏi thư viện thành công!",
                "album_id": album.id,
            },
            status=status.HTTP_200_OK,
        )


class deleteUserLibraryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, saved_user_id):
        try:
            library = Library.objects.get(
                user=request.user, saved_user__id=saved_user_id
            )
            saved_user = library.saved_user
        except Library.DoesNotExist:
            return Response(
                {
                    "message": "User không tồn tại trong thư viện của bạn!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        library.delete()

        return Response(
            {
                "message": "User đã được xóa khỏi thư viện thành công!",
                "saved_user_id": saved_user.id,
            },
            status=status.HTTP_200_OK,
        )
