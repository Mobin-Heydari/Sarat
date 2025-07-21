from django.urls import path

from . import views



app_name = "Cliparts"


urlpatterns = [
    path('list/', views.ClipartsListApiView.as_view()),
    path('detail/<slug:slug>/', views.ClipartDetailApiView.as_view()),
]
