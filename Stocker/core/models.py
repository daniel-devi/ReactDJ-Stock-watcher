from django.db import models
from accounts.models import User
import uuid

# Create your models here.

class FavoriteStockModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=10, unique=True,)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-date_created']
    

class SharedStockList(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_stock_lists')
    name = models.CharField(max_length=100)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    stocks = models.ManyToManyField(FavoriteStockModel)
    shared_with = models.ManyToManyField(User, related_name='shared_stock_lists')
    shared_at = models.DateTimeField(auto_now_add=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Shared List by {self.owner.username}"
