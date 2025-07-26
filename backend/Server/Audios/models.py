from django.db import models
from ckeditor.fields import RichTextField



class Audio(models.Model):
    title = models.CharField(verbose_name="عنوان", max_length=250)
    slug = models.CharField(verbose_name="اسلاگ", max_length=250, unique=True, primary_key=True)
    description = models.TextField(verbose_name="توضیحات")

    poster = models.ImageField(verbose_name="پوستر", upload_to="audios/posters/")
    music = models.FileField(verbose_name="صوت", upload_to="audios/musics/")

    text = RichTextField(verbose_name="متن صوت")

    views = models.IntegerField(default=0)

    created_at = models.DateTimeField(verbose_name="تاریخ ایجاد", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="تاریخ بهروزرسانی", auto_now=True)

    class Meta:
        verbose_name = "صوت"
        verbose_name_plural = "صوت ها"

    
    def __str__(self):
        return self.title