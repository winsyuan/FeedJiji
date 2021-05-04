from rest_framework import serializers


# groups = models.ArrayReferenceField(
#     to=Group,
#     on_delete=models.CASCADE,
# )

class UserSerializer(serializers.Serializer):
    firebase_id = serializers.CharField(max_length=100)
    name = serializers.CharField(max_length=30)
    # group = serializers.DateTimeField()