from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny


class ProfileView(APIView):
    permission_classes = (AllowAny,)

    ANONYMOUS_PROFILE = {
        "username": "Anonymous",
        "is_authenticated": False,
        "firstname": "Anonymous",
        "lastname": "Anonymous",
    }

    def get(self, request):
        if request.user.is_authenticated:
            content = {
                "username": request.user.username,
                "is_authenticated": request.user.is_authenticated,
                "firstname": request.user.first_name,
                "lastname": request.user.last_name
            }
        else:
            content = self.ANONYMOUS_PROFILE
        return Response(content)


class PingView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        content = {
            "message": "pong",
            "user": str(request.user),
            "is_authenticated": request.user.is_authenticated,
        }
        return Response(content)


class HealthCheck(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {"is_healthy": True}
        return Response(content)
