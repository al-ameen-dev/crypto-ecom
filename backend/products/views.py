from rest_framework.views import APIView
from .models import Product, CartItem, UserInfo, PurchasedProduct
from .serializers import ProductSerializer, CartSerializer, UserInfoSerializer, PurchasedProductSerializer
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

#This view is used to add, get and delete the cart item for the authenticated user based on the request
class UserCart(APIView):
	permission_classes = [IsAuthenticated]	
	
	def get(self,request, format = None):
		cartdata = CartItem.objects.filter(user=request.user.pk)
		serializer = CartSerializer(cartdata, many=True)
		
		return Response(serializer.data)
	
	def post(self, request, format=None):
		request.data['user'] = request.user.pk
		pname = request.data["name"]
		try:
			item = CartItem.objects.get(name=pname,checked_out=False)
			return Response({"message":"Already added to the cart"},status=status.HTTP_200_OK)
		except CartItem.DoesNotExist:
			serializer = CartSerializer(data=request.data)
			if serializer.is_valid():
				serializer.save(user=request.user)
				return Response({"message":"Successfully added to the cart"},status=status.HTTP_201_CREATED)
			return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
		item = CartItem.objects.get(pk=pk)
		item.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

#this class based view is used to retrieve, create and update the userprofile
class Userprofile(APIView):
	permission_classes = [IsAuthenticated]
	
	def get(self, request, format=None):
		try:
			info = UserInfo.objects.get(user=request.user.pk)
			serializer = UserInfoSerializer(info)
			print('already existed')
			res = {'user':serializer.data,'flag':1}
			return Response(res)
		except UserInfo.DoesNotExist:
			return Response({"message":"Please provide the information below","flag":0},status=status.HTTP_201_CREATED)
	def post(self, request, format=None):
		request.data['user'] = request.user.pk
		serializer = UserInfoSerializer(data=request.data)

		if serializer.is_valid():
			serializer.save(user=request.user)
			return Response({"message":"Successfully added user data","flag":1},status=status.HTTP_201_CREATED)
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
	def put(self, request, format=None):
		info = UserInfo.objects.get(user=request.user.pk)
		serializer = UserInfoSerializer(info,data=request.data)
		
		if serializer.is_valid():
			serializer.save()
			return Response({"message":"Successfully updated user data"},status=status.HTTP_201_CREATED)
			
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)	

class PurchaseHistory(APIView):
	permission_classes = [IsAuthenticated]
	def get(self, request, format=None):
		pitems = PurchasedProduct.objects.filter(user=request.user.pk)
		serializer = PurchasedProductSerializer(pitems,many=True)
		return Response(serializer.data)
		
class Purchase(APIView):
	permission_classes = [IsAuthenticated]
	def get(self, request, format=None):
		cartdata = CartItem.objects.filter(user=request.user.pk)
		for item in cartdata:
			purchaseItem = PurchasedProduct.objects.create(user=request.user,name=item.name,price=item.price,imgurl=item.imgurl)
			purchaseItem.save()
			item.delete()
		
		return Response({"message":"success"},status=status.HTTP_200_OK)
		
			
		
	'''def post(self, request, format=None):
		request.data['user'] = request.user.pk
		
		serializer = PurchasedProductSerializer(data=request.data)'''		