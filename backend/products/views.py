from rest_framework.views import APIView
from .models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response


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
