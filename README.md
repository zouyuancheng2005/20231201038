# 百度贴吧毕业设计项目

基于Veaury混合框架（Vue + React）和Django REST Framework的现代化贴吧系统。

## 项目概述

本项目是一个完整的贴吧系统，包含前端混合框架应用和后端API服务，实现了用户管理、贴吧管理、帖子发布、评论互动等核心功能。

## 技术栈

### 前端技术
- **框架**: Veaury (Vue 3 + React 18 混合框架)
- **构建工具**: Vite
- **UI组件库**: Ant Design (React) + Element Plus (Vue)
- **状态管理**: Pinia (Vue)
- **路由**: Vue Router
- **HTTP客户端**: Axios

### 后端技术
- **框架**: Django 4.2 + Django REST Framework
- **数据库**: MySQL
- **缓存**: Redis
- **实时通信**: Django Channels
- **任务队列**: Celery
- **认证**: Token Authentication

## 项目结构

```
20231201038/
├── src/                    # 前端源码
│   ├── vue-components/     # Vue组件
│   ├── react-components/  # React组件
│   ├── stores/            # 状态管理
│   ├── router/            # 路由配置
│   └── main.js           # 应用入口
├── backend/               # 后端Django项目
│   ├── tieba_project/     # 项目配置
│   ├── users/            # 用户管理应用
│   ├── tiebas/           # 贴吧管理应用
│   ├── posts/            # 帖子管理应用
│   └── comments/         # 评论管理应用
├── package.json           # 前端依赖
├── vite.config.js        # Vite配置
└── requirements.txt       # 后端依赖
```

## 功能特性

### 用户系统
- 用户注册/登录/退出
- 个人信息管理
- 贴吧关注/取消关注
- 消息通知系统

### 贴吧管理
- 贴吧创建/编辑
- 贴吧分类浏览
- 热门贴吧推荐
- 贴吧搜索功能

### 帖子系统
- 帖子发布/编辑/删除
- 帖子分类浏览
- 帖子搜索功能
- 点赞/收藏功能

### 评论系统
- 评论发布/回复
- 评论点赞功能
- 评论楼层显示

### 实时功能
- 实时消息推送
- 在线用户状态
- 实时帖子更新

## 快速开始

### 环境要求
- Node.js 16+
- Python 3.8+
- MySQL 5.7+
- Redis 6.0+

### 前端启动

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 构建生产版本
```bash
npm run build
```

### 后端启动

1. 创建虚拟环境
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
```

2. 安装依赖
```bash
pip install -r requirements.txt
```

3. 配置数据库
```bash
# 创建数据库
mysql -u root -p
CREATE DATABASE tieba_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

4. 环境配置
创建 `.env` 文件：
```env
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=tieba_db
DB_USER=root
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=3306
```

5. 数据库迁移
```bash
python manage.py makemigrations
python manage.py migrate
```

6. 创建超级用户
```bash
python manage.py createsuperuser
```

7. 启动开发服务器
```bash
python manage.py runserver
```

## API接口文档

### 用户认证
- `POST /api/auth/register/` - 用户注册
- `POST /api/auth/login/` - 用户登录
- `POST /api/auth/logout/` - 用户退出
- `GET /api/auth/profile/` - 获取用户信息

### 贴吧管理
- `GET /api/tiebas/` - 获取贴吧列表
- `GET /api/tiebas/{id}/` - 获取贴吧详情
- `POST /api/tiebas/` - 创建贴吧（需要认证）
- `PUT /api/tiebas/{id}/` - 更新贴吧（需要权限）

### 帖子管理
- `GET /api/posts/` - 获取帖子列表
- `GET /api/posts/{id}/` - 获取帖子详情
- `POST /api/posts/` - 发布帖子（需要认证）
- `PUT /api/posts/{id}/` - 更新帖子（需要权限）

## 开发计划

### 第一阶段（已完成）
- [x] 项目架构设计
- [x] 前端基础框架搭建
- [x] 后端基础框架搭建
- [x] 数据库设计

### 第二阶段（进行中）
- [ ] 用户认证系统
- [ ] 贴吧管理功能
- [ ] 帖子发布功能
- [ ] 前端页面开发

### 第三阶段
- [ ] 评论系统
- [ ] 实时通信
- [ ] 搜索功能
- [ ] 移动端适配

### 第四阶段
- [ ] 性能优化
- [ ] 安全加固
- [ ] 部署上线
- [ ] 测试验收

## 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证。

## 联系方式

- 项目负责人：邹同学
- 邮箱：example@email.com
- 项目文档：[项目文档链接]

## 更新日志

### v1.0.0 (2024-01-xx)
- 项目初始版本
- 基础架构搭建
- 核心功能开发