from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import api_views

urlpatterns = [
    # API根路径
    path('api/', api_views.APIRootView.as_view(), name='api_root'),
    path('api/health/', api_views.api_health_check, name='api_health'),
    
    # 管理后台
    path('admin/', admin.site.urls),
    
    # API路由
    path('api/auth/', include('users.urls')),
    path('api/tiebas/', include('tiebas.urls')),
    path('api/posts/', include('posts.urls')),
    path('api/comments/', include('comments.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)