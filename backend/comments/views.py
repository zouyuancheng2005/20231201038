from rest_framework import viewsets, permissions
from .models import Comment, CommentLike, CommentReport
from .serializers import CommentSerializer, CommentLikeSerializer, CommentReportSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CommentLikeViewSet(viewsets.ModelViewSet):
    queryset = CommentLike.objects.all()
    serializer_class = CommentLikeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CommentReportViewSet(viewsets.ModelViewSet):
    queryset = CommentReport.objects.all()
    serializer_class = CommentReportSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]