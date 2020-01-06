from django.contrib import admin
from django.urls import path, include
import api.views as api_views

urlpatterns = [
    path("auth/", include("django.contrib.auth.urls")),
    path("admin/", admin.site.urls),
    path("ping", api_views.PingView.as_view(), name="api_ping"),
    path("healthcheck", api_views.HealthCheck.as_view(), name="api_healthcheck"),
]
