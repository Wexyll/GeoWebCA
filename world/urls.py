from django.urls import path
from .views import *

urlpatterns = [
    path('home/', home, name='home'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('register/', user_register, name='register'),

    path('update_location/', update_location, name="update_location"),
    path('', world, name='world'),
]