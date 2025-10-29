from django.urls import path
from . import views

urlpatterns = [
    # 认证相关
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    
    # 用户信息
    path('profile/', views.user_profile, name='profile'),
    path('profile/update/', views.update_profile, name='update_profile'),
    path('change-password/', views.change_password, name='change_password'),
    
    # 用户详情（公开）
    path('users/<int:user_id>/', views.user_detail, name='user_detail'),
    
    # 贴吧关注
    path('follow-tiebas/', views.user_follow_tiebas, name='user_follow_tiebas'),
    path('follow-tieba/<int:tieba_id>/', views.follow_tieba, name='follow_tieba'),
    path('unfollow-tieba/<int:tieba_id>/', views.unfollow_tieba, name='unfollow_tieba'),
]