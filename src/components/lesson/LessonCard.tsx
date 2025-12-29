import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LessonCardProps } from '@/types'

export const LessonCard: React.FC<LessonCardProps> = ({ course, onClick, progress }) => {
  const subjectColors = {
    chinese: 'chinese',
    math: 'math',
    english: 'english',
  } as const

  const difficultyLabels = {
    easy: '简单',
    medium: '中等',
    hard: '困难',
  }

  const isCompleted = progress !== undefined && progress >= 100

  return (
    <Card className={`h-full transition-all hover:shadow-xl ${isCompleted ? 'opacity-75' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant={subjectColors[course.subject]}>
            {course.subject === 'chinese' ? '语文' : course.subject === 'math' ? '数学' : '英语'}
          </Badge>
          <Badge variant="outline">{difficultyLabels[course.difficulty]}</Badge>
        </div>
        <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span>⏱️ {course.estimatedTime}分钟</span>
            <span className="ml-3">⭐ {course.xpReward} XP</span>
          </div>
          <Button
            onClick={onClick}
            size="sm"
            variant={isCompleted ? 'success' : 'default'}
            className="font-semibold"
          >
            {isCompleted ? '✅ 已完成' : '开始学习'}
          </Button>
        </div>
        {isCompleted && (
          <div className="mt-2 text-sm text-green-600 font-medium">
            进度: {Math.round(progress)}%
          </div>
        )}
      </CardContent>
    </Card>
  )
}