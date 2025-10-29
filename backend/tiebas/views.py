from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Tieba, TiebaCategory, TiebaAnnouncement, TiebaRule
from .serializers import (
    TiebaSerializer, TiebaCreateSerializer, TiebaCategorySerializer,
    TiebaAnnouncementSerializer, TiebaRuleSerializer
)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def tieba_list(request):
    """获取贴吧列表"""
    # 获取查询参数
    search = request.GET.get('search', '')
    category_id = request.GET.get('category_id')
    sort_by = request.GET.get('sort_by', 'member_count')
    
    # 构建查询条件
    tiebas = Tieba.objects.filter(is_active=True)
    
    if search:
        tiebas = tiebas.filter(
            Q(name__icontains=search) | Q(description__icontains=search)
        )
    
    if category_id:
        tiebas = tiebas.filter(category_id=category_id)
    
    # 排序
    if sort_by == 'member_count':
        tiebas = tiebas.order_by('-member_count')
    elif sort_by == 'post_count':
        tiebas = tiebas.order_by('-post_count')
    elif sort_by == 'created_at':
        tiebas = tiebas.order_by('-created_at')
    
    serializer = TiebaSerializer(tiebas, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def tieba_detail(request, tieba_id):
    """获取贴吧详情"""
    tieba = get_object_or_404(Tieba, id=tieba_id, is_active=True)
    serializer = TiebaSerializer(tieba, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_tieba(request):
    """创建贴吧"""
    serializer = TiebaCreateSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        tieba = serializer.save()
        
        # 创建者自动关注贴吧
        request.user.follow_tiebas.add(tieba)
        
        return Response({
            'tieba': TiebaSerializer(tieba, context={'request': request}).data,
            'message': '贴吧创建成功'
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def category_list(request):
    """获取贴吧分类列表"""
    categories = TiebaCategory.objects.all()
    serializer = TiebaCategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def hot_tiebas(request):
    """获取热门贴吧"""
    hot_tiebas = Tieba.objects.filter(is_active=True).order_by('-member_count')[:10]
    serializer = TiebaSerializer(hot_tiebas, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def tieba_announcements(request, tieba_id):
    """获取贴吧公告"""
    tieba = get_object_or_404(Tieba, id=tieba_id)
    announcements = TiebaAnnouncement.objects.filter(
        tieba=tieba, is_active=True
    ).order_by('-is_pinned', '-created_at')
    
    serializer = TiebaAnnouncementSerializer(announcements, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def tieba_rules(request, tieba_id):
    """获取贴吧吧规"""
    tieba = get_object_or_404(Tieba, id=tieba_id)
    rules = TiebaRule.objects.filter(tieba=tieba).order_by('sort_order')
    
    serializer = TiebaRuleSerializer(rules, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_announcement(request, tieba_id):
    """创建贴吧公告（需要吧务权限）"""
    tieba = get_object_or_404(Tieba, id=tieba_id)
    
    # 检查权限
    if not (request.user == tieba.creator or 
            request.user in tieba.moderators.all()):
        return Response(
            {'error': '没有权限创建公告'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    serializer = TiebaAnnouncementSerializer(data=request.data)
    if serializer.is_valid():
        announcement = serializer.save(
            tieba=tieba, 
            created_by=request.user
        )
        return Response({
            'announcement': TiebaAnnouncementSerializer(announcement).data,
            'message': '公告创建成功'
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_rule(request, tieba_id):
    """创建贴吧吧规（需要吧务权限）"""
    tieba = get_object_or_404(Tieba, id=tieba_id)
    
    # 检查权限
    if not (request.user == tieba.creator or 
            request.user in tieba.moderators.all()):
        return Response(
            {'error': '没有权限创建吧规'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    serializer = TiebaRuleSerializer(data=request.data)
    if serializer.is_valid():
        rule = serializer.save(
            tieba=tieba, 
            created_by=request.user
        )
        return Response({
            'rule': TiebaRuleSerializer(rule).data,
            'message': '吧规创建成功'
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)