from ..models import AudioFile
from rest_framework import viewsets, serializers, mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, BasePermission

from django.http import HttpResponse

import logging

logger = logging.getLogger(__name__)


class AudioFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioFile
        fields = ["file", "uploaded_at"]


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


# Same as ModelAPIView except no Update.
class AudioFileViewset(mixins.CreateModelMixin,
                       mixins.DestroyModelMixin,
                       mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, IsOwner]

    serializer_class = AudioFileSerializer
    queryset = AudioFile.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return AudioFile.objects.filter(user=self.request.user)

    @action(detail=False, methods=["GET"], name="access")
    def access(self, request, *args, **kwargs):
        path = request.headers["X-Original-URI"]
        path = path.replace("/api/media/", "")
        af = AudioFile.objects.filter(file=path, user=request.user).first()
        if af:
            return HttpResponse("Access Granted")
        else:
            return HttpResponse(status=403)
