from django.contrib import admin
from django.urls import path, include
from . import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('api/v1/contacts/', include('Contacts.urls', namespace="Contacts")),
    path('api/v1/cliparts/', include('Cliparts.urls', namespace="Cliparts")),
    path('api/v1/stories/', include('Stories.urls', namespace="Stories")),
    path('api/v1/audios/', include('Audios.urls', namespace="Audios")),
    path('api/v1/funny/', include('Funny.urls', namespace="Funny")),
    path('api/v1/lives/', include('Lives.urls', namespace="Lives")),
]   + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)