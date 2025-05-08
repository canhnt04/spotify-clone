from rest_framework import serializers
from media.serializers.album import AlbumUserSerializer
from accounts.serializers import UserLibrarySerializer
from media.models import Library
from django.contrib.auth import get_user_model

User = get_user_model()


class LibraryListSerializer(serializers.ModelSerializer):
    user = UserLibrarySerializer(read_only=True)
    album = AlbumUserSerializer(read_only=True)

    class Meta:
        model = Library
        fields = ["id", "user", "album"]


class addAlbumLibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = ["album"]

    def validate(self, attrs):
        user = self.context["user"]
        album = self.context["album"]

        if Library.objects.filter(user=user, album=album).exists():
            raise serializers.ValidationError(
                {"library": f"Album {album.name} đã có trong thư viện!"}
            )

        return attrs

    def create(self, validated_data):
        user = self.context["user"]
        album = self.context["album"]
        return Library.objects.create(user=user, album=album)
