from django.db import models
from django.conf import settings
from cloudinary.models import CloudinaryField



# class Song(models.Model):
#     title = models.CharField(max_length=200, null=False, blank=False)
#     artist = models.CharField(max_length=255, null=False, blank=False)
#     genre = models.CharField(max_length=100, null=False, blank=False)
#     thumbnail_url = models.URLField()
#     audio_url = models.URLField()
#     duration = models.PositiveIntegerField()
#     album = models.ForeignKey("Album", on_delete=models.SET_NULL, null=True, blank=True)
#     release_date = models.DateField()

#     def __str__(self):
#         return self.title
class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=255)
    genre = models.CharField(max_length=100)
    thumbnail_url = CloudinaryField('image', blank=True, null=True)
    audio_url = CloudinaryField('raw', blank=True, null=True)
    duration = models.PositiveIntegerField()
    album = models.ForeignKey("Album", on_delete=models.SET_NULL, null=True, blank=True)
    release_date = models.DateField()

    def __str__(self):
        return self.title



class Video(models.Model):
    song = models.OneToOneField("Song", on_delete=models.CASCADE)
    thumbnail_url = models.URLField()
    video_url = models.URLField()
    resolution = models.PositiveIntegerField(default=720)
    is_downloaded = models.BooleanField(default=False)

    def __str__(self):
        return f"Video: {self.song.title}"


class Album(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(blank=True)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cover_image_url = models.URLField(blank=True)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class Favorite(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="favorites"
    )
    song = models.ForeignKey(
        "Song", on_delete=models.CASCADE, related_name="favorited_by"
    )
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "song")

    def __str__(self):
        return f"{self.user.username} like {self.song.title}"


class Download(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="downloads"
    )
    song = models.ForeignKey("Song", on_delete=models.CASCADE, null=True, blank=True)
    video = models.ForeignKey("Video", on_delete=models.CASCADE, null=True, blank=True)
    download_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        item = self.song.title if self.song else self.video.song.title
        return f"{self.user.username} download{item}"


class MediaPlayer:
    def __init__(self, song):
        self.song = song
        self.is_playing = False
        self.current_time = 0  # seconds
        self.volume = 100
        self.previous_volume = 100
        self.is_muted = False

    def play(self):
        self.is_playing = True

    def pause(self):
        self.is_playing = False

    def seek_to(self, seconds):
        self.current_time = seconds

    def set_volume(self, volume_level):
        volume_level = max(0, min(volume_level, 100))
        self.volume = volume_level
        self.is_muted = self.volume == 0

    def mute(self):
        if not self.is_muted:
            self.previous_volume = self.volume
            self.volume = 0
            self.is_muted = True

    def unmute(self):
        if self.is_muted:
            self.volume = self.previous_volume if self.volume > 50 else 50
        self.is_muted = False

    def is_mute(self):
        return self.is_muted

    def increase_volume(self, step=10):
        self.set_volume(self.volume + step)

    def decrease_volume(self, step=10):
        self.set_volume(self.volume - step)

    def __str__(self):
        return f"Playing: {self.song.title} | Volume: {self.volume} | Muted: {self.is_muted}"
