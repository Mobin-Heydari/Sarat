from django.contrib import admin
from django.utils.html import format_html
import jdatetime

from .models import Funny, FunnyContent


def to_jalali(dt):
    """Convert Gregorian datetime to Jalali string."""
    if not dt:
        return "—"
    jdt = jdatetime.datetime.fromgregorian(datetime=dt)
    return jdt.strftime("%Y/%m/%d - %H:%M")



@admin.register(Funny)
class FunnyAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "views", "poster_preview", "created_at_jalali", "updated_at_jalali")
    search_fields = ("title", "slug", "description", "text")
    list_filter = ("created_at", "updated_at")
    readonly_fields = ("poster_preview", "created_at_jalali", "updated_at_jalali")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-created_at",)

    def poster_preview(self, obj):
        if obj.poster:
            return format_html('<img src="{}" style="height:60px; border-radius:4px;" />', obj.poster.url)
        return "—"
    poster_preview.short_description = "پوستر"

    def created_at_jalali(self, obj):
        return to_jalali(obj.created_at)
    created_at_jalali.short_description = "تاریخ ایجاد (جلالی)"

    def updated_at_jalali(self, obj):
        return to_jalali(obj.updated_at)
    updated_at_jalali.short_description = "تاریخ بروزرسانی (جلالی)"


@admin.register(FunnyContent)
class FunnyContentAdmin(admin.ModelAdmin):
    list_display = ("title", "funny", "image_preview", "video", "created_at_jalali", "updated_at_jalali")
    search_fields = ("title", "funny__title", "content")
    list_filter = ("created_at", "updated_at", "funny")
    readonly_fields = ("image_preview", "created_at_jalali", "updated_at_jalali")
    ordering = ("-created_at",)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:60px; border-radius:4px;" />', obj.image.url)
        return "—"
    image_preview.short_description = "پیش‌نمایش تصویر"

    def created_at_jalali(self, obj):
        return to_jalali(obj.created_at)
    created_at_jalali.short_description = "تاریخ ایجاد (جلالی)"

    def updated_at_jalali(self, obj):
        return to_jalali(obj.updated_at)
    updated_at_jalali.short_description = "تاریخ بروزرسانی (جلالی)"
