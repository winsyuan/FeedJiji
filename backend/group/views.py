from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, HttpResponseForbidden
import json
import uuid

from firebase_admin import auth

from user.models import User
from .models import Group


class GroupsView(View):
    def get(self, request):
        # get use based off firebase token
        print(request.body)
        # get name
        print("helloooo")
        return HttpResponse("ellllooo")

    def post(self, request):
        # create a group
        try:
            body_unicode = request.body.decode('utf-8')
            body_data = json.loads(body_unicode)
        except:
            HttpResponse("bad")

        try:
            firebase_user = auth.verify_id_token(request.META['HTTP_AUTHORIZATION'].split(' ')[1])
            user_id = firebase_user["user_id"]
        except:
            return HttpResponseForbidden("Invalid Firebase Token")
        kwargs = {}
        kwargs['name'] = body_data['name']
        kwargs['group_code'] = Group.create_code()
        # print(kwargs)
        group = Group(**kwargs)
        group.save()
        user = User.get_user(user_id)
        user.groups.append(group)
        user.save()
        return HttpResponse("ellllooo")


class GroupView(View):
    def get(self, request):
        # get use based off firebase token
        print("helloooo")
        return HttpResponse("ellllooo")
