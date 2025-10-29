@echo off
echo 启动百度贴吧项目后端服务...

REM 检查是否在backend目录
if not exist "backend" (
    echo 错误：请在项目根目录运行此脚本
    pause
    exit /b 1
)

REM 检查虚拟环境
if not exist "backend\venv" (
    echo 创建Python虚拟环境...
    py -m venv backend\venv
)

REM 激活虚拟环境
call backend\venv\Scripts\activate

REM 安装依赖
echo 安装Python依赖包...
pip install -r backend\requirements.txt

REM 检查环境配置文件
if not exist "backend\.env" (
    echo 创建环境配置文件...
    (
        echo SECRET_KEY=django-insecure-your-secret-key-change-this-in-production
        echo DEBUG=True
        echo DB_NAME=tieba_db
        echo DB_USER=root
        echo DB_PASSWORD=password
        echo DB_HOST=localhost
        echo DB_PORT=3306
    ) > backend\.env
    echo 请编辑 backend\.env 文件配置数据库连接信息
)

REM 切换到backend目录
cd backend

REM 运行数据库迁移
echo 运行数据库迁移...
python manage.py makemigrations
python manage.py migrate

REM 创建超级用户（如果不存在）
echo 创建超级用户（如果不存在）...
python manage.py createsuperuser --username=admin --email=admin@example.com --noinput 2>nul || (
    echo 超级用户已存在或创建失败
)

REM 启动开发服务器
echo 启动Django开发服务器...
python manage.py runserver 0.0.0.0:8000

pause