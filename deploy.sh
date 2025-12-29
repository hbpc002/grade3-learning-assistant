#!/bin/bash

# 🚀 一键部署脚本
# 支持: Vercel, Netlify, GitHub Pages, Docker

echo "=================================="
echo "  小学三年级学习助手 - 部署工具"
echo "=================================="
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 显示菜单
echo "请选择部署平台:"
echo ""
echo "1) Vercel (推荐 - 最简单)"
echo "2) Netlify (推荐 - 功能丰富)"
echo "3) GitHub Pages (推荐 - 开源项目)"
echo "4) Docker (自托管)"
echo "5) 本地开发"
echo "6) 仅构建项目"
echo "0) 退出"
echo ""

read -p "输入选项 [0-6]: " choice

case $choice in
    1)
        echo ""
        echo "🚀 部署到 Vercel..."
        echo ""

        # 检查是否安装 vercel
        if ! command -v vercel &> /dev/null; then
            echo "📦 安装 Vercel CLI..."
            npm i -g vercel
        fi

        echo "登录 Vercel..."
        vercel login

        echo "开始部署..."
        vercel --prod
        ;;

    2)
        echo ""
        echo "🚀 部署到 Netlify..."
        echo ""

        # 检查是否安装 netlify
        if ! command -v netlify &> /dev/null; then
            echo "📦 安装 Netlify CLI..."
            npm i -g netlify-cli
        fi

        echo "登录 Netlify..."
        netlify login

        echo "构建项目..."
        npm run build

        echo "开始部署..."
        netlify deploy --prod --dir=dist
        ;;

    3)
        echo ""
        echo "🚀 部署到 GitHub Pages..."
        echo ""

        echo "检查 Git 状态..."
        git status

        echo ""
        echo "请确保："
        echo "1. 已推送到 GitHub 仓库"
        echo "2. 在仓库 Settings → Pages 中启用 GitHub Actions"
        echo "3. 工作流文件: .github/workflows/deploy-to-github-pages.yml"
        echo ""
        echo "推送代码后，自动部署将开始..."
        echo ""

        read -p "是否现在推送代码? (y/n): " push_choice
        if [ "$push_choice" = "y" ]; then
            git add .
            git commit -m "Deploy to GitHub Pages" || echo "没有变更需要提交"
            git push origin master
            echo ""
            echo "✅ 代码已推送！请访问 GitHub Actions 查看部署进度"
        fi
        ;;

    4)
        echo ""
        echo "🚀 Docker 部署..."
        echo ""

        # 检查是否安装 docker
        if ! command -v docker &> /dev/null; then
            echo "❌ 错误: 未安装 Docker"
            echo "请先安装 Docker: https://docs.docker.com/get-docker/"
            exit 1
        fi

        echo "构建并启动服务..."
        docker-compose up -d

        echo ""
        echo "✅ 部署完成！"
        echo "访问: http://localhost:8080"
        echo ""
        echo "常用命令:"
        echo "  查看日志: docker-compose logs -f"
        echo "  停止服务: docker-compose down"
        echo "  重启服务: docker-compose restart"
        ;;

    5)
        echo ""
        echo "🎯 启动本地开发服务器..."
        echo ""

        echo "安装依赖..."
        npm install

        echo "启动开发服务器..."
        npm run dev
        ;;

    6)
        echo ""
        echo "🏗️ 仅构建项目..."
        echo ""

        echo "安装依赖..."
        npm install

        echo "构建中..."
        npm run build

        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ 构建成功！"
            echo "构建产物在: dist/ 目录"
            echo "你可以手动上传到任何支持的云平台"
        else
            echo "❌ 构建失败"
            exit 1
        fi
        ;;

    0)
        echo "👋 再见！"
        exit 0
        ;;

    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "=================================="
echo "  部署完成！"
echo "=================================="
