from django.urls import path
from .views import ProductList, ProductCategory, ProductCategoryPrice, ProductSearch, UserCart

app_name = "products"

urlpatterns = [
    path('all',ProductList.as_view(),name='products'),
    path('cart',UserCart.as_view(),name='addcart'),
    path('cart/delete/<int:pk>',UserCart.as_view(),name='item-delete'),
    path('<str:category>',ProductCategory.as_view(),name='product_category'),
    path('<str:category>/<int:price>',ProductCategoryPrice.as_view(),name='product_category_price'),
    path('<str:category>/<str:searchtext>',ProductSearch.as_view(),name='product_search'),
]