from django.urls import path
from .views import ProductList, ProductCategory, ProductCategoryPrice, ProductSearch, UserCart, Userprofile, Purchase, PurchaseHistory

app_name = "products"

urlpatterns = [
    path('all',ProductList.as_view(),name='products'),
    path('cart',UserCart.as_view(),name='addcart'),
    path('cart/delete/<int:pk>',UserCart.as_view(),name='item_delete'),
    path('userinfo',Userprofile.as_view(),name='user_profile'),
    path('purchase',Purchase.as_view(),name='purchase'),
    path('purchsehistory',PurchaseHistory.as_view(),name='purchase_history'),
    path('<str:category>',ProductCategory.as_view(),name='product_category'),
    path('<str:category>/<int:price>',ProductCategoryPrice.as_view(),name='product_category_price'),
    path('<str:category>/<str:searchtext>',ProductSearch.as_view(),name='product_search'),
]