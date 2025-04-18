from rest_framework import serializers
from media.models import Favorite
from django.contrib.auth import get_user_model

User = get_user_model()


class SongFavoriteSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Favorite
        fields = ["user", "song"]


class SongFavoriteListSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Favorite
        fields = ["user", "song"]
