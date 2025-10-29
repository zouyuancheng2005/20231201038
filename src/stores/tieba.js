import { defineStore } from 'pinia'

export const useTiebaStore = defineStore('tieba', {
  state: () => ({
    // 热门贴吧列表
    hotTiebas: [
      {
        id: 1,
        name: '英雄联盟',
        description: '欢迎来到英雄联盟贴吧，讨论游戏攻略、赛事资讯、英雄技巧',
        memberCount: 1250000,
        avatar: '🎮'
      },
      {
        id: 2,
        name: '考研',
        description: '考研学习交流，资料分享，经验交流，互相鼓励',
        memberCount: 890000,
        avatar: '📚'
      },
      {
        id: 3,
        name: '美食',
        description: '分享美食制作，探店体验，美食文化交流',
        memberCount: 760000,
        avatar: '🍔'
      },
      {
        id: 4,
        name: '健身',
        description: '健身知识分享，训练计划交流，健康生活方式',
        memberCount: 540000,
        avatar: '💪'
      },
      {
        id: 5,
        name: '摄影',
        description: '摄影技巧交流，作品分享，器材讨论',
        memberCount: 430000,
        avatar: '📷'
      },
      {
        id: 6,
        name: '旅行',
        description: '旅行攻略分享，美景欣赏，旅行故事',
        memberCount: 380000,
        avatar: '✈️'
      }
    ],
    
    // 当前查看的贴吧详情
    currentTieba: null,
    
    // 贴吧帖子列表
    tiebaPosts: [],
    
    // 搜索关键词
    searchKeyword: '',
    
    // 搜索结果
    searchResults: []
  }),

  getters: {
    getHotTiebas: (state) => state.hotTiebas,
    getCurrentTieba: (state) => state.currentTieba,
    getTiebaPosts: (state) => state.tiebaPosts,
    getSearchKeyword: (state) => state.searchKeyword,
    getSearchResults: (state) => state.searchResults
  },

  actions: {
    // 设置当前贴吧
    setCurrentTieba(tieba) {
      this.currentTieba = tieba
    },

    // 设置贴吧帖子列表
    setTiebaPosts(posts) {
      this.tiebaPosts = posts
    },

    // 设置搜索关键词
    setSearchKeyword(keyword) {
      this.searchKeyword = keyword
    },

    // 设置搜索结果
    setSearchResults(results) {
      this.searchResults = results
    },

    // 搜索贴吧
    searchTiebas(keyword) {
      this.searchKeyword = keyword
      
      if (!keyword.trim()) {
        this.searchResults = []
        return
      }

      // 模拟搜索逻辑
      const results = this.hotTiebas.filter(tieba => 
        tieba.name.toLowerCase().includes(keyword.toLowerCase()) ||
        tieba.description.toLowerCase().includes(keyword.toLowerCase())
      )
      
      this.searchResults = results
    },

    // 获取贴吧详情
    async fetchTiebaDetail(tiebaId) {
      // 模拟API调用
      const tieba = this.hotTiebas.find(t => t.id === tiebaId)
      if (tieba) {
        this.currentTieba = tieba
        return tieba
      }
      return null
    },

    // 获取贴吧帖子列表
    async fetchTiebaPosts(tiebaId) {
      // 模拟帖子数据
      const mockPosts = [
        {
          id: 1,
          title: '新手入门指南：如何快速上手游戏',
          content: '作为一个刚接触游戏的新手，我发现了一些很有用的技巧想和大家分享...',
          author: { name: '游戏达人', avatar: '👤' },
          tieba: '英雄联盟',
          createTime: '2小时前',
          replyCount: 156,
          likeCount: 890
        },
        {
          id: 2,
          title: '最新版本英雄强度分析',
          content: '新版本更新后，哪些英雄变得更强了？让我们一起来分析一下...',
          author: { name: '数据分析师', avatar: '📊' },
          tieba: '英雄联盟',
          createTime: '5小时前',
          replyCount: 234,
          likeCount: 1200
        },
        {
          id: 3,
          title: '赛事讨论：今晚的比赛预测',
          content: '今晚有两场重要的比赛，大家觉得哪支队伍会获胜？',
          author: { name: '赛事观察员', avatar: '🏆' },
          tieba: '英雄联盟',
          createTime: '1天前',
          replyCount: 89,
          likeCount: 450
        }
      ]
      
      this.tiebaPosts = mockPosts
      return mockPosts
    }
  }
})