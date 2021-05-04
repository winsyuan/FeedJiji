from firebase_admin import auth


def firebase_helper_verify(http_auth):
    firebase_user = auth.verify_id_token(http_auth.split(" ")[1])
    user_id = firebase_user["user_id"]
    return user_id
