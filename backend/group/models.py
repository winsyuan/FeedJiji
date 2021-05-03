from datetime import datetime
from djongo import models
from django import forms


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
    id = models.UUIDField(primary_key=True)

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
