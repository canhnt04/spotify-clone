from rest_framework import serializers
from .models import Song
from urllib.parse import urlparse
class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'
        
   