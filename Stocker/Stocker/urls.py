"""
URL configuration for Stocker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    # Admin Panel URL Endpoint
    path('admin/', admin.site.urls),

    # Core App URL Endpoint
    path('api/', include('core.urls')),

    # Account App URL Endpoint
    path('account/', include('accounts.urls')),

    # Login Endpoint
    path('login/', TokenObtainPairView.as_view(), name='login'),

    # JWT Token Refresh Endpoint
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # JWT Token Endpoint
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
