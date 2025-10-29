from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # 扩展用户字段
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True, verbose_name='头像')
    bio = models.TextField(max_length=500, blank=True, verbose_name='个人简介')
    location = models.CharField(max_length=100, blank=True, verbose_name='所在地')
    website = models.URLField(blank=True, verbose_name='个人网站')
    
    # 贴吧相关字段
    follow_tiebas = models.ManyToManyField(
        'tiebas.Tieba', 
        related_name='followers', 
        blank=True,
        verbose_name='关注的贴吧'
    )
    
    # 统计字段
    post_count = models.PositiveIntegerField(default=0, verbose_name='发帖数')
    comment_count = models.PositiveIntegerField(default=0, verbose_name='评论数')
    like_count = models.PositiveIntegerField(default=0, verbose_name='获赞数')
    
    # 时间字段
    last_login_ip = models.GenericIPAddressField(null=True, blank=True, verbose_name='最后登录IP')
    last_activity = models.DateTimeField(auto_now=True, verbose_name='最后活动时间')
    
    class Meta:
        verbose_name = '用户'
        verbose_name_plural = '用户'
        db_table = 'users'
    
    def __str__(self):
        return self.username
    
    def get_display_name(self):
        """获取显示名称，优先使用昵称"""
        return self.first_name or self.username
    
    def increment_post_count(self):
        """增加发帖数"""
        self.post_count += 1
        self.save(update_fields=['post_count'])
    
    def increment_comment_count(self):
        """增加评论数"""
        self.comment_count += 1
        self.save(update_fields=['comment_count'])

class UserProfile(models.Model):
    """用户扩展信息"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # 隐私设置
    show_email = models.BooleanField(default=False, verbose_name='公开邮箱')
    show_location = models.BooleanField(default=False, verbose_name='公开位置')
    
    # 通知设置
    email_notifications = models.BooleanField(default=True, verbose_name='邮件通知')
    push_notifications = models.BooleanField(default=True, verbose_name='推送通知')
    
    # 偏好设置
    theme = models.CharField(
        max_length=20, 
        default='light', 
        choices=[('light', '浅色'), ('dark', '深色')],
        verbose_name='主题偏好'
    )
    language = models.CharField(
        max_length=10, 
        default='zh-hans', 
        choices=[('zh-hans', '简体中文'), ('en', 'English')],
        verbose_name='语言偏好'
    )
    
    class Meta:
        verbose_name = '用户配置'
        verbose_name_plural = '用户配置'
        db_table = 'user_profiles'
    
    def __str__(self):
        return f"{self.user.username} 的配置"