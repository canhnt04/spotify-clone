from rest_framework import serializers
from media.models import Favorite
from media.serializers.song import SongSerializer
from accounts.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class FavoriteListSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    song = SongSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = ["user", "song"]


class FavoriteCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Favorite
        fields = ["user", "song", "added_at"]
        read_only_fields = ["user", "song"]

    def validate(self, attrs):
        user = self.context["user"]
        song = self.context["song"]

        if Favorite.objects.filter(user=user, song=song).exists():
            raise serializers.ValidationError(
                {"favorite": f"Bài hát {song.title} đã có trong danh sách yêu thích!"}
            )

        return attrs

    def create(self, validated_data):
        user = self.context["user"]
        song = self.context["song"]

        return Favorite.objects.create(user=user, song=song)
