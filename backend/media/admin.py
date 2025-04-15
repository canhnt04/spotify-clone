from django.contrib import admin
from .models import Song, Video, Album, Favorite, Download

admin.site.register(Song)
admin.site.register(Video)
admin.site.register(Album)
admin.site.register(Favorite)
admin.site.register(Download)
