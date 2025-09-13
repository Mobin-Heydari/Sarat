from django.contrib import admin
from django.utils.html import format_html
import jdatetime
from .models import Show


def to_jalali(dt):
    if not dt:
        return "—"
    jdt = jdatetime.datetime.fromgregorian(datetime=dt)
    return jdt.strftime("%Y/%m/%d - %H:%M")


@admin.register(Show)
class ShowAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "slug",
        "views",
        "poster_preview",
        "video_link",
        "created_at_jalali",
        "updated_at_jalali",
    )
    search_fields = ("title", "slug", "description", "text")
    list_filter = ("created_at", "updated_at")
    readonly_fields = (
        "poster_preview",
        "video_link",
        "created_at_jalali",
        "updated_at_jalali",
    )
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-created_at",)

    fieldsets = (
        ("اطلاعات اصلی", {
            "fields": ("title", "slug", "poster", "poster_preview", "video", "video_link", "views")
        }),
        ("توضیحات", {
            "fields": ("description", "text")
        }),
        ("تاریخ‌ها", {
            "classes": ("collapse",),
            "fields": ("created_at_jalali", "updated_at_jalali")
        }),
    )

    def poster_preview(self, obj):
        if obj.poster:
            return format_html('<img src="{}" style="height:60px; border-radius:4px;" />', obj.poster.url)
        return "—"
    poster_preview.short_description = "پوستر"

    def video_link(self, obj):
        if obj.video:
            return format_html('<a href="{}" target="_blank">مشاهده ویدیو</a>', obj.video)
        return "—"
    video_link.short_description = "ویدیو"

    def created_at_jalali(self, obj):
        return to_jalali(obj.created_at)
    created_at_jalali.short_description = "تاریخ ایجاد (جلالی)"

    def updated_at_jalali(self, obj):
        return to_jalali(obj.updated_at)
    updated_at_jalali.short_description = "تاریخ بروزرسانی (جلالی)"
