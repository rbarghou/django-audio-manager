from django.conf import settings

from django.urls import include, path


urlpatterns = [
    path("api/", include("api.urls")),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
