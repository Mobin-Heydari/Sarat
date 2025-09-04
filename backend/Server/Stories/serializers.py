from rest_framework import serializers
import jdatetime
from .models import Story, StoryVideos


class JalaliDateTimeField(serializers.Field):
    """
    Custom read-only field to represent DateTime in Jalali format.
    Example output: '1404-06-13 15:45'
    """

    def to_representation(self, value):
        if not value:
            return None
        jalali_date = jdatetime.datetime.fromgregorian(datetime=value)
        return jalali_date.strftime("%Y-%m-%d %H:%M")

    def to_internal_value(self, data):
        # Read-only field
        raise NotImplementedError("This field is read-only.")


class StoryVideoSerializer(serializers.ModelSerializer):
    created_at_jalali = JalaliDateTimeField(source="created_at", read_only=True)
    updated_at_jalali = JalaliDateTimeField(source="updated_at", read_only=True)

    class Meta:
        model = StoryVideos
        fields = [
            "title",
            "slug",
            "video",
            "created_at_jalali",
            "updated_at_jalali",
        ]


class StorySerializer(serializers.ModelSerializer):
    created_at_jalali = JalaliDateTimeField(source="created_at", read_only=True)
    updated_at_jalali = JalaliDateTimeField(source="updated_at", read_only=True)
    videos = StoryVideoSerializer(many=True, read_only=True)

    class Meta:
        model = Story
        fields = [
            "title",
            "slug",
            "poster",
            "views",
            "created_at_jalali",
            "updated_at_jalali",
            "videos",
        ]
