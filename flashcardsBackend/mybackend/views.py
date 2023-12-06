from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Word
from .serializers import WordSerializer

# Create your views here.


class WordViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all()
    serializer_class = WordSerializer

    action_serializers = {
        'list': WordSerializer,
        'retrieve': WordSerializer,
        'create': WordSerializer,
        'update': WordSerializer,
        'partial_update': WordSerializer,
        'destroy': WordSerializer,
    }

    def get_serializer_class(self):
        return self.action_serializers.get(self.action, WordSerializer)

    def create(self, request, *args, **kwargs):
        # Dodatkowa obsługa operacji tworzenia (dodawania nowego słowa)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)