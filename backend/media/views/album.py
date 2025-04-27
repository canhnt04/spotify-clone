import cloudinary.uploader
from accounts.validators import FileValidator
from media.models import Album
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.forms.models import model_to_dict

from rest_framework.permissions import IsAuthenticated, AllowAny
from media.serializers.album import (
    AlbumListSerializer,
    AlbumDetailSerializer,
    AlbumUserSerializer,
    AlbumCreateSerializer,
    AlbumUpdateSerializer,
    AlbumAddSongSerializer,
    AlbumDeleteSongSerializer,
)


class AlbumListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        albums = Album.objects.all()
        if albums.exists():
            serializer = AlbumListSerializer(albums, many=True)
            album_data_list = serializer.data
            validator = FileValidator()
            for album_data in album_data_list:
                thumbnail = validator.validate_url(
                    data=album_data, field_name="thumbnail_url", default_url="null"
                )
                album_data["thumbnail_url"] = thumbnail
            return Response(
                {
                    "message": "Lấy danh sách album thành công!",
                    "album": album_data_list,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    "message": "Không tìm thấy album nào!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )


class AlbumDetailAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, album_id):
        try:
            album = Album.objects.get(id=album_id)
            serializer = AlbumDetailSerializer(album)
            album_data = serializer.data
            validator = FileValidator()
            thumbnail = validator.validate_url(
                data=album_data, field_name="thumbnail_url", default_url="null"
            )
            album_data["thumbnail_url"] = thumbnail
            return Response(
                {
                    "message": "Lấy thông tin album thành công!",
                    "album": album_data,
                },
                status=status.HTTP_200_OK,
            )
        except Album.DoesNotExist:
            return Response(
                {
                    "message": "Album không tồn tại!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )


class AlbumUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        albums = Album.objects.filter(creator=request.user)
        if albums.exists:
            serializer = AlbumUserSerializer(albums, many=True)
            album_data_list = serializer.data
            validator = FileValidator()
            for album_data in album_data_list:
                thumbnail = validator.validate_url(
                    data=album_data, field_name="thumbnail_url", default_url="null"
                )
                album_data["thumbnail_url"] = thumbnail

            return Response(
                {
                    "message": "Lấy danh sách album của người dùng thành công!",
                    "albums": album_data_list,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"message": "Không tìm thấy album của người dùng!"},
                status=status.HTTP_200_OK,
            )


class AlbumCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AlbumCreateSerializer(data=request.data)

        if serializer.is_valid():
            if "thumbnail_url" in request.FILES:
                thumbnail_file = request.FILES["thumbnail_url"]
                thumbnail_response = cloudinary.uploader.upload(
                    thumbnail_file, resource_type="image"
                )
                serializer.validated_data["thumbnail_url"] = thumbnail_response.get(
                    "url"
                )
            album = serializer.save(creator=request.user)

            return Response(
                {
                    "message": "Tạo album thành công!",
                    "album": AlbumDetailSerializer(album).data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "message": "Tạo album không thành công!",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class AlbumUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, album_id):
        try:
            album = Album.objects.get(id=album_id)
        except Album.DoesNotExist:
            return Response(
                {
                    "message": "Album không tồn tại!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = AlbumUpdateSerializer(album, data=request.data, partial=True)

        if serializer.is_valid():
            if "thumbnail_url" in request.FILES:
                thumbnail_file = request.FILES["thumbnail_url"]
                thumbnail_response = cloudinary.uploader.upload(
                    thumbnail_file, resource_type="image"
                )
                new_thumbnail_url = thumbnail_response.get("url")

                if album.thumbnail_url != new_thumbnail_url:
                    serializer.validated_data["thumbnail_url"] = new_thumbnail_url

            original_data = model_to_dict(album)
            data_changed = any(
                str(original_data.get(field)) != str(value)
                for field, value in serializer.validated_data.items()
            )

            if data_changed:
                serializer.save()
                return Response(
                    {
                        "message": "Cập nhật album thành công!",
                        "album": serializer.data,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {
                        "message": "Album không có thay đổi!",
                    },
                    status=status.HTTP_200_OK,
                )
        return Response(
            {
                "message": "Cập nhật album không thành công!",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class AlbumDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, album_id):
        try:
            album = Album.objects.get(id=album_id)
            if album.creator != request.user:
                return Response(
                    {
                        "message": "Bạn không có quyền xóa album này!",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

            album.delete()
            return Response(
                {
                    "message": "Xóa album thành công!",
                },
                status=status.HTTP_204_NO_CONTENT,
            )
        except Album.DoesNotExist:
            return Response(
                {
                    "message": "Album không tồn tại!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )


class AlbumAddSongAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, album_id, song_id):
        try:
            album = Album.objects.get(creator=request.user, id=album_id)
        except Album.DoesNotExist:
            return Response(
                {
                    "message": "Album không tồn tại!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = AlbumAddSongSerializer(
            context={"album": album}, data={"song": song_id}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Thêm bài hát vào album thành công!",
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {
                    "message": "Thêm bài hát vào album không thành công!",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class AlbumDeleteSongAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, album_id, song_id):
        try:
            album = Album.objects.get(id=album_id)
        except Album.DoesNotExist:
            return Response(
                {
                    "message": "Album không tồn tại!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = AlbumDeleteSongSerializer(
            context={"album": album}, data={"song": song_id}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Xóa bài hát khỏi album thành công!",
                    "album-song": serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "message": "Xóa bài hát khỏi album không thành công!",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class AlbumSearchAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        albums = Album.objects.all()
        if request:
            albums = albums.filter(name__icontains=request)

        serializer = AlbumListSerializer(albums, many=True)
        return Response(
            {
                "message": "Lấy danh sách album thành công!",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )
