from djongo import models
from group.models import Group
from mongoengine import Document, StringField, ListField, ReferenceField


class User(Document):
    """
    User ID with firebase
    """

    firebase_id = StringField(primary_key=True)

    """
    List of all the groups user is in
    """
    groups = ListField(ReferenceField(Group))

    """
    Name of user
    """
    name = StringField()

    @classmethod
    def get_user(cls, firebase_id):
        user = User.objects.filter(firebase_id=firebase_id).first()
        if user is not None:
            return user
        return cls(firebase_id=firebase_id).save()



