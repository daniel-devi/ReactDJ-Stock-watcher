from django.urls import path
from .views import*

urlpatterns = [
    path("", home, name="home"),
    path("favorite-stocks", FavoriteStocksListView.as_view(), name='favorite-stocks'),
    path("favorite-stocks/create", FavoriteStockCreateView.as_view(), name='favorite-stocks-create'),
    path("favorite-stocks/delete/<uuid:uuid>/", FavoriteStockDeleteView.as_view(), name='favorite-stocks-delete'),

]
