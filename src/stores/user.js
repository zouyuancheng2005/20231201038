import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    isLoggedIn: false,
    token: null
  }),

  getters: {
    getUserInfo: (state) => state.userInfo,
    getIsLoggedIn: (state) => state.isLoggedIn
  },

  actions: {
    // 用户登录
    login(userData) {
      this.userInfo = userData.userInfo
      this.token = userData.token
      this.isLoggedIn = true
      
      // 存储到localStorage
      localStorage.setItem('user_token', userData.token)
      localStorage.setItem('user_info', JSON.stringify(userData.userInfo))
    },

    // 用户退出
    logout() {
      this.userInfo = null
      this.token = null
      this.isLoggedIn = false
      
      // 清除localStorage
      localStorage.removeItem('user_token')
      localStorage.removeItem('user_info')
    },

    // 从localStorage恢复登录状态
    restoreLoginState() {
      const token = localStorage.getItem('user_token')
      const userInfo = localStorage.getItem('user_info')
      
      if (token && userInfo) {
        this.token = token
        this.userInfo = JSON.parse(userInfo)
        this.isLoggedIn = true
      }
    },

    // 更新用户信息
    updateUserInfo(userInfo) {
      this.userInfo = { ...this.userInfo, ...userInfo }
      localStorage.setItem('user_info', JSON.stringify(this.userInfo))
    }
  }
})