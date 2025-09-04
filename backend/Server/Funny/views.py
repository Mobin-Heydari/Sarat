from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework import status

from .serializers import FunnySerializer
from .models import Funny


class FunnyViewSet(ViewSet):
    lookup_field = 'slug'

    def list(self, request, *args, **kwargs):
        """List all Funny objects ordered by views (descending)."""
        queryset = Funny.objects.order_by('-views')
        serializer = FunnySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, slug=None, *args, **kwargs):
        """Retrieve a single Funny object by slug and increment its views."""
        instance = get_object_or_404(Funny, slug=slug)
        instance.views += 1
        instance.save(update_fields=['views'])
        serializer = FunnySerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def famous_funny(self, request):
        """Return top 6 Funny objects by views."""
        queryset = Funny.objects.order_by('-views')[:6]
        serializer = FunnySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def new_funny(self, request):
        """Return latest 6 Funny objects by creation date."""
        queryset = Funny.objects.order_by('-created_at')[:6]
        serializer = FunnySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
