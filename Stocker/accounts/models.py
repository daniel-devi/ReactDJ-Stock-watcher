from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4

# Create your models here.

#? User model - Abstracted from Django's default User model
def generate_username():
    '''
    Generate a unique username for a new user.
    '''
    uuid = str(uuid4())
    return f"User_{uuid}"

class User(AbstractUser):
    '''
    User model for the application.
    Attributes:
    - username: unique username for the user
    - email: unique email for the user
    '''
    username = models.CharField(max_length=100, unique=True, default=generate_username, null=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        '''
        Save the user to the database.
            - Call the parent class's save method to save the user to the database.
        '''
        if self.username is None or self.username == "" or self.username == '""':
            self.username = generate_username()

        super().save(*args, **kwargs)