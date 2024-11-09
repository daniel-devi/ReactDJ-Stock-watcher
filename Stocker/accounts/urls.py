from django.urls import path
from .views import * # Import all views from views.py

urlpatterns = [
    # User Registration Endpoint
    path('register/', RegisterAPIView.as_view(), name='register'),

    # URL to Get Username
    path('user', UserListView.as_view(), name='user'),

    # URL to Get User detail view
    path('detail', UserDetailView.as_view(), name='user-detail'),
]

