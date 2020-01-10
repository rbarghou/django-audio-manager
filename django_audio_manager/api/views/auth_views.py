from django.contrib.auth.views import LoginView
from django.http import JsonResponse


import logging

logger = logging.getLogger(__name__)


class LoginView(LoginView):
    def form_valid(self, form):
        super().form_valid(form)
        return JsonResponse({"success": True})

    def form_invalid(self, form):
        return JsonResponse({"success": False}, status=400)
