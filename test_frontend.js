// 前端应用功能测试脚本
async function testFrontend() {
    console.log('🚀 开始测试百度贴吧前端应用功能...\n');
    
    // 测试API连接
    console.log('📡 测试API连接...');
    try {
        const response = await fetch('http://localhost:8000/api/');
        if (response.ok) {
            console.log('✅ API根路径连接正常');
        } else {
            console.log('❌ API根路径连接失败');
        }
    } catch (error) {
        console.log('❌ API连接错误:', error.message);
    }
    
    // 测试贴吧数据
    console.log('\n📋 测试贴吧数据...');
    try {
        const response = await fetch('http://localhost:8000/api/tiebas/');
        const data = await response.json();
        console.log(`✅ 获取到 ${data.length} 个贴吧数据`);
        
        // 显示前3个贴吧信息
        data.slice(0, 3).forEach((tieba, index) => {
            console.log(`   ${index + 1}. ${tieba.name} - 成员: ${tieba.member_count.toLocaleString()}, 帖子: ${tieba.post_count.toLocaleString()}`);
        });
    } catch (error) {
        console.log('❌ 贴吧数据获取失败:', error.message);
    }
    
    // 测试帖子数据
    console.log('\n📝 测试帖子数据...');
    try {
        const response = await fetch('http://localhost:8000/api/posts/posts/');
        const data = await response.json();
        console.log(`✅ 获取到 ${data.length} 个帖子数据`);
        
        // 显示前3个帖子信息
        data.slice(0, 3).forEach((post, index) => {
            console.log(`   ${index + 1}. ${post.title} - 作者: ${post.author}`);
        });
    } catch (error) {
        console.log('❌ 帖子数据获取失败:', error.message);
    }
    
    console.log('\n🎉 前端应用功能测试完成！');
    console.log('💡 请访问 http://localhost:3001/index-simple.html 查看完整应用');
}

// 运行测试
testFrontend().catch(console.error);