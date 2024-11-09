from django.shortcuts import render
from .serialiser import UserModelSerializer
from .models import User
from rest_framework import filters
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Create your views here.

class RegisterAPIView(CreateAPIView):
    '''
    This API View is used to register a new user.
    It uses the UserModelSerializer to serialize the data.
    '''
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = []

    serializer_class = UserModelSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['username', 'email']
    ordering_fields = ['username', 'date_joined']

    def get_queryset(self):
        queryset = User.objects.all()



class UserListView(ListAPIView):
    serializer_class = UserModelSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['username', 'email']
    ordering_fields = ['username', 'date_joined']

    def get_queryset(self):
        queryset = User.objects.all()
        
        # Retrieve query parameters
        email = self.request.query_params.get('email')
        
        # Apply filters if the parameters are provided
        if email:
            queryset = queryset.filter(email=email)
        return queryset
    

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # The user is available through the request.user attribute
        user = request.user
        serializer = UserModelSerializer(user)
        return Response(serializer.data)