# 🚀 多云平台部署指南

本项目支持多种云平台部署，选择最适合你的方式！

---

## 📋 快速选择

| 平台 | 难度 | 速度 | 成本 | 推荐场景 |
|------|------|------|------|----------|
| **Vercel** | ⭐ | ⚡⚡⚡ | 免费 | 个人项目、快速部署 |
| **Netlify** | ⭐ | ⚡⚡⚡ | 免费 | 静态网站、CI/CD |
| **GitHub Pages** | ⭐⭐ | ⚡⚡ | 免费 | 开源项目、GitHub生态 |
| **Docker** | ⭐⭐⭐ | ⚡⚡ | 自托管 | 生产环境、私有部署 |

---

## 1️⃣ Vercel 部署（推荐 ⭐⭐⭐⭐⭐）

### 一键部署
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hbpc002/grade3-learning-assistant)

### 手动部署步骤

#### 方法 A: Vercel CLI
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 或者推送到 Git 后自动部署
vercel --prod
```

#### 方法 B: GitHub 集成
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New Project"
3. 导入 GitHub 仓库 `hbpc002/grade3-learning-assistant`
4. 配置：
   - **Framework Preset**: `Other`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. 点击 "Deploy"

### Vercel 配置说明
项目已包含 `vercel.json`，无需额外配置：
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

**优点**：
- ✅ 零配置部署
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自动 CI/CD
- ✅ 自定义域名支持

---

## 2️⃣ Netlify 部署（推荐 ⭐⭐⭐⭐）

### 一键部署
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository-url=https://github.com/hbpc002/grade3-learning-assistant)

### 手动部署步骤

#### 方法 A: Netlify CLI
```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod

# 或者构建后部署
npm run build
netlify deploy --prod --dir=dist
```

#### 方法 B: GitHub 集成
1. 访问 [app.netlify.com](https://app.netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 连接 GitHub 仓库
4. 配置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. 点击 "Deploy site"

### Netlify 配置说明
项目已包含 `netlify.toml`，无需额外配置：
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

**优点**：
- ✅ 自动 HTTPS
- ✅ 表单处理
- ✅ 函数支持
- ✅ A/B 测试
- ✅ 自定义域名 + CDN

---

## 3️⃣ GitHub Pages 部署（推荐 ⭐⭐⭐）

### 自动部署（推荐）

项目已包含 `.github/workflows/deploy-to-github-pages.yml`，只需：

1. **启用 GitHub Pages**：
   - 进入仓库 Settings → Pages
   - Source: "GitHub Actions"
   - 保存

2. **触发部署**：
   - 推送代码到 `master` 分支
   - 或手动运行 Actions

### 手动部署

```bash
# 1. 构建项目
npm run build

# 2. 创建 gh-pages 分支（可选）
git checkout --orphan gh-pages
git rm -rf .

# 3. 复制构建产物
cp -r dist/* ./

# 4. 提交并推送
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# 5. 启用 Pages
# Settings → Pages → Source: gh-pages branch
```

**优点**：
- ✅ 完全免费
- ✅ 与代码仓库集成
- ✅ 自动 HTTPS
- ✅ 适合开源项目

**注意**：
- ⚠️ 需要配置 `BASE_URL` 环境变量
- ⚠️ 路由可能需要额外配置

---

## 4️⃣ Docker 部署（自托管 ⭐⭐⭐⭐）

### 方法 A: 使用 Docker Compose（推荐）

```bash
# 1. 构建并启动
docker-compose up -d

# 2. 查看日志
docker-compose logs -f

# 3. 停止服务
docker-compose down

# 4. 更新服务
docker-compose pull
docker-compose up -d --build
```

访问: http://localhost:8080

### 方法 B: 手动 Docker 命令

```bash
# 1. 构建镜像
docker build -t grade3-learning-assistant:latest .

# 2. 运行容器
docker run -d \
  --name grade3-learning-assistant \
  -p 8080:80 \
  --restart unless-stopped \
  grade3-learning-assistant:latest

# 3. 查看日志
docker logs -f grade3-learning-assistant

# 4. 停止容器
docker stop grade3-learning-assistant
docker rm grade3-learning-assistant
```

### 方法 C: 部署到云服务器

```bash
# 1. 上传到服务器
scp -r . user@your-server:/opt/grade3-learning-assistant

# 2. SSH 连接服务器
ssh user@your-server

# 3. 进入目录
cd /opt/grade3-learning-assistant

# 4. 启动服务
docker-compose up -d

# 5. 配置反向代理（可选）
# 使用 Nginx 或 Caddy 配置域名
```

**优点**：
- ✅ 完全控制
- ✅ 数据私有
- ✅ 可自定义配置
- ✅ 适合生产环境

**Docker 配置说明**：
- `Dockerfile`: 多阶段构建，优化镜像大小
- `nginx.conf`: 单页应用优化配置
- `docker-compose.yml`: 一键部署配置
- `.dockerignore`: 减小构建上下文

---

## 5️⃣ 其他云平台

### 阿里云 OSS + CDN
```bash
# 1. 构建
npm run build

# 2. 上传到 OSS
ossutil cp -r dist/ oss://your-bucket/

# 3. 配置 CDN 加速
```

### 腾讯云 COS + CDN
```bash
# 1. 构建
npm run build

# 2. 上传到 COS
coscli sync dist/ cos://your-bucket/

# 3. 配置 CDN
```

### AWS S3 + CloudFront
```bash
# 1. 构建
npm run build

# 2. 上传到 S3
aws s3 sync dist/ s3://your-bucket/

# 3. 创建 CloudFront 分发
```

---

## 🔧 环境变量配置

### 生产环境配置
创建 `.env.production`：
```env
# API 配置（如果需要后端）
VITE_API_URL=https://api.yourdomain.com

# 分析工具（可选）
VITE_GA_ID=GA-XXXXXX
VITE_SENTRY_DSN=your-sentry-dsn
```

### 自定义域名配置

#### Vercel
1. Settings → Domains
2. 添加域名
3. 配置 DNS

#### Netlify
1. Domain settings
2. Add custom domain
3. 配置 DNS

#### GitHub Pages
1. Settings → Pages
2. Custom domain
3. 配置 DNS

---

## 🛡️ 安全配置

### HTTPS
所有平台默认启用 HTTPS。

### 安全头部
项目已配置基本安全头部：
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection

### CORS（如果需要 API）
在后端配置 CORS 策略。

---

## 📊 性能优化

### 构建优化
```bash
# 分析包大小
npm run build -- --report

# 压缩图片
npm install -g imagemin-cli
imagemin src/assets/images/* --out-dir=dist/assets/images
```

### CDN 优化
- 启用 Gzip/Brotli 压缩
- 配置缓存策略
- 使用图片 CDN

---

## 🐛 常见问题

### Q: 部署后页面空白？
**A**: 检查路由配置，确保是单页应用路由重写。

### Q: 刷新 404 错误？
**A**: 配置重写规则到 `index.html`。

### Q: 静态资源 404？
**A**: 检查 `BASE_URL` 环境变量。

### Q: Docker 端口冲突？
**A**: 修改 `docker-compose.yml` 中的端口映射。

---

## 📈 监控和日志

### Vercel
- 内置分析和日志
- 性能监控

### Netlify
- 部署日志
- 函数日志
- 性能分析

### Docker
```bash
# 查看日志
docker logs -f container-name

# 监控资源
docker stats container-name
```

---

## 🎯 部署建议

### 开发测试
- **Vercel**: 最快，零配置
- **Netlify**: 功能丰富

### 生产环境
- **Docker**: 完全控制，数据私有
- **Vercel Pro**: 企业级功能

### 开源项目
- **GitHub Pages**: 免费，集成好

---

## 📞 技术支持

如有问题，请查看：
- [项目 README.md](./README.md)
- [快速开始指南](./QUICKSTART.md)
- [项目总结](./PROJECT_SUMMARY.md)

---

**最后更新**: 2025年12月29日
**版本**: 1.0.0
