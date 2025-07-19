from rest_framework.views import Response, APIView
from rest_framework import status

from .serializers import ContactSerializer



class CreateContact(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Note: Corrected "Massage" to "Message" in the responses.
            return Response({'Message': 'Contact created.'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)