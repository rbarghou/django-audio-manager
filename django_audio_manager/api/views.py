from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny


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
