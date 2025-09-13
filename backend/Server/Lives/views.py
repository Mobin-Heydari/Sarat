from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework import status

from .models import Show
from .serializers import ShowSerializer


class ShowViewSet(ViewSet):
    lookup_field = 'slug'

    def list(self, request, *args, **kwargs):
        queryset = Show.objects.order_by('-views')
        serializer = ShowSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, slug=None, *args, **kwargs):
        instance = get_object_or_404(Show, slug=slug)
        instance.views += 1
        instance.save(update_fields=['views'])
        serializer = ShowSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def famous_shows(self, request):
        queryset = Show.objects.order_by('-views')[:6]
        serializer = ShowSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def new_shows(self, request):
        queryset = Show.objects.order_by('-created_at')[:6]
        serializer = ShowSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
