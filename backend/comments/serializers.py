from rest_framework import serializers
from .models import Comment, CommentLike, CommentReport

class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    like_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Comment
        fields = [
            'id', 'content', 'author', 'author_username', 'post', 'parent_comment',
            'like_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['author', 'created_at', 'updated_at']

class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content', 'post', 'parent_comment']

class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = ['id', 'comment', 'user', 'created_at']
        read_only_fields = ['user', 'created_at']

class CommentReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentReport
        fields = ['id', 'comment', 'user', 'reason', 'description', 'created_at']
        read_only_fields = ['user', 'created_at']