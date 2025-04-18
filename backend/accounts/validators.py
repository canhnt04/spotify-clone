from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserValidator:
    def __init__(self, instance=None):
        self.instance = instance

    def validate_username(self, username):
        if not username:
            raise serializers.ValidationError("Tên đăng nhập không được để trống!")
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Tên đăng nhập đã tồn tại!")
        return username

    def validate_email(self, email):
        if not email:
            raise serializers.ValidationError("Email không được để trống!")
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email đã tồn tại!")
        return email

    def validate_password(self, password):
        try:
            validate_password(password=password, user=self.instance)
        except serializers.ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})
        return password
