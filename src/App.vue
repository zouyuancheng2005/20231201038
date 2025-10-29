<template>
  <div id="app">
    <!-- Vue 导航栏组件 -->
    <NavBar />
    
    <!-- 主内容区域 -->
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- Vue 页脚组件 -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar from '@/vue-components/NavBar.vue'
import Footer from '@/vue-components/Footer.vue'

onMounted(() => {
  console.log('📱 百度贴吧应用已加载完成')
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 64px; /* 导航栏高度 */
  min-height: calc(100vh - 120px);
}
</style>