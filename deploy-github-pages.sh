#!/bin/bash

# 🚀 GitHub Pages 专用部署脚本
# 解决"正在加载学习助手"卡住的问题

echo "=================================="
echo "  GitHub Pages 部署修复工具"
echo "=================================="
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

echo "🔧 修复GitHub Pages加载问题..."
echo ""

# 步骤1: 构建项目
echo "步骤1: 构建项目..."
export BASE_URL="/grade3-learning-assistant"
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建完成"
echo ""

# 步骤2: 复制404页面
echo "步骤2: 复制404页面..."
cp 404.html dist/
echo "✅ 404页面已复制"
echo ""

# 步骤3: 创建GitHub Pages专用的index.html
echo "步骤3: 创建GitHub Pages专用入口文件..."
cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>小学三年级学习助手</title>
    <meta name="description" content="寓教于乐的小学三年级学习平台" />
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }
        .container { text-align: center; }
        .logo { font-size: 4rem; margin-bottom: 1rem; animation: bounce 2s infinite; }
        .text { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; }
        .spinner {
            width: 50px; height: 50px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 1.5rem auto;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .error {
            background: rgba(255,255,255,0.95);
            color: #333;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
            max-width: 400px;
            display: none;
        }
        .error.show { display: block; }
        .btn {
            background: #667eea; color: white; border: none;
            padding: 10px 20px; border-radius: 6px; cursor: pointer;
            margin: 5px; font-size: 1rem;
        }
        .btn:hover { background: #5568d3; }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">📚</div>
        <div class="text">正在加载学习助手</div>
        <div class="spinner"></div>
        <div id="error" class="error">
            <h3>⚠️ 加载失败</h3>
            <p>如果页面长时间未加载：</p>
            <p>1. 检查网络连接</p>
            <p>2. 点击刷新按钮</p>
            <p>3. 或访问: hbpc002.github.io/grade3-learning-assistant</p>
            <button class="btn" onclick="window.location.reload()">🔄 刷新</button>
            <button class="btn" onclick="window.location.href='/'">🏠 首页</button>
        </div>
    </div>

    <script type="module" src="./assets/index-56206d38.js"></script>

    <script>
        // GitHub Pages 兼容性处理
        (function() {
            // 10秒后显示错误信息
            setTimeout(() => {
                document.getElementById('error').classList.add('show');
            }, 10000);

            // 自动重定向处理
            if (window.location.pathname.includes('404')) {
                setTimeout(() => {
                    window.location.href = window.location.origin + '/grade3-learning-assistant/';
                }, 2000);
            }

            // 检测是否已加载
            window.addEventListener('load', () => {
                document.getElementById('error').style.display = 'none';
            });
        })();
    </script>
</body>
</html>
EOF

echo "✅ GitHub Pages专用入口文件已创建"
echo ""

# 步骤4: 显示部署说明
echo "步骤4: 部署说明"
echo "=================================="
echo "✅ 修复完成！"
echo ""
echo "📦 构建产物在: dist/ 目录"
echo ""
echo "🚀 部署方法:"
echo "   1. 手动上传: 将 dist/ 目录内容上传到 GitHub Pages"
echo "   2. 自动部署: 推送代码，Actions会自动部署"
echo ""
echo "🌐 访问地址:"
echo "   https://hbpc002.github.io/grade3-learning-assistant/"
echo ""
echo "🔧 如果仍有问题:"
echo "   1. 在 GitHub 仓库 Settings → Pages 中检查"
echo "   2. 确保 Source 选择 'GitHub Actions'"
echo "   3. 查看 Actions 标签页的部署日志"
echo ""
echo "=================================="
