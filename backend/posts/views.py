from rest_framework import viewsets, permissions
from .models import Post, PostImage
from .serializers import PostSerializer, PostImageSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class PostImageViewSet(viewsets.ModelViewSet):
    queryset = PostImage.objects.all()
    serializer_class = PostImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]