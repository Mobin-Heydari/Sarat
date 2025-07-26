from django.shortcuts import get_object_or_404

from rest_framework.views import Response, APIView
from rest_framework import status

from .models import Audio
from .serializers import AudioSerializer





class AudiosListApiView(APIView):

    def get(self, request):
        queryset = Audio.objects.all()
        serializer = AudioSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AudioDetailApiView(APIView):

    def get(self, request, slug):
        query = get_object_or_404(Audio, slug=slug)
        query.views = query.views + 1
        query.save()
        serializer = AudioSerializer(query)
        return Response(serializer.data, status=status.HTTP_200_OK)
