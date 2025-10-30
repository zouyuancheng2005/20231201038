<template>
  <div class="post-detail">
    <!-- 帖子内容 -->
    <div class="post-content">
      <div class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="author">作者: {{ post.author.name }}</span>
          <span class="time">{{ post.createTime }}</span>
          <span class="tieba">贴吧: {{ post.tieba }}</span>
        </div>
      </div>
      
      <div class="post-body">
        <p>{{ post.content }}</p>
      </div>
      
      <div class="post-actions">
        <button class="btn btn-like" @click="handleLike">
          👍 {{ post.likeCount }}
        </button>
        <button class="btn btn-reply" @click="showReplyForm = !showReplyForm">
          💬 回复
        </button>
        <button class="btn btn-share">
          📤 分享
        </button>
      </div>
    </div>

    <!-- 回复表单 -->
    <div v-if="showReplyForm" class="reply-form">
      <textarea 
        v-model="replyContent" 
        placeholder="写下你的回复..."
        rows="4"
      ></textarea>
      <div class="form-actions">
        <button class="btn btn-primary" @click="submitReply">发表回复</button>
        <button class="btn btn-secondary" @click="showReplyForm = false">取消</button>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="comments-section">
      <h3>评论 ({{ comments.length }})</h3>
      
      <div class="comments-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-avatar">{{ comment.author.avatar }}</div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-author">{{ comment.author.name }}</span>
              <span class="comment-time">{{ comment.createTime }}</span>
            </div>
            <p class="comment-text">{{ comment.content }}</p>
            <div class="comment-actions">
              <button class="btn btn-sm" @click="handleCommentLike(comment)">
                👍 {{ comment.likeCount }}
              </button>
              <button class="btn btn-sm">回复</button>
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
const postId = route.params.id

// 帖子数据
const post = ref({
  id: postId,
  title: '大家最近在玩什么游戏？推荐一下',
  content: '最近游戏荒了，求推荐一些好玩的游戏，最好是单机RPG类型的。最近玩了《艾尔登法环》感觉很不错，还有没有类似的游戏推荐？',
  author: { name: '游戏玩家', avatar: '👤' },
  tieba: '游戏',
  likeCount: 89,
  replyCount: 156,
  createTime: '2小时前'
})

// 评论数据
const comments = ref([
  {
    id: 1,
    content: '推荐《巫师3》，剧情和世界观都很棒！',
    author: { name: 'RPG爱好者', avatar: '👤' },
    likeCount: 23,
    createTime: '1小时前'
  },
  {
    id: 2,
    content: '《塞尔达传说：荒野之息》也很不错，开放世界做得很好',
    author: { name: '任天堂粉丝', avatar: '👤' },
    likeCount: 18,
    createTime: '45分钟前'
  }
])

const showReplyForm = ref(false)
const replyContent = ref('')

onMounted(() => {
  console.log('加载帖子详情:', postId)
})

const handleLike = () => {
  post.value.likeCount++
  console.log('点赞帖子')
}

const handleCommentLike = (comment) => {
  comment.likeCount++
  console.log('点赞评论:', comment.id)
}

const submitReply = () => {
  if (!replyContent.value.trim()) return
  
  const newComment = {
    id: comments.value.length + 1,
    content: replyContent.value,
    author: { name: '当前用户', avatar: '👤' },
    likeCount: 0,
    createTime: '刚刚'
  }
  
  comments.value.unshift(newComment)
  replyContent.value = ''
  showReplyForm.value = false
  console.log('发表回复:', newComment)
}
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post-content {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.post-header {
  margin-bottom: 24px;
}

.post-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #333;
}

.post-meta {
  display: flex;
  gap: 20px;
  color: #666;
  font-size: 14px;
}

.post-body {
  margin-bottom: 24px;
  line-height: 1.6;
  font-size: 16px;
  color: #333;
}

.post-actions {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-like {
  background: #f0f0f0;
  color: #333;
}

.btn-reply {
  background: #007AFF;
  color: white;
}

.btn-share {
  background: #34C759;
  color: white;
}

.reply-form {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.reply-form textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  resize: vertical;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.btn-primary {
  background: #007AFF;
  color: white;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.comments-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.comments-section h3 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

.comment-item {
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.comment-author {
  font-weight: 600;
  color: #333;
}

.comment-time {
  color: #666;
  font-size: 12px;
}

.comment-text {
  color: #333;
  line-height: 1.5;
  margin-bottom: 8px;
}

.comment-actions {
  display: flex;
  gap: 12px;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
  background: #f0f0f0;
  color: #666;
}

@media (max-width: 768px) {
  .post-detail {
    padding: 12px;
  }
  
  .post-title {
    font-size: 24px;
  }
  
  .post-meta {
    flex-direction: column;
    gap: 8px;
  }
}
</style>