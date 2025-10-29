from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['show_email', 'show_location', 'email_notifications', 
                 'push_notifications', 'theme', 'language']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    follow_tiebas_count = serializers.ReadOnlyField(source='follow_tiebas.count')
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                 'avatar', 'bio', 'location', 'website', 'post_count', 
                 'comment_count', 'like_count', 'date_joined', 'last_login',
                 'follow_tiebas_count', 'profile']
        read_only_fields = ['id', 'date_joined', 'last_login', 'post_count', 
                           'comment_count', 'like_count']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("两次密码输入不一致")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        
        # 创建用户配置
        UserProfile.objects.create(user=user)
        
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('用户名或密码错误')
            if not user.is_active:
                raise serializers.ValidationError('用户账户已被禁用')
            attrs['user'] = user
        else:
            raise serializers.ValidationError('用户名和密码不能为空')
        
        return attrs

class UserUpdateSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'avatar', 'bio', 'location', 'website', 'profile']
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        
        # 更新用户信息
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # 更新用户配置
        if profile_data:
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
        
        return instance

class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)
    new_password_confirm = serializers.CharField(required=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError("新密码确认不一致")
        return attrs