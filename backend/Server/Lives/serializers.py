from rest_framework import serializers
import jdatetime
from .models import Show


class JalaliDateTimeField(serializers.Field):
    def to_representation(self, value):
        if not value:
            return None
        jalali_date = jdatetime.datetime.fromgregorian(datetime=value)
        return jalali_date.strftime("%Y-%m-%d %H:%M")

    def to_internal_value(self, data):
        raise NotImplementedError("Read-only field.")


class ShowSerializer(serializers.ModelSerializer):
    created_at_jalali = JalaliDateTimeField(source="created_at", read_only=True)
    updated_at_jalali = JalaliDateTimeField(source="updated_at", read_only=True)

    class Meta:
        model = Show
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
        ]
