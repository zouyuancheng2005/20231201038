<template>
  <div class="search-page">
    <!-- 搜索头部 -->
    <div class="search-header">
      <div class="search-box-container">
        <SearchBox 
          :placeholder="'搜索贴吧、帖子、用户...'"
          :default-value="searchQuery"
          @search="handleSearch"
        />
      </div>
      
      <div class="search-filters">
        <div class="filter-group">
          <label>搜索类型:</label>
          <select v-model="searchType" class="filter-select">
            <option value="all">全部</option>
            <option value="tieba">贴吧</option>
            <option value="post">帖子</option>
            <option value="user">用户</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>排序方式:</label>
          <select v-model="sortBy" class="filter-select">
            <option value="relevance">相关度</option>
            <option value="time">时间</option>
            <option value="hot">热度</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search-results">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>搜索中...</p>
      </div>
      
      <div v-else-if="searchResults.length === 0 && searchQuery" class="no-results">
        <h3>没有找到相关结果</h3>
        <p>尝试使用不同的关键词或搜索类型</p>
      </div>
      
      <div v-else-if="!searchQuery" class="search-tips">
        <h3>搜索提示</h3>
        <div class="tips-grid">
          <div class="tip-card">
            <h4>热门贴吧</h4>
            <div class="tip-items">
              <span class="tip-item" @click="searchQuery = '游戏'; handleSearch('游戏')">游戏</span>
              <span class="tip-item" @click="searchQuery = '动漫'; handleSearch('动漫')">动漫</span>
              <span class="tip-item" @click="searchQuery = '音乐'; handleSearch('音乐')">音乐</span>
            </div>
          </div>
          
          <div class="tip-card">
            <h4>热门话题</h4>
            <div class="tip-items">
              <span class="tip-item" @click="searchQuery = '游戏推荐'; handleSearch('游戏推荐')">游戏推荐</span>
              <span class="tip-item" @click="searchQuery = '新番'; handleSearch('新番')">新番</span>
              <span class="tip-item" @click="searchQuery = '美食制作'; handleSearch('美食制作')">美食制作</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="results-container">
        <!-- 贴吧结果 -->
        <div v-if="searchType === 'all' || searchType === 'tieba'" class="result-section">
          <h3 class="section-title">贴吧</h3>
          <div class="results-grid">
            <div 
              v-for="tieba in tiebaResults" 
              :key="tieba.id" 
              class="result-card tieba-card"
              @click="$router.push(`/tieba/${tieba.id}`)"
            >
              <div class="tieba-avatar">{{ tieba.avatar }}</div>
              <div class="tieba-info">
                <h4 class="tieba-name">{{ tieba.name }}</h4>
                <p class="tieba-description">{{ tieba.description }}</p>
                <div class="tieba-stats">
                  <span>{{ tieba.memberCount }} 成员</span>
                  <span>{{ tieba.postCount }} 帖子</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 帖子结果 -->
        <div v-if="searchType === 'all' || searchType === 'post'" class="result-section">
          <h3 class="section-title">帖子</h3>
          <div class="results-list">
            <div 
              v-for="post in postResults" 
              :key="post.id" 
              class="result-item post-item"
              @click="$router.push(`/post/${post.id}`)"
            >
              <h4 class="post-title">{{ post.title }}</h4>
              <p class="post-excerpt">{{ post.content }}</p>
              <div class="post-meta">
                <span class="author">{{ post.author.name }}</span>
                <span class="tieba">{{ post.tieba }}</span>
                <span class="time">{{ post.createTime }}</span>
                <span class="replies">💬 {{ post.replyCount }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 用户结果 -->
        <div v-if="searchType === 'all' || searchType === 'user'" class="result-section">
          <h3 class="section-title">用户</h3>
          <div class="results-grid">
            <div 
              v-for="user in userResults" 
              :key="user.id" 
              class="result-card user-card"
              @click="$router.push(`/user/${user.id}`)"
            >
              <div class="user-avatar">{{ user.avatar }}</div>
              <div class="user-info">
                <h4 class="username">{{ user.username }}</h4>
                <p class="user-bio">{{ user.bio }}</p>
                <div class="user-stats">
                  <span>{{ user.postCount }} 帖子</span>
                  <span>{{ user.followers }} 粉丝</span>
                </div>
              </div>
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
import SearchBox from '@/react-components/SearchBox.jsx'

const route = useRoute()

// 搜索状态
const searchQuery = ref(route.query.q || '')
const searchType = ref('all')
const sortBy = ref('relevance')
const loading = ref(false)

// 模拟搜索结果数据
const tiebaResults = ref([
  {
    id: 1,
    name: '游戏',
    avatar: '🎮',
    description: '游戏爱好者的聚集地，分享游戏心得，组队开黑',
    memberCount: 125000,
    postCount: 23456
  },
  {
    id: 2,
    name: '游戏攻略',
    avatar: '📚',
    description: '游戏攻略分享与讨论',
    memberCount: 45000,
    postCount: 8900
  }
])

const postResults = ref([
  {
    id: 1,
    title: '大家最近在玩什么游戏？推荐一下',
    content: '最近游戏荒了，求推荐一些好玩的游戏，最好是单机RPG类型的...',
    author: { name: '游戏玩家' },
    tieba: '游戏',
    replyCount: 156,
    createTime: '2小时前'
  }
])

const userResults = ref([
  {
    id: 1,
    username: '游戏玩家',
    avatar: '👤',
    bio: '热爱游戏，喜欢分享游戏心得',
    postCount: 156,
    followers: 2345
  }
])

// 计算搜索结果
const searchResults = computed(() => {
  return [...tiebaResults.value, ...postResults.value, ...userResults.value]
})

onMounted(() => {
  if (searchQuery.value) {
    handleSearch(searchQuery.value)
  }
})

const handleSearch = async (query) => {
  if (!query.trim()) return
  
  searchQuery.value = query
  loading.value = true
  
  // 模拟搜索延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 这里可以添加实际的搜索逻辑
  console.log('搜索关键词:', query)
  console.log('搜索类型:', searchType.value)
  console.log('排序方式:', sortBy.value)
  
  loading.value = false
}
</script>

<style scoped>
.search-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-header {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.search-box-container {
  margin-bottom: 20px;
}

.search-filters {
  display: flex;
  gap: 30px;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-weight: 500;
  color: #333;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
}

.search-results {
  min-height: 400px;
}

.loading {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007AFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.search-tips {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.tip-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.tip-card h4 {
  margin-bottom: 15px;
  color: #333;
}

.tip-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tip-item {
  background: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.tip-item:hover {
  background: #007AFF;
  color: white;
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.result-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-title {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.result-card {
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.result-card:hover {
  border-color: #007AFF;
  box-shadow: 0 4px 12px rgba(0,122,255,0.1);
}

.tieba-card {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.tieba-avatar {
  font-size: 32px;
  width: 60px;
  height: 60px;
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tieba-info {
  flex: 1;
}

.tieba-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.tieba-description {
  color: #666;
  margin-bottom: 12px;
  font-size: 14px;
}

.tieba-stats {
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #888;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-item {
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.post-item:hover {
  border-color: #007AFF;
}

.post-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.post-excerpt {
  color: #666;
  margin-bottom: 12px;
  font-size: 14px;
}

.post-meta {
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #888;
}

.user-card {
  display: flex;
  gap: 15px;
  align-items: center;
}

.user-avatar {
  font-size: 24px;
  width: 50px;
  height: 50px;
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
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.user-bio {
  color: #666;
  margin-bottom: 8px;
  font-size: 14px;
}

.user-stats {
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #888;
}

@media (max-width: 768px) {
  .search-filters {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .tips-grid {
    grid-template-columns: 1fr;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>