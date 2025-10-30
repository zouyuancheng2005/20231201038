#!/usr/bin/env python
"""
检查数据库状态并填充测试数据的脚本
"""
import os
import sys
import django

# 设置Django环境
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tieba_project.settings')
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

django.setup()

from tiebas.models import Tieba, TiebaCategory
from posts.models import Post
from users.models import User
# 注意：由于使用了自定义用户模型，不能直接导入django.contrib.auth.models.User

def check_database_status():
    """检查数据库状态"""
    print("=== 数据库状态检查 ===")
    
    # 检查贴吧数据
    tieba_count = Tieba.objects.count()
    print(f"📋 贴吧数量: {tieba_count}")
    
    if tieba_count > 0:
        print("现有贴吧:")
        for tieba in Tieba.objects.all()[:5]:  # 只显示前5个
            print(f"  - {tieba.name}: {tieba.description}")
    
    # 检查帖子数据
    post_count = Post.objects.count()
    print(f"📝 帖子数量: {post_count}")
    
    # 检查用户数据
    user_count = User.objects.count()
    print(f"👤 用户数量: {user_count}")
    
    return tieba_count, post_count, user_count

def seed_test_data():
    """填充测试数据"""
    print("\n=== 开始填充测试数据 ===")
    
    # 创建测试用户
    try:
        test_user, created = User.objects.get_or_create(
            username='test_user',
            defaults={'email': 'test@example.com', 'password': 'test123'}
        )
        if created:
            print("✅ 创建测试用户: test_user")
        else:
            print("ℹ️ 测试用户已存在: test_user")
    except Exception as e:
        print(f"❌ 创建用户失败: {e}")
        test_user = None
    
    # 创建贴吧分类
    categories_data = [
        {'name': '游戏', 'description': '各类游戏讨论', 'icon': '🎮'},
        {'name': '动漫', 'description': '动漫作品交流', 'icon': '📺'},
        {'name': '科技', 'description': '科技数码资讯', 'icon': '💻'},
        {'name': '生活', 'description': '生活经验分享', 'icon': '🏠'},
        {'name': '体育', 'description': '体育赛事讨论', 'icon': '⚽'},
    ]
    
    category_objs = {}
    for cat_data in categories_data:
        try:
            category, created = TiebaCategory.objects.get_or_create(
                name=cat_data['name'],
                defaults={
                    'description': cat_data['description'],
                    'icon': cat_data['icon'],
                    'sort_order': categories_data.index(cat_data)
                }
            )
            category_objs[cat_data['name']] = category
            if created:
                print(f"✅ 创建分类: {cat_data['name']}")
            else:
                print(f"ℹ️ 分类已存在: {cat_data['name']}")
        except Exception as e:
            print(f"❌ 创建分类失败 {cat_data['name']}: {e}")
    
    # 创建测试贴吧
    tiebas_data = [
        ('编程', '编程技术交流社区', 125000, 85000),
        ('游戏', '游戏爱好者的聚集地', 980000, 650000),
        ('电影', '电影讨论与分享', 750000, 420000),
        ('音乐', '音乐分享与交流', 680000, 380000),
        ('Python', 'Python编程语言学习', 320000, 210000),
        ('JavaScript', '前端开发技术交流', 280000, 180000),
        ('学习', '学习经验交流分享', 450000, 290000),
        ('生活', '生活点滴分享', 890000, 520000)
    ]
    
    tieba_objs = {}
    for name, description, member_count, post_count in tiebas_data:
        tieba, created = Tieba.objects.get_or_create(
            name=name,
            defaults={
                'description': description,
                'member_count': member_count,
                'post_count': post_count
            }
        )
        tieba_objs[name] = tieba
        if created:
            print(f"✅ 创建贴吧: {name}")
    
    # 创建测试帖子
    if tieba_objs and test_user:
        posts_data = [
            ('Vue 3.4 新特性详解', 'Vue 3.4带来了很多新特性，让我们一起来学习...', '编程', test_user),
            ('React 18 最佳实践', 'React 18的最佳实践和性能优化技巧...', '编程', test_user),
            ('Python数据分析入门', '从零开始学习Python数据分析...', 'Python', test_user),
            ('JavaScript异步编程', '深入理解JavaScript异步编程模式...', 'JavaScript', test_user),
            ('最新电影推荐', '近期值得观看的电影推荐...', '电影', test_user),
            ('游戏攻略分享', '热门游戏攻略和技巧分享...', '游戏', test_user)
        ]
        
        for title, content, tieba_name, author in posts_data:
            post, created = Post.objects.get_or_create(
                title=title,
                defaults={
                    'content': content,
                    'tieba': tieba_objs[tieba_name],
                    'author': author,
                    'reply_count': 0
                }
            )
            if created:
                print(f"✅ 创建帖子: {title}")
    
    print("\n=== 测试数据填充完成 ===")

if __name__ == "__main__":
    # 检查当前状态
    tieba_count, post_count, user_count = check_database_status()
    
    # 如果数据为空，则填充测试数据
    if tieba_count == 0 and post_count == 0:
        print("\n📊 数据库为空，开始填充测试数据...")
        seed_test_data()
        
        # 再次检查状态
        print("\n=== 填充后的数据库状态 ===")
        check_database_status()
    else:
        print("\nℹ️ 数据库中已有数据，跳过填充")
        
        # 询问是否重新填充
        response = input("是否重新填充测试数据? (y/N): ")
        if response.lower() == 'y':
            # 清空现有数据
            Post.objects.all().delete()
            Tieba.objects.all().delete()
            print("🗑️ 已清空现有数据")
            
            # 重新填充
            seed_test_data()
            check_database_status()