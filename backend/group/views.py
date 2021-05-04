import datetime

from django.shortcuts import render
from django.views import View
from django.http import (
    HttpResponse,
    HttpResponseForbidden,
    JsonResponse,
    HttpResponseNotFound,
)
import json
import uuid

from firebase_admin import auth
from helpers import firebase_helper_verify

from user.models import User
from .models import Group, Fed
from .serializer import GroupSerializer


class GroupsView(View):
    def post(self, request):
        try:
            body_unicode = request.body.decode("utf-8")
            body_data = json.loads(body_unicode)
        except:
            HttpResponse("Couldn't Parse Response")

        try:
            user_id = firebase_helper_verify(request.META["HTTP_AUTHORIZATION"])
        except:
            return HttpResponseForbidden("Invalid Firebase Token")
        kwargs = {
            "id": uuid.uuid4(),
            "name": body_data["name"],
            "group_code": Group.create_code(),
        }
        group = Group(**kwargs).save()
        user = User.get_user(user_id)
        user.groups.append(group)
        user.save()
        return JsonResponse(GroupSerializer(group).data)


class GroupView(View):
    def get(self, request, group_id):
        try:
            firebase_helper_verify(request.META["HTTP_AUTHORIZATION"])
        except:
            return HttpResponseForbidden("Invalid Firebase Token")
        group = Group.objects(pk=group_id).first()
        if group is None:
            return HttpResponseNotFound("Group not found")
        # TODO: paginate the fed_times
        return JsonResponse(GroupSerializer(group).data)

    def patch(self, request, group_id):
        try:
            user_id = firebase_helper_verify(request.META["HTTP_AUTHORIZATION"])
        except:
            return HttpResponseForbidden("Invalid Firebase Token")
        user = User.get_user(user_id)
        group = Group.objects(pk=group_id).first()
        if group is None:
            return HttpResponseNotFound("Group not found")
        fed_now = Fed(name=user.name, time_fed=datetime.datetime.now())
        group.fed_times.insert(0, fed_now)
        group.save()
        return JsonResponse(GroupSerializer(group).data)


class GroupJoinView(View):
    def patch(self, request, group_code):
        try:
            user_id = firebase_helper_verify(request.META["HTTP_AUTHORIZATION"])
        except:
            return HttpResponseForbidden("Invalid Firebase Token")
        group = Group.objects(group_code=group_code).first()
        if group is None:
            return HttpResponseNotFound("Group not found")
        user = User.get_user(user_id)
        # check if user is in group
        if group in user.groups:
            return HttpResponseForbidden("User already in this group")
        user.groups.append(group)
        user.save()
        return JsonResponse(GroupSerializer(group).data)
