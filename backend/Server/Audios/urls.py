from django.urls import path

from . import views



app_name = "Audios"


urlpatterns = [
    path('list/', views.AudiosListApiView.as_view()),
    path('detail/<slug:slug>/', views.AudioDetailApiView.as_view()),
]
