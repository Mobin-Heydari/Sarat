from django.contrib import admin
from .models import Story, StoryVideos


class StoryVideosInline(admin.TabularInline):
    model = StoryVideos
    extra = 1
    fields = ("title", "slug", "video", "created_at", "updated_at")
    readonly_fields = ("created_at", "updated_at")


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "views", "created_at", "updated_at")
    list_filter = ("created_at", "updated_at")
    search_fields = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("views", "created_at", "updated_at")
    inlines = [StoryVideosInline]
    ordering = ("-created_at",)


@admin.register(StoryVideos)
class StoryVideosAdmin(admin.ModelAdmin):
    list_display = ("story", "title", "slug", "created_at", "updated_at")
    list_filter = ("created_at",)
    search_fields = ("story__title", "title", "slug")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)
