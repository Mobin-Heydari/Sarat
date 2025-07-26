from django.db import models





class Story(models.Model):
    
    title = models.CharField(verbose_name="عنوان", max_length=250)
    slug = models.SlugField(verbose_name="اسلاگ", max_length=250, unique=True, primary_key=True)

    poster = models.ImageField(verbose_name="پوستر", upload_to="stories/posters")

    views = models.IntegerField(default=0)

    created_at = models.DateTimeField(verbose_name="تاریخ ایجاد", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="تاریخ بهروزرسانی", auto_now=True)

    class Meta:
        verbose_name = "استوری"
        verbose_name_plural = "استوری ها"

    def str(self):
        return self.title
    



class StoryVideos(models.Model):

    story = models.ForeignKey(
        Story,
        on_delete=models.CASCADE,
        related_name="videos",
        verbose_name="استوری"
    )

    title = models.CharField(verbose_name="عنوان", max_length=250)
    slug = models.SlugField(verbose_name="اسلاگ", max_length=250, unique=True, primary_key=True)

    video = models.URLField(verbose_name="آدرس ویدیو")

    created_at = models.DateTimeField(verbose_name="تاریخ ایجاد", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="تاریخ بهروزرسانی", auto_now=True)

    class Meta:
        verbose_name = "ویدیو"
        verbose_name_plural = "ویدیو های استوری"
    

    def str(self):
        return self.title