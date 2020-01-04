from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt import views as jwt_views
import api.views as api_views

urlpatterns = [
    path("api/admin/", admin.site.urls),
    path("api/", include("api.urls")),
]
