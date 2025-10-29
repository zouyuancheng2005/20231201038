from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Post(models.Model):
    """帖子模型"""
    title = models.CharField(max_length=200, verbose_name='帖子标题')
    content = models.TextField(verbose_name='帖子内容')
    
    # 关联字段
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts', verbose_name='作者')
    tieba = models.ForeignKey('tiebas.Tieba', on_delete=models.CASCADE, related_name='posts', verbose_name='所属贴吧')
    
    # 统计字段
    view_count = models.PositiveIntegerField(default=0, verbose_name='浏览数')
    reply_count = models.PositiveIntegerField(default=0, verbose_name='回复数')
    like_count = models.PositiveIntegerField(default=0, verbose_name='点赞数')
    collect_count = models.PositiveIntegerField(default=0, verbose_name='收藏数')
    
    # 状态字段
    is_pinned = models.BooleanField(default=False, verbose_name='是否置顶')
    is_essence = models.BooleanField(default=False, verbose_name='是否精华')
    is_active = models.BooleanField(default=True, verbose_name='是否有效')
    
    # 时间字段
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    last_reply_at = models.DateTimeField(auto_now_add=True, verbose_name='最后回复时间')
    
    class Meta:
        verbose_name = '帖子'
        verbose_name_plural = '帖子'
        db_table = 'posts'
        ordering = ['-is_pinned', '-last_reply_at']
        indexes = [
            models.Index(fields=['tieba', 'is_pinned', 'last_reply_at']),
            models.Index(fields=['author', 'created_at']),
        ]
    
    def __str__(self):
        return self.title
    
    def increment_view_count(self):
        """增加浏览数"""
        self.view_count += 1
        self.save(update_fields=['view_count'])
    
    def increment_reply_count(self):
        """增加回复数"""
        self.reply_count += 1
        self.save(update_fields=['reply_count'])
        self.update_last_reply_time()
    
    def increment_like_count(self):
        """增加点赞数"""
        self.like_count += 1
        self.save(update_fields=['like_count'])
    
    def increment_collect_count(self):
        """增加收藏数"""
        self.collect_count += 1
        self.save(update_fields=['collect_count'])
    
    def update_last_reply_time(self):
        """更新最后回复时间"""
        from django.utils import timezone
        self.last_reply_at = timezone.now()
        self.save(update_fields=['last_reply_at'])

class PostImage(models.Model):
    """帖子图片"""
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images', verbose_name='帖子')
    image = models.ImageField(upload_to='post_images/', verbose_name='图片')
    description = models.CharField(max_length=200, blank=True, verbose_name='图片描述')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='排序')
    
    class Meta:
        verbose_name = '帖子图片'
        verbose_name_plural = '帖子图片'
        db_table = 'post_images'
        ordering = ['sort_order']
    
    def __str__(self):
        return f"{self.post.title} - 图片"

class PostLike(models.Model):
    """帖子点赞"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='用户')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, verbose_name='帖子')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='点赞时间')
    
    class Meta:
        verbose_name = '帖子点赞'
        verbose_name_plural = '帖子点赞'
        db_table = 'post_likes'
        unique_together = ['user', 'post']
    
    def __str__(self):
        return f"{self.user.username} 点赞 {self.post.title}"

class PostCollect(models.Model):
    """帖子收藏"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='用户')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, verbose_name='帖子')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='收藏时间')
    
    class Meta:
        verbose_name = '帖子收藏'
        verbose_name_plural = '帖子收藏'
        db_table = 'post_collects'
        unique_together = ['user', 'post']
    
    def __str__(self):
        return f"{self.user.username} 收藏 {self.post.title}"

class PostReport(models.Model):
    """帖子举报"""
    post = models.ForeignKey(Post, on_delete=models.CASCADE, verbose_name='帖子')
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='举报人')
    
    # 举报类型
    REPORT_TYPE_CHOICES = [
        ('spam', '垃圾广告'),
        ('inappropriate', '内容不适宜'),
        ('illegal', '违法违规'),
        ('harassment', '骚扰谩骂'),
        ('other', '其他原因'),
    ]
    report_type = models.CharField(max_length=20, choices=REPORT_TYPE_CHOICES, verbose_name='举报类型')
    
    description = models.TextField(blank=True, verbose_name='举报描述')
    is_handled = models.BooleanField(default=False, verbose_name='是否已处理')
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='举报时间')
    handled_at = models.DateTimeField(null=True, blank=True, verbose_name='处理时间')
    
    class Meta:
        verbose_name = '帖子举报'
        verbose_name_plural = '帖子举报'
        db_table = 'post_reports'
    
    def __str__(self):
        return f"举报 {self.post.title}"