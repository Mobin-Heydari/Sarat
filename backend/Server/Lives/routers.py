from django.urls import path, include
from rest_framework import routers
from . import views


class ShowRouter(routers.DefaultRouter):
    def __init__(self, *args, **kwargs):
        super().__init__()
        self.register(r'', views.ShowViewSet, basename='shows')

    def get_urls(self):
        custom_urls = [
            path('', include([
                path('', views.ShowViewSet.as_view({'get': 'list'})),
                path('famous-shows/', views.ShowViewSet.as_view({'get': 'famous_shows'})),
                path('new-shows/', views.ShowViewSet.as_view({'get': 'new_shows'})),
                path('detail/<slug:slug>/', views.ShowViewSet.as_view({'get': 'retrieve'})),
            ]))
        ]
        return custom_urls
