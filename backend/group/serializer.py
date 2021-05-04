from rest_framework import serializers


class FedSerializer(serializers.Serializer):
    name = serializers.CharField()
    time_fed = serializers.DateTimeField()


class GroupSerializer(serializers.Serializer):
    name = serializers.CharField()
    group_code = serializers.CharField()
    fed_times = serializers.ListField(child=FedSerializer())
