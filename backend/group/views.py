from django.shortcuts import render
from django.views import View
from django.http import HttpResponse
import json

# from .models import Group
import uuid


class GroupsView(View):
    def get(self, request):
        # get use based off firebase token
        print("helloooo")
        return HttpResponse("ellllooo")


class GroupView(View):
    def get(self, request):
        # get use based off firebase token
        print("helloooo")
        return HttpResponse("ellllooo")
