from django.shortcuts import get_object_or_404

from rest_framework.views import Response, APIView
from rest_framework import status

from .models import Clipart
from .serializers import ClipartSerializer





class ClipartsListApiView(APIView):

    def get(self, request):
        queryset = Clipart.objects.all()
        serializer = ClipartSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ClipartDetailApiView(APIView):

    def get(self, request, slug):
        query = get_object_or_404(Clipart, slug=slug)
        query.views = query.views + 1
        query.save()
        serializer = ClipartSerializer(query)
        return Response(serializer.data, status=status.HTTP_200_OK)
