from rest_framework import serializers
from .models import Post, PostImage, PostLike, PostCollect, PostReport

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'post', 'image', 'uploaded_at']
        read_only_fields = ['uploaded_at']

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    tieba_name = serializers.CharField(source='tieba.name', read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    like_count = serializers.IntegerField(read_only=True)
    comment_count = serializers.IntegerField(read_only=True)
    collect_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Post
        fields = [
            'id', 'title', 'content', 'author', 'author_username', 'tieba', 'tieba_name',
            'images', 'like_count', 'comment_count', 'collect_count', 'is_essence',
            'is_top', 'view_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['author', 'created_at', 'updated_at', 'view_count']

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content', 'tieba']

class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = ['id', 'post', 'user', 'created_at']
        read_only_fields = ['user', 'created_at']

class PostCollectSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostCollect
        fields = ['id', 'post', 'user', 'created_at']
        read_only_fields = ['user', 'created_at']

class PostReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostReport
        fields = ['id', 'post', 'user', 'reason', 'description', 'created_at']
        read_only_fields = ['user', 'created_at']