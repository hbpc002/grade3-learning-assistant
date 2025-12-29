import React from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '@/stores/user-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const HomePage: React.FC = () => {
  const user = useUserStore(state => state.user)
  const progress = useUserStore(state => state.progress)

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">欢迎来到学习助手！</h1>
        <p className="text-xl text-gray-600 mb-8">请先登录开始你的学习之旅</p>
        <Link to="/login" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg">
          立即开始
        </Link>

        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">📚 学习</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">语文、数学、英语，系统化课程设计</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">🎮 游戏</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">测验、记忆、拼图，边玩边学</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">🎬 视频</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">生动视频教学，知识更容易理解</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">你好，{user.username}！👋</h1>
        <p className="text-xl opacity-90">今天也要加油学习哦！</p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{progress?.level || 1}</div>
            <div className="text-sm opacity-80">等级</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{progress?.experience || 0}</div>
            <div className="text-sm opacity-80">经验值</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{progress?.streak?.days || 0}</div>
            <div className="text-sm opacity-80">连续天数</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">
              {Object.values(progress?.subjects || {}).reduce((sum: number, s: any) => sum + s.completedLessons.length, 0)}
            </div>
            <div className="text-sm opacity-80">已学课程</div>
          </div>
        </div>
      </div>

      {/* 快速开始 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">🚀 快速开始</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/learn" className="group">
            <Card className="h-full hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl">📚 学习课程</span>
                  <span className="text-3xl group-hover:scale-110 transition-transform">→</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">选择科目开始学习，每节课都有有趣的内容</p>
                <div className="mt-3 flex gap-2">
                  <Badge variant="chinese">语文</Badge>
                  <Badge variant="math">数学</Badge>
                  <Badge variant="english">英语</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/games" className="group">
            <Card className="h-full hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl">🎮 游戏练习</span>
                  <span className="text-3xl group-hover:scale-110 transition-transform">→</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">通过游戏巩固知识，获得额外经验值</p>
                <div className="mt-3 flex gap-2">
                  <Badge>测验</Badge>
                  <Badge>记忆</Badge>
                  <Badge>拼图</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/videos" className="group">
            <Card className="h-full hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl">🎬 观看视频</span>
                  <span className="text-3xl group-hover:scale-110 transition-transform">→</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">生动视频教学，支持百度百科内容</p>
                <div className="mt-3 flex gap-2">
                  <Badge variant="outline">内置视频</Badge>
                  <Badge variant="outline">百科集成</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* 推荐内容 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">🌟 推荐内容</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-green-50 to-green-100">
            <CardHeader>
              <CardTitle className="text-xl">💡 学习小贴士</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• 每天学习15分钟，效果最好</li>
                <li>• 完成课程可以获得经验值</li>
                <li>• 游戏练习能巩固知识</li>
                <li>• 保持连续学习有额外奖励</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100">
            <CardHeader>
              <CardTitle className="text-xl">🏆 今日目标</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>完成1节课</span>
                  <span className="font-bold">+50 XP</span>
                </div>
                <div className="flex justify-between">
                  <span>玩1个游戏</span>
                  <span className="font-bold">+25 XP</span>
                </div>
                <div className="flex justify-between">
                  <span>观看1个视频</span>
                  <span className="font-bold">+30 XP</span>
                </div>
                <div className="pt-2 border-t font-bold text-lg">
                  最多可获得: 105 XP
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 成就展示 */}
      {progress && progress.achievements && progress.achievements.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">🏆 最近成就</h2>
          <div className="flex flex-wrap gap-3">
            {progress.achievements.slice(-3).map(achievement => (
              <Badge key={achievement.id} variant="fun" className="px-4 py-2 text-base">
                {achievement.icon} {achievement.title}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}