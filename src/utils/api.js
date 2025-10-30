// API 工具函数
import axios from 'axios'

// 创建 axios 实例
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证 token
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      // 未授权，清除本地存储并跳转到登录页
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_info')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// API 接口定义
export const authAPI = {
  // 用户注册
  register: (data) => api.post('/auth/register/', data),
  
  // 用户登录
  login: (data) => api.post('/auth/login/', data),
  
  // 用户退出
  logout: () => api.post('/auth/logout/'),
  
  // 获取用户信息
  getProfile: () => api.get('/auth/profile/'),
  
  // 更新用户信息
  updateProfile: (data) => api.put('/auth/profile/', data)
}

export const tiebaAPI = {
  // 获取贴吧列表
  getTiebas: (params) => api.get('/tiebas/', { params }),
  
  // 获取贴吧详情
  getTiebaDetail: (id) => api.get(`/tiebas/${id}/`),
  
  // 创建贴吧
  createTieba: (data) => api.post('/tiebas/', data),
  
  // 关注贴吧
  followTieba: (id) => api.post(`/tiebas/${id}/follow/`),
  
  // 取消关注贴吧
  unfollowTieba: (id) => api.post(`/tiebas/${id}/unfollow/`)
}

export const postAPI = {
  // 获取帖子列表
  getPosts: (params) => api.get('/posts/', { params }),
  
  // 获取帖子详情
  getPostDetail: (id) => api.get(`/posts/${id}/`),
  
  // 创建帖子
  createPost: (data) => api.post('/posts/', data),
  
  // 更新帖子
  updatePost: (id, data) => api.put(`/posts/${id}/`, data),
  
  // 删除帖子
  deletePost: (id) => api.delete(`/posts/${id}/`),
  
  // 点赞帖子
  likePost: (id) => api.post(`/posts/${id}/like/`),
  
  // 取消点赞帖子
  unlikePost: (id) => api.post(`/posts/${id}/unlike/`)
}

export const commentAPI = {
  // 获取评论列表
  getComments: (postId, params) => api.get(`/posts/${postId}/comments/`, { params }),
  
  // 创建评论
  createComment: (postId, data) => api.post(`/posts/${postId}/comments/`, data),
  
  // 回复评论
  replyComment: (commentId, data) => api.post(`/comments/${commentId}/reply/`, data),
  
  // 删除评论
  deleteComment: (id) => api.delete(`/comments/${id}/`),
  
  // 点赞评论
  likeComment: (id) => api.post(`/comments/${id}/like/`),
  
  // 取消点赞评论
  unlikeComment: (id) => api.post(`/comments/${id}/unlike/`)
}

export const searchAPI = {
  // 搜索
  search: (query, params) => api.get('/search/', { 
    params: { q: query, ...params } 
  })
}

export default api