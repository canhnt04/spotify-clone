from uuid import UUID
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from media.models import Download,Song
from media.serializers.download import DownloadCreateSerializer, DownloadListSerializer
from rest_framework.permissions import IsAuthenticated 
class DownloadCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, song_id):
        try:
            # Kiểm tra ID hợp lệ
            uuid_obj = UUID(song_id)
            song = Song.objects.get(id=uuid_obj)

            # Dữ liệu gửi vào
            data = {
                "user": request.user.id,
                "song": song.id
            }
            serializer = DownloadCreateSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                song.download_count += 1
                song.save()
                return Response(
                    {
                        "status": status.HTTP_201_CREATED,
                        "message": "Tải xuống thành công!",
                        "data": serializer.data,
                    },
                    status=status.HTTP_201_CREATED,
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
class DownloadListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Retrieve all downloads from the database
        downloads = Download.objects.filter(user=request.user)
        # Serialize the data
        serializer = DownloadListSerializer(downloads, many=True)
        return Response(
            {"message": "Danh sách bài hát đã tải xuống", "data": serializer.data},
            status=status.HTTP_200_OK,
        )
class DownloadDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, download_id):
        try:          
            download = Download.objects.get(id=download_id, user=request.user)
            serializer = DownloadListSerializer(download)
            return Response(
                {"message": "Chi tiết bài hát đã tải xuống", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        except (ValueError, Download.DoesNotExist):
            return Response(
                {"message": "Bài hát không tồn tại hoặc id không hợp lệ"},
                status=status.HTTP_404_NOT_FOUND,
            )   
class DownloadDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Nếu bạn cần yêu cầu người dùng phải đăng nhập

    def delete(self, request, download_id):  # download_id từ URL
        try:
            download = Download.objects.get(id=download_id, user=request.user)
            download.delete()  # Xóa bài hát đã tải xuống
            return Response(
                {"message": "Bài hát đã được xóa khỏi danh sách tải xuống thành công."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Download.DoesNotExist:
            return Response(
                {"message": "Bài hát không tồn tại trong danh sách tải xuống."},
                status=status.HTTP_404_NOT_FOUND,
            )                 
                   