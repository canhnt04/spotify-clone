from rest_framework import serializers
from media.models import Song


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ["id", "title", "artist"]


class SongListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ["id", "title", "artist", "genre", "thumbnail_url", "duration"]


class SongDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = "__all__"


class SongCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = "__all__"


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
