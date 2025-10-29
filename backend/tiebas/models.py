from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Tieba(models.Model):
    """贴吧模型"""
    name = models.CharField(max_length=50, unique=True, verbose_name='贴吧名称')
    description = models.TextField(max_length=500, verbose_name='贴吧描述')
    avatar = models.ImageField(upload_to='tieba_avatars/', null=True, blank=True, verbose_name='贴吧头像')
    
    # 统计字段
    member_count = models.PositiveIntegerField(default=0, verbose_name='成员数')
    post_count = models.PositiveIntegerField(default=0, verbose_name='帖子数')
    today_post_count = models.PositiveIntegerField(default=0, verbose_name='今日发帖数')
    
    # 管理相关
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_tiebas', verbose_name='创建者')
    moderators = models.ManyToManyField(User, related_name='moderated_tiebas', blank=True, verbose_name='吧务团队')
    
    # 状态字段
    is_active = models.BooleanField(default=True, verbose_name='是否活跃')
    is_official = models.BooleanField(default=False, verbose_name='是否官方贴吧')
    
    # 时间字段
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    
    class Meta:
        verbose_name = '贴吧'
        verbose_name_plural = '贴吧'
        db_table = 'tiebas'
        ordering = ['-member_count']
    
    def __str__(self):
        return self.name
    
    def increment_member_count(self):
        """增加成员数"""
        self.member_count += 1
        self.save(update_fields=['member_count'])
    
    def decrement_member_count(self):
        """减少成员数"""
        if self.member_count > 0:
            self.member_count -= 1
            self.save(update_fields=['member_count'])
    
    def increment_post_count(self):
        """增加帖子数"""
        self.post_count += 1
        self.save(update_fields=['post_count'])
    
    def increment_today_post_count(self):
        """增加今日发帖数"""
        self.today_post_count += 1
        self.save(update_fields=['today_post_count'])

class TiebaCategory(models.Model):
    """贴吧分类"""
    name = models.CharField(max_length=50, unique=True, verbose_name='分类名称')
    description = models.TextField(max_length=200, blank=True, verbose_name='分类描述')
    icon = models.CharField(max_length=50, blank=True, verbose_name='分类图标')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='排序')
    
    class Meta:
        verbose_name = '贴吧分类'
        verbose_name_plural = '贴吧分类'
        db_table = 'tieba_categories'
        ordering = ['sort_order', 'name']
    
    def __str__(self):
        return self.name

class TiebaMembership(models.Model):
    """贴吧成员关系"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='用户')
    tieba = models.ForeignKey(Tieba, on_delete=models.CASCADE, verbose_name='贴吧')
    
    # 成员角色
    ROLE_CHOICES = [
        ('member', '普通成员'),
        ('moderator', '吧务'),
        ('admin', '吧主'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='member', verbose_name='角色')
    
    # 加入时间
    joined_at = models.DateTimeField(auto_now_add=True, verbose_name='加入时间')
    
    # 活跃度
    last_active = models.DateTimeField(auto_now=True, verbose_name='最后活跃时间')
    contribution_score = models.PositiveIntegerField(default=0, verbose_name='贡献度')
    
    class Meta:
        verbose_name = '贴吧成员'
        verbose_name_plural = '贴吧成员'
        db_table = 'tieba_memberships'
        unique_together = ['user', 'tieba']
        ordering = ['-contribution_score']
    
    def __str__(self):
        return f"{self.user.username} - {self.tieba.name}"

class TiebaRule(models.Model):
    """贴吧吧规"""
    tieba = models.ForeignKey(Tieba, on_delete=models.CASCADE, related_name='rules', verbose_name='贴吧')
    title = models.CharField(max_length=100, verbose_name='规则标题')
    content = models.TextField(verbose_name='规则内容')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='排序')
    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='创建者')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    
    class Meta:
        verbose_name = '贴吧规则'
        verbose_name_plural = '贴吧规则'
        db_table = 'tieba_rules'
        ordering = ['sort_order', 'created_at']
    
    def __str__(self):
        return f"{self.tieba.name} - {self.title}"

class TiebaAnnouncement(models.Model):
    """贴吧公告"""
    tieba = models.ForeignKey(Tieba, on_delete=models.CASCADE, related_name='announcements', verbose_name='贴吧')
    title = models.CharField(max_length=200, verbose_name='公告标题')
    content = models.TextField(verbose_name='公告内容')
    
    # 公告类型
    TYPE_CHOICES = [
        ('normal', '普通公告'),
        ('important', '重要公告'),
        ('event', '活动公告'),
    ]
    announcement_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='normal', verbose_name='公告类型')
    
    # 显示设置
    is_pinned = models.BooleanField(default=False, verbose_name='是否置顶')
    is_active = models.BooleanField(default=True, verbose_name='是否有效')
    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='创建者')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    
    class Meta:
        verbose_name = '贴吧公告'
        verbose_name_plural = '贴吧公告'
        db_table = 'tieba_announcements'
        ordering = ['-is_pinned', '-created_at']
    
    def __str__(self):
        return f"{self.tieba.name} - {self.title}"