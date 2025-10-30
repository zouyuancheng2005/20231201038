<template>
  <div class="tieba-detail">
    <!-- 贴吧头部信息 -->
    <div class="tieba-header">
      <div class="tieba-info">
        <div class="tieba-avatar">{{ tieba.avatar }}</div>
        <div class="tieba-meta">
          <h1 class="tieba-name">{{ tieba.name }}</h1>
          <p class="tieba-description">{{ tieba.description }}</p>
          <div class="tieba-stats">
            <span class="member-count">👥 {{ tieba.memberCount }} 成员</span>
            <span class="post-count">📝 {{ tieba.postCount }} 帖子</span>
          </div>
        </div>
      </div>
      
      <div class="tieba-actions">
        <button class="btn btn-primary" @click="handleJoin">
          {{ isJoined ? '已加入' : '加入贴吧' }}
        </button>
        <button class="btn btn-secondary" @click="handleCreatePost">发帖</button>
      </div>
    </div>

    <!-- 帖子列表 -->
    <div class="posts-section">
      <div class="section-header">
        <h2>帖子列表</h2>
        <div class="sort-options">
          <button 
            v-for="option in sortOptions" 
            :key="option.value"
            :class="['sort-btn', { active: sortBy === option.value }]"
            @click="sortBy = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div class="posts-list">
        <div v-for="post in sortedPosts" :key="post.id" class="post-item">
          <div class="post-content">
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.content }}</p>
            <div class="post-meta">
              <span class="author">{{ post.author.name }}</span>
              <span class="time">{{ post.createTime }}</span>
              <span class="replies">💬 {{ post.replyCount }}</span>
              <span class="likes">👍 {{ post.likeCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tiebaId = route.params.id

// 贴吧信息
const tieba = ref({
  id: tiebaId,
  name: '游戏',
  avatar: '🎮',
  description: '游戏爱好者的聚集地，分享游戏心得，组队开黑',
  memberCount: 125000,
  postCount: 23456
})

// 帖子列表
const posts = ref([
  {
    id: 1,
    title: '大家最近在玩什么游戏？推荐一下',
    content: '最近游戏荒了，求推荐一些好玩的游戏，最好是单机RPG类型的...',
    author: { name: '游戏玩家' },
    replyCount: 156,
    likeCount: 89,
    createTime: '2小时前'
  },
  {
    id: 2,
    title: '新赛季上分攻略分享',
    content: '新赛季开始了，分享一些上分心得和英雄推荐...',
    author: { name: '王者大神' },
    replyCount: 234,
    likeCount: 156,
    createTime: '5小时前'
  }
])

// 排序选项
const sortOptions = [
  { label: '最新', value: 'latest' },
  { label: '热门', value: 'hot' },
  { label: '精华', value: 'essence' }
]

const sortBy = ref('latest')
const isJoined = ref(true)

// 计算排序后的帖子
const sortedPosts = computed(() => {
  const postsCopy = [...posts.value]
  
  switch (sortBy.value) {
    case 'hot':
      return postsCopy.sort((a, b) => b.replyCount + b.likeCount - (a.replyCount + a.likeCount))
    case 'essence':
      return postsCopy.sort((a, b) => b.likeCount - a.likeCount)
    default:
      return postsCopy
  }
})

onMounted(() => {
  console.log('加载贴吧详情:', tiebaId)
})

const handleJoin = () => {
  isJoined.value = !isJoined.value
  console.log(isJoined.value ? '加入贴吧' : '退出贴吧')
}

const handleCreatePost = () => {
  console.log('跳转到发帖页面')
}
</script>

<style scoped>
.tieba-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.tieba-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.tieba-info {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.tieba-avatar {
  font-size: 64px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 12px;
}

.tieba-meta h1 {
  font-size: 28px;
  margin-bottom: 8px;
  color: #333;
}

.tieba-description {
  color: #666;
  margin-bottom: 12px;
  font-size: 16px;
}

.tieba-stats {
  display: flex;
  gap: 20px;
  color: #888;
}

.tieba-actions {
  display: flex;
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

.posts-section {
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
  border-bottom: 1px solid #f0f0f0;
}

.sort-options {
  display: flex;
  gap: 8px;
}

.sort-btn {
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.sort-btn.active {
  background: #007AFF;
  color: white;
  border-color: #007AFF;
}

.post-item {
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}

.post-item:last-child {
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
  line-height: 1.5;
}

.post-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #888;
}

@media (max-width: 768px) {
  .tieba-header {
    flex-direction: column;
    gap: 20px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>