from rest_framework import serializers
from .models import Tieba, TiebaCategory, TiebaAnnouncement, TiebaRule

class TiebaCategorySerializer(serializers.ModelSerializer):
    tieba_count = serializers.ReadOnlyField(source='tieba_set.count')
    
    class Meta:
        model = TiebaCategory
        fields = ['id', 'name', 'description', 'icon', 'sort_order', 'tieba_count']

class TiebaSerializer(serializers.ModelSerializer):
    creator_name = serializers.ReadOnlyField(source='creator.username')
    is_followed = serializers.SerializerMethodField()
    
    class Meta:
        model = Tieba
        fields = [
            'id', 'name', 'description', 'avatar', 'member_count', 
            'post_count', 'today_post_count', 'creator', 'creator_name',
            'is_active', 'is_official', 'created_at', 'updated_at', 'is_followed'
        ]
        read_only_fields = ['member_count', 'post_count', 'today_post_count', 'creator']
    
    def get_is_followed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user.follow_tiebas.filter(id=obj.id).exists()
        return False

class TiebaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tieba
        fields = ['name', 'description', 'avatar']
    
    def validate_name(self, value):
        if Tieba.objects.filter(name=value).exists():
            raise serializers.ValidationError("贴吧名称已存在")
        return value
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['creator'] = request.user
        return super().create(validated_data)

class TiebaAnnouncementSerializer(serializers.ModelSerializer):
    created_by_name = serializers.ReadOnlyField(source='created_by.username')
    
    class Meta:
        model = TiebaAnnouncement
        fields = [
            'id', 'tieba', 'title', 'content', 'announcement_type', 
            'is_pinned', 'is_active', 'created_by', 'created_by_name',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by']

class TiebaRuleSerializer(serializers.ModelSerializer):
    created_by_name = serializers.ReadOnlyField(source='created_by.username')
    
    class Meta:
        model = TiebaRule
        fields = [
            'id', 'tieba', 'title', 'content', 'sort_order',
            'created_by', 'created_by_name', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by']