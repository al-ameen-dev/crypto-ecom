from django.contrib import admin
from .models import Product, CartItem, UserInfo
# Register your models here.

admin.site.register(Product)
admin.site.register(CartItem)
admin.site.register(UserInfo)