from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from media.models import Favorite, Song
from media.serializers.favorite import (
    FavoriteListSerializer,
    FavoriteCreateSerializer,
)


class FavoriteListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = Favorite.objects.filter(user=request.user)
        if favorites.exists():
            serializer = FavoriteListSerializer(favorites, many=True)
            return Response(
                {
                    "message": "Lấy danh sách bài hát yêu thích thành công!",
                    "favorites": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    "message": "Không tìm thấy bài hát yêu thích nào!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )


class FavoriteCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, song_id):
        try:
            song = Song.objects.get(id=song_id)
        except Song.DoesNotExist:
            return Response(
                {
                    "message": "Bài hát không tồn tại!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = FavoriteCreateSerializer(
            data=request.data, context={"user": request.user, "song": song}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Thêm bài hát vào danh sách yêu thích thành công!",
                    "favorite": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {
                    "message": "Thêm bài hát vào danh sách yêu thích thất bại!",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class FavoriteDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, song_id):
        user = request.user
        try:
            favorite = Favorite.objects.get(user=user, song=song_id)
            favorite.delete()
            return Response(
                {
                    "message": "Xóa bài hát khỏi danh sách yêu thích thành công!",
                },
                status=status.HTTP_200_OK,
            )
        except Favorite.DoesNotExist:
            return Response(
                {
                    "message": "Bài hát không tồn tại trong danh sách yêu thích!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
