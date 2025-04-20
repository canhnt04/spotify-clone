from uuid import UUID
import cloudinary.uploader
from media.models import Album, Song
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.forms.models import model_to_dict

from rest_framework.permissions import IsAuthenticated, AllowAny
from media.serializers.album import (
    AlbumListSerializer,
    AlbumDetailSerializer,
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
            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "message": "Lấy danh sách album thành công!",
                    "album": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    "status": status.HTTP_404_NOT_FOUND,
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
            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "message": "Lấy thông tin album thành công!",
                    "album": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        except Album.DoesNotExist:
            return Response(
                {
                    "status": status.HTTP_404_NOT_FOUND,
                    "message": "Album không tồn tại!",
                },
                status=status.HTTP_404_NOT_FOUND,
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
                    "status": status.HTTP_201_CREATED,
                    "message": "Tạo album thành công!",
                    "album": AlbumDetailSerializer(album).data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {
                "status": status.HTTP_400_BAD_REQUEST,
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
                    "status": status.HTTP_404_NOT_FOUND,
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
                        "status": status.HTTP_200_OK,
                        "message": "Cập nhật album thành công!",
                        "album": serializer.data,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {
                        "status": status.HTTP_200_OK,
                        "message": "Album không có thay đổi!",
                    },
                    status=status.HTTP_200_OK,
                )
        return Response(
            {
                "status": status.HTTP_400_BAD_REQUEST,
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
                        "status": status.HTTP_403_FORBIDDEN,
                        "message": "Bạn không có quyền xóa album này!",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

            album.delete()
            return Response(
                {
                    "status": status.HTTP_204_NO_CONTENT,
                    "message": "Xóa album thành công!",
                },
                status=status.HTTP_204_NO_CONTENT,
            )
        except Album.DoesNotExist:
            return Response(
                {
                    "status": status.HTTP_404_NOT_FOUND,
                    "message": "Album không tồn tại!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )


class AlbumAddSongAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, album_id, song_id):
        try:
            album = Album.objects.get(id=album_id)
        except Album.DoesNotExist:
            return Response(
                {
                    "status": status.HTTP_404_NOT_FOUND,
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
                    "status": 201,
                    "message": "Thêm bài hát vào album thành công!",
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {
                    "status": status.HTTP_400_BAD_REQUEST,
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
                    "status": status.HTTP_404_NOT_FOUND,
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
                    "status": status.HTTP_200_OK,
                    "message": "Xóa bài hát khỏi album thành công!",
                    "album-song": serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "status": status.HTTP_400_BAD_REQUEST,
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
                "status": status.HTTP_200_OK,
                "message": "Lấy danh sách album thành công!",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )
