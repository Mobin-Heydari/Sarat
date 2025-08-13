from django.shortcuts import get_object_or_404

from rest_framework.views import Response
from rest_framework.viewsets import ViewSet
from rest_framework import status

from .serializers import AudioSerializer
from .models import Audio



class AudioViewSet(ViewSet):
    lookup_field = 'slug'

    def list(self, request, *args, **kwargs):
        instance = Audio.objects.order_by('-views')
        serializer = AudioSerializer(instance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, slug, *args, **kwargs):
        instance = get_object_or_404(Audio, slug=slug)
        instance.views += 1
        instance.save()
        serializer = AudioSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def famous_audios(self, request):
        queryset = Audio.objects.order_by('-views')[:6]
        serializer = AudioSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def new_audios(self, request):
        queryset = Audio.objects.order_by('-published_date')[:6]
        serializer = AudioSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)