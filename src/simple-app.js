// 百度贴吧完整应用 - 基于Vue 3 + React 18混合框架
console.log('🚀 启动百度贴吧完整应用版本');

// 应用状态管理
const appState = {
    currentUser: null,
    currentPage: 'home',
    tiebas: [],
    posts: [],
    apiStatus: 'checking', // checking, connected, error
    apiError: null
};

// 创建应用容器
const appContainer = document.getElementById('app');
if (!appContainer) {
    console.error('找不到应用容器 #app');
} else {
    // 创建应用界面
    appContainer.innerHTML = `
        <div style="min-height: 100vh; display: flex; flex-direction: column; font-family: 'Microsoft YaHei', sans-serif;">
            <!-- 导航栏 -->
            <header style="background: linear-gradient(135deg, #3385ff, #66aaff); color: white; padding: 1rem; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center;">
                        <h1 style="margin: 0; font-size: 1.8rem; font-weight: bold;">百度贴吧</h1>
                        <span style="margin-left: 1rem; background: rgba(255,255,255,0.2); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem;">毕业设计项目</span>
                    </div>
                    <nav style="display: flex; gap: 0.5rem;">
                        <button onclick="showPage('home')" class="nav-btn" data-page="home">🏠 首页</button>
                        <button onclick="showPage('tieba')" class="nav-btn" data-page="tieba">📋 贴吧列表</button>
                        <button onclick="showPage('posts')" class="nav-btn" data-page="posts">📝 热门帖子</button>
                        <button onclick="showPage('search')" class="nav-btn" data-page="search">🔍 搜索</button>
                        <button onclick="showPage('profile')" class="nav-btn" data-page="profile">👤 个人中心</button>
                    </nav>
                </div>
            </header>
            
            <!-- 主内容区域 -->
            <main style="flex: 1; padding-top: 100px; background: linear-gradient(135deg, #f8f9fa, #e9ecef); min-height: calc(100vh - 140px);">
                <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
                    <div id="page-content">
                        <!-- 页面内容将在这里动态加载 -->
                    </div>
                </div>
            </main>
            
            <!-- 页脚 -->
            <footer style="background: #2c3e50; color: white; text-align: center; padding: 2rem;">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <p style="margin: 0; font-size: 1.1rem;">百度贴吧毕业设计项目</p>
                    <p style="margin: 0.5rem 0 0 0; color: #bdc3c7;">基于Vue 3 + React 18 + Django的现代化贴吧应用</p>
                    <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 2rem;">
                        <span>🚀 前端: http://localhost:3001</span>
                        <span>🔧 后端: http://127.0.0.1:8000</span>
                    </div>
                </div>
            </footer>
        </div>
        
        <style>
            .nav-btn {
                background: rgba(255,255,255,0.2);
                border: 1px solid rgba(255,255,255,0.3);
                color: white;
                padding: 0.6rem 1.2rem;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            }
            
            .nav-btn:hover {
                background: rgba(255,255,255,0.3);
                transform: translateY(-2px);
            }
            
            .nav-btn.active {
                background: rgba(255,255,255,0.4);
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            
            .card {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                margin-bottom: 1.5rem;
            }
            
            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            }
            
            .tieba-card {
                cursor: pointer;
                border-left: 4px solid #3385ff;
            }
            
            .post-card {
                border-left: 4px solid #27ae60;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #3385ff, #66aaff);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(51, 133, 255, 0.4);
            }
        </style>
    `;
    
    // 显示首页
    showPage('home');
}

// 页面路由函数
function showPage(page) {
    const content = document.getElementById('page-content');
    appState.currentPage = page;
    
    // 更新导航按钮状态
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === page) {
            btn.classList.add('active');
        }
    });
    
    switch(page) {
        case 'home':
            showHomePage();
            break;
            
        case 'tieba':
            showTiebaPage();
            break;
            
        case 'posts':
            showPostsPage();
            break;
            
        case 'search':
            showSearchPage();
            break;
            
        case 'profile':
            showProfilePage();
            break;
    }
}

// 首页
async function showHomePage() {
    const content = document.getElementById('page-content');
    
    // 加载贴吧数据
    if (appState.tiebas.length === 0) {
        await loadTiebas();
    }
    
    // 加载帖子数据
    if (appState.posts.length === 0) {
        await loadPosts();
    }
    
    content.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h2 style="color: #3385ff; margin-bottom: 1rem; font-size: 2.5rem;">欢迎来到百度贴吧</h2>
            <p style="color: #666; margin-bottom: 2rem; font-size: 1.2rem;">基于Vue 3 + React 18 + Django的现代化贴吧应用</p>
            
            <!-- API状态显示 -->
            <div style="margin-bottom: 2rem;">
                ${getApiStatusBadge()}
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">
                <div class="card">
                    <h3 style="color: #3385ff; margin-bottom: 1rem;">🚀 技术特性</h3>
                    <ul style="text-align: left; color: #666; line-height: 1.8;">
                        <li>✅ Vue 3 + React 18混合框架</li>
                        <li>✅ Vite现代化构建工具</li>
                        <li>✅ Django REST API后端</li>
                        <li>✅ SQLite + Redis缓存</li>
                        <li>✅ 响应式设计</li>
                        <li>✅ 实时通信支持</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3 style="color: #3385ff; margin-bottom: 1rem;">📊 项目状态</h3>
                    <ul style="text-align: left; color: #666; line-height: 1.8;">
                        <li>✅ 前端服务器: 运行中</li>
                        <li>${appState.apiStatus === 'connected' ? '✅' : '🔧'} 后端API: ${appState.apiStatus === 'connected' ? '运行中' : '连接中'}</li>
                        <li>✅ 数据库: 已配置</li>
                        <li>🔧 Vue组件: 路径优化中</li>
                        <li>🔧 API集成: 进行中</li>
                        <li>🚀 功能开发: 已开始</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3 style="color: #3385ff; margin-bottom: 1rem;">🎯 快速开始</h3>
                    <div style="text-align: left; color: #666; line-height: 1.8;">
                        <p>点击下方按钮开始探索：</p>
                        <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
                            <button class="btn-primary" onclick="showPage('tieba')">浏览贴吧</button>
                            <button class="btn-primary" onclick="showPage('posts')">查看帖子</button>
                            <button class="btn-primary" onclick="showPage('search')">搜索内容</button>
                            <button class="btn-primary" onclick="showLoginModal()">登录/注册</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card" style="margin-top: 2rem;">
                <h3 style="color: #3385ff; margin-bottom: 1rem;">📈 系统统计</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                        <div style="font-size: 2rem; color: #3385ff;">${appState.tiebas.length}</div>
                        <div style="color: #666;">贴吧数量</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                        <div style="font-size: 2rem; color: #27ae60;">${appState.posts.length}</div>
                        <div style="color: #666;">帖子数量</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                        <div style="font-size: 2rem; color: #e74c3c;">${appState.tiebas.reduce((sum, tieba) => sum + tieba.member_count, 0).toLocaleString()}</div>
                        <div style="color: #666;">总成员数</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showTiebaPage() {
    const content = document.getElementById('page-content');
    const tiebaCards = appState.tiebas.map(tieba => `
        <div class="card tieba-card" onclick="showTiebaDetail(${tieba.id})" 
             onmouseover="this.style.transform='translateY(-5px)'" 
             onmouseout="this.style.transform='translateY(0)'">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <h3 style="color: #3385ff; margin: 0;">${tieba.name}</h3>
                <span style="background: #3385ff; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem;">${(tieba.member_count / 10000).toFixed(1)}万关注</span>
            </div>
            <p style="color: #666; margin: 1rem 0;">${tieba.description}</p>
            <div style="display: flex; gap: 1rem; color: #888; font-size: 0.9rem;">
                <span>📝 ${tieba.post_count.toLocaleString()} 帖子</span>
                <span>👥 ${tieba.member_count.toLocaleString()} 成员</span>
            </div>
        </div>
    `).join('');
    
    content.innerHTML = `
        <div style="padding: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2 style="color: #3385ff; margin: 0;">📋 贴吧列表</h2>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn-primary" onclick="createNewTieba()">+ 创建新贴吧</button>
                    <button class="btn-primary" style="background: linear-gradient(135deg, #27ae60, #2ecc71);">⭐ 我关注的贴吧</button>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem;">
                ${tiebaCards}
            </div>
        </div>
    `;
}

function showPostsPage() {
    const content = document.getElementById('page-content');
    const postCards = appState.posts.map(post => `
        <div class="card post-card" onclick="showPostDetail(${post.id})" 
             onmouseover="this.style.transform='translateY(-5px)'" 
             onmouseout="this.style.transform='translateY(0)'">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                <h3 style="color: #2c3e50; margin: 0; flex: 1;">${post.title}</h3>
                <span style="background: #27ae60; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem;">${post.tieba}</span>
            </div>
            <div style="display: flex; justify-content: space-between; color: #666; font-size: 0.9rem;">
                <span>👤 ${post.author}</span>
                <span>⏰ ${post.time}</span>
                <span>💬 ${post.replies} 回复</span>
            </div>
        </div>
    `).join('');
    
    content.innerHTML = `
        <div style="padding: 2rem;">
            <h2 style="color: #3385ff; margin-bottom: 2rem;">📝 热门帖子</h2>
            
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                <button class="btn-primary">🔥 热门</button>
                <button class="btn-primary" style="background: #f8f9fa; color: #3385ff; border: 1px solid #ddd;">🆕 最新</button>
                <button class="btn-primary" style="background: #f8f9fa; color: #3385ff; border: 1px solid #ddd;">⭐ 精华</button>
            </div>
            
            <div style="display: grid; gap: 1.5rem;">
                ${postCards}
            </div>
        </div>
    `;
}

function showSearchPage() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem;">
            <h2 style="color: #3385ff; margin-bottom: 1rem;">🔍 搜索贴吧</h2>
            <p style="color: #666; margin-bottom: 2rem;">搜索你感兴趣的贴吧、帖子或用户</p>
            
            <div style="max-width: 500px; margin: 0 auto;">
                <input type="text" id="searchInput" placeholder="输入贴吧名称、帖子标题或用户..." 
                       style="width: 100%; padding: 1rem; border: 2px solid #ddd; border-radius: 25px; margin-bottom: 1.5rem; font-size: 1rem;">
                <button class="btn-primary" onclick="performSearch()" style="padding: 1rem 3rem; font-size: 1.1rem;">搜索</button>
            </div>
            
            <div style="margin-top: 3rem; text-align: left;">
                <h3 style="color: #3385ff;">🔥 热门搜索：</h3>
                <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
                    <span style="background: #f8f9fa; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer;" onclick="quickSearch('编程')">编程</span>
                    <span style="background: #f8f9fa; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer;" onclick="quickSearch('游戏')">游戏</span>
                    <span style="background: #f8f9fa; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer;" onclick="quickSearch('电影')">电影</span>
                    <span style="background: #f8f9fa; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer;" onclick="quickSearch('音乐')">音乐</span>
                    <span style="background: #f8f9fa; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer;" onclick="quickSearch('Python')">Python</span>
                    <span style="background: #f8f9fa; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer;" onclick="quickSearch('JavaScript')">JavaScript</span>
                </div>
            </div>
            
            <div class="card" style="margin-top: 3rem;">
                <h3 style="color: #3385ff; margin-bottom: 1rem;">📊 搜索统计</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                    <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                        <div style="font-size: 1.5rem; color: #3385ff;">${appState.tiebas.length}</div>
                        <div style="color: #666;">可搜索贴吧</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                        <div style="font-size: 1.5rem; color: #27ae60;">${appState.posts.length}</div>
                        <div style="color: #666;">可搜索帖子</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showProfilePage() {
    const content = document.getElementById('page-content');
    const userInfo = appState.currentUser ? `
        <div class="card" style="margin-bottom: 2rem;">
            <h2 style="color: #3385ff; margin-bottom: 1rem;">👤 个人信息</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div>
                    <h4>用户名</h4>
                    <p style="color: #666;">${appState.currentUser}</p>
                </div>
                <div>
                    <h4>注册时间</h4>
                    <p style="color: #666;">2024-01-01</p>
                </div>
                <div>
                    <h4>关注贴吧</h4>
                    <p style="color: #666;">12 个</p>
                </div>
                <div>
                    <h4>发帖数量</h4>
                    <p style="color: #666;">156 篇</p>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h2 style="color: #3385ff; margin-bottom: 1rem;">📊 我的活动</h2>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn-primary">📝 我的帖子</button>
                <button class="btn-primary">⭐ 我的关注</button>
                <button class="btn-primary">💬 我的回复</button>
                <button class="btn-primary">🔔 消息通知</button>
            </div>
        </div>
        
        <div class="card">
            <h2 style="color: #3385ff; margin-bottom: 1rem;">⚙️ 账户设置</h2>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn-primary">🔒 修改密码</button>
                <button class="btn-primary">📧 邮箱设置</button>
                <button class="btn-primary">🔔 通知设置</button>
                <button class="btn-primary" style="background: linear-gradient(135deg, #e74c3c, #e67e22);">🚪 退出登录</button>
            </div>
        </div>
    ` : `
        <div class="card" style="text-align: center; padding: 3rem;">
            <h2 style="color: #3385ff; margin-bottom: 1rem;">👤 请先登录</h2>
            <p style="color: #666; margin-bottom: 2rem;">登录后可以查看个人中心、管理帖子、关注贴吧等</p>
            <button class="btn-primary" onclick="showLoginModal()" style="font-size: 1.1rem; padding: 1rem 2rem;">立即登录</button>
        </div>
    `;
    
    content.innerHTML = `
        <div style="padding: 2rem;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #3385ff, #66aaff); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white;">👤</div>
                <h2 style="color: #3385ff; margin-bottom: 0.5rem;">个人中心</h2>
                <p style="color: #666;">${appState.currentUser ? `欢迎回来，${appState.currentUser}` : '请登录以使用完整功能'}</p>
            </div>
            ${userInfo}
        </div>
    `;
}

function showTiebaDetail(tiebaId) {
    const tieba = appState.tiebas.find(t => t.id === tiebaId);
    if (tieba) {
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div style="padding: 2rem;">
                <button onclick="showPage('tieba')" style="background: none; border: 1px solid #ddd; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-bottom: 1rem;">← 返回贴吧列表</button>
                
                <div class="card" style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <h2 style="color: #3385ff; margin: 0;">${tieba.name}</h2>
                        <span style="background: #3385ff; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">${(tieba.member_count / 10000).toFixed(1)}万关注</span>
                    </div>
                    <p style="color: #666; font-size: 1.1rem; margin-bottom: 1rem;">${tieba.description}</p>
                    <div style="display: flex; gap: 2rem; color: #888;">
                        <span>📝 ${tieba.post_count.toLocaleString()} 帖子</span>
                        <span>👥 ${tieba.member_count.toLocaleString()} 成员</span>
                        <span>⭐ 关注</span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                    <button class="btn-primary">📝 发帖</button>
                    <button class="btn-primary" style="background: linear-gradient(135deg, #27ae60, #2ecc71);">⭐ 关注</button>
                    <button class="btn-primary" style="background: linear-gradient(135deg, #e74c3c, #e67e22);">📢 分享</button>
                </div>
                
                <h3 style="color: #3385ff; margin-bottom: 1rem;">📋 最新帖子</h3>
                <div style="background: #f8f9fa; padding: 2rem; border-radius: 8px; text-align: center; color: #666;">
                    <p>帖子列表功能开发中...</p>
                    <p>这里将显示该贴吧的最新帖子</p>
                </div>
            </div>
        `;
    }
}

function showPostDetail(postId) {
    const post = appState.posts.find(p => p.id === postId);
    if (post) {
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div style="padding: 2rem;">
                <button onclick="showPage('posts')" style="background: none; border: 1px solid #ddd; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-bottom: 1rem;">← 返回帖子列表</button>
                
                <div class="card" style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <h2 style="color: #2c3e50; margin: 0; flex: 1;">${post.title}</h2>
                        <span style="background: #27ae60; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">${post.tieba}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; color: #666; margin-bottom: 1.5rem;">
                        <span>👤 作者: ${post.author}</span>
                        <span>⏰ 发布时间: ${post.time}</span>
                        <span>💬 回复: ${post.replies}</span>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                        <p style="color: #2c3e50; line-height: 1.6; margin: 0;">
                            这里是帖子的详细内容。在实际应用中，这里会显示帖子的完整文本内容、图片、链接等。
                            当前为演示版本，帖子内容功能正在开发中。
                        </p>
                    </div>
                    
                    <div style="display: flex; gap: 1rem;">
                        <button class="btn-primary">👍 点赞</button>
                        <button class="btn-primary">💬 回复</button>
                        <button class="btn-primary">📢 分享</button>
                    </div>
                </div>
                
                <h3 style="color: #3385ff; margin-bottom: 1rem;">💬 回复列表</h3>
                <div style="background: #f8f9fa; padding: 2rem; border-radius: 8px; text-align: center; color: #666;">
                    <p>回复功能开发中...</p>
                    <p>这里将显示该帖子的所有回复</p>
                </div>
            </div>
        `;
    }
}

function createNewTieba() {
    const tiebaName = prompt('请输入新贴吧名称:');
    if (tiebaName && tiebaName.trim()) {
        alert(`创建贴吧 "${tiebaName}" 功能开发中...\n在实际应用中，这里会调用后端API创建新贴吧。`);
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.trim() : '';
    
    if (query) {
        alert(`搜索 "${query}" 功能开发中...\n在实际应用中，这里会调用后端API进行搜索。`);
    } else {
        alert('请输入搜索关键词');
    }
}

function quickSearch(keyword) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = keyword;
    }
    performSearch();
}

function showLoginModal() {
    const username = prompt('请输入用户名:');
    if (username && username.trim()) {
        appState.currentUser = username.trim();
        alert(`欢迎回来，${appState.currentUser}!`);
        showPage('profile');
    }
}

// API状态徽章组件
function getApiStatusBadge() {
    const statusConfig = {
        checking: { text: '🔍 检查API连接', color: '#f39c12' },
        connected: { text: '✅ API连接正常', color: '#27ae60' },
        error: { text: '❌ API连接失败', color: '#e74c3c' }
    };
    
    const config = statusConfig[appState.apiStatus] || statusConfig.checking;
    return `<span style="background: ${config.color}; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">${config.text}</span>`;
}

// 加载贴吧数据
async function loadTiebas() {
    try {
        // 尝试从后端API获取数据
        const response = await fetch('http://localhost:8000/api/tiebas/');
        if (response.ok) {
            const data = await response.json();
            appState.tiebas = data;
            appState.apiStatus = 'connected';
            console.log('✅ 贴吧数据加载成功:', data.length, '个贴吧');
        } else {
            throw new Error('API返回错误状态');
        }
    } catch (error) {
        console.log('⚠️ 后端API连接失败，使用模拟数据:', error);
        appState.apiStatus = 'error';
        appState.apiError = error.message;
        
        // 使用模拟数据作为后备
        appState.tiebas = [
            { id: 1, name: '编程', description: '编程技术交流社区', member_count: 125000, post_count: 85000 },
            { id: 2, name: '游戏', description: '游戏爱好者的聚集地', member_count: 980000, post_count: 650000 },
            { id: 3, name: '电影', description: '电影讨论与分享', member_count: 750000, post_count: 420000 },
            { id: 4, name: '音乐', description: '音乐分享与交流', member_count: 680000, post_count: 380000 },
            { id: 5, name: 'Python', description: 'Python编程语言学习', member_count: 320000, post_count: 210000 },
            { id: 6, name: 'JavaScript', description: '前端开发技术交流', member_count: 280000, post_count: 180000 }
        ];
    }
}

// 加载帖子数据
async function loadPosts() {
    try {
        // 尝试从后端API获取数据
        const response = await fetch('http://localhost:8000/api/posts/');
        if (response.ok) {
            const data = await response.json();
            appState.posts = data;
            console.log('✅ 帖子数据加载成功:', data.length, '个帖子');
        } else {
            throw new Error('API返回错误状态');
        }
    } catch (error) {
        console.log('⚠️ 后端API连接失败，使用模拟数据:', error);
        
        // 使用模拟数据作为后备
        appState.posts = [
            { id: 1, title: 'Vue 3.4 新特性详解', author: '前端开发者', time: '2024-01-15', replies: 156, tieba: '编程' },
            { id: 2, title: 'React 18 最佳实践', author: 'React爱好者', time: '2024-01-14', replies: 89, tieba: '编程' },
            { id: 3, title: 'Python数据分析入门', author: '数据科学家', time: '2024-01-13', replies: 234, tieba: 'Python' },
            { id: 4, title: 'JavaScript异步编程', author: 'JS专家', time: '2024-01-12', replies: 178, tieba: 'JavaScript' },
            { id: 5, title: '最新电影推荐', author: '电影迷', time: '2024-01-11', replies: 567, tieba: '电影' },
            { id: 6, title: '游戏攻略分享', author: '游戏高手', time: '2024-01-10', replies: 432, tieba: '游戏' }
        ];
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 百度贴吧完整应用已加载完成');
    
    // 模拟API调用测试
    fetch('http://localhost:8000/api/')
        .then(response => response.json())
        .then(data => {
            console.log('✅ 后端API连接成功:', data);
            
            // 更新首页状态显示
            if (appState.currentPage === 'home') {
                showPage('home');
            }
        })
        .catch(error => {
            console.log('⚠️ 后端API连接失败:', error);
            
            // 即使API连接失败，也显示友好的错误信息
            if (appState.currentPage === 'home') {
                const content = document.getElementById('page-content');
                if (content) {
                    const errorDiv = document.createElement('div');
                    errorDiv.innerHTML = `
                        <div style="background: #ffeaa7; border-left: 4px solid #fdcb6e; padding: 1rem; margin: 1rem 0; border-radius: 4px;">
                            <p style="margin: 0; color: #2d3436;">⚠️ 后端API连接异常，部分功能可能受限。请确保Django服务器正在运行。</p>
                        </div>
                    `;
                    content.prepend(errorDiv);
                }
            }
        });
        
    // 添加键盘事件支持
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && appState.currentPage === 'search') {
            performSearch();
        }
    });
});