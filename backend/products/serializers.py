from rest_framework import serializers
from .models import Product,CartItem
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