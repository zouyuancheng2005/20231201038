from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'comments', views.CommentViewSet)
router.register(r'comment-likes', views.CommentLikeViewSet)
router.register(r'comment-reports', views.CommentReportViewSet)

urlpatterns = [
    path('', include(router.urls)),
]