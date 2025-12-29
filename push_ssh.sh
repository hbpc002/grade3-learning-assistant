#!/bin/bash

# GitHub SSH推送脚本
# 用户名: hbpc002
# 仓库名: grade3-learning-assistant

REPO_NAME="grade3-learning-assistant"
SSH_URL="git@github.com:hbpc002/$REPO_NAME.git"

echo "🚀 开始推送项目到 GitHub (SSH方式)"
echo "用户名: hbpc002"
echo "仓库: $REPO_NAME"
echo "SSH URL: $SSH_URL"
echo ""

# 检查是否已初始化Git
if [ ! -d ".git" ]; then
    echo "❌ 错误: Git仓库未初始化"
    exit 1
fi

# 检查是否有未提交的文件
if [ -z "$(git status --porcelain)" ]; then
    echo "⚠️  警告: 没有需要提交的文件"
else
    echo "📝 提交文件..."
    git add .
    git commit -m "Initial commit: 完整的小学三年级学习助手项目

✅ 已完成功能:
- 三大学科: 语文、数学、英语
- 学习模块: 课程系统和进度追踪
- 游戏模块: 测验和记忆游戏
- 视频模块: 内置视频 + 百度百科集成
- 成就系统: 经验值、等级、徽章
- 状态管理: Zustand + LocalStorage
- UI设计: 儿童友好的响应式界面

项目特点:
- 完整的教育学习平台
- 游戏化学习体验
- 儿童友好UI设计
- 生产就绪代码

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
fi

# 配置远程仓库 (SSH方式)
echo ""
echo "📡 配置SSH远程仓库..."
git remote remove origin 2>/dev/null
git remote add origin "$SSH_URL"
git branch -M main

# 推送到GitHub
echo ""
echo "📤 推送到GitHub (SSH)..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo "📁 仓库地址: https://github.com/hbpc002/$REPO_NAME"
    echo ""
    echo "🎉 你的小学三年级学习助手项目已上传到GitHub！"
    echo ""
    echo "接下来可以:"
    echo "1. 访问 https://github.com/hbpc002/$REPO_NAME 查看"
    echo "2. 在仓库设置中启用 GitHub Pages 进行部署"
    echo "3. 分享给其他开发者使用"
else
    echo ""
    echo "❌ 推送失败，请检查SSH密钥配置"
    echo "提示: 确保已将SSH公钥添加到GitHub"
fi
