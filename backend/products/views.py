from rest_framework.views import APIView
from .models import Product, CartItem
from .serializers import ProductSerializer, CartSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from django.contrib.auth import get_user_model
Users = get_user_model()

#this class based view return all the products from the databases
class ProductList(APIView):
	def get(self, request, format=None):
		products = Product.objects.all()
		serializer = ProductSerializer(products, many=True)
		
		return Response(serializer.data)

#this class based view return only the product category which was passed as a parameter in url
class ProductCategory(APIView):
	def get(self, request, category, format=None):
		products = Product.objects.filter(category=category)
		serializer = ProductSerializer(products, many=True)
		
		return Response(serializer.data)
        
#this class based view return the products by the category and price passed as a parameter in url
class ProductCategoryPrice(APIView):
	def get(self, request, category, price, format=None):
		products = Product.objects.filter(category=category).filter(price__lt=price)
		serializer = ProductSerializer(products, many=True)
		
		return Response(serializer.data)
	
#this class based view return the products based on the text inside search box value passed in as a url parameter
class ProductSearch(APIView):
	def get(self, request, category, searchtext, format=None):
		query = "SELECT * FROM products_product WHERE category=%s AND name LIKE %s"
		search_pattern = '%'+searchtext+'%'
		products = Product.objects.raw(query,[category, search_pattern])
		serializer = ProductSerializer(products, many=True)
		
		return Response(serializer.data)

class AddToCart(APIView):
	permission_classes = [IsAuthenticated]	
	
	def post(self, request, format=None):
		request.data['user'] = request.user.pk
		
		pname = request.data["name"]
		try:
			item = CartItem.objects.get(name=pname)
			return Response({"message":"Already added to the cart"},status=status.HTTP_200_OK)
		except CartItem.DoesNotExist:
			serializer = CartSerializer(data=request.data)
			if serializer.is_valid():
				serializer.save(user=request.user)
				return Response(serializer.data,status=status.HTTP_201_CREATED)
			return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
		

