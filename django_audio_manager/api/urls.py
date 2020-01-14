from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
import api.views as api_views


router = routers.SimpleRouter()
router.register("audiofile", api_views.AudioFileViewset)

urlpatterns = [
    path("auth/login/", api_views.LoginView.as_view(), name="login"),
    path("auth/", include("django.contrib.auth.urls")),
    path("auth/", include("rest_registration.api.urls")),
    path("admin/", admin.site.urls),
    path("ping", api_views.PingView.as_view(), name="api_ping"),
    path("profile", api_views.ProfileView.as_view(), name="profile"),
    path("healthcheck", api_views.HealthCheck.as_view(), name="api_healthcheck")
] + router.urls

