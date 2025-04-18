from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .validators import UserValidator

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        error_messages={
            "required": "Vui lòng nhập tên đăng nhập!",
            "blank": "Tên đăng nhập không được để trống!",
        },
    )
    password = serializers.CharField(
        error_messages={
            "required": "Vui lòng nhập mật khẩu!",
            "blank": "Mật khẩu không được để trống!",
        }
    )

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
        attrs["user"] = user
        return attrs


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {
            "username": {"validators": []},
            "email": {"validators": []},
            "password": {"validators": []},
        }

    def validate(self, attrs):
        validator = UserValidator()
        validator.validate_username(attrs.get("username"))
        validator.validate_email(attrs.get("email"))
        validator.validate_password(attrs.get("password"))
        validator.validate_username_equal_password(
            attrs.get("username"), attrs.get("password")
        )
        return attrs

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class ProfileUpdateSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ["username", "email", "password", "avatar", "bio"]

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


class GetAllUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "avatar", "bio"]


class BanUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "is_active"]


class UnbanUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "is_active"]

    def update(self, instance, validated_data):
        instance.is_active = validated_data.get("is_active", False)
        instance.save()
        return instance
