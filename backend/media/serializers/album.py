from rest_framework import serializers
from media.models import Album


class AlbumListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ["id", "name", "description", "cover_image_url", "created_at"]


class AlbumDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ["id", "name", "description", "cover_image_url", "created_at", "songs"]


class AlbumCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ["name", "description", "cover_image_url"]


class AlbumUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ["name", "description", "cover_image_url"]


class AlbumDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ["id"]


class AlbumAddSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ["song"]

    def validate(self, attrs):
        album = self.context["album"]
        song = attrs["song"]

        if song in album.songs.all():
            raise serializers.ValidationError("Song already exists in the album.")

        return attrs


class AlbumRemoveSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ["song"]

    def validate(self, attrs):
        album = self.context["album"]
        song = attrs["song"]

        if song not in album.songs.all():
            raise serializers.ValidationError("Song does not exist in the album.")

        return attrs
