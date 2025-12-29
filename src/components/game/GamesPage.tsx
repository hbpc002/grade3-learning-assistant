import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { QuizGame } from './QuizGame'
import { MemoryGame } from './MemoryGame'
import { useGameStore } from '@/stores/game-store'
import { mockGames, getGameById } from '@/api/mock-data'

export const GamesPage: React.FC = () => {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)
  const currentGame = useGameStore(state => state.currentGame)
  const startGame = useGameStore(state => state.startGame)
  const reset = useGameStore(state => state.reset)

  const handleStartGame = (gameId: string) => {
    startGame(gameId)
    setSelectedGameId(gameId)
  }

  const handleBack = () => {
    setSelectedGameId(null)
    reset()
  }

  if (selectedGameId && currentGame) {
    const gameData = getGameById(selectedGameId)
    if (!gameData) return null

    return (
      <div className="space-y-6">
        <Button onClick={handleBack} variant="outline" size="lg">
          ← 返回游戏列表
        </Button>

        {gameData.type === 'quiz' && (
          <QuizGame
            questions={gameData.questions as any}
            gameId={gameData.id}
            subject={gameData.subject}
          />
        )}

        {gameData.type === 'memory' && (
          <MemoryGame
            cards={gameData.questions as any}
            gameId={gameData.id}
            subject={gameData.subject}
          />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 标题区域 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-2">🎮 游戏练习</h1>
        <p className="text-gray-600">通过有趣的游戏巩固知识，获得额外经验值！</p>
      </div>

      {/* 游戏列表 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">可玩游戏</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockGames.map(game => (
            <Card key={game.id} className="hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={game.type === 'quiz' ? 'math' : 'chinese'}>
                    {game.type === 'quiz' ? '测验' : game.type === 'memory' ? '记忆' : '拼图'}
                  </Badge>
                  <Badge variant="outline">难度 {game.difficulty}</Badge>
                </div>
                <CardTitle className="text-xl">
                  {game.type === 'quiz' ? '知识测验' :
                   game.type === 'memory' ? '记忆配对' : '拼图挑战'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>科目: {game.subject === 'math' ? '数学' : game.subject === 'chinese' ? '语文' : '科学'}</p>
                  <p>题目数: {Array.isArray(game.questions) ? game.questions.length : 'N/A'}题</p>
                  {game.timeLimit && <p>时间限制: {game.timeLimit}秒</p>}
                  <p>奖励: {game.rewards.map(r => `${r.value} ${r.type === 'xp' ? 'XP' : '积分'}`).join(', ')}</p>
                </div>
                <Button
                  onClick={() => handleStartGame(game.id)}
                  size="large"
                  className="w-full font-semibold"
                >
                  开始游戏 🚀
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 游戏说明 */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-xl">💡 游戏说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold mb-2">📝 测验游戏</h4>
              <p className="text-sm text-gray-700">选择题形式，测试知识掌握程度。答对得分，时间有限！</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">🧠 记忆游戏</h4>
              <p className="text-sm text-gray-700">翻牌配对，锻炼记忆力。步数越少，表现越好！</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">🎯 奖励规则</h4>
              <p className="text-sm text-gray-700">完成游戏获得经验值，完美通关有额外成就奖励！</p>
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