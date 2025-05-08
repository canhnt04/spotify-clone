from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from media.models import Library, Album
from accounts.validators import FileValidator
from media.serializers.library import LibraryListSerializer, addAlbumLibrarySerializer


class LibraryListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        libraries = Library.objects.filter(user=request.user)
        serializer = LibraryListSerializer(libraries, many=True)
        library_data_list = serializer.data
        validator = FileValidator()
        for library_data in library_data_list:
            album_data = library_data.get("album", {})
            thumbnail = validator.validate_url(
                data={"thumbnail_url": album_data.get("thumbnail_url")},
                field_name="thumbnail_url",
                default_url=None,
            )
            album_data["thumbnail_url"] = thumbnail

        return Response(
            {
                "message": "Lấy danh sách library thành công!",
                "library": library_data_list,
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
