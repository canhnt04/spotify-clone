from uuid import UUID
from django.shortcuts import render
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.validators import FileValidator
from media.models import Song
from media.serializers.song import (
    SongCreateSerializer,
    SongListSerializer,
    SongDetailSerializer,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
import cloudinary.uploader


class SongCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request):
        serializer = SongCreateSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            validator = FileValidator()

            # Xử lý tải lên tệp âm thanh MP3
            if "audio_url" in request.FILES:
                audio_file = request.FILES["audio_url"]
                validator.validate_audio(audio_file)
                audio_response = cloudinary.uploader.upload(
                    audio_file, resource_type="raw"
                )
                serializer.validated_data["audio_url"] = audio_response.get(
                    "secure_url"
                )

            # Xử lý tải lên tệp hình ảnh
            if "thumbnail_url" in request.FILES:
                image_file = request.FILES["thumbnail_url"]
                validator.validate_image(image_file)
                image_response = cloudinary.uploader.upload(
                    image_file, resource_type="image"
                )
                serializer.validated_data["thumbnail_url"] = image_response.get(
                    "secure_url"
                )

            if "video_url" in request.FILES:
                video_file = request.FILES["video_url"]
                validator.validate_video(video_file)
                video_response = cloudinary.uploader.upload(
                    video_file, resource_type="video"
                )
                serializer.validated_data["video_url"] = video_response.get(
                    "secure_url"
                )

            # Lưu dữ liệu vào cơ sở dữ liệu
            serializer.save()
            return Response(
                {
                    "status": status.HTTP_201_CREATED,
                    "message": "Tạo bài hát thành công!",
                    "song": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SongListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        songs = Song.objects.all()
        serializer = SongListSerializer(songs, many=True)
        song_data_list = serializer.data
        validator = FileValidator()
        for song_data in song_data_list:
            thumbnail_url = validator.validate_url(
                data=song_data, field_name="thumbnail_url", default_url=None
            )
            audio_url = validator.validate_url(
                data=song_data, field_name="audio_url", default_url=None
            )
            video_url = validator.validate_url(
                data=song_data, field_name="video_url", default_url=None
            )
            song_data["thumbnail_url"] = thumbnail_url
            song_data["audio_url"] = audio_url
            song_data["video_url"] = video_url
        return Response(
            {"message": "Danh sách bài hát", "data": song_data_list},
            status=status.HTTP_200_OK,
        )


class SongListUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        songs = user.songs.all()
        serializer = SongListSerializer(songs, many=True)
        song_data_list = serializer.data
        validator = FileValidator()
        for song_data in song_data_list:
            thumbnail_url = validator.validate_url(
                data=song_data, field_name="thumbnail_url", default_url=None
            )
            audio_url = validator.validate_url(
                data=song_data, field_name="audio_url", default_url=None
            )
            video_url = validator.validate_url(
                data=song_data, field_name="video_url", default_url=None
            )
            song_data["thumbnail_url"] = thumbnail_url
            song_data["audio_url"] = audio_url
            song_data["video_url"] = video_url
        return Response(
            {"message": "Danh sách bài hát của người dùng", "data": song_data_list},
            status=status.HTTP_200_OK,
        )
    
class SongListProfileUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = request.user
        songs = Song.objects.filter(creator_id=user_id)
        serializer = SongListSerializer(songs, many=True)
        song_data_list = serializer.data
        validator = FileValidator()
        for song_data in song_data_list:
            thumbnail_url = validator.validate_url(
                data=song_data, field_name="thumbnail_url", default_url=None
            )
            audio_url = validator.validate_url(
                data=song_data, field_name="audio_url", default_url=None
            )
            video_url = validator.validate_url(
                data=song_data, field_name="video_url", default_url=None
            )
            song_data["thumbnail_url"] = thumbnail_url
            song_data["audio_url"] = audio_url
            song_data["video_url"] = video_url
        return Response(
            {"message": "Danh sách bài hát của người dùng", "data": song_data_list},
            status=status.HTTP_200_OK,
        )
    
    


class SongDetailAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, song_id):
        try:
            song = Song.objects.get(id=song_id)
            serializer = SongDetailSerializer(song)
            song_data = serializer.data
            validator = FileValidator()
            thumbnail_url = validator.validate_url(
                data=song_data, field_name="thumbnail_url", default_url=None
            )
            audio_url = validator.validate_url(
                data=song_data, field_name="audio_url", default_url=None
            )
            video_url = validator.validate_url(
                data=song_data, field_name="video_url", default_url=None
            )
            song_data["thumbnail_url"] = thumbnail_url
            song_data["audio_url"] = audio_url
            song_data["video_url"] = video_url
            return Response(
                {"message": "Chi tiết bài hát", "data": song_data},
                status=status.HTTP_200_OK,
            )
        except (ValueError, Song.DoesNotExist):
            return Response(
                {"message": "Bài hát không tồn tại hoặc id không hợp lệ"},
                status=status.HTTP_404_NOT_FOUND,
            )


class SongSearchSerializer(APIView):
    permission_classes = [AllowAny]

    def get(self, request, search):
        song = Song.objects.all()
        if search:
            song = (
                song.filter(title__icontains=search)
                | song.filter(artist__icontains=search)
                | song.filter(genre__icontains=search)
            )
        serializer = SongListSerializer(song, many=True)
        song_data_list = serializer.data
        validator = FileValidator()
        for song_data in song_data_list:
            thumbnail_url = validator.validate_url(
                data=song_data, field_name="thumbnail_url", default_url=None
            )
            audio_url = validator.validate_url(
                data=song_data, field_name="audio_url", default_url=None
            )
            video_url = validator.validate_url(
                data=song_data, field_name="video_url", default_url=None
            )
            song_data["thumbnail_url"] = thumbnail_url
            song_data["audio_url"] = audio_url
            song_data["video_url"] = video_url
        return Response(song_data_list, status=status.HTTP_200_OK)


class SongDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, song_id):
        try:
            song = Song.objects.get(id=song_id)
            song.delete()
            return Response(
                {"message": "Bài hát đã được xóa thành công."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Song.DoesNotExist:
            return Response(
                {"message": "Bài hát không tồn tại."},
                status=status.HTTP_404_NOT_FOUND,
            )


class SongUpdateAPIView(APIView):
    permission_classes = [
        IsAuthenticated
    ]  # Nếu bạn cần yêu cầu người dùng phải đăng nhập

    def put(self, request, song_id):
        try:
            uuid_obj = UUID(song_id)  # ép kiểu để chắc chắn là UUID hợp lệ
            song = Song.objects.get(id=uuid_obj)
            serializer = SongCreateSerializer(song, data=request.data)
            if serializer.is_valid():
                validator = FileValidator()
                # Xử lý tải lên tệp âm thanh MP3
                if "audio_url" in request.FILES:
                    audio_file = request.FILES["audio_url"]
                    validator.validate_audio(audio_file)
                    audio_response = cloudinary.uploader.upload(
                        audio_file, resource_type="raw"
                    )
                    serializer.validated_data["audio_url"] = audio_response.get(
                        "secure_url"
                    )

                # Xử lý tải lên tệp hình ảnh
                if "thumbnail_url" in request.FILES:
                    image_file = request.FILES["thumbnail_url"]
                    validator.validate_image(image_file)
                    image_response = cloudinary.uploader.upload(
                        image_file, resource_type="image"
                    )
                    serializer.validated_data["thumbnail_url"] = image_response.get(
                        "secure_url"
                    )

                if "video_url" in request.FILES:
                    video_file = request.FILES["video_url"]
                    validator.validate_video(video_file)
                    video_response = cloudinary.uploader.upload(
                        video_file, resource_type="video"
                    )
                    serializer.validated_data["video_url"] = video_response.get(
                        "secure_url"
                    )

                # Lưu dữ liệu vào cơ sở dữ liệu
                serializer.save()
                return Response(
                    {
                        "message": "Cập nhật bài hát thành công!",
                        "song": serializer.data,
                    },
                    status=status.HTTP_200_OK,
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Song.DoesNotExist:
            return Response(
                {"message": "Bài hát không tồn tại."},
                status=status.HTTP_404_NOT_FOUND,
            )


class SongListenAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, song_id):
        try:
            uuid_obj = UUID(song_id)
            song = Song.objects.get(id=uuid_obj)
            song.listen_count += 1
            song.save()

            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "message": "Ghi nhận lượt nghe!",
                    "listen_count": song.listen_count,
                },
                status=status.HTTP_200_OK,
            )

        except Song.DoesNotExist:
            return Response(
                {"message": "Bài hát không tồn tại."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except ValueError:
            return Response(
                {"message": "ID bài hát không hợp lệ."},
                status=status.HTTP_400_BAD_REQUEST,
            )
