from django.contrib import admin
from .models import Contact


@admin.action(description='علامت‌گذاری تماس‌های انتخاب‌شده به‌صورت «خوانده شده»')
def make_read(modeladmin, request, queryset):
    queryset.update(is_readed=True)


@admin.action(description='علامت‌گذاری تماس‌های انتخاب‌شده به‌صورت «نادیده گرفته شده»')
def make_ignored(modeladmin, request, queryset):
    queryset.update(is_ignored=True)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    # Columns shown on the change list page
    list_display = (
        'id',
        'title',
        'f_name',
        'l_name',
        'phone',
        'status',
        'is_readed',
        'is_ignored',
        'created_at',
    )

    # Which fields you can filter by in the sidebar
    list_filter = (
        'status',
        'is_readed',
        'is_ignored',
        'created_at',
    )

    # Search box fields
    search_fields = (
        'title',
        'content',
        'f_name',
        'l_name',
        'phone',
    )

    # Make these fields read-only in the detail/edit view
    readonly_fields = (
        'ip_address',
        'user_agent',
        'created_at',
        'updated_at',
    )

    # Allow inline editing of status and read flag from the change list
    list_editable = (
        'status',
        'is_readed',
        'is_ignored',
    )

    # Bulk actions
    actions = (
        make_read,
        make_ignored,
    )

    # Default ordering
    ordering = ('-created_at',)

    # Pagination size
    list_per_page = 25

    # Organize fields into logical groups (Jazzmin will render these as collapsible panels)
    fieldsets = (
        ('جزئیات تماس', {
            'fields': (
                'title',
                'content',
                'attachment',
            )
        }),
        ('اطلاعات شخصی', {
            'fields': (
                'f_name',
                'l_name',
                'phone',
            )
        }),
        ('وضعیت و مدیریت', {
            'fields': (
                'status',
                'is_readed',
                'is_ignored',
            )
        }),
        ('متادیتا', {
            'classes': ('collapse',),
            'fields': (
                'ip_address',
                'user_agent',
                'created_at',
                'updated_at',
            )
        }),
    )
