import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserProgress } from '@/types'
import { checkAchievements } from '@/api/mock-data'

interface UserStore {
  user: User | null
  progress: UserProgress | null
  login: (username: string) => void
  logout: () => void
  updateProgress: (updates: Partial<UserProgress>) => void
  completeLesson: (lessonId: string, subject: string, score?: number) => void
  addXP: (xp: number) => void
  earnBadge: (badgeId: string) => void
  updateStreak: () => void
  checkAndUnlockAchievements: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      progress: null,

      login: (username: string) => {
        const newUser: User = {
          id: username,
          username,
          createdAt: new Date(),
        }

        const defaultProgress: UserProgress = {
          userId: username,
          level: 1,
          experience: 0,
          subjects: {
            chinese: { completedLessons: [], totalScore: 0, bestScore: 0, lastPlayed: new Date(), playTime: 0 },
            math: { completedLessons: [], totalScore: 0, bestScore: 0, lastPlayed: new Date(), playTime: 0 },
            english: { completedLessons: [], totalScore: 0, bestScore: 0, lastPlayed: new Date(), playTime: 0 },
          },
          achievements: [],
          streak: { days: 0, lastLogin: new Date(), longestStreak: 0 },
          totalPlayTime: 0,
          lastActive: new Date(),
        }

        set({ user: newUser, progress: defaultProgress })
      },

      logout: () => {
        set({ user: null, progress: null })
      },

      updateProgress: (updates) => {
        set((state) => ({
          progress: state.progress ? { ...state.progress, ...updates } : null,
        }))
      },

      completeLesson: (lessonId: string, subject: string, score: number = 100) => {
        set((state) => {
          if (!state.progress) return { progress: null }

          const subjectProgress = state.progress.subjects[subject as keyof typeof state.progress.subjects]
          if (!subjectProgress.completedLessons.includes(lessonId)) {
            subjectProgress.completedLessons.push(lessonId)
            subjectProgress.totalScore += score
            subjectProgress.bestScore = Math.max(subjectProgress.bestScore, score)
            subjectProgress.lastPlayed = new Date()
            subjectProgress.playTime += 15 // 假设每节课15分钟

            // 增加经验值
            const newXP = state.progress.experience + 50
            const newLevel = Math.floor(newXP / 100) + 1

            return {
              progress: {
                ...state.progress,
                experience: newXP,
                level: newLevel,
                subjects: { ...state.progress.subjects },
                lastActive: new Date(),
                totalPlayTime: state.progress.totalPlayTime + 15,
              },
            }
          }

          return { progress: state.progress }
        })

        // 检查成就
        get().checkAndUnlockAchievements()
      },

      addXP: (xp: number) => {
        set((state) => {
          if (!state.progress) return { progress: null }

          const newXP = state.progress.experience + xp
          const newLevel = Math.floor(newXP / 100) + 1

          return {
            progress: {
              ...state.progress,
              experience: newXP,
              level: newLevel,
              lastActive: new Date(),
            },
          }
        })
      },

      earnBadge: (badgeId: string) => {
        set((state) => {
          if (!state.progress) return { progress: null }

          if (state.progress.earnedBadges?.includes(badgeId)) {
            return { progress: state.progress }
          }

          return {
            progress: {
              ...state.progress,
              earnedBadges: [...(state.progress.earnedBadges || []), badgeId],
              points: (state.progress.points || 0) + 100,
            },
          }
        })
      },

      updateStreak: () => {
        set((state) => {
          if (!state.progress) return { progress: null }

          const today = new Date()
          const lastActive = new Date(state.progress.lastActive)
          const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))

          let newStreak = state.progress.streak.days
          if (daysDiff === 1) {
            newStreak += 1
          } else if (daysDiff > 1) {
            newStreak = 1
          }

          const longestStreak = Math.max(state.progress.streak.longestStreak, newStreak)

          return {
            progress: {
              ...state.progress,
              streak: { days: newStreak, lastLogin: today, longestStreak },
              lastActive: today,
            },
          }
        })
      },

      checkAndUnlockAchievements: () => {
        set((state) => {
          if (!state.progress) return { progress: null }

          const newAchievements = checkAchievements(state.progress)
          if (newAchievements.length === 0) return { progress: state.progress }

          // 解锁新成就
          const unlockedAchievements = newAchievements.map(ach => ({
            ...ach,
            unlocked: true,
            unlockedAt: new Date(),
          }))

          return {
            progress: {
              ...state.progress,
              achievements: [...(state.progress.achievements || []), ...unlockedAchievements],
            },
          }
        })
      },
    }),
    {
      name: 'user-storage',
    }
  )
)