from django.db import models



class Contact(models.Model):
    class ContactStatusChoices(models.TextChoices):
        NEW = 'N', 'جدید'
        IN_PROGRESS = 'I', 'در حال بررسی'
        COMPLETED = 'C', 'بررسی شده'
        ARCHIVED = 'A', 'بایگانی شده'

    title = models.CharField(
        max_length=255,
        verbose_name='عنوان'
    )
    content = models.TextField(
        verbose_name='محتوا'
    )
    f_name = models.CharField(
        max_length=255,
        verbose_name='نام'
    )
    l_name = models.CharField(
        max_length=255,
        verbose_name='نام خانوادگی'
    )
    phone = models.CharField(
        max_length=255,
        blank=True,
        verbose_name='تلفن'
    )
    email = models.EmailField(
        verbose_name='ایمیل'
    )
    linkedin_id = models.CharField(
        max_length=255,
        blank=True,
        verbose_name='شناسه لینکدین'
    )

    status = models.CharField(
        max_length=3,
        choices=ContactStatusChoices.choices,
        default=ContactStatusChoices.NEW,
        verbose_name='وضعیت',
        help_text='وضعیت فعلی درخواست تماس.'
    )

    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        verbose_name='آدرس IP',
        help_text='آدرس IP بازدیدکننده برای امنیت یا تحلیل.'
    )

    user_agent = models.CharField(
        max_length=512,
        blank=True,
        null=True,
        verbose_name='عامل کاربر',
        help_text='عامل کاربر مرورگر برای اطلاعات دستگاه.'
    )

    attachment = models.FileField(
        upload_to='contact_attachments/',
        blank=True,
        null=True,
        verbose_name='فایل پیوست',
        help_text='ضمیمه فایل اختیاری مانند رزومه یا نمونه‌کار.'
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='زمان ایجاد'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='زمان به‌روزرسانی'
    )

    is_ignored = models.BooleanField(
        default=True,
        verbose_name='نادیده گرفته شده'
    )
    is_readed = models.BooleanField(
        default=False,
        verbose_name='خوانده شده'
    )

    class Meta:
        verbose_name = 'تماس'
        verbose_name_plural = 'تماس‌ها'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.f_name} {self.l_name}"
