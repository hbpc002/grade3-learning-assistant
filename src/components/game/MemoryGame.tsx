import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useUserStore } from '@/stores/user-store'
import { useToastHook } from '@/components/ui/Toast'
import { MemoryCard } from '@/types'
import { cn } from '@/lib/utils'

interface ExtendedMemoryCard extends MemoryCard {
  matched?: boolean
}

interface MemoryGameProps {
  cards: MemoryCard[]
  gameId: string
  subject: string
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ cards, gameId, subject }) => {
  const [gameCards, setGameCards] = useState<ExtendedMemoryCard[]>([])
  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  const { toast } = useToastHook()
  const addXP = useUserStore(state => state.addXP)
  const completeLesson = useUserStore(state => state.completeLesson)
  const earnBadge = useUserStore(state => state.earnBadge)

  // 初始化游戏
  useEffect(() => {
    // 创建配对并打乱顺序
    const pairedCards = [...cards, ...cards]
      .map((card, index) => ({
        ...card,
        id: `${card.id}-${index}`,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5)

    setGameCards(pairedCards)
  }, [cards])

  const handleCardClick = (id: string) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) {
      return
    }

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1)

      const [first, second] = newFlipped
      const firstCard = gameCards.find(c => c.id === first)
      const secondCard = gameCards.find(c => c.id === second)

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // 匹配成功
        setTimeout(() => {
          setMatched(prev => [...prev, first, second])
          setFlipped([])
          addXP(5)

          // 检查是否完成
          if (matched.length + 2 === gameCards.length) {
            setGameComplete(true)
            handleGameComplete()
          }
        }, 800)
      } else {
        // 不匹配
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
    }
  }

  const handleGameComplete = () => {
    completeLesson(`game-${gameId}`, subject, 100)
    addXP(20)

    // 完美通关奖励
    if (moves <= cards.length) {
      earnBadge('perfect-game')
      toast({
        title: '🏆 完美通关！',
        description: '记忆力超群！+20 XP',
        variant: 'success'
      })
    } else {
      toast({
        title: '🎉 游戏完成！',
        description: `用了 ${moves + 1} 步，+20 XP`,
        variant: 'success'
      })
    }
  }

  if (gameComplete) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">🎉 记忆大师！</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold">完美匹配！</div>
          <div className="text-xl text-gray-600">
            用了 {moves} 步完成
          </div>
          <div className="text-5xl my-4">⭐⭐⭐</div>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button onClick={() => window.location.reload()}>
              再玩一次
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/games'}>
              更多游戏
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl capitalize">🧠 记忆配对游戏</CardTitle>
        <div className="flex justify-between text-sm text-gray-600">
          <span>步数: {moves}</span>
          <span>配对: {matched.length / 2}/{cards.length}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {gameCards.map((card) => {
            const isFlipped = flipped.includes(card.id) || matched.includes(card.id)
            const isMatched = matched.includes(card.id)

            return (
              <Button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={isMatched}
                variant={isFlipped ? 'default' : 'secondary'}
                size="lg"
                className={cn(
                  "h-20 md:h-24 text-lg md:text-xl font-bold transition-all",
                  "aspect-square p-0",
                  isMatched && "bg-green-500 opacity-50 cursor-not-allowed",
                  isFlipped && "scale-105 shadow-lg"
                )}
              >
                {isFlipped ? card.content : '?'}
              </Button>
            )
          })}
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>💡 点击卡片，找出相同的配对！</p>
          <p className="mt-1">尽量用最少的步数完成哦~</p>
        </div>
      </CardContent>
    </Card>
  )
}