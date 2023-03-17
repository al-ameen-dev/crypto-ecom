from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    imgurl = models.CharField(max_length=400)
    product_description = models.TextField()
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.name