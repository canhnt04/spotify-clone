from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    ProfileUpdateSerializer,
    GetAllUserSerializer,
    GetUserDetailSerializer,
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
                    "message": "Đăng nhập thành công!",
                    "refreshToken": str(refresh),
                    "accessToken": str(refresh.access_token),
                    "userId": str(user.id),
                    "full_name": f"{user.last_name} {user.first_name}",
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {
                "message": "Đăng nhập thất bại!",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Đăng ký thành công!",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {
                "message": "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class ProfileAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response(
            {
                "message": "Lấy thông tin thành công!",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "last_name": user.last_name,
                    "first_name": user.first_name,
                    "fullname": f"{user.last_name} {user.first_name}",
                    "avatar": user.avatar.url if user.avatar else None,
                },
            },
            status=status.HTTP_200_OK,
        )


class ProfileUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = ProfileUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Cập nhật thông tin thành công!",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "last_name": user.last_name,
                        "first_name": user.first_name,
                        "avatar": user.avatar.url if user.avatar else None,
                    },
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {
                "message": "Cập nhật thông tin thất bại!",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class UserListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        serializer = GetAllUserSerializer(users, many=True)
        return Response(
            {
                "message": "Lấy danh sách người dùng thành công!",
                "users": serializer.data,
            },
            status=status.HTTP_200_OK,
        )


class UserDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = GetUserDetailSerializer(user)
        return Response(
            {
                "status": status.HTTP_200_OK,
                "message": "Lấy thông tin người dùng thành công!",
                "user": serializer.data,
            },
            status=status.HTTP_200_OK,
        )


class UserSearchAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request, search):
        users = User.objects.all()
        if search:
            users = users.filter(username__icontains=search) | users.filter(
                email__icontains=search
            )
        serializer = GetAllUserSerializer(users, many=True)
        return Response(
            {
                "message": "Lấy danh sách người dùng thành công!",
                "users": serializer.data,
            },
            status=status.HTTP_200_OK,
        )


class BanUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        user = request.user
        if not user.is_superuser:
            return Response(
                {
                    "status": status.HTTP_404_NOT_FOUND,
                    "messageError": "Chỉ quản trị viên mới có thể thực hiện hành động này!",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            ban_user = User.objects.get(id=user_id)
            serializer = BanUserSerializer(ban_user, data=request.data)
            if serializer.is_valid():
                ban_user.is_active = False
                ban_user.save()
                return Response(
                    {
                        "status": status.HTTP_200_OK,
                        "message": f"Tài khoản {ban_user.username} đã bị khóa!",
                    },
                    status=status.HTTP_200_OK,
                )
        except User.DoesNotExist:
            return Response(
                {
                    "status": status.HTTP_404_NOT_FOUND,
                    "messageError": "Người dùng không tồn tại!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )


class UnbanUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        user = request.user
        if not user.is_superuser:
            return Response(
                {
                    "status": status.HTTP_404_NOT_FOUND,
                    "messageError": "Chỉ quản trị viên mới có thể thực hiện hành động này!",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            unban_user = User.objects.get(id=user_id)
            serializer = UnbanUserSerializer(unban_user, data=request.data)
            if serializer.is_valid():
                unban_user.is_active = True
                unban_user.save()
                return Response(
                    {
                        "status": status.HTTP_200_OK,
                        "message": f"Tài khoản {unban_user.username} đã được mở khóa!",
                    },
                    status=status.HTTP_200_OK,
                )
        except User.DoesNotExist:
            return Response(
                {
                    "status": status.HTTP_404_NOT_FOUND,
                    "messageError": "Người dùng không tồn tại!",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
