<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <span class="logo-icon">📱</span>
        百度贴吧
      </router-link>
      
      <!-- 搜索框 -->
      <div class="search-box">
        <input 
          type="text" 
          placeholder="搜索贴吧、帖子、用户..."
          class="search-input"
          v-model="searchQuery"
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">
          🔍
        </button>
      </div>
      
      <!-- 导航链接 -->
      <div class="nav-links">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/search" class="nav-link">发现</router-link>
        <router-link to="/create-post" class="nav-link">发帖</router-link>
      </div>
      
      <!-- 用户区域 -->
      <div class="user-area">
        <template v-if="isAuthenticated">
          <router-link to="/user/profile" class="user-avatar">
            <img :src="userAvatar" alt="用户头像" />
          </router-link>
          <button class="logout-btn" @click="handleLogout">退出</button>
        </template>
        <template v-else>
          <button class="login-btn" @click="showLoginModal = true">登录</button>
          <button class="register-btn" @click="showRegisterModal = true">注册</button>
        </template>
      </div>
    </div>
    
    <!-- 登录模态框 -->
    <LoginModal 
      v-if="showLoginModal" 
      @close="showLoginModal = false"
      @success="handleLoginSuccess"
    />
    
    <!-- 注册模态框 -->
    <RegisterModal 
      v-if="showRegisterModal" 
      @close="showRegisterModal = false"
      @success="handleRegisterSuccess"
    />
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import LoginModal from '@/react-components/LoginModal.jsx'
import RegisterModal from '@/react-components/RegisterModal.jsx'

const router = useRouter()
const searchQuery = ref('')
const showLoginModal = ref(false)
const showRegisterModal = ref(false)

// 模拟用户认证状态
const isAuthenticated = computed(() => {
  return localStorage.getItem('auth_token') !== null
})

const userAvatar = computed(() => {
  return localStorage.getItem('user_avatar') || '/default-avatar.png'
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value }
    })
  }
}

const handleLoginSuccess = (userData) => {
  localStorage.setItem('auth_token', userData.token)
  localStorage.setItem('user_avatar', userData.avatar)
  showLoginModal.value = false
}

const handleRegisterSuccess = (userData) => {
  localStorage.setItem('auth_token', userData.token)
  localStorage.setItem('user_avatar', userData.avatar)
  showRegisterModal.value = false
}

const handleLogout = () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user_avatar')
  router.push('/')
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #e0e0e0;
  z-index: 1000;
  height: 64px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #007AFF;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 20px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 20px;
  padding: 8px 16px;
  flex: 1;
  max-width: 400px;
  margin: 0 20px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
}

.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: #007AFF;
  color: white;
}

.user-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.login-btn,
.register-btn,
.logout-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.login-btn {
  background: #f5f5f5;
  color: #333;
}

.register-btn {
  background: #007AFF;
  color: white;
}

.logout-btn {
  background: #ff3b30;
  color: white;
}

.login-btn:hover,
.register-btn:hover,
.logout-btn:hover {
  opacity: 0.8;
}
</style>