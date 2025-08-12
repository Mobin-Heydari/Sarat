from django.urls import path, include

from .routers import ClipartRouter


app_name = "Cliparts"

router = ClipartRouter()

urlpatterns = [
    path('', include(router.get_urls())),
]