from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

#? User model - Abstracted from Django's default User model
class User(AbstractUser):
    '''
    User model for the application.
    Attributes:
    - username: unique username for the user
    - email: unique email for the user
    '''
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
