from django.contrib import admin
from django.utils.html import format_html
import jdatetime
from .models import Story, StoryVideos


# --- Helper to convert Gregorian datetime to Jalali ---
def to_jalali(dt):
    if not dt:
        return "—"
    jdt = jdatetime.datetime.fromgregorian(datetime=dt)
    return jdt.strftime("%Y/%m/%d - %H:%M")


# --- Inline admin for StoryVideos ---
class StoryVideosInline(admin.TabularInline):
    model = StoryVideos
    extra = 1
    fields = ("title", "slug", "video_link", "created_at_jalali", "updated_at_jalali")
    readonly_fields = ("video_link", "created_at_jalali", "updated_at_jalali")
    show_change_link = True

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


# --- Main Story admin ---
@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "slug",
        "views",
        "poster_preview",
        "created_at_jalali",
        "updated_at_jalali",
    )
    search_fields = ("title", "slug")
    list_filter = ("created_at", "updated_at")
    readonly_fields = ("poster_preview", "created_at_jalali", "updated_at_jalali")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-created_at",)
    inlines = [StoryVideosInline]

    fieldsets = (
        ("اطلاعات اصلی", {
            "fields": ("title", "slug", "poster", "poster_preview", "views")
        }),
        ("تاریخ‌ها", {
            "fields": ("created_at_jalali", "updated_at_jalali"),
            "classes": ("collapse",)
        }),
    )

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


# --- Standalone StoryVideos admin ---
@admin.register(StoryVideos)
class StoryVideosAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "slug",
        "story",
        "video_link",
        "created_at_jalali",
        "updated_at_jalali",
    )
    search_fields = ("title", "slug", "story__title")
    list_filter = ("created_at", "updated_at", "story")
    readonly_fields = ("video_link", "created_at_jalali", "updated_at_jalali")
    ordering = ("-created_at",)

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
