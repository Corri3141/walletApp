from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager

         
class SharedHome(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name
    
class SharedExpenses(models.Model):
    name  = models.CharField(max_length=200)
    cost = models.FloatField(default = 0)
    def __str__(self):
        return self.name        
    
class CustomUser(AbstractBaseUser, PermissionsMixin):
    first_name =  models.CharField(max_length=200)
    last_name  =  models.CharField(max_length=200)
    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    savings    =  models.FloatField(blank=True,null=True)
    income     =  models.FloatField(blank=True,null=True)
    home       =  models.ForeignKey(SharedHome,related_name='users',on_delete=models.CASCADE, blank=True, null=True)
    shared_expenses=models.ForeignKey("SharedExpenses", related_name='responsables', on_delete=models.CASCADE,blank=True,null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Card(models.Model):
    name = models.CharField(max_length=50,null=True,blank=True)
    owner = models.ForeignKey("CustomUser", related_name=("cards"), on_delete=models.CASCADE)
    bank =models.CharField(null=True, blank=True, max_length=50)
    def __str__(self):
        return (self.name+" "+self.bank)
    

class Expenses(models.Model):
    name = models.CharField(max_length=200,default="Name")
    responsable = models.ForeignKey(CustomUser, related_name='expenses',on_delete=models.CASCADE,blank=True,null=True)    
    date = models.DateField()
    card = models.ForeignKey("Card", related_name="expense", on_delete=models.CASCADE,null=True,blank=True)
    cash = models.FloatField(default = 0)
    card_amount = models.FloatField(default = 0)
    def __str__(self):
        return self.name
    
    def total_cost(self):
        return (self.Interet+self.food+self.vehicle+self.taxes+self.others)
    

        

# Create your models here.
