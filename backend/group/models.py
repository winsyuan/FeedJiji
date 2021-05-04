from datetime import datetime
from djongo import models
from django import forms
from uuid import uuid4

from mongoengine import Document, StringField, ListField, ReferenceField, EmbeddedDocument,DateTimeField, EmbeddedDocumentField


class Fed(EmbeddedDocument):
    name = StringField(max_length=30)
    time_fed = DateTimeField(default=datetime.now())


class Group(Document):
    """
    Name of the group (pet name)
    """
    name = StringField()

    """
    List of all times times and who fed
    """
    fed_times = ListField(EmbeddedDocumentField(Fed))

    """
    Group invite code
    """
    group_code = StringField()

    meta = {
        'indexes': [
            'group_code',
        ]
    }

    @classmethod
    def create_code(cls):
        code = str(uuid4())[:5].upper()
        group = Group.objects.filter(group_code=code).first()
        while group is not None:
            code = str(uuid4())[:5]
            group = Group.objects.filter(group_code=code).first()
        return code

