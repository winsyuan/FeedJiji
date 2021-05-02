from datetime import datetime
from djongo import models


# Create your models here.
class Fed(models.Model):
    name = models.CharField(max_length=30)
    time_fed = models.DateTimeField(default=datetime.now())

    class Meta:
        abstract = True


class Group(models.Model):
    id = models.UUIDField(primary_key=True)

    '''
    Name of the group (pet name)
    '''
    name = models.CharField(max_length=30)

    '''
    List of all times times and who fed
    '''
    fed_times = models.ArrayField(models.EmbeddedField(
        model_container=Fed
    ))

    '''
    Group invite code
    '''
    group_code = models.CharField(max_length=10)

    class Meta:
        indexes = [
            models.Index(fields=['group_code']),
        ]
