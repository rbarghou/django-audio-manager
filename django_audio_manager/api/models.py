from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin

import datetime


def audio_file_upload_path(instance, filename):
    now = datetime.datetime.now()
    return (
        f"user_{instance.user.id}/"
        f"date_{now.year}_{now.month}_{now.day}/"
        f"time_{now.hour}_{now.minute}_{now.second}/"
        f"{filename}"
    )


class AudioFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to=audio_file_upload_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)


admin.site.register(AudioFile)