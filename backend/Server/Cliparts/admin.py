from django.contrib import admin
from .models import Clipart
from .forms import ClipartForm

class ClipartAdmin(admin.ModelAdmin):
    form = ClipartForm
    list_display = ("title", "slug", "views", "created_at")
    search_fields = ("title", "slug")
    list_filter = ("created_at",)

admin.site.register(Clipart, ClipartAdmin)
