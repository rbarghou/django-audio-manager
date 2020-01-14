import datetime
import os

from django.contrib.auth.models import User
from django.contrib import admin
from django.core.exceptions import ValidationError

from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver


def audio_file_upload_path(instance, filename):
    now = datetime.datetime.now()
    return (
        f"user_{instance.user.id}/"
        f"date_{now.year}_{now.month}_{now.day}/"
        f"time_{now.hour}_{now.minute}_{now.second}/"
        f"{filename}"
    )


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.mp3', '.mpeg', '.wav']
    if not ext.lower() in valid_extensions:
        raise ValidationError(u'Unsupported file extension.')


class AudioFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to=audio_file_upload_path,
                            validators=[validate_file_extension])
    uploaded_at = models.DateTimeField(auto_now_add=True)


@receiver(pre_delete, sender=AudioFile)
def mymodel_delete(sender, instance, **kwargs):
    # Pass false so FileField doesn't save the model.
    instance.file.delete(False)


admin.site.register(AudioFile)