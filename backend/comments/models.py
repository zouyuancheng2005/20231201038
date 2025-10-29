from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Comment(models.Model):
    """评论模型"""
    content = models.TextField(verbose_name='评论内容')
    
    # 关联字段
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments', verbose_name='作者')
    post = models.ForeignKey('posts.Post', on_delete=models.CASCADE, related_name='comments', verbose_name='所属帖子')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, 
                              related_name='replies', verbose_name='父评论')
    
    # 统计字段
    like_count = models.PositiveIntegerField(default=0, verbose_name='点赞数')
    reply_count = models.PositiveIntegerField(default=0, verbose_name='回复数')
    
    # 楼层号
    floor = models.PositiveIntegerField(default=0, verbose_name='楼层')
    
    # 状态字段
    is_active = models.BooleanField(default=True, verbose_name='是否有效')
    
    # 时间字段
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    
    class Meta:
        verbose_name = '评论'
        verbose_name_plural = '评论'
        db_table = 'comments'
        ordering = ['floor']
        indexes = [
            models.Index(fields=['post', 'floor']),
            models.Index(fields=['author', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.author.username} 的评论"
    
    def save(self, *args, **kwargs):
        # 自动设置楼层号
        if not self.floor:
            if self.parent:
                # 回复楼层从1开始
                self.floor = self.parent.replies.count() + 1
            else:
                # 主评论楼层从1开始
                self.floor = self.post.comments.filter(parent__isnull=True).count() + 1
        
        super().save(*args, **kwargs)
    
    def increment_like_count(self):
        """增加点赞数"""
        self.like_count += 1
        self.save(update_fields=['like_count'])
    
    def increment_reply_count(self):
        """增加回复数"""
        self.reply_count += 1
        self.save(update_fields=['reply_count'])

class CommentLike(models.Model):
    """评论点赞"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='用户')
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, verbose_name='评论')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='点赞时间')
    
    class Meta:
        verbose_name = '评论点赞'
        verbose_name_plural = '评论点赞'
        db_table = 'comment_likes'
        unique_together = ['user', 'comment']
    
    def __str__(self):
        return f"{self.user.username} 点赞评论"

class CommentReport(models.Model):
    """评论举报"""
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, verbose_name='评论')
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
        verbose_name = '评论举报'
        verbose_name_plural = '评论举报'
        db_table = 'comment_reports'
    
    def __str__(self):
        return f"举报评论"