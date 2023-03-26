from django.urls import path
from .views import ProductList, ProductCategory, ProductCategoryPrice, ProductSearch, AddToCart

app_name = "products"

urlpatterns = [
    path('all',ProductList.as_view(),name='products'),
    path('addtocart',AddToCart.as_view(),name='addcart'),
    path('<str:category>',ProductCategory.as_view(),name='product_category'),
    path('<str:category>/<int:price>',ProductCategoryPrice.as_view(),name='product_category_price'),
    path('<str:category>/<str:searchtext>',ProductSearch.as_view(),name='product_search'),
]