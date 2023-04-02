from rest_framework import serializers
from .models import Product,CartItem, UserInfo, PurchasedProduct
from users.serializers import UserSerializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
	#user = UserSerializer()
	
	class Meta:
		model = CartItem
		fields = '__all__'
		
class UserInfoSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = UserInfo
		fields = '__all__'
		
class PurchasedProductSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = PurchasedProduct
		fields = '__all__'