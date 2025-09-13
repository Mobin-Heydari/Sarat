from django.urls import include, path
from .routers import ShowRouter


app_name = "Lives"


urlpatterns = [
    path('shows/', include(ShowRouter().urls)),
]
