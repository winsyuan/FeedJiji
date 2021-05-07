import datetime

from django.views import View
from django.http import (
    HttpResponse,
    HttpResponseForbidden,
    JsonResponse,
    HttpResponseNotFound,
    QueryDict,
)
import uuid

from helpers import firebase_helper_verify, get_request_body

from user.models import User
from .models import Group, Fed
from .serializer import GroupSerializer


class GroupsView(View):
    def post(self, request):
        body_data = get_request_body(request)
        if not body_data["success"]:
            return HttpResponse("Couldn't Parse Response")
        response = firebase_helper_verify(request.META["HTTP_AUTHORIZATION"])
        if not response["success"]:
            return HttpResponseForbidden("Invalid Firebase Token")
        kwargs = {
            "id": uuid.uuid4(),
            "name": body_data["name"],
            "group_code": Group.create_code(),
        }
        group = Group(**kwargs).save()
        user = User.get_user(response["user_id"])
        user.groups.append(group)
        user.save()
        return JsonResponse(GroupSerializer(group).data)


class GroupView(View):
    def get(self, request, group_id):
        response = firebase_helper_verify(request.META["HTTP_AUTHORIZATION"])
        if not response["success"]:
            return HttpResponseForbidden("Invalid Firebase Token")
        try:
            page = int(QueryDict(request.META["QUERY_STRING"]).get("page"))
        except:
            return HttpResponse("Couldn't Parse Response")
        group = Group.objects(pk=group_id).first()
        if group is None:
            return HttpResponseNotFound("Group not found")
        limit = 20
        start = page * limit
        group.fed_times = group.fed_times[start : start + limit]
        return JsonResponse(GroupSerializer(group).data)

    def patch(self, request, group_id):
        response = firebase_helper_verify(request.META["HTTP_AUTHORIZATION"])
        if not response["success"]:
            return HttpResponseForbidden("Invalid Firebase Token")
        user = User.get_user(response["user_id"])
        group = Group.objects(pk=group_id).first()
        if group is None:
            return HttpResponseNotFound("Group not found")
        fed_now = Fed(name=user.name, time_fed=datetime.datetime.now())
        group.fed_times.insert(0, fed_now)
        group.save()
        return JsonResponse(GroupSerializer(group).data)


class GroupJoinView(View):
    def patch(self, request, group_code):
        response = firebase_helper_verify(request.META["HTTP_AUTHORIZATION"])
        if not response["success"]:
            return HttpResponseForbidden("Invalid Firebase Token")
        group = Group.objects(group_code=group_code).first()
        if group is None:
            return HttpResponseNotFound("Group not found")
        user = User.get_user(response["user_id"])
        # check if user is in group
        if group in user.groups:
            return HttpResponseForbidden("User already in this group")
        user.groups.append(group)
        user.save()
        return JsonResponse(GroupSerializer(group).data)
