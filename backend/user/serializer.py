from rest_framework import serializers
from group.serializer import GroupSerializer


class UserSerializer(serializers.Serializer):
    firebase_id = serializers.CharField()
    name = serializers.CharField()
    groups = serializers.ListField(child=GroupSerializer())
