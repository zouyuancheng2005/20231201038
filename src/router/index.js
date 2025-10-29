import { defineAsyncComponent } from 'vue'

// 异步加载组件以提高性能
const HomePage = defineAsyncComponent(() => import('@/vue-components/HomePage.vue'))
const TiebaDetail = defineAsyncComponent(() => import('@/vue-components/TiebaDetail.vue'))
const PostDetail = defineAsyncComponent(() => import('@/vue-components/PostDetail.vue'))
const UserProfile = defineAsyncComponent(() => import('@/vue-components/UserProfile.vue'))
const SearchPage = defineAsyncComponent(() => import('@/vue-components/SearchPage.vue'))
const CreatePost = defineAsyncComponent(() => import('@/pages/CreatePost.vue'))

// 路由配置
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: '百度贴吧 - 首页',
      requiresAuth: false
    }
  },
  {
    path: '/tieba/:id',
    name: 'TiebaDetail',
    component: TiebaDetail,
    meta: {
      title: '贴吧详情',
      requiresAuth: false
    }
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: PostDetail,
    meta: {
      title: '帖子详情',
      requiresAuth: false
    }
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      title: '个人中心',
      requiresAuth: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage,
    meta: {
      title: '搜索',
      requiresAuth: false
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      title: '发布帖子',
      requiresAuth: true
    }
  }
]

// 路由守卫
export const beforeEach = (to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    // 这里可以添加认证逻辑
    const isAuthenticated = localStorage.getItem('auth_token')
    if (!isAuthenticated) {
      next('/')
      return
    }
  }
  
  next()
}