from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .validators import UserValidator

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        required=True,
        allow_blank=False,
        error_messages={
            "required": "Vui lòng nhập tên đăng nhập!",
            "blank": "Tên đăng nhập không được để trống!",
        },
    )
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        user = User.objects.filter(username=username).first()
        if user is None:
            raise serializers.ValidationError({"username": "Tài khoản không tồn tại!"})
        if not user.check_password(password):
            raise serializers.ValidationError({"password": "Sai mật khẩu!"})
        if not user.is_active:
            raise serializers.ValidationError({"username": "Tài khoản đã bị khóa!"})
        return {"user": user}


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
            "username": {"required": True},
            "email": {"required": True},
        }

    def validate(self, attrs):
        validator = UserValidator()
        validator.validate_username(attrs.get("username"))
        validator.validate_email(attrs.get("email"))
        validator.validate_password(attrs.get("password"))
        return attrs

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class UpdateUserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ["username", "email", "password", "avatar", "bio"]
        extra_kwargs = {
            "username": {"read_only": True},
            "email": {"required": False},
            "password": {"required": False},
            "avatar": {"required": False},
            "bio": {"required": False},
        }

    def validate(self, attrs):
        validator = UserValidator(instance=self.instance)

        if "email" in attrs:
            validator.validate_email(attrs["email"])
        if "password" in attrs:
            validator.validate_password(attrs["password"])

        return attrs

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        if validated_data.get("password"):
            instance.set_password(validated_data["password"])
        instance.avatar = validated_data.get("avatar", instance.avatar)
        instance.bio = validated_data.get("bio", instance.bio)
        instance.save()
        return instance
