from django.db import models
from ckeditor.fields import RichTextField



class Clipart(models.Model):
    title = models.CharField(verbose_name="عنوان", max_length=250)
    slug = models.CharField(verbose_name="اسلاگ", max_length=250, unique=True, primary_key=True)
    description = models.TextField(verbose_name="توضیحات")

    poster = models.ImageField(verbose_name="پوستر", upload_to="cliparts/posters/")
    video = models.URLField(verbose_name="آدرس ویدیو")
    music = models.FileField(verbose_name="صوت", upload_to="cliparts/musics/")

    text = RichTextField(verbose_name="متن نماهنگ")

    views = models.IntegerField(default=0)

    created_at = models.DateTimeField(verbose_name="تاریخ ایجاد", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="تاریخ بهروزرسانی", auto_now=True)

    class Meta:
        verbose_name = "نماهنگ"
        verbose_name_plural = "نماهنگ ها"

    
    def __str__(self):
        return self.title