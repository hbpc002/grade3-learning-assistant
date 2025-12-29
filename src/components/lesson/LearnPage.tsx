import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '@/stores/user-store'
import { LessonCard } from '@/components/lesson/LessonCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getCoursesBySubject } from '@/api/mock-data'
import { Course } from '@/types'
import { useToastHook } from '@/components/ui/Toast'

export const LearnPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<'chinese' | 'math' | 'english'>('chinese')
  const progress = useUserStore(state => state.progress)
  const completeLesson = useUserStore(state => state.completeLesson)
  const { toast } = useToastHook()

  const courses = getCoursesBySubject(selectedSubject)

  const handleStartLesson = (course: Course) => {
    // 模拟完成课程
    completeLesson(course.id, course.subject, course.xpReward)
    toast({
      title: `🎉 完成课程：${course.title}`,
      description: `获得 ${course.xpReward} XP！`,
      variant: 'success'
    })
  }

  const getCourseProgress = (courseId: string): number => {
    if (!progress) return 0
    const subject = courseId.split('-')[0]
    const subjectProgress = progress.subjects[subject as keyof typeof progress.subjects]
    if (subjectProgress.completedLessons.includes(courseId)) {
      return 100
    }
    return 0
  }

  return (
    <div className="space-y-6">
      {/* 标题区域 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-2">📚 学习课程</h1>
        <p className="text-gray-600">选择科目，开始有趣的学习之旅吧！</p>
      </div>

      {/* 科目选择 */}
      <div className="flex gap-3 flex-wrap">
        <Button
          variant={selectedSubject === 'chinese' ? 'chinese' : 'outline'}
          size="large"
          onClick={() => setSelectedSubject('chinese')}
        >
          📝 语文
        </Button>
        <Button
          variant={selectedSubject === 'math' ? 'math' : 'outline'}
          size="large"
          onClick={() => setSelectedSubject('math')}
        >
          🔢 数学
        </Button>
        <Button
          variant={selectedSubject === 'english' ? 'english' : 'outline'}
          size="large"
          onClick={() => setSelectedSubject('english')}
        >
          🅰️ 英语
        </Button>
      </div>

      {/* 课程列表 */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {selectedSubject === 'chinese' ? '语文课程' :
             selectedSubject === 'math' ? '数学课程' : '英语课程'}
          </h2>
          <Badge variant="secondary">
            共 {courses.length} 节课
          </Badge>
        </div>

        {courses.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <p className="text-gray-600 text-lg">暂无课程，敬请期待！</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
              <LessonCard
                key={course.id}
                course={course}
                onClick={() => handleStartLesson(course)}
                progress={getCourseProgress(course.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 学习建议 */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-xl">💡 学习小贴士</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700">
            <li>• 每节课学习后可以玩游戏巩固知识</li>
            <li>• 完成课程可获得丰厚经验值</li>
            <li>• 观看视频能帮助理解难点</li>
            <li>• 保持连续学习有额外奖励</li>
          </ul>
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