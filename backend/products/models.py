from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
User = get_user_model()


class UserAddress(models.Model):
	 user = models.ForeignKey(User, on_delete=models.CASCADE)
class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    imgurl = models.CharField(max_length=400)
    product_description = models.TextField()
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.name
class PurchasedProduct(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	name = models.CharField(max_length=100)
	price = models.IntegerField()
	imgurl = models.CharField(max_length=400)
	#purchased_at = models.DateTimeField(auto_now_add=True, format="%A, %d %B %Y %H:%M:%S")	
	purchased_at =  models.CharField(max_length=50, default=timezone.now().strftime("%A, %d %B %Y %H:%M:%S"))
	def __str__(self):
		return self.name+' user '+self.user.first_name+' '+self.user.last_name
		
class CartItem(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	name = models.CharField(max_length=100)
	price = models.IntegerField()
	imgurl = models.CharField(max_length=400)
	product_description = models.TextField()
	checked_out = models.BooleanField(default=False)
	
	def __str__(self):
		return self.user.first_name +' '+self.user.last_name +' cart item ' + self.name

class UserInfo(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	address = models.TextField(default=None)
	pincode = models.IntegerField(default=None)
	city = models.CharField(max_length=100,default=None)
	state = models.CharField(max_length=100,default=None)
	
	def __str__(self):
		return self.user.first_name+' '+self.user.last_name+' profile'
		

	