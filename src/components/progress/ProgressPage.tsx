import React from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '@/stores/user-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { Button } from '@/components/ui/Button'

export const ProgressPage: React.FC = () => {
  const progress = useUserStore(state => state.progress)

  if (!progress) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">请先登录查看进度</p>
        <Link to="/login">
          <Button size="lg">去登录</Button>
        </Link>
      </div>
    )
  }

  const totalLessons = Object.values(progress.subjects)
    .reduce((sum, subject) => sum + subject.completedLessons.length, 0)

  const totalScore = Object.values(progress.subjects)
    .reduce((sum, subject) => sum + subject.totalScore, 0)

  const xpToNextLevel = 100 - (progress.experience % 100)

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-2">📊 学习进度</h1>
        <p className="text-gray-600">查看你的学习成就和进步</p>
      </div>

      {/* 核心数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">{progress.level}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">当前等级</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">{progress.experience}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">总经验值</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">{totalLessons}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">已学课程</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">{totalScore}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">累计得分</p>
          </CardContent>
        </Card>
      </div>

      {/* 经验值进度 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">🚀 升级进度</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>等级 {progress.level}</span>
              <span>等级 {progress.level + 1}</span>
            </div>
            <Progress value={progress.experience % 100} className="w-full h-4" />
            <p className="text-sm text-gray-600 text-center">
              还需要 {xpToNextLevel} XP 升级到等级 {progress.level + 1}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 科目进度 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">📚 科目进度</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['chinese', 'math', 'english'] as const).map(subject => {
            const subjectData = progress.subjects[subject]
            const subjectName = subject === 'chinese' ? '语文' : subject === 'math' ? '数学' : '英语'
            const variant = subject === 'chinese' ? 'chinese' : subject === 'math' ? 'math' : 'english'

            return (
              <Card key={subject}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{subjectName}</span>
                    <Badge variant={variant}>{subjectData.completedLessons.length} 课</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>总分</span>
                      <span className="font-bold">{subjectData.totalScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>最高分</span>
                      <span className="font-bold">{subjectData.bestScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>学习时间</span>
                      <span className="font-bold">{subjectData.playTime}分钟</span>
                    </div>
                    {subjectData.completedLessons.length > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-gray-500 mb-1">已完成课程:</p>
                        <div className="flex flex-wrap gap-1">
                          {subjectData.completedLessons.slice(-3).map(lesson => (
                            <Badge key={lesson} variant="secondary" className="text-xs">
                              {lesson.split('-')[1]}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* 连续学习 */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="text-xl">🔥 连续学习</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold">{progress.streak.days} 天</div>
              <p className="text-gray-600">当前连续学习天数</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{progress.streak.longestStreak} 天</div>
              <p className="text-gray-600">最长连续记录</p>
            </div>
          </div>
          {progress.streak.days > 0 && (
            <p className="mt-3 text-sm text-gray-700">
              {progress.streak.days >= 7 ? '🏆 太棒了！继续保持！' :
               progress.streak.days >= 3 ? '👍 坚持就是胜利！' :
               '💪 加油，再接再厉！'}
            </p>
          )}
        </CardContent>
      </Card>

      {/* 成就系统 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">🏆 成就徽章</h2>
        {progress.achievements && progress.achievements.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {progress.achievements.map(achievement => (
              <Card key={achievement.id} className="text-center">
                <CardContent className="p-4">
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <div className="font-semibold text-sm">{achievement.title}</div>
                  <div className="text-xs text-gray-600 mt-1">{achievement.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center p-8">
            <CardContent>
              <p className="text-gray-600">还没有获得成就，快去学习吧！</p>
              <p className="text-sm text-gray-500 mt-2">完成课程、玩游戏、看视频都能解锁成就</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 统计信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">📈 学习统计</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{progress.totalPlayTime}</div>
              <div className="text-sm text-gray-600">总学习时间(分钟)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{totalScore}</div>
              <div className="text-sm text-gray-600">累计得分</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {progress.achievements?.length || 0}
              </div>
              <div className="text-sm text-gray-600">成就数量</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{progress.level}</div>
              <div className="text-sm text-gray-600">当前等级</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 返回按钮 */}
      <div className="flex justify-center">
        <Link to="/">
          <Button variant="outline" size="lg">
            ← 返回首页
          </Button>
        </Link>
      </div>
    </div>
  )
}