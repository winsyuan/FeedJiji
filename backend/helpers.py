from firebase_admin import auth
import json


# def firebase_helper_verify(http_auth):
#     firebase_user = auth.verify_id_token(http_auth.split(" ")[1])
#     user_id = firebase_user["user_id"]
#     return user_id


def firebase_helper_verify(http_auth):
    response = {}
    try:
        firebase_user = auth.verify_id_token(http_auth.split(" ")[1])
        response["user_id"] = firebase_user["user_id"]
        response["success"] = True
    except:
        response["success"] = True
    return response


def get_request_body(request):
    try:
        body_unicode = request.body.decode("utf-8")
        body_data = json.loads(body_unicode)
        body_data["success"] = True
    except:
        body_data["success"] = False
    return body_data
