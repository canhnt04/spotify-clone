from rest_framework import serializers
from media.serializers.album import AlbumUserSerializer
from accounts.serializers import UserSerializer
from media.models import Library
from django.contrib.auth import get_user_model

User = get_user_model()


class LibraryListSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    album = AlbumUserSerializer(read_only=True)

    class Meta:
        model = Library
        fields = ["id", "user", "saved_user", "album"]


class addAlbumLibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = ["album"]

    def validate(self, attrs):
        user = self.context["user"]
        album = self.context["album"]

        if Library.objects.filter(user=user, album=album).exists():
            raise serializers.ValidationError({"album": f" {album.name} đã tồn tại!"})

        return attrs

    def create(self, validated_data):
        user = self.context["user"]
        album = self.context["album"]
        return Library.objects.create(user=user, album=album)


class addUserLibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = ["saved_user"]

    def validate(self, attrs):
        user = self.context["user"]
        saved_user = self.context["saved_user"]

        if Library.objects.filter(user=user, saved_user=saved_user).exists():
            raise serializers.ValidationError(
                {"user": f"{saved_user.last_name} {saved_user.first_name} đã tồn tại!"}
            )

        return attrs

    def create(self, validated_data):
        user = self.context["user"]
        saved_user = self.context["saved_user"]
        return Library.objects.create(user=user, saved_user=saved_user)
