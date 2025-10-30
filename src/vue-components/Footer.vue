<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>百度贴吧毕业设计项目</h3>
        <p>基于Vue 3 + React + Django REST Framework开发</p>
      </div>
      
      <div class="footer-section">
        <h4>功能特性</h4>
        <ul>
          <li>用户注册登录</li>
          <li>贴吧创建管理</li>
          <li>帖子发布浏览</li>
          <li>评论互动</li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>技术栈</h4>
        <ul>
          <li>前端: Vue 3 + React</li>
          <li>后端: Django REST Framework</li>
          <li>数据库: SQLite</li>
          <li>构建工具: Vite</li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 百度贴吧毕业设计项目. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
// Footer组件逻辑
</script>

<style scoped>
.footer {
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.footer-section h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 18px;
}

.footer-section h4 {
  color: #666;
  margin-bottom: 15px;
  font-size: 16px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 8px;
  color: #666;
}

.footer-bottom {
  border-top: 1px solid #e0e0e0;
  padding: 20px;
  text-align: center;
  color: #999;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>