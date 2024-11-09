from .models import FavoriteStockModel, SharedStockList
from rest_framework import serializers

# Create your serializers here.

class FavoriteStockModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteStockModel
        fields = '__all__'

class SharedStockListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedStockList
        fields = '__all__'