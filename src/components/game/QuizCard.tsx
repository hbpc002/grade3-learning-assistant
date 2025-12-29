import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { useToastHook } from '@/components/ui/Toast'
import { QuizQuestion } from '@/types'

interface QuizCardProps {
  question: QuizQuestion
  onAnswer: (correct: boolean) => void
  points: number
  timeLeft?: number
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onAnswer,
  points,
  timeLeft
}) => {
  const [selected, setSelected] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const { toast } = useToastHook()

  const handleAnswer = (index: number) => {
    if (showFeedback) return

    setSelected(index)
    const isCorrect = index === question.correctAnswer
    setShowFeedback(true)

    if (isCorrect) {
      toast({
        title: '🎉 正确！',
        description: `+${points} 分`,
        variant: 'success'
      })
    } else {
      toast({
        title: '再试试看',
        description: '加油，你一定能行！',
        variant: 'warning'
      })
    }

    // 延迟后进入下一题
    setTimeout(() => {
      onAnswer(isCorrect)
      setSelected(null)
      setShowFeedback(false)
    }, 1500)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl md:text-2xl">{question.question}</CardTitle>
          {timeLeft !== undefined && (
            <span className="text-lg font-bold text-orange-600">
              ⏱️ {timeLeft}s
            </span>
          )}
        </div>
        <Progress value={0} className="w-full" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => {
            let variant: any = 'outline'
            if (showFeedback) {
              if (index === question.correctAnswer) {
                variant = 'success'
              } else if (selected === index) {
                variant = 'destructive'
              }
            } else {
              variant = 'fun'
            }

            return (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                variant={variant}
                size="large"
                className="text-lg font-semibold"
              >
                {option}
              </Button>
            )
          })}
        </div>

        {showFeedback && question.explanation && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <p className="font-semibold text-blue-800 mb-1">💡 解析：</p>
            <p className="text-blue-700">{question.explanation}</p>
          </div>
        )}

        {showFeedback && (
          <div className="mt-3 text-center text-gray-600 animate-pulse">
            准备进入下一题...
          </div>
        )}
      </CardContent>
    </Card>
  )
}