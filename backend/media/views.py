from django.shortcuts import render
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from media.models import Song
from media.serializers.song import SongCreateSerializer,SongListSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
import cloudinary.uploader


class SongCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request):
        serializer = SongCreateSerializer(data=request.data)
        if serializer.is_valid():
            # Xử lý tải lên tệp âm thanh MP3
            if "audio_url" in request.FILES:
                audio_file = request.FILES["audio_url"]
                audio_response = cloudinary.uploader.upload(
                    audio_file, resource_type="raw"
                )
                serializer.validated_data["audio_url"] = audio_response.get("url")

            # Xử lý tải lên tệp hình ảnh
            if "thumbnail_url" in request.FILES:
                image_file = request.FILES["thumbnail_url"]
                image_response = cloudinary.uploader.upload(
                    image_file, resource_type="image"
                )
                serializer.validated_data["thumbnail_url"] = image_response.get("url")

            if "video_url" in request.FILES:
                video_file = request.FILES["video_url"]
                video_response = cloudinary.uploader.upload(
                    video_file, resource_type="video"
                )
                serializer.validated_data["video_url"] = video_response.get("url")

            # Lưu dữ liệu vào cơ sở dữ liệu
            serializer.save()
            return Response(
                {
                    "status": status.HTTP_201_CREATED,
                    "message": "Tạo bài hát thành công!",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SongListAPIView(APIView):
    permission_classes = [AllowAny]    
    def get(self, request):
        # Retrieve all songs from the database
        songs = Song.objects.all()
        # Serialize the data
        serializer = SongListSerializer(songs, many=True)
        return Response(
            {"message": "Danh sách bài hát", "data": serializer.data},
            status=status.HTTP_200_OK
        )