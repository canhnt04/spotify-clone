import uuid
from cloudinary.models import CloudinaryField
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField()
    avatar = CloudinaryField("avatar", blank=True, null=True)

    def __str__(self):
        return self.username
