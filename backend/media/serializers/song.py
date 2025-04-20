from rest_framework import serializers
from media.models import Song

class SongListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields ="__all__"
    def to_representation(self, instance):
        data = super().to_representation(instance)

        if data.get('thumbnail_url') and data['thumbnail_url'].startswith('image/upload/'):
            data['thumbnail_url'] = data['thumbnail_url'].replace('image/upload/', '')

        if data.get('audio_url') and data['audio_url'].startswith('image/upload/'):
            data['audio_url'] = data['audio_url'].replace('image/upload/', '')

        if data.get('video_url') and data['video_url'].startswith('image/upload/'):
            data['video_url'] = data['video_url'].replace('image/upload/', '')

        return data


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
class SongListenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ["listen_count"]        
