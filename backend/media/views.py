from django.shortcuts import render
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SongSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
import cloudinary.uploader





class SongCreateAPIView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser]

    def post(self, request):
        serializer = SongSerializer(data=request.data)
        if serializer.is_valid():
            # Xử lý tải lên tệp âm thanh MP3
            if 'audio_url' in request.FILES:
                audio_file = request.FILES['audio_url']
                audio_response = cloudinary.uploader.upload(audio_file, resource_type='raw')
                serializer.validated_data['audio_url'] = audio_response.get('url')

            # Xử lý tải lên tệp hình ảnh
            if 'thumbnail_url' in request.FILES:
                image_file = request.FILES['thumbnail_url']
                image_response = cloudinary.uploader.upload(image_file, resource_type='image')
                serializer.validated_data['thumbnail_url'] = image_response.get('url')

            # Lưu dữ liệu vào cơ sở dữ liệu
            serializer.save()
            return Response(
                {"message": "Tạo bài hát thành công!","data": serializer.data}, 
                status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
