import React, { useState, useEffect } from 'react'
import { QuizCard } from './QuizCard'
import { useUserStore } from '@/stores/user-store'
import { Progress } from '@/components/ui/Progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useToastHook } from '@/components/ui/Toast'
import { QuizQuestion } from '@/types'

interface QuizGameProps {
  questions: QuizQuestion[]
  gameId: string
  subject: string
}

export const QuizGame: React.FC<QuizGameProps> = ({ questions, gameId, subject }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120)
  const [showResults, setShowResults] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const { toast } = useToastHook()
  const addXP = useUserStore(state => state.addXP)
  const completeLesson = useUserStore(state => state.completeLesson)
  const earnBadge = useUserStore(state => state.earnBadge)

  const currentQuestion = questions[currentQuestionIndex]

  // 倒计时
  useEffect(() => {
    if (showResults) return

    const newTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          window.clearInterval(newTimer)
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    setTimer(newTimer)

    return () => {
      if (timer) window.clearInterval(timer)
    }
  }, [currentQuestionIndex, showResults])

  const handleTimeout = () => {
    toast({
      title: '⏰ 时间到！',
      description: '游戏结束，下次加油！',
      variant: 'warning'
    })
    setShowResults(true)
  }

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(prev => prev + 1)
      addXP(10) // 每答对一题加10XP
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // 游戏结束
      if (timer) window.clearInterval(timer)
      setShowResults(true)

      const finalScore = score + (correct ? 1 : 0)
      const percentage = (finalScore / questions.length) * 100

      // 完成课程
      completeLesson(`game-${gameId}`, subject, percentage)

      // 根据分数给予奖励
      if (percentage >= 80) {
        addXP(50)
        toast({
          title: '🎉 太棒了！',
          description: `满分表现！+50 XP`,
          variant: 'success'
        })
        earnBadge('perfect-game')
      } else if (percentage >= 60) {
        addXP(30)
        toast({
          title: '👍 不错！',
          description: `继续努力！+30 XP`,
          variant: 'success'
        })
      } else {
        toast({
          title: '💪 加油！',
          description: '多练习会更好哦！',
          variant: 'warning'
        })
      }
    }
  }

  if (showResults) {
    const percentage = (score / questions.length) * 100
    const passed = percentage >= 60

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {passed ? '🎉 游戏完成！' : '💪 游戏结束'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-5xl font-bold mb-2">
            {score} / {questions.length}
          </div>
          <div className="text-2xl text-gray-600">
            正确率: {percentage.toFixed(0)}%
          </div>
          <div className="text-4xl my-4">
            {passed ? '⭐⭐⭐' : '⭐⭐'}
          </div>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button onClick={() => window.location.reload()}>
              再玩一次
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/games'}>
              更多游戏
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/learn'}>
              继续学习
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          题目 {currentQuestionIndex + 1} / {questions.length}
        </span>
        <span className="text-sm font-semibold text-blue-600">
          得分: {score * 10}
        </span>
      </div>

      <Progress value={(currentQuestionIndex / questions.length) * 100} className="w-full" />

      <QuizCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        points={10}
        timeLeft={timeLeft}
      />

      <div className="text-center text-sm text-gray-500">
        💡 快速思考，选择正确答案！
      </div>
    </div>
  )
}