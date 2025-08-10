from django.urls import path, include

from .routers import AudioRouter


app_name = "Audios"

audios_router = AudioRouter()

urlpatterns = [
    path('', include(audios_router.get_urls())),
]