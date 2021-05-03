from django.shortcuts import render
from django.views import View
from django.http import HttpResponse
import json

# from .models import User
import uuid
from firebase_admin import auth


# Create your views here.
from user.models import User


class UserView(View):
    def get(self, request):
        try:
            firebase_user = auth.verify_id_token(
                "eyJhbGciOiJSUzI1NiIsImtpZCI6IjRlOWRmNWE0ZjI4YWQwMjUwNjRkNjY1NTNiY2I5YjMzOTY4NWVmOTQiLCJ0eXAiOiJKV1QifQ.eyJwcm92aWRlcl9pZCI6ImFub255bW91cyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9mZWVkLWppamkiLCJhdWQiOiJmZWVkLWppamkiLCJhdXRoX3RpbWUiOjE2MTk5ODg4ODUsInVzZXJfaWQiOiJ5SFNnTlBsYnk3WnR1NXpZbXpSRXB3ZWY4WjEyIiwic3ViIjoieUhTZ05QbGJ5N1p0dTV6WW16UkVwd2VmOFoxMiIsImlhdCI6MTYyMDAxMjY0NywiZXhwIjoxNjIwMDE2MjQ3LCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7fSwic2lnbl9pbl9wcm92aWRlciI6ImFub255bW91cyJ9fQ.e_gqQ68bBHZ_gKcCDUIqEt6E6VMSE1pAe_cOXiol69txNxchRqGFfznOXa7u_l3yKvRkQ17SzqOMtHFjH68jsgfn2tQ9E9_2etqocNvR3pK5yEMiA1arIQ2gVvwpXvaBZlb5jRKFC9Qqe0p1EVyhcyhmqaTLdX3ddjaG950BzHCZzfZkYoaLQMBXLzszqk3MPUAHPJYOYyXdhsZlwD4QCEqvCV3gwFewmBrJsqGp7N8hWjTcd1177rJMGQOygDzNqPsOJlR0B2xOAsoZVH9tZZ64dCwDQZGUI3HK059zbTEt9zMDizVsnSqxq0_ZQ42jIvR3zsrX1yE-EQeOb3HN1A"
            )
            user_id = firebase_user["user_id"]
        except:
            return HttpResponse("User not found")

        print(firebase_user["user_id"])
        user = User.get_user(user_id)

        return HttpResponse("nyeahe")
