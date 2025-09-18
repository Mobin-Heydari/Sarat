from django.db import models
from ckeditor.fields import RichTextField




class Funny(models.Model):
    title = models.CharField(verbose_name="عنوان", max_length=250)
    slug = models.CharField(verbose_name="اسلاگ", max_length=250, unique=True, primary_key=True)
    description = models.TextField(verbose_name="توضیحات")

    poster = models.ImageField(verbose_name="پوستر", upload_to="funny/posters/")
    video = models.URLField(verbose_name="آدرس ویدیو")

    text = RichTextField(verbose_name="متن نماهنگ")

    views = models.IntegerField(default=0)

    created_at = models.DateTimeField(verbose_name="تاریخ ایجاد", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="تاریخ بهروزرسانی", auto_now=True)

    class Meta:
        verbose_name = "بامزه"
        verbose_name_plural = "بامزه ها"

    
    def __str__(self):
        return self.title
    

class FunnyContent(models.Model):

    funny =  models.ForeignKey(
        Funny,
        on_delete=models.CASCADE,
        verbose_name="بامزه",
        related_name="content"
    )

    title = models.CharField(verbose_name="عنوان", max_length=250, null=True, blank=True)

    image = models.ImageField(verbose_name="تصویر", upload_to="funny/content/image/", null=True, blank=True)
    video = models.URLField(verbose_name="آدرس ویدیو", null=True, blank=True)

    content = models.TextField(verbose_name="متن نماهنگ", null=True, blank=True)

    created_at = models.DateTimeField(verbose_name="تاریخ ایجاد", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="تاریخ بهروزرسانی", auto_now=True)


    def __str__(self):
        return self.funny.title
    
    class Meta:
        verbose_name = "محتوا"
        verbose_name_plural = "محتوا ها"