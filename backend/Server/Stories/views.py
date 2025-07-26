from django.shortcuts import get_object_or_404

from rest_framework.views import Response, APIView
from rest_framework import status

from .models import Story
from .serializers import StorySerializer





class StoriesListApiView(APIView):

    def get(self, request):
        queryset = Story.objects.all()
        serializer = StorySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class StoryDetailApiView(APIView):

    def get(self, request, slug):
        query = get_object_or_404(Story, slug=slug)
        query.views = query.views + 1
        query.save()
        serializer = StorySerializer(query)
        return Response(serializer.data, status=status.HTTP_200_OK)
