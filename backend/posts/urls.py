from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'post-images', views.PostImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]