from django.db import models
from django.conf import settings
from cloudinary.models import CloudinaryField
import uuid


class Song(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=255)
    genre = models.CharField(max_length=100)
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="songs",
    )
    thumbnail_url = CloudinaryField("image", blank=True, null=True)
    audio_url = CloudinaryField("raw", blank=True, null=True)
    video_url = CloudinaryField("video", blank=True, null=True)
    duration = models.PositiveIntegerField()
    download_count = models.PositiveIntegerField(default=0)
    listen_count = models.IntegerField(default=0)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title


class Album(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    songs = models.ManyToManyField(Song, blank=True, related_name="albums")
    thumbnail_url = CloudinaryField("image", blank=True, null=True)
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="albums",
    )
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class Favorite(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="favorites",
    )
    song = models.ForeignKey(
        "Song",
        on_delete=models.CASCADE,
        related_name="favorited_by",
    )
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "song")

    def __str__(self):
        return f"{self.user.username} like {self.song.title}"


class Download(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="downloads",
    )
    song = models.ForeignKey(
        "Song",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="downloads",
    )
    download_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.song:
            item = self.song.title
        else:
            item = "Unknown"
        return f"{self.user.username} download{item}"
