from rest_framework import serializers
from .models import Clipart



class ClipartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clipart
        fields = [
            'title',
            'slug',
            'description',
            'poster',
            'video',
            'music',
            'text',        # <-- rich HTML here
            'views',
            'created_at',
            'updated_at',
        ]
