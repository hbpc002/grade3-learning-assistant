# 小学三年级学习助手 🎓

一个专为小学三年级学生设计的教育学习平台，通过游戏化和视频教学让学习变得有趣！

## 🚀 项目简介

**小学三年级学习助手** 是一个基于现代Web技术的教育应用，旨在帮助8-9岁的小学生通过互动学习、游戏练习和视频教学来掌握基础知识。

### 核心特色

- 📚 **系统化课程**：语文、数学、英语三大学科
- 🎮 **游戏化学习**：测验、记忆配对等多种游戏
- 🎬 **视频教学**：内置视频库 + 百度百科集成
- 🏆 **成就系统**：等级、经验值、徽章奖励
- 📊 **进度追踪**：实时记录学习进度和统计数据

## 🛠️ 技术栈

- **前端框架**: React 18
- **路由**: React Router DOM
- **状态管理**: Zustand + TanStack Query
- **UI组件**: Shadcn/ui (自定义实现)
- **样式**: Tailwind CSS
- **构建**: Vite + TypeScript

## 📁 项目结构

```
grade3-learning-assistant/
├── src/
│   ├── components/          # React组件
│   │   ├── layout/         # 布局组件（首页、登录、应用布局）
│   │   ├── ui/             # 基础UI组件（Button、Card、Badge等）
│   │   ├── lesson/         # 学习相关组件
│   │   ├── game/           # 游戏组件（测验、记忆游戏等）
│   │   ├── video/          # 视频组件
│   │   └── progress/       # 进度追踪组件
│   ├── stores/             # 状态管理
│   │   ├── user-store.ts   # 用户进度状态
│   │   └── game-store.ts   # 游戏状态
│   ├── lib/                # 工具函数
│   ├── types/              # TypeScript类型定义
│   ├── api/                # 数据和API
│   │   └── mock-data.ts    # Mock数据
│   ├── routes/             # 路由配置
│   ├── styles/             # 全局样式
│   └── App.tsx             # 主应用组件
├── public/                 # 静态资源
├── index.html              # HTML入口
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript配置
├── tailwind.config.js      # Tailwind配置
└── vite.config.ts          # Vite配置
```

## 🎯 核心功能

### 1. 学习模块
- **语文**: 汉字识别、拼音学习、阅读理解
- **数学**: 加法、减法、基础运算
- **英语**: 字母认识、基础问候语

### 2. 游戏模块
- **测验游戏**: 多选题，计时挑战
- **记忆游戏**: 卡片配对，锻炼记忆力
- **拼图游戏**: 图片拼图，难度分级

### 3. 视频模块
- **内置视频**: 直接播放教学视频
- **百度百科**: 集成外部视频资源
- **关键词搜索**: 点击关键词跳转到百科

### 4. 成就系统
- **经验值系统**: 学习获得XP，升级解锁新内容
- **连续学习**: 每日签到，连续天数奖励
- **成就徽章**: 完成特定目标获得徽章

## 🚀 快速开始

### 环境要求
- Node.js 16+
- npm 或 yarn

### 安装依赖
```bash
cd grade3-learning-assistant
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:3000

### 生产构建
```bash
npm run build
```

### 预览构建
```bash
npm run preview
```

## 🎨 UI设计原则

### 儿童友好设计
- **大按钮**: 最小44px，易于点击
- **鲜艳色彩**: 不同科目使用不同主题色
- **清晰图标**: 使用emoji增强视觉理解
- **即时反馈**: 交互后立即给予视觉反馈

### 响应式设计
- **移动端优先**: 支持平板和手机
- **触摸优化**: 大触控区域，流畅动画
- **离线支持**: 本地存储用户进度

## 📊 数据结构

### 用户进度
```typescript
interface UserProgress {
  userId: string
  level: number          // 当前等级
  experience: number     // 经验值
  points?: number        // 积分
  earnedBadges?: string[] // 已获得徽章
  subjects: {            // 各科目进度
    chinese: SubjectProgress
    math: SubjectProgress
    english: SubjectProgress
  }
  achievements: Achievement[] // 成就列表
  streak: StreakInfo     // 连续学习
  totalPlayTime: number  // 总学习时间(分钟)
  lastActive: Date       // 最后活跃时间
}
```

### 课程数据
```typescript
interface Course {
  id: string
  subject: 'chinese' | 'math' | 'english'
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  content: CourseContent[]
  videoUrl?: string
  quizId?: string
  xpReward: number
}
```

## 🔧 配置说明

### 路径别名
```typescript
// tsconfig.json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}

// 使用示例
import { Button } from '@/components/ui/Button'
```

### 主题颜色
```javascript
// tailwind.config.js
colors: {
  primary: {
    chinese: '#3B82F6',  // 蓝色 🔵
    math: '#10B981',     // 绿色 🟢
    english: '#F59E0B',  // 黄色 🟡
  }
}
```

## 🎮 使用指南

### 1. 首次使用
1. 访问应用，点击"开始学习"
2. 输入用户名（无需密码）
3. 选择感兴趣的科目开始学习

### 2. 学习流程
1. **选择科目**: 语文、数学、英语
2. **完成课程**: 阅读内容，完成练习
3. **游戏巩固**: 通过游戏强化知识
4. **观看视频**: 通过视频深入理解
5. **查看进度**: 追踪学习成果

### 3. 获得奖励
- 完成课程: +50 XP
- 游戏胜利: +25-50 XP
- 观看视频: +30-50 XP
- 连续学习: 额外奖励
- 成就解锁: +100 积分

## 📱 移动端适配

### 触摸优化
- 按钮最小44px
- 滑动流畅
- 虚拟键盘友好

### 性能优化
- 组件懒加载
- 图片优化
- 代码分割

## 🔒 隐私保护

- **本地存储**: 所有数据存储在浏览器
- **无后端**: 不收集用户信息
- **离线可用**: 无需网络连接

## 🚢 部署建议

### 静态托管
- Vercel (推荐)
- Netlify
- GitHub Pages

### 配置步骤
```bash
# 1. 构建
npm run build

# 2. 部署 dist/ 目录到静态托管服务
```

## 🤝 贡献指南

欢迎贡献代码、修复bug或提出建议！

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🙏 致谢

- React 团队 - 优秀的UI库
- Tailwind CSS - 快速样式开发
- Shadcn/ui - 精美的组件设计
- 所有开源贡献者

---

**开发时间**: 2025年12月28日
**版本**: 1.0.0
**目标用户**: 小学三年级学生 (8-9岁)

祝所有小朋友学习愉快！🎓✨