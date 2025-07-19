from django.urls import path

from . import views


app_name = "Contacts"


urlpatterns = [
    path('create/', views.CreateContact.as_view())
]