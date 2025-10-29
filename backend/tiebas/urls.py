from django.urls import path
from . import views

urlpatterns = [
    # 贴吧列表和搜索
    path('', views.tieba_list, name='tieba_list'),
    path('hot/', views.hot_tiebas, name='hot_tiebas'),
    
    # 贴吧详情
    path('<int:tieba_id>/', views.tieba_detail, name='tieba_detail'),
    
    # 贴吧创建
    path('create/', views.create_tieba, name='create_tieba'),
    
    # 贴吧分类
    path('categories/', views.category_list, name='category_list'),
    
    # 贴吧公告
    path('<int:tieba_id>/announcements/', views.tieba_announcements, name='tieba_announcements'),
    path('<int:tieba_id>/announcements/create/', views.create_announcement, name='create_announcement'),
    
    # 贴吧吧规
    path('<int:tieba_id>/rules/', views.tieba_rules, name='tieba_rules'),
    path('<int:tieba_id>/rules/create/', views.create_rule, name='create_rule'),
]