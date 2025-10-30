<template>
  <div class="user-profile">
    <!-- 用户信息头部 -->
    <div class="profile-header">
      <div class="user-avatar">{{ user.avatar }}</div>
      <div class="user-info">
        <h1 class="username">{{ user.username }}</h1>
        <p class="user-bio">{{ user.bio }}</p>
        <div class="user-stats">
          <div class="stat">
            <span class="stat-number">{{ user.postCount }}</span>
            <span class="stat-label">帖子</span>
          </div>
          <div class="stat">
            <span class="stat-number">{{ user.followers }}</span>
            <span class="stat-label">粉丝</span>
          </div>
          <div class="stat">
            <span class="stat-number">{{ user.following }}</span>
            <span class="stat-label">关注</span>
          </div>
        </div>
      </div>
      <div class="profile-actions">
        <button class="btn btn-primary" @click="handleEditProfile">编辑资料</button>
        <button class="btn btn-secondary" @click="handleLogout">退出登录</button>
      </div>
    </div>

    <!-- 导航标签 -->
    <div class="profile-nav">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 内容区域 -->
    <div class="profile-content">
      <!-- 我的帖子 -->
      <div v-if="activeTab === 'posts'" class="tab-content">
        <div v-for="post in userPosts" :key="post.id" class="post-item">
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-excerpt">{{ post.content }}</p>
          <div class="post-meta">
            <span class="tieba">{{ post.tieba }}</span>
            <span class="time">{{ post.createTime }}</span>
            <span class="replies">💬 {{ post.replyCount }}</span>
            <span class="likes">👍 {{ post.likeCount }}</span>
          </div>
        </div>
      </div>

      <!-- 我的回复 -->
      <div v-if="activeTab === 'replies'" class="tab-content">
        <div v-for="reply in userReplies" :key="reply.id" class="reply-item">
          <div class="reply-header">
            <span class="post-title">回复: {{ reply.postTitle }}</span>
            <span class="time">{{ reply.createTime }}</span>
          </div>
          <p class="reply-content">{{ reply.content }}</p>
        </div>
      </div>

      <!-- 收藏 -->
      <div v-if="activeTab === 'favorites'" class="tab-content">
        <div v-for="item in favorites" :key="item.id" class="favorite-item">
          <h3 class="item-title">{{ item.title }}</h3>
          <p class="item-excerpt">{{ item.content }}</p>
          <div class="item-meta">
            <span class="type">{{ item.type }}</span>
            <span class="time">{{ item.createTime }}</span>
          </div>
        </div>
      </div>

      <!-- 关注的贴吧 -->
      <div v-if="activeTab === 'tiebas'" class="tab-content">
        <div class="tiebas-grid">
          <div v-for="tieba in followedTiebas" :key="tieba.id" class="tieba-card">
            <div class="tieba-avatar">{{ tieba.avatar }}</div>
            <div class="tieba-info">
              <h4 class="tieba-name">{{ tieba.name }}</h4>
              <p class="tieba-description">{{ tieba.description }}</p>
              <div class="tieba-stats">
                <span>{{ tieba.memberCount }} 成员</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.params.id

// 用户信息
const user = ref({
  id: userId,
  username: '游戏玩家',
  avatar: '👤',
  bio: '热爱游戏，喜欢分享游戏心得，寻找志同道合的朋友',
  postCount: 156,
  followers: 2345,
  following: 89
})

// 导航标签
const tabs = [
  { id: 'posts', label: '我的帖子' },
  { id: 'replies', label: '我的回复' },
  { id: 'favorites', label: '收藏' },
  { id: 'tiebas', label: '关注的贴吧' }
]

const activeTab = ref('posts')

// 用户帖子数据
const userPosts = ref([
  {
    id: 1,
    title: '大家最近在玩什么游戏？推荐一下',
    content: '最近游戏荒了，求推荐一些好玩的游戏...',
    tieba: '游戏',
    replyCount: 156,
    likeCount: 89,
    createTime: '2小时前'
  },
  {
    id: 2,
    title: '新赛季上分攻略分享',
    content: '新赛季开始了，分享一些上分心得...',
    tieba: '王者荣耀',
    replyCount: 234,
    likeCount: 156,
    createTime: '1天前'
  }
])

// 用户回复数据
const userReplies = ref([
  {
    id: 1,
    postTitle: '大家最近在玩什么游戏？推荐一下',
    content: '推荐《巫师3》，剧情和世界观都很棒！',
    createTime: '1小时前'
  }
])

// 收藏数据
const favorites = ref([
  {
    id: 1,
    title: '游戏推荐：艾尔登法环',
    content: '这款游戏真的很好玩，强烈推荐...',
    type: '帖子',
    createTime: '3天前'
  }
])

// 关注的贴吧数据
const followedTiebas = ref([
  {
    id: 1,
    name: '游戏',
    avatar: '🎮',
    description: '游戏爱好者的聚集地',
    memberCount: 125000
  },
  {
    id: 2,
    name: '动漫',
    avatar: '📺',
    description: '动漫讨论与分享',
    memberCount: 98000
  }
])

onMounted(() => {
  console.log('加载用户资料:', userId)
})

const handleEditProfile = () => {
  console.log('编辑用户资料')
}

const handleLogout = () => {
  console.log('退出登录')
  // 这里可以添加退出登录逻辑
}
</script>

<style scoped>
.user-profile {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  background: white;
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.user-avatar {
  font-size: 64px;
  width: 100px;
  height: 100px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  flex: 1;
}

.username {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #333;
}

.user-bio {
  color: #666;
  margin-bottom: 20px;
  font-size: 16px;
}

.user-stats {
  display: flex;
  gap: 30px;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-primary {
  background: #007AFF;
  color: white;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.profile-nav {
  display: flex;
  background: white;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.tab-btn {
  flex: 1;
  padding: 16px 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  transition: all 0.3s;
}

.tab-btn.active {
  background: #007AFF;
  color: white;
}

.profile-content {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.post-item,
.reply-item,
.favorite-item {
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}

.post-item:last-child,
.reply-item:last-child,
.favorite-item:last-child {
  border-bottom: none;
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.post-excerpt {
  color: #666;
  margin-bottom: 12px;
}

.post-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #888;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.tiebas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.tieba-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
}

.tieba-avatar {
  font-size: 32px;
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tieba-info {
  flex: 1;
}

.tieba-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.tieba-description {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.tieba-stats {
  font-size: 12px;
  color: #888;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .user-stats {
    justify-content: center;
  }
  
  .profile-nav {
    flex-direction: column;
  }
  
  .tiebas-grid {
    grid-template-columns: 1fr;
  }
}
</style>