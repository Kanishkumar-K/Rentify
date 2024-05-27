from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique = True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def profile(self):
        profile = Profile.objects.get(user=self)

class Property(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    address = models.CharField(max_length=255)
    num_bedrooms = models.IntegerField()  
    num_bathrooms = models.IntegerField()  
    nearby = models.CharField(max_length=255, default='')  
    price = models.DecimalField(max_digits=10, decimal_places=2)
    owner_name = models.CharField(max_length=100)
    owner_phone = models.CharField(max_length=15)
    image = models.ImageField(upload_to='property_images/')
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    bio = models.CharField(max_length=1000)
    verified = models.BooleanField(default = False)


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)


