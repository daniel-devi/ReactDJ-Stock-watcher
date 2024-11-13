from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    ordering = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    filter_horizontal = ()
    fieldsets = ()

admin.site.register(User, UserAdmin)