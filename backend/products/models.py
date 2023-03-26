from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    imgurl = models.CharField(max_length=400)
    product_description = models.TextField()
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.name
        
class CartItem(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	name = models.CharField(max_length=100)
	price = models.IntegerField()
	imgurl = models.CharField(max_length=400)
	product_description = models.TextField()
	checked_out = models.BooleanField(default=False)
	
	def __str__(self):
		return self.user.first_name +' '+self.user.last_name +' cart item ' + self.name