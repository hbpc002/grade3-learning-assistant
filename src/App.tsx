import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from '@/components/ui/Toast'

// 导入页面组件
import { HomePage } from '@/components/layout/HomePage'
import { LoginPage } from '@/components/layout/LoginPage'
import { LearnPage } from '@/components/lesson/LearnPage'
import { GamesPage } from '@/components/game/GamesPage'
import { VideoPage } from '@/components/video/VideoPage'
import { ProgressPage } from '@/components/progress/ProgressPage'

// 导入布局
import { AppLayout } from '@/components/layout/AppLayout'

// 导入状态管理
import { useUserStore } from '@/stores/user-store'

// 创建Query Client
const queryClient = new QueryClient()

// 路由守卫组件
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useUserStore(state => state.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// 公共路由组件
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useUserStore(state => state.user)

  if (user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      {/* 公共路由 */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* 受保护的路由 */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/learn"
        element={
          <ProtectedRoute>
            <LearnPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/games"
        element={
          <ProtectedRoute>
            <GamesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/videos"
        element={
          <ProtectedRoute>
            <VideoPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <ProgressPage />
          </ProtectedRoute>
        }
      />

      {/* 默认重定向 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppLayout>
          <AppRoutes />
          <ToastContainer />
        </AppLayout>
      </Router>
    </QueryClientProvider>
  )
}

export default App