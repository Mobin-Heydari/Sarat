from rest_framework import serializers
from .models import Audio



class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audio
        fields = (
            "title",
            "slug",
            "description",
            "poster",
            "music",
            "text",
            "views",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "views",
            "created_at",
            "updated_at",
        )
