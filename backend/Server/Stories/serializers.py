from rest_framework import serializers
from .models import Story, StoryVideos


class StoryVideosSerializer(serializers.ModelSerializer):
    """
    سریالایزر مدل StoryVideos
    """

    class Meta:
        model = StoryVideos
        fields = (
            'title',
            'slug',
            'video',
            'created_at',
            'updated_at',
        )
        read_only_fields = (
            'created_at',
            'updated_at',
        )


class StorySerializer(serializers.ModelSerializer):
    """
    سریالایزر مدل Story
    حاوی لیست ویدیوهای مرتبط به صورت فقط‌خواندنی
    """
    videos = StoryVideosSerializer(many=True, read_only=True)

    class Meta:
        model = Story
        fields = (
            'title',
            'slug',
            'poster',
            'views',
            'created_at',
            'updated_at',
            'videos',
        )
        read_only_fields = (
            'views',
            'created_at',
            'updated_at',
        )
