from django.urls import path, include

from rest_framework import routers

from . import views




class AudioRouter(routers.DefaultRouter):
    def __init__(self, *args, **kwargs):
        super().__init__()
        self.register(r'', views.AudioViewSet, basename='audios')

    

    def get_urls(self):
        custom_urls = [
            path('', include([
                path('', views.AudioViewSet.as_view({'get': 'list'})),
                path('famous-audios/', views.AudioViewSet.as_view({'get': 'famous_audios'})),
                path('new-audios/', views.AudioViewSet.as_view({'get': 'new_audios'})),
                path('detail/<slug:slug>/', views.AudioViewSet.as_view({'get': 'retrieve'})),
            ]))
        ]

        return custom_urls