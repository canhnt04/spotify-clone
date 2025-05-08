from rest_framework import serializers
from media.models import Song



class SongFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = "__all__"


class SongListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = "__all__"


class SongDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = "__all__"


class SongCreateSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(required=False, read_only=True)

    class Meta:
        model = Song
        fields = "__all__"

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["creator"] = user
        return super().create(validated_data)


class SongUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = [
            "title",
            "artist",
            "genre",
            "thumbnail_url",
            "duration",
            "audio_url",
            "video_url",
            "lyrics",
            "language",
        ]


class SongDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ["id"]


class SongSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ["id", "title", "artist", "genre", "thumbnail_url"]


class SongListenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ["listen_count"]
