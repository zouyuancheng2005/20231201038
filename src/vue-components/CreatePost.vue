<template>
  <div class="create-post">
    <div class="create-post-container">
      <h1 class="page-title">发布新帖子</h1>
      
      <form @submit.prevent="submitPost" class="post-form">
        <!-- 选择贴吧 -->
        <div class="form-group">
          <label for="tieba" class="form-label">选择贴吧</label>
          <select 
            id="tieba" 
            v-model="post.tiebaId" 
            class="form-select"
            required
          >
            <option value="">请选择贴吧</option>
            <option v-for="tieba in followedTiebas" :key="tieba.id" :value="tieba.id">
              {{ tieba.name }}
            </option>
          </select>
        </div>

        <!-- 帖子标题 -->
        <div class="form-group">
          <label for="title" class="form-label">帖子标题</label>
          <input 
            id="title"
            v-model="post.title" 
            type="text" 
            class="form-input"
            placeholder="请输入帖子标题"
            maxlength="100"
            required
          >
          <div class="char-count">{{ post.title.length }}/100</div>
        </div>

        <!-- 帖子内容 -->
        <div class="form-group">
          <label for="content" class="form-label">帖子内容</label>
          <textarea 
            id="content"
            v-model="post.content" 
            class="form-textarea"
            placeholder="请输入帖子内容..."
            rows="10"
            maxlength="5000"
            required
          ></textarea>
          <div class="char-count">{{ post.content.length }}/5000</div>
        </div>

        <!-- 帖子类型 -->
        <div class="form-group">
          <label class="form-label">帖子类型</label>
          <div class="radio-group">
            <label class="radio-label">
              <input 
                v-model="post.type" 
                type="radio" 
                value="normal" 
                checked
              >
              <span class="radio-text">普通帖子</span>
            </label>
            <label class="radio-label">
              <input 
                v-model="post.type" 
                type="radio" 
                value="question" 
              >
              <span class="radio-text">提问帖</span>
            </label>
            <label class="radio-label">
              <input 
                v-model="post.type" 
                type="radio" 
                value="share" 
              >
              <span class="radio-text">分享帖</span>
            </label>
          </div>
        </div>

        <!-- 标签 -->
        <div class="form-group">
          <label for="tags" class="form-label">标签（可选）</label>
          <div class="tags-input-container">
            <input 
              id="tags"
              v-model="tagInput" 
              type="text" 
              class="form-input"
              placeholder="输入标签后按回车添加"
              @keydown.enter.prevent="addTag"
            >
            <div class="tags-list">
              <span 
                v-for="tag in post.tags" 
                :key="tag" 
                class="tag"
                @click="removeTag(tag)"
              >
                {{ tag }} ×
              </span>
            </div>
          </div>
        </div>

        <!-- 表单操作 -->
        <div class="form-actions">
          <button 
            type="button" 
            class="btn btn-secondary"
            @click="$router.back()"
          >
            取消
          </button>
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="submitting"
          >
            <span v-if="submitting" class="loading-text">
              <span class="spinner"></span> 发布中...
            </span>
            <span v-else>发布帖子</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 帖子数据
const post = ref({
  tiebaId: '',
  title: '',
  content: '',
  type: 'normal',
  tags: []
})

// 标签输入
const tagInput = ref('')

// 提交状态
const submitting = ref(false)

// 关注的贴吧数据
const followedTiebas = ref([
  { id: 1, name: '游戏' },
  { id: 2, name: '动漫' },
  { id: 3, name: '音乐' },
  { id: 4, name: '体育' }
])

onMounted(() => {
  console.log('加载发帖页面')
})

// 添加标签
const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !post.value.tags.includes(tag)) {
    post.value.tags.push(tag)
    tagInput.value = ''
  }
}

// 移除标签
const removeTag = (tag) => {
  post.value.tags = post.value.tags.filter(t => t !== tag)
}

// 提交帖子
const submitPost = async () => {
  if (!validateForm()) return
  
  submitting.value = true
  
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里可以添加实际的API调用
    console.log('发布帖子:', post.value)
    
    // 发布成功后跳转
    router.push(`/tieba/${post.value.tiebaId}`)
    
  } catch (error) {
    console.error('发布失败:', error)
    alert('发布失败，请重试')
  } finally {
    submitting.value = false
  }
}

// 表单验证
const validateForm = () => {
  if (!post.value.tiebaId) {
    alert('请选择贴吧')
    return false
  }
  
  if (!post.value.title.trim()) {
    alert('请输入帖子标题')
    return false
  }
  
  if (!post.value.content.trim()) {
    alert('请输入帖子内容')
    return false
  }
  
  return true
}
</script>

<style scoped>
.create-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.create-post-container {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.post-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

.form-input,
.form-select,
.form-textarea {
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #007AFF;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #888;
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-text {
  font-size: 14px;
  color: #333;
}

.tags-input-container {
  position: relative;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.tag {
  background: #007AFF;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tag:hover {
  background: #0056CC;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #007AFF;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0056CC;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.loading-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .create-post {
    padding: 12px;
  }
  
  .create-post-container {
    padding: 20px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 12px;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>