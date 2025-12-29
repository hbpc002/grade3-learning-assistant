// 用户类型
export interface User {
  id: string
  username: string
  avatar?: string
  createdAt: Date
}

export interface UserProgress {
  userId: string
  level: number
  experience: number
  points?: number
  earnedBadges?: string[]
  subjects: {
    chinese: SubjectProgress
    math: SubjectProgress
    english: SubjectProgress
  }
  achievements: Achievement[]
  streak: StreakInfo
  totalPlayTime: number // 分钟
  lastActive: Date
}

export interface SubjectProgress {
  completedLessons: string[]
  totalScore: number
  bestScore: number
  lastPlayed: Date
  playTime: number // 分钟
}

export interface StreakInfo {
  days: number
  lastLogin: Date
  longestStreak: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: Date
  requirement: AchievementRequirement
}

export type AchievementRequirement =
  | { type: 'lessons_completed'; subject: string; value: number }
  | { type: 'total_score'; value: number }
  | { type: 'streak_days'; value: number }
  | { type: 'play_time'; value: number }
  | { type: 'game_wins'; gameType: string; value: number }

// 课程类型
export interface Course {
  id: string
  subject: 'chinese' | 'math' | 'english'
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  order: number
  prerequisites: string[]
  content: CourseContent[]
  videoUrl?: string
  quizId?: string
  estimatedTime: number // 分钟
  xpReward: number
}

export interface CourseContent {
  type: 'text' | 'image' | 'interactive' | 'example'
  content: string
  metadata?: Record<string, any>
}

// 游戏类型
export interface Game {
  id: string
  type: 'quiz' | 'memory' | 'puzzle'
  subject: string
  difficulty: number
  questions: QuizQuestion[] | MemoryCard[] | PuzzleConfig
  timeLimit?: number // 秒
  passingScore: number
  rewards: GameReward[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface MemoryCard {
  id: string
  content: string
  type: 'text' | 'image'
  pairId: string
}

export interface PuzzleConfig {
  gridSize: 3 | 4 | 5
  image?: string
  theme?: string
}

export interface GameSession {
  gameId: string
  startTime: Date
  endTime?: Date
  score: number
  attempts: number
  completed: boolean
  timeSpent: number
}

export interface GameReward {
  type: 'xp' | 'badge' | 'streak'
  value: number
}

// 视频类型
export interface VideoContent {
  id: string
  title: string
  description: string
  thumbnail?: string
  duration?: number
  source: 'local' | 'baidu百科'
  url: string
  keywords: string[]
  relatedLessons: string[]
  category: string
}

export interface VideoWatchHistory {
  videoId: string
  watchedAt: Date
  progress: number // 0-100
  completed: boolean
}

// UI类型
export interface EducationalCardProps {
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  subject: 'chinese' | 'math' | 'english'
  onClick: () => void
  completed?: boolean
}

export interface LessonCardProps {
  course: Course
  onClick: () => void
  progress?: number
}