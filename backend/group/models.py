from datetime import datetime
from djongo import models
from django import forms
from uuid import uuid4


class Fed(models.Model):
    name = models.CharField(max_length=30)
    time_fed = models.DateTimeField(default=datetime.now())

    class Meta:
        abstract = True


class FedForm(forms.ModelForm):
    class Meta:
        model = Fed
        fields = ("name", "time_fed")


class Group(models.Model):
    """
    Name of the group (pet name)
    """
    name = models.CharField(max_length=30)

    """
    List of all times times and who fed
    """
    fed_times = models.ArrayField(model_container=Fed, model_form_class=FedForm)

    """
    Group invite code
    """
    group_code = models.CharField(max_length=10)

    class Meta:
        indexes = [
            models.Index(fields=["group_code"]),
        ]

    @classmethod
    def create_code(cls):
        code = str(uuid4())[:5].upper()
        group = Group.objects.filter(group_code=code).first()
        while group is not None:
            code = str(uuid4())[:5]
            group = Group.objects.filter(group_code=code).first()
        return code

