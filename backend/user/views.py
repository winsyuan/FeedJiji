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


class UserView(View):
    def get(self, request, **kwargs):
        try:
            firebase_user = auth.verify_id_token(
                request.META["HTTP_AUTHORIZATION"].split(" ")[1]
            )
            user_id = firebase_user["user_id"]
        except:
            return HttpResponseForbidden("Invalid Firebase Token")
        user = User.get_user(user_id)
        for group in user.groups:
            if len(group.fed_times) > 0:
                group.fed_times = group.fed_times[-1]
        return JsonResponse(UserSerializer(user).data)
