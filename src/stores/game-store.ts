import { create } from 'zustand'
import { GameSession, Game } from '@/types'
import { getGameById } from '@/api/mock-data'
import { useUserStore } from './user-store'

interface GameStore {
  currentGame: GameSession | null
  currentGameData: Game | null
  startGame: (gameId: string) => void
  updateScore: (points: number) => void
  endGame: (completed: boolean) => void
  reset: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  currentGame: null,
  currentGameData: null,

  startGame: (gameId: string) => {
    const gameData = getGameById(gameId)
    if (!gameData) return

    const newSession: GameSession = {
      gameId,
      startTime: new Date(),
      score: 0,
      attempts: 0,
      completed: false,
      timeSpent: 0,
    }

    set({ currentGame: newSession, currentGameData: gameData })
  },

  updateScore: (points: number) => {
    set((state) => {
      if (!state.currentGame) return { currentGame: null }

      return {
        currentGame: {
          ...state.currentGame,
          score: state.currentGame.score + points,
          attempts: state.currentGame.attempts + 1,
        },
      }
    })
  },

  endGame: (completed: boolean) => {
    set((state) => {
      if (!state.currentGame) return { currentGame: null, currentGameData: null }

      const endTime = new Date()
      const timeSpent = Math.floor((endTime.getTime() - state.currentGame.startTime.getTime()) / 1000)

      // 更新用户进度
      const userStore = useUserStore.getState()
      if (completed && state.currentGameData) {
        // 增加经验值
        const xpReward = state.currentGameData.rewards
          .filter(r => r.type === 'xp')
          .reduce((sum, r) => sum + r.value, 0)

        userStore.addXP(xpReward)

        // 检查是否完美通关
        if (state.currentGame.score >= state.currentGameData.passingScore) {
          userStore.earnBadge('perfect-game')
        }
      }

      // 记录游戏时间
      const currentProgress = userStore.progress
      if (currentProgress) {
        userStore.updateProgress({
          totalPlayTime: currentProgress.totalPlayTime + Math.ceil(timeSpent / 60),
        })
      }

      return {
        currentGame: null,
        currentGameData: null,
      }
    })
  },

  reset: () => {
    set({ currentGame: null, currentGameData: null })
  },
}))