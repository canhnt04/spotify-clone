from rest_framework import serializers
from media.models import Download
from django.contrib.auth import get_user_model

User = get_user_model()


class DownloadSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Download
        fields = ["user", "song"]


class DownloadListSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Download
        fields = ["user", "song"]


class DownloadDetailSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Download
        fields = ["user", "song", "download_at"]


class DownloadCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Download
        fields = ["user", "song"]


class DownloadUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Download
        fields = ["user", "song"]


class DownloadDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Download
        fields = ["id"]
