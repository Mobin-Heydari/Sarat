from django.shortcuts import get_object_or_404

from rest_framework.views import Response
from rest_framework.viewsets import ViewSet
from rest_framework import status

from .serializers import ClipartSerializer
from .models import Clipart



class ClipartViewSet(ViewSet):
    lookup_field = 'slug'

    def list(self, request, *args, **kwargs):
        instance = Clipart.objects.order_by('-created_at')
        serializer = ClipartSerializer(instance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, slug, *args, **kwargs):
        instance = get_object_or_404(Clipart, slug=slug)
        instance.views += 1
        instance.save()
        serializer = ClipartSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def famous_cliparts(self, request):
        queryset = Clipart.objects.order_by('-views')[:6]
        serializer = ClipartSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def new_cliparts(self, request):
        queryset = Clipart.objects.order_by('-published_date')[:6]
        serializer = ClipartSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)