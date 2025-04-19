from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    ProfileUpdateSerializer,
    GetAllUserSerializer,
    BanUserSerializer,
    UnbanUserSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model

User = get_user_model()


class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "message": "Đăng nhập thành công!",
                    "refreshToken": str(refresh),
                    "accessToken": str(refresh.access_token),
                    "userId": str(user.id),
                },
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "status": status.HTTP_201_CREATED,
                    "message": "Đăng ký thành công!",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
                {
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Đăng ký thất bại. Kiểm tra lại thông tin.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class ProfileAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "avatar": user.avatar.url if user.avatar else None,
            "bio": user.bio,
        }
        return Response(user_data, status=status.HTTP_200_OK)


class ProfileUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = ProfileUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                "Cập nhật thông tin cá nhân thành công!", status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        serializer = GetAllUserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserSearchAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, search):
        users = User.objects.all()
        if search:
            users = users.filter(username__icontains=search) | users.filter(
                email__icontains=search
            )
        serializer = GetAllUserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BanUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        user = request.user
        if not user.is_superuser:
            return Response(
                {"error": "Chỉ quản trị viên mới có thể thực hiện hành động này."},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            target_user = User.objects.get(id=user_id)
            target_user.is_active = False
            target_user.save()
            return Response(
                {"message": "Người dùng đã bị cấm thành công."},
                status=status.HTTP_200_OK,
            )
        except User.DoesNotExist:
            return Response(
                {"error": "Người dùng không tồn tại."}, status=status.HTTP_404_NOT_FOUND
            )


class UnbanUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        user = request.user
        if not user.is_superuser:
            return Response(
                {"message": "Bạn không có quyền thực hiện hành động này!"},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            user_to_ban = User.objects.get(id=user_id)
            user_to_ban.is_active = True
            user_to_ban.save()
            return Response(
                {"message": "Người dùng đã được mở khóa thành công!"},
                status=status.HTTP_200_OK,
            )
        except User.DoesNotExist:
            return Response(
                {"message": "Người dùng không tồn tại!"},
                status=status.HTTP_404_NOT_FOUND,
            )
