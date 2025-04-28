from typing import OrderedDict
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
        fields = ["username", "email", "last_name", "first_name", "password"]
        extra_kwargs = {
            "username": {"validators": []},
            "email": {"validators": []},
            "last_name": {"validators": []},
            "first_name": {"validators": []},
            "password": {"validators": []},
        }

    def validate(self, attrs):
        validator = UserValidator()
        validator.validate_username(attrs.get("username"))
        validator.validate_email(attrs.get("email"))
        validator.validate_lastname(attrs.get("last_name"))
        validator.validate_firstname(attrs.get("first_name"))
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


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "avatar"]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data["full_name"] = f"{instance.last_name} {instance.first_name}"

        return OrderedDict(
            [
                ("id", data.get("id", "")),
                ("username", data.get("username", "")),
                ("email", data.get("email", "")),
                ("full_name", data.get("full_name", "")),
                ("avatar", data.get("avatar")),
            ]
        )


class ProfileAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "avatar"]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data["full_name"] = f"{instance.last_name} {instance.first_name}"

        return OrderedDict(
            [
                ("id", data.get("id", "")),
                ("full_name", data.get("full_name", "")),
                ("avatar", data.get("avatar")),
            ]
        )


class ProfileOtherSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "avatar"]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data["full_name"] = f"{instance.last_name} {instance.first_name}"

        return OrderedDict(
            [
                ("id", data.get("id", "")),
                ("full_name", data.get("full_name", "")),
                ("avatar", data.get("avatar")),
            ]
        )


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "last_name", "first_name", "avatar"]

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class GetAllUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "avatar"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["full_name"] = f"{instance.last_name} {instance.first_name}"
        return OrderedDict(
            [
                ("id", data.get("id", "")),
                ("username", data.get("username", "")),
                ("email", data.get("email", "")),
                ("full_name", data.get("full_name", "")),
                ("avatar", data.get("avatar")),
            ]
        )


class GetUserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "last_name", "first_name", "avatar"]


class BanUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["is_active"]

    def update(self, instance, validated_data):
        instance.is_active = validated_data.get("is_active", True)
        instance.save()
        return instance


class UnbanUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["is_active"]

    def update(self, instance, validated_data):
        instance.is_active = validated_data.get("is_active", False)
        instance.save()
        return instance


class UserFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]
        read_only_fields = ["id"]


class UserAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]
