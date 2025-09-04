from django.urls import path, include

from .routers import FunnyRouter


app_name = "Funny"

router = FunnyRouter()

urlpatterns = [
    path('', include(router.get_urls())),
]