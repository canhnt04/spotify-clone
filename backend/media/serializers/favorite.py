from rest_framework import serializers
from media.models import Favorite
from media.serializers.song import SongFavoriteSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class FavoriteListSerializer(serializers.ModelSerializer):
    song = SongFavoriteSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = ["song"]

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        song_data = rep.pop('song', {})
        rep.pop('user',None)
        rep.update(song_data)
        return rep

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
