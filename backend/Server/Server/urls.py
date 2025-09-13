from django.contrib import admin
from django.urls import path, include
from . import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('contacts/', include('Contacts.urls', namespace="Contacts")),
    path('cliparts/', include('Cliparts.urls', namespace="Cliparts")),
    path('stories/', include('Stories.urls', namespace="Stories")),
    path('audios/', include('Audios.urls', namespace="Audios")),
    path('funny/', include('Funny.urls', namespace="Funny")),
    path('lives/', include('Lives.urls', namespace="Lives")),
]   + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)