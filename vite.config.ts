import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// 获取基础URL（用于GitHub Pages等）
const base = process.env.NODE_ENV === 'production'
  ? (process.env.BASE_URL || '/')
  : '/'

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // 为GitHub Pages优化
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          zustand: ['zustand'],
          tanstack: ['@tanstack/react-query'],
        }
      }
    }
  },
  // 预定义的环境变量
  define: {
    'import.meta.env.VITE_BASE_URL': JSON.stringify(base),
  },
})