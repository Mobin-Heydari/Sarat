from django.urls import path, include

from rest_framework import routers

from . import views




class ClipartRouter(routers.DefaultRouter):
    def __init__(self, *args, **kwargs):
        super().__init__()
        self.register(r'', views.ClipartViewSet, basename='cliparts')

    

    def get_urls(self):
        custom_urls = [
            path('', include([
                path('', views.ClipartViewSet.as_view({'get': 'list'})),
                path('famous-cliparts/', views.ClipartViewSet.as_view({'get': 'famous_cliparts'})),
                path('new-cliparts/', views.ClipartViewSet.as_view({'get': 'new_cliparts'})),
                path('detail/<slug:slug>/', views.ClipartViewSet.as_view({'get': 'retrieve'})),
            ]))
        ]

        return custom_urls