from django.contrib import admin
from .models import *

# Register your models here.

class FavoriteStockAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'code', 'date_created')
    list_filter = ('user', 'date_created')
    search_fields = ('user', 'name')
    ordering = ('-date_created',)

admin.site.register(FavoriteStockModel, FavoriteStockAdmin)

class SharedStockListAdmin(admin.ModelAdmin):
    list_display = ('owner', 'name', 'uuid', 'shared_at', 'date_created')
    list_filter = ('owner', 'shared_at', 'date_created')
    search_fields = ('owner', 'name', 'uuid')
    ordering = ('-date_created',)

admin.site.register(SharedStockList, SharedStockListAdmin)