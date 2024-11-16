from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serialiser import *


# Create your views here.
def home(request):
    return HttpResponse("Hello, World!")

class FavoriteStocksListView(ListAPIView):
    serializer_class = FavoriteStockModelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = FavoriteStockModel.objects.all().filter(user=self.request.user)

        return queryset
    
class FavoriteStockCreateView(ListCreateAPIView):
    serializer_class = FavoriteStockModelSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        serializer.save()
        return HttpResponse("Stock added to favorites")

    
    def get_queryset(self):
        queryset = FavoriteStockModel.objects.all().filter(user=self.request.user)
        return queryset