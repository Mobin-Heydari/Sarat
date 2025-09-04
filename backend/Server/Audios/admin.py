from django.contrib import admin
from django.utils.html import format_html
import jdatetime

from .models import Audio


def to_jalali(dt):
    """Convert Gregorian datetime to Jalali string."""
    if not dt:
        return "—"
    jdt = jdatetime.datetime.fromgregorian(datetime=dt)
    return jdt.strftime("%Y/%m/%d - %H:%M")


@admin.register(Audio)
class AudioAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "slug",
        "views",
        "poster_preview",
        "music_link",
        "created_at_jalali",
        "updated_at_jalali",
    )
    search_fields = ("title", "slug", "description", "text")
    list_filter = ("created_at", "updated_at")
    readonly_fields = ("poster_preview", "music_link", "created_at_jalali", "updated_at_jalali")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-created_at",)

    # --- Custom Display Methods ---

    def poster_preview(self, obj):
        """Show a small preview of the poster image."""
        if obj.poster:
            return format_html('<img src="{}" style="height:60px; border-radius:4px;" />', obj.poster.url)
        return "—"
    poster_preview.short_description = "پوستر"

    def music_link(self, obj):
        """Clickable link to the audio file."""
        if obj.music:
            return format_html('<a href="{}" target="_blank">دانلود/پخش</a>', obj.music.url)
        return "—"
    music_link.short_description = "فایل صوت"

    def created_at_jalali(self, obj):
        return to_jalali(obj.created_at)
    created_at_jalali.short_description = "تاریخ ایجاد (جلالی)"

    def updated_at_jalali(self, obj):
        return to_jalali(obj.updated_at)
    updated_at_jalali.short_description = "تاریخ بروزرسانی (جلالی)"
