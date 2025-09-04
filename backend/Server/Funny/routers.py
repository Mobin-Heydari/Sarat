from django.urls import path, include

from rest_framework import routers

from . import views




class FunnyRouter(routers.DefaultRouter):
    def __init__(self, *args, **kwargs):
        super().__init__()
        self.register(r'', views.FunnyViewSet, basename='funny')

    

    def get_urls(self):
        custom_urls = [
            path('', include([
                path('', views.FunnyViewSet.as_view({'get': 'list'})),
                path('famous-funny/', views.FunnyViewSet.as_view({'get': 'famous_funny'})),
                path('new-funny/', views.FunnyViewSet.as_view({'get': 'new_funny'})),
                path('detail/<slug:slug>/', views.FunnyViewSet.as_view({'get': 'retrieve'})),
            ]))
        ]

        return custom_urls