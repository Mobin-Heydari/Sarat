from django.urls import path

from . import views



app_name = "Stories"


urlpatterns = [
    path('list/', views.StoriesListApiView.as_view()),
    path('detail/<slug:slug>/', views.StoryDetailApiView.as_view()),
]
