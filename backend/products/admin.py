from django.contrib import admin
from .models import Product, CartItem, UserInfo, PurchasedProduct
# Register your models here.

admin.site.register(Product)
admin.site.register(CartItem)
admin.site.register(UserInfo)
admin.site.register(PurchasedProduct)
admin.site.site_header = "Blocktopia Admin"