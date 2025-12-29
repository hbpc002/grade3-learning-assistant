import React from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '@/stores/user-store'
import { ToastContainer } from '@/components/ui/Toast'

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const user = useUserStore(state => state.user)
  const progress = useUserStore(state => state.progress)
  const logout = useUserStore(state => state.logout)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
              🎓 学习助手
            </Link>
            {user && (
              <div className="hidden md:flex items-center space-x-3 text-sm">
                <span className="bg-blue-100 px-3 py-1 rounded-full">
                  等级 {progress?.level || 1}
                </span>
                <span className="bg-yellow-100 px-3 py-1 rounded-full">
                  ⭐ {progress?.experience || 0} XP
                </span>
                {progress?.streak && progress.streak.days > 0 && (
                  <span className="bg-orange-100 px-3 py-1 rounded-full">
                    🔥 {progress.streak.days}天
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <span className="text-gray-700 font-medium">{user.username}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  退出
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      {user && (
        <nav className="bg-white/80 backdrop-blur-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex space-x-6 overflow-x-auto">
            <Link to="/learn" className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap">
              📚 学习
            </Link>
            <Link to="/games" className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap">
              🎮 游戏
            </Link>
            <Link to="/videos" className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap">
              🎬 视频
            </Link>
            <Link to="/progress" className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap">
              📊 进度
            </Link>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>🎓 小学三年级学习助手 - 寓教于乐，快乐学习</p>
          <p className="mt-2">建议使用平板或电脑获得最佳体验</p>
        </div>
      </footer>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  )
}