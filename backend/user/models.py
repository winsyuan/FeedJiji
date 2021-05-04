from djongo import models
from group.models import Group


class User(models.Model):
    """
    User ID with firebase
    """

    firebase_id = models.CharField(max_length=100, primary_key=True)

    """
    List of all the groups user is in
    """
    # groups = models.ArrayReferenceField(
    #     to=Group,
    #     on_delete=models.CASCADE,
    # )
    # groups = models.ArrayField(Group)
    # groups = models.ArrayField(models.ObjectIdField())
    # group_ids = models.ArrayField(models.ObjectIdField)
    # groups = models.ArrayReferenceField(Group, on_delete=models.SET_DEFAULT, default=[])
    groups = models.ArrayReferenceField(Group)
    """
    Name of user
    """
    name = models.CharField(max_length=30)

    @classmethod
    def get_user(cls, firebase_id):
        user = User.objects.filter(firebase_id=firebase_id).first()
        if user is not None:
            return user
        return cls(firebase_id=firebase_id).save()


