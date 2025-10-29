import { createAppWithReact } from 'veaury'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './router'

// 创建 Pinia 状态管理
const pinia = createPinia()

// 创建 Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 创建 Veaury 混合应用
const app = createAppWithReact({
  rootComponent: App,
  // React 全局配置
  reactOptions: {
    // React 特定的配置
  },
  // Vue 全局配置
  vueOptions: {
    // Vue 特定的配置
  }
})

// 使用插件
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')

console.log('🚀 百度贴吧应用已启动 - Veaury (Vue + React) 混合框架')