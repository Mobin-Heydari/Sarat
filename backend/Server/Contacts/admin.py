from django.contrib import admin
from django.utils.html import format_html
import jdatetime
from .models import Contact


def to_jalali(dt):
    if not dt:
        return "—"
    jdt = jdatetime.datetime.fromgregorian(datetime=dt)
    return jdt.strftime("%Y/%m/%d - %H:%M")


@admin.action(description='علامت‌گذاری تماس‌های انتخاب‌شده به‌صورت «خوانده شده»')
def make_read(modeladmin, request, queryset):
    queryset.update(is_readed=True)


@admin.action(description='علامت‌گذاری تماس‌های انتخاب‌شده به‌صورت «نادیده گرفته شده»')
def make_ignored(modeladmin, request, queryset):
    queryset.update(is_ignored=True)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'f_name',
        'l_name',
        'phone',
        'status',
        'is_readed',
        'is_ignored',
        'attachment_link',
        'created_at_jalali',
        'updated_at_jalali',
    )
    list_filter = ('status', 'is_readed', 'is_ignored', 'created_at')
    search_fields = ('title', 'content', 'f_name', 'l_name', 'phone')
    readonly_fields = (
        'ip_address',
        'user_agent',
        'attachment_link',
        'created_at_jalali',
        'updated_at_jalali',
    )
    list_editable = ('status', 'is_readed', 'is_ignored')
    actions = (make_read, make_ignored)
    ordering = ('-created_at',)
    list_per_page = 25

    fieldsets = (
        ('جزئیات تماس', {
            'fields': (
                'title',
                'content',
                'attachment_link',
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
                'created_at_jalali',
                'updated_at_jalali',
            )
        }),
    )

    # --- Custom Display Methods ---
    def created_at_jalali(self, obj):
        return to_jalali(obj.created_at)
    created_at_jalali.short_description = "تاریخ ایجاد (جلالی)"

    def updated_at_jalali(self, obj):
        return to_jalali(obj.updated_at)
    updated_at_jalali.short_description = "تاریخ بروزرسانی (جلالی)"

    def attachment_link(self, obj):
        if obj.attachment:
            return format_html('<a href="{}" target="_blank">دانلود فایل</a>', obj.attachment.url)
        return "—"
    attachment_link.short_description = "پیوست"
