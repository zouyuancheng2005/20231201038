<template>
  <div class="tieba-list">
    <div class="tieba-grid">
      <div 
        v-for="tieba in tiebas" 
        :key="tieba.id"
        class="tieba-card"
        @click="goToTieba(tieba.id)"
      >
        <div class="tieba-avatar">
          {{ tieba.avatar }}
        </div>
        <div class="tieba-info">
          <h3 class="tieba-name">{{ tieba.name }}</h3>
          <p class="tieba-description">{{ tieba.description }}</p>
          <div class="tieba-stats">
            <span class="member-count">👥 {{ tieba.memberCount.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  tiebas: {
    type: Array,
    default: () => []
  }
})

const goToTieba = (tiebaId) => {
  router.push(`/tieba/${tiebaId}`)
}
</script>

<style scoped>
.tieba-list {
  width: 100%;
}

.tieba-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.tieba-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 16px;
}

.tieba-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  border-color: #007AFF;
}

.tieba-avatar {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.tieba-info {
  flex: 1;
  min-width: 0;
}

.tieba-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tieba-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tieba-stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.member-count {
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tieba-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .tieba-card {
    padding: 16px;
  }
  
  .tieba-avatar {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .tieba-name {
    font-size: 16px;
  }
}
</style>