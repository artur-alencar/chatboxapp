from django.urls import path
from usuarios.views import index, register, login, logout, edit_username, edit_about, edit_photo
urlpatterns = [
    path('', index, name='index'),
    path('register', register, name='register'),
    path('login', login, name='login'),
    path('logout', logout, name='logout'),
    path('edit_username', edit_username, name='edit_username'),
    path('edit_about', edit_about, name='edit_about'),
    path('edit_photo', edit_photo, name='edit_photo'),
]