#!/bin/bash

# GitHub推送脚本
# 使用方法: ./push.sh YOUR_USERNAME

if [ -z "$1" ]; then
    echo "❌ 请提供GitHub用户名"
    echo "用法: ./push.sh YOUR_USERNAME"
    exit 1
fi

USERNAME=$1
REPO_NAME="grade3-learning-assistant"

echo "🚀 开始推送项目到 GitHub..."
echo "用户名: $USERNAME"
echo "仓库名: $REPO_NAME"
echo ""

# 检查是否已初始化Git
if [ ! -d ".git" ]; then
    echo "❌ 错误: Git仓库未初始化"
    exit 1
fi

# 设置远程仓库
echo "📡 配置远程仓库..."
git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git" 2>/dev/null || echo "远程仓库已存在"

# 切换到main分支
git branch -M main

# 提交代码
echo "📝 提交代码..."
git commit -m "Initial commit: 完整的小学三年级学习助手项目

✅ 已完成功能:
- 三大学科: 语文、数学、英语
- 学习模块: 课程系统和进度追踪
- 游戏模块: 测验和记忆游戏
- 视频模块: 内置视频 + 百度百科集成
- 成就系统: 经验值、等级、徽章
- 状态管理: Zustand + LocalStorage
- UI设计: 儿童友好的响应式界面

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>" 2>/dev/null || echo "提交已存在"

# 推送到GitHub
echo "📤 推送到GitHub..."
git push -u origin main

echo ""
echo "✅ 完成！"
echo "访问你的仓库: https://github.com/$USERNAME/$REPO_NAME"
