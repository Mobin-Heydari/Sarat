from rest_framework import serializers
from .models import Funny, FunnyContent
import jdatetime


class JalaliDateTimeField(serializers.Field):
    """
    Custom field to represent DateTime in Jalali format.
    Example output: '1404-06-13 15:45'
    """

    def to_representation(self, value):
        if not value:
            return None
        # Convert Gregorian datetime to Jalali
        jalali_date = jdatetime.datetime.fromgregorian(datetime=value)
        return jalali_date.strftime("%Y-%m-%d %H:%M")

    def to_internal_value(self, data):
        # Read-only field, so no deserialization
        raise NotImplementedError("This field is read-only.")


class FunnyContentSerializer(serializers.ModelSerializer):
    created_at_jalali = JalaliDateTimeField(source="created_at", read_only=True)
    updated_at_jalali = JalaliDateTimeField(source="updated_at", read_only=True)

    class Meta:
        model = FunnyContent
        fields = [
            "title",
            "image",
            "video",
            "content",
            "created_at_jalali",
            "updated_at_jalali",
        ]


class FunnySerializer(serializers.ModelSerializer):
    created_at_jalali = JalaliDateTimeField(source="created_at", read_only=True)
    updated_at_jalali = JalaliDateTimeField(source="updated_at", read_only=True)
    content = FunnyContentSerializer(many=True, read_only=True)

    class Meta:
        model = Funny
        fields = [
            "title",
            "slug",
            "description",
            "poster",
            "video",
            "text",
            "views",
            "created_at_jalali",
            "updated_at_jalali",
            "content",
        ]
