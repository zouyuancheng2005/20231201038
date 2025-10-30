@echo off
echo 正在修复路径编码问题...

REM 创建临时目录（不包含中文字符）
set TEMP_DIR=C:\temp\tieba_project

REM 如果临时目录已存在，则删除
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"

REM 复制项目到临时目录
xcopy "%~dp0" "%TEMP_DIR%" /E /I /Y

REM 切换到临时目录并启动开发服务器
cd /d "%TEMP_DIR%"
echo 项目已复制到临时目录: %TEMP_DIR%
echo 正在启动前端开发服务器...
npm run dev

pause