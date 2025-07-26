from django.contrib import admin
from .models import Audio



@admin.register(Audio)
class AudioAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "slug",
        "views",
        "created_at",
        "updated_at",
    )
    list_filter = (
        "created_at",
        "updated_at",
    )
    search_fields = (
        "title",
        "slug",
    )
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = (
        "views",
        "created_at",
        "updated_at",
    )
    ordering = ("-created_at",)
