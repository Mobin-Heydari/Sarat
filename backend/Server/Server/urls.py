from django.contrib import admin
from django.urls import path, include
from . import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('contacts/', include('Contacts.urls', namespace="Contacts")),
    path('cliparts/', include('Cliparts.urls', namespace="Cliparts")),
]   + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)