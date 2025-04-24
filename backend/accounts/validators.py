from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserValidator:
    def __init__(self, instance=None):
        self.instance = instance

    def validate_username(self, username):
        if not username:
            raise serializers.ValidationError(
                {"username": "Tên đăng nhập không được để trống!"}
            )
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "Tên đăng nhập đã tồn tại!"})
        if len(username) < 3:
            raise serializers.ValidationError(
                {"username": "Tên đăng nhập phải có ít nhất 3 ký tự!"}
            )
        if len(username) > 30:
            raise serializers.ValidationError(
                {"username": "Tên đăng nhập không được quá 30 ký tự!"}
            )
        if username.isdigit():
            raise serializers.ValidationError(
                {"username": "Tên đăng nhập không được chứa toàn bộ ký tự số!"}
            )
        if username.isalpha():
            raise serializers.ValidationError(
                {"username": "Tên đăng nhập không được chứa toàn bộ ký tự chữ!"}
            )
        if not username.isalnum():
            raise serializers.ValidationError(
                {"username": "Tên đăng nhập chỉ được chứa chữ cái và số!"}
            )
        return username

    def validate_email(self, email):
        if not email:
            raise serializers.ValidationError({"email": "Email không được để trống!"})
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email đã tồn tại!"})
        return email

    def validate_password(self, password):
        if not password:
            raise serializers.ValidationError(
                {"password": "Mật khẩu không được để trống!"}
            )
        if len(password) < 6:
            raise serializers.ValidationError(
                {"password": "Mật khẩu phải có ít nhất 6 ký tự!"}
            )
        if len(password) > 128:
            raise serializers.ValidationError(
                {"password": "Mật khẩu không được quá 128 ký tự!"}
            )
        if password.isdigit():
            raise serializers.ValidationError(
                {password: "Mật khẩu không được chứa toàn bộ ký tự số!"}
            )
        if password.isalpha():
            raise serializers.ValidationError(
                {"password": "Mật khẩu không được chứa toàn bộ ký tự chữ!"}
            )
        if not any(char.isdigit() for char in password):
            raise serializers.ValidationError(
                {"password": "Mật khẩu phải chứa ít nhất một ký tự số!"}
            )
        if not any(char.isalpha() for char in password):
            raise serializers.ValidationError(
                {"password": "Mật khẩu phải chứa ít nhất một ký tự chữ!"}
            )
        return password

    def validate_lastname(self, last_name):
        if not last_name:
            raise serializers.ValidationError({"last_name": "Họ không được để trống!"})
        if len(last_name) < 2:
            raise serializers.ValidationError(
                {"last_name": "Họ phải có ít nhất 2 ký tự!"}
            )
        if len(last_name) > 30:
            raise serializers.ValidationError(
                {"last_name": "Họ không được quá 30 ký tự!"}
            )
        if not last_name.isalpha():
            raise serializers.ValidationError(
                {"last_name": "Họ chỉ được chứa ký tự chữ!"}
            )
        return last_name

    def validate_firstname(self, first_name):
        if not first_name:
            raise serializers.ValidationError(
                {"first_name": "Tên không được để trống!"}
            )
        if len(first_name) < 2:
            raise serializers.ValidationError(
                {"first_name": "Tên phải có ít nhất 2 ký tự!"}
            )
        if len(first_name) > 30:
            raise serializers.ValidationError(
                {"first_name": "Tên không được quá 30 ký tự!"}
            )
        if not first_name.isalpha():
            raise serializers.ValidationError(
                {"first_name": "Tên chỉ được chứa ký tự chữ!"}
            )
        return first_name

    def validate_username_equal_password(self, username, password):
        if username == password:
            raise serializers.ValidationError(
                {"password": "Mật khẩu không được giống tên đăng nhập!"}
            )
        return password
