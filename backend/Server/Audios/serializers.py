from rest_framework import serializers
import jdatetime
from .models import Audio


class JalaliDateTimeField(serializers.Field):
    """
    Custom read-only field to represent DateTime in Jalali format.
    Example output: '1404-06-13 15:45'
    """

    def to_representation(self, value):
        if not value:
            return None
        # Convert Gregorian datetime to Jalali
        jalali_date = jdatetime.datetime.fromgregorian(datetime=value)
        return jalali_date.strftime("%Y-%m-%d %H:%M")

    def to_internal_value(self, data):
        # This serializer is read-only for dates
        raise NotImplementedError("This field is read-only.")


class AudioSerializer(serializers.ModelSerializer):
    created_at_jalali = JalaliDateTimeField(source="created_at", read_only=True)
    updated_at_jalali = JalaliDateTimeField(source="updated_at", read_only=True)

    class Meta:
        model = Audio
        fields = [
            "title",
            "slug",
            "description",
            "poster",
            "music",
            "text",
            "views",
            "created_at_jalali",
            "updated_at_jalali",
        ]
