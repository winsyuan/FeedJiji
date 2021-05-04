import json

from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, HttpResponseForbidden
from django.http import JsonResponse
from rest_framework.response import Response

# from .models import User
import uuid
from firebase_admin import auth
from django.forms.models import model_to_dict


# Create your views here.
from user.models import User

from .serializer import UserSerializer
from helpers import firebase_helper_verify


class UserView(View):
    def get(self, request, **kwargs):
        try:
            user_id = firebase_helper_verify(request.META["HTTP_AUTHORIZATION"])
        except:
            return HttpResponseForbidden("Invalid Firebase Token")
        user = User.get_user(user_id)
        for group in user.groups:
            if len(group.fed_times) > 0:
                group.fed_times = [group.fed_times[-1]]
        return JsonResponse(UserSerializer(user).data)

    def patch(self, request):
        try:
            user_id = firebase_helper_verify(request.META["HTTP_AUTHORIZATION"])
        except:
            return HttpResponseForbidden("Invalid Firebase Token")
        try:
            body_unicode = request.body.decode("utf-8")
            body_data = json.loads(body_unicode)
        except:
            return HttpResponse("Couldn't Parse Response")
        user = User.get_user(user_id)
        if body_data["name"]:
            user.name = body_data["name"]
        user.save()
        return JsonResponse(UserSerializer(user).data)
