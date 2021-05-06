from django.views import View
from django.http import HttpResponse, HttpResponseForbidden
from django.http import JsonResponse


from user.models import User

from .serializer import UserSerializer
from helpers import firebase_helper_verify, get_request_body


class UserView(View):
    def get(self, request, **kwargs):
        response = firebase_helper_verify(request.META["HTTP_AUTHORIZATION"])
        if not response["success"]:
            return HttpResponseForbidden("Invalid Firebase Token")
        user = User.get_user(response["user_id"])
        for group in user.groups:
            if len(group.fed_times) > 0:
                group.fed_times = [group.fed_times[-1]]
        return JsonResponse(UserSerializer(user).data)

    def patch(self, request):
        response = firebase_helper_verify(request.META["HTTP_AUTHORIZATION"])
        if not response["success"]:
            return HttpResponseForbidden("Invalid Firebase Token")
        body_data = get_request_body(request)
        if not body_data["success"]:
            return HttpResponse("Couldn't Parse Response")
        user = User.get_user(response["user_id"])
        if body_data["name"]:
            user.name = body_data["name"]
        user.save()
        return JsonResponse(UserSerializer(user).data)
