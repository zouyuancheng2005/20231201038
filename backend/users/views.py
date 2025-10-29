from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404
from .models import User, UserProfile
from .serializers import (
    UserSerializer, UserRegistrationSerializer, UserLoginSerializer,
    UserUpdateSerializer, PasswordChangeSerializer
)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request):
    """用户注册"""
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        
        # 创建认证token
        token, created = Token.objects.get_or_create(user=user)
        
        # 自动登录
        login(request, user)
        
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'message': '注册成功'
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def user_login(request):
    """用户登录"""
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # 创建或获取token
        token, created = Token.objects.get_or_create(user=user)
        
        # 登录用户
        login(request, user)
        
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'message': '登录成功'
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_logout(request):
    """用户退出"""
    # 删除token
    try:
        request.user.auth_token.delete()
    except (AttributeError, Token.DoesNotExist):
        pass
    
    # 退出登录
    logout(request)
    
    return Response({'message': '退出成功'})

@api_view(['GET'])
def user_profile(request):
    """获取当前用户信息"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['PUT'])
def update_profile(request):
    """更新用户信息"""
    serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'user': UserSerializer(request.user).data,
            'message': '信息更新成功'
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def change_password(request):
    """修改密码"""
    serializer = PasswordChangeSerializer(data=request.data)
    if serializer.is_valid():
        user = request.user
        
        # 验证旧密码
        if not user.check_password(serializer.validated_data['old_password']):
            return Response(
                {'old_password': ['原密码错误']}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # 设置新密码
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        
        # 更新token
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'message': '密码修改成功'
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def user_detail(request, user_id):
    """获取指定用户信息（公开信息）"""
    user = get_object_or_404(User, id=user_id)
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
def user_follow_tiebas(request):
    """获取用户关注的贴吧"""
    user = request.user
    follow_tiebas = user.follow_tiebas.all()
    
    # 这里需要贴吧序列化器，稍后创建
    from tiebas.serializers import TiebaSerializer
    serializer = TiebaSerializer(follow_tiebas, many=True)
    
    return Response(serializer.data)

@api_view(['POST'])
def follow_tieba(request, tieba_id):
    """关注贴吧"""
    user = request.user
    
    # 这里需要贴吧模型，稍后创建
    from tiebas.models import Tieba
    tieba = get_object_or_404(Tieba, id=tieba_id)
    
    if user.follow_tiebas.filter(id=tieba_id).exists():
        return Response({'message': '已经关注该贴吧'}, status=status.HTTP_400_BAD_REQUEST)
    
    user.follow_tiebas.add(tieba)
    return Response({'message': '关注成功'})

@api_view(['POST'])
def unfollow_tieba(request, tieba_id):
    """取消关注贴吧"""
    user = request.user
    
    from tiebas.models import Tieba
    tieba = get_object_or_404(Tieba, id=tieba_id)
    
    if not user.follow_tiebas.filter(id=tieba_id).exists():
        return Response({'message': '未关注该贴吧'}, status=status.HTTP_400_BAD_REQUEST)
    
    user.follow_tiebas.remove(tieba)
    return Response({'message': '取消关注成功'})