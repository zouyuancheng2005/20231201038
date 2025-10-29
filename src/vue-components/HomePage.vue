<template>
  <div class="home-page">
    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">欢迎来到百度贴吧</h1>
        <p class="hero-subtitle">发现兴趣，结交朋友，分享生活</p>
        
        <!-- React 搜索组件 -->
        <SearchBox 
          :placeholder="'搜索贴吧、帖子、用户...'"
          @search="handleSearch"
        />
      </div>
    </section>
    
    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 热门贴吧 -->
      <section class="hot-tiebas">
        <div class="section-header">
          <h2 class="section-title">🔥 热门贴吧</h2>
          <router-link to="/search" class="view-all">查看全部</router-link>
        </div>
        
        <!-- Vue 贴吧列表组件 -->
        <TiebaList :tiebas="hotTiebas" />
      </section>
      
      <!-- 热门帖子 -->
      <section class="hot-posts">
        <div class="section-header">
          <h2 class="section-title">📝 热门帖子</h2>
          <router-link to="/search" class="view-all">查看全部</router-link>
        </div>
        
        <!-- React 帖子列表组件 -->
        <PostList :posts="hotPosts" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SearchBox from '@/react-components/SearchBox.jsx'
import TiebaList from '@/vue-components/TiebaList.vue'
import PostList from '@/react-components/PostList.jsx'

// 模拟数据
const hotTiebas = ref([
  { id: 1, name: '游戏', avatar: '🎮', memberCount: 125000, description: '游戏爱好者的聚集地' },
  { id: 2, name: '动漫', avatar: '📺', memberCount: 98000, description: '动漫讨论与分享' },
  { id: 3, name: '音乐', avatar: '🎵', memberCount: 75000, description: '音乐交流平台' },
  { id: 4, name: '体育', avatar: '⚽', memberCount: 112000, description: '体育赛事讨论' },
  { id: 5, name: '美食', avatar: '🍔', memberCount: 68000, description: '美食分享与制作' },
  { id: 6, name: '科技', avatar: '💻', memberCount: 89000, description: '科技前沿讨论' }
])

const hotPosts = ref([
  { 
    id: 1, 
    title: '大家最近在玩什么游戏？推荐一下', 
    content: '最近游戏荒了，求推荐一些好玩的游戏...',
    author: { name: '游戏玩家', avatar: '👤' },
    tieba: '游戏',
    replyCount: 156,
    likeCount: 89,
    createTime: '2小时前'
  },
  { 
    id: 2, 
    title: '新番推荐：这部动漫真的不错！', 
    content: '最近发现一部宝藏动漫，强烈推荐给大家...',
    author: { name: '动漫迷', avatar: '👤' },
    tieba: '动漫',
    replyCount: 234,
    likeCount: 156,
    createTime: '5小时前'
  },
  { 
    id: 3, 
    title: '分享一道家常菜的做法', 
    content: '今天做了红烧肉，分享一下做法...',
    author: { name: '美食家', avatar: '👤' },
    tieba: '美食',
    replyCount: 67,
    likeCount: 45,
    createTime: '1天前'
  }
])

onMounted(() => {
  // 模拟数据加载
  console.log('🏠 首页数据加载完成')
})

const handleSearch = (query) => {
  console.log('搜索关键词:', query)
  // 这里可以添加搜索逻辑
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 20px 60px;
  text-align: center;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 40px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
}

.hot-tiebas,
.hot-posts {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.view-all {
  color: #007AFF;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.view-all:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .main-content {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 20px;
  }
  
  .section-title {
    font-size: 20px;
  }
}
</style>