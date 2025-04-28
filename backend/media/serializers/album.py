from rest_framework import serializers
from media.models import Album, Song
from accounts.serializers import UserAlbumSerializer


class AlbumListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = "__all__"


class AlbumUserSerializer(serializers.ModelSerializer):
    user = UserAlbumSerializer(read_only=True)

    class Meta:
        model = Album
        fields = ["user", "id", "name", "description", "thumbnail_url"]


class AlbumDetailSerializer(serializers.ModelSerializer):
    songs = serializers.PrimaryKeyRelatedField(many=True, queryset=Song.objects.all())

    class Meta:
        model = Album
        fields = "__all__"


class AlbumCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ["name", "description", "thumbnail_url"]


class AlbumUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ["name", "description", "thumbnail_url"]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        thumbnail = data.get("thumbnail_url")
        if thumbnail:
            if thumbnail.startswith("image/upload/"):
                thumbnail = thumbnail.replace("image/upload/", "")
            thumbnail = f"http://res.cloudinary.com/dsohleblh/{thumbnail}"
        return data


class AlbumAddSongSerializer(serializers.Serializer):
    song = serializers.PrimaryKeyRelatedField(queryset=Song.objects.all())

    def validate(self, attrs):
        album = self.context.get("album")
        song = attrs["song"]

        if not song:
            raise serializers.ValidationError({"song": "Bài hát không tồn tại!"})

        if song in album.songs.all():
            raise serializers.ValidationError(
                {"song": f"Bài hát {song.title} đã tồn tại trong album!"}
            )

        return attrs

    def save(self, **kwargs):
        album = self.context["album"]
        song = self.validated_data["song"]
        album.songs.add(song)
        return album


class AlbumDeleteSongSerializer(serializers.Serializer):
    song = serializers.PrimaryKeyRelatedField(queryset=Song.objects.all())

    def validate(self, attrs):
        album = self.context.get("album")
        song = attrs["song"]

        if song not in album.songs.all():
            raise serializers.ValidationError(
                {"song": "Bài hát không tồn tại trong album!"}
            )

        return attrs

    def save(self, **kwargs):
        album = self.context["album"]
        song = self.validated_data["song"]
        album.songs.remove(song)
        return album
