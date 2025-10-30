from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json

@method_decorator(csrf_exempt, name='dispatch')
class APIRootView(View):
    """API根视图，提供项目信息和健康检查"""
    
    def get(self, request):
        """获取API根信息"""
        return JsonResponse({
            'project': '百度贴吧毕业设计项目',
            'version': '1.0.0',
            'description': '基于Django + Vue 3 + React 18的现代化贴吧应用',
            'status': 'running',
            'endpoints': {
                'auth': '/api/auth/',
                'tiebas': '/api/tiebas/',
                'posts': '/api/posts/',
                'comments': '/api/comments/',
                'admin': '/admin/'
            },
            'technologies': {
                'backend': 'Django + Django REST Framework',
                'frontend': 'Vue 3 + React 18 + Vite',
                'database': 'SQLite (开发环境)'
            }
        })
    
    def post(self, request):
        """健康检查端点"""
        return JsonResponse({
            'status': 'healthy',
            'timestamp': '2023-12-01T00:00:00Z',
            'message': 'API服务器运行正常'
        })

def api_health_check(request):
    """简单的健康检查"""
    return JsonResponse({
        'status': 'ok',
        'service': '百度贴吧API',
        'timestamp': '2023-12-01T00:00:00Z'
    })