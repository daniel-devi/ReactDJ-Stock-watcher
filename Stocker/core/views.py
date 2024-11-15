from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.generics import ListAPIView
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
    
