# 多阶段构建：生产环境镜像
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖（跳过可选依赖以减小体积）
RUN npm ci --only=production --ignore-scripts

# 复制所有源代码
COPY . .

# 构建项目
RUN npm run build

# ====================

# 生产阶段：使用 Nginx
FROM nginx:alpine

# 移除默认 Nginx 配置
RUN rm -rf /usr/share/nginx/html/*

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
