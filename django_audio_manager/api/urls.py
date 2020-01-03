from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
import api.views as api_views

urlpatterns = [
    path(
        "token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path(
        "token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"
    ),
    path("ping", api_views.PingView.as_view(), name="api_ping"),
    path("healthcheck", api_views.HealthCheck.as_view(), name="api_healthcheck"),
]
