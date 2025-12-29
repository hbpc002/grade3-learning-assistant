import { Course, Game, VideoContent, Achievement } from '@/types'

// Mock 课程数据
export const mockCourses: Course[] = [
  // 语文课程
  {
    id: 'chinese-1',
    subject: 'chinese',
    title: '认识常用汉字',
    description: '学习20个基础汉字',
    difficulty: 'easy',
    order: 1,
    prerequisites: [],
    content: [
      { type: 'text', content: '今天学习：人、口、手、山、水、火、木、金、土、日' },
      { type: 'image', content: '汉字书写示例图片' },
      { type: 'interactive', content: '练习：写出"山"字的笔顺' },
    ],
    videoUrl: 'https://www.baidu.com/s?wd=小学汉字教学视频',
    estimatedTime: 20,
    xpReward: 60,
  },
  {
    id: 'chinese-2',
    subject: 'chinese',
    title: '拼音基础学习',
    description: '学习声母、韵母和声调',
    difficulty: 'easy',
    order: 2,
    prerequisites: ['chinese-1'],
    content: [
      { type: 'text', content: '声母：b p m f d t n l' },
      { type: 'text', content: '韵母：a o e i u ü' },
      { type: 'interactive', content: '练习：拼读"ma"的四个声调' },
    ],
    estimatedTime: 18,
    xpReward: 55,
  },

  // 数学课程
  {
    id: 'math-1',
    subject: 'math',
    title: '加法运算基础',
    description: '学习100以内的加法运算',
    difficulty: 'easy',
    order: 1,
    prerequisites: [],
    content: [
      { type: 'text', content: '加法是把两个数合并成一个数的运算' },
      { type: 'text', content: '例如：23 + 45 = 68' },
      { type: 'text', content: '计算方法：个位加个位，十位加十位' },
      { type: 'interactive', content: '练习：15 + 27 = ?' },
    ],
    quizId: 'quiz-math-1',
    estimatedTime: 15,
    xpReward: 50,
  },
  {
    id: 'math-2',
    subject: 'math',
    title: '减法运算基础',
    description: '学习100以内的减法运算',
    difficulty: 'easy',
    order: 2,
    prerequisites: ['math-1'],
    content: [
      { type: 'text', content: '减法是加法的逆运算' },
      { type: 'text', content: '例如：68 - 23 = 45' },
      { type: 'interactive', content: '练习：50 - 18 = ?' },
    ],
    quizId: 'quiz-math-2',
    estimatedTime: 15,
    xpReward: 50,
  },

  // 英语课程
  {
    id: 'english-1',
    subject: 'english',
    title: '认识26个字母',
    description: '学习A到Z的大小写字母',
    difficulty: 'easy',
    order: 1,
    prerequisites: [],
    content: [
      { type: 'text', content: 'Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz' },
      { type: 'text', content: '大写字母用于句首和专有名词' },
      { type: 'interactive', content: '练习：写出字母A到G的大小写' },
    ],
    videoUrl: 'https://www.baidu.com/s?wd=英语字母歌视频',
    estimatedTime: 20,
    xpReward: 60,
  },
  {
    id: 'english-2',
    subject: 'english',
    title: '基础问候语',
    description: '学习简单的英语问候',
    difficulty: 'easy',
    order: 2,
    prerequisites: ['english-1'],
    content: [
      { type: 'text', content: 'Hello! 你好！' },
      { type: 'text', content: 'Good morning! 早上好！' },
      { type: 'text', content: 'How are you? 你好吗？' },
      { type: 'interactive', content: '练习：用英语回答"I\'m fine, thank you!"' },
    ],
    estimatedTime: 15,
    xpReward: 50,
  },
]

// Mock 游戏数据
export const mockGames: Game[] = [
  {
    id: 'quiz-math-1',
    type: 'quiz',
    subject: 'math',
    difficulty: 1,
    questions: [
      {
        id: 'q1',
        question: '23 + 45 = ?',
        options: ['68', '67', '69', '70'],
        correctAnswer: 0,
        explanation: '20+40=60, 3+5=8, 60+8=68',
      },
      {
        id: 'q2',
        question: '15 + 27 = ?',
        options: ['42', '41', '43', '44'],
        correctAnswer: 0,
        explanation: '10+20=30, 5+7=12, 30+12=42',
      },
      {
        id: 'q3',
        question: '36 + 18 = ?',
        options: ['54', '53', '55', '56'],
        correctAnswer: 0,
        explanation: '30+10=40, 6+8=14, 40+14=54',
      },
    ],
    timeLimit: 120,
    passingScore: 60,
    rewards: [{ type: 'xp', value: 30 }],
  },
  {
    id: 'quiz-math-2',
    type: 'quiz',
    subject: 'math',
    difficulty: 1,
    questions: [
      {
        id: 'q1',
        question: '68 - 23 = ?',
        options: ['45', '44', '46', '47'],
        correctAnswer: 0,
        explanation: '60-20=40, 8-3=5, 40+5=45',
      },
      {
        id: 'q2',
        question: '50 - 18 = ?',
        options: ['32', '31', '33', '34'],
        correctAnswer: 0,
        explanation: '50-10=40, 40-8=32',
      },
    ],
    timeLimit: 90,
    passingScore: 60,
    rewards: [{ type: 'xp', value: 25 }],
  },
  {
    id: 'memory-math-1',
    type: 'memory',
    subject: 'math',
    difficulty: 1,
    questions: [
      { id: 'm1', content: '1+1', type: 'text', pairId: 'pair1' },
      { id: 'm2', content: '2', type: 'text', pairId: 'pair1' },
      { id: 'm3', content: '2+2', type: 'text', pairId: 'pair2' },
      { id: 'm4', content: '4', type: 'text', pairId: 'pair2' },
      { id: 'm5', content: '3+3', type: 'text', pairId: 'pair3' },
      { id: 'm6', content: '6', type: 'text', pairId: 'pair3' },
      { id: 'm7', content: '4+4', type: 'text', pairId: 'pair4' },
      { id: 'm8', content: '8', type: 'text', pairId: 'pair4' },
    ],
    passingScore: 100,
    rewards: [{ type: 'xp', value: 25 }],
  },
]

// Mock 视频数据
export const mockVideos: VideoContent[] = [
  {
    id: 'video-1',
    title: '认识拼音声调',
    description: '学习汉语拼音的四个声调',
    source: 'baidu百科',
    url: 'https://www.baidu.com/s?wd=拼音声调教学视频',
    keywords: ['拼音', '声调', '语文', '汉语'],
    relatedLessons: ['chinese-2'],
    category: 'chinese',
  },
  {
    id: 'video-2',
    title: '加法运算技巧',
    description: '掌握快速加法计算方法',
    source: 'baidu百科',
    url: 'https://www.baidu.com/s?wd=小学数学加法视频',
    keywords: ['加法', '数学', '计算技巧'],
    relatedLessons: ['math-1'],
    category: 'math',
  },
  {
    id: 'video-3',
    title: '英语字母歌',
    description: '通过歌曲学习26个英文字母',
    source: 'baidu百科',
    url: 'https://www.baidu.com/s?wd=英语字母歌视频',
    keywords: ['英语', '字母', '歌曲', 'ABC'],
    relatedLessons: ['english-1'],
    category: 'english',
  },
]

// Mock 成就数据
export const mockAchievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: '初次学习',
    description: '完成第一节课',
    icon: '📚',
    unlocked: false,
    requirement: { type: 'lessons_completed', subject: 'all', value: 1 },
  },
  {
    id: 'math-master',
    title: '数学小达人',
    description: '完成5节数学课',
    icon: '🔢',
    unlocked: false,
    requirement: { type: 'lessons_completed', subject: 'math', value: 5 },
  },
  {
    id: 'chinese-expert',
    title: '语文小能手',
    description: '完成3节语文课',
    icon: '📝',
    unlocked: false,
    requirement: { type: 'lessons_completed', subject: 'chinese', value: 3 },
  },
  {
    id: 'english-expert',
    title: '英语小能手',
    description: '完成3节英语课',
    icon: '🔤',
    unlocked: false,
    requirement: { type: 'lessons_completed', subject: 'english', value: 3 },
  },
  {
    id: 'week-warrior',
    title: '坚持7天',
    description: '连续学习7天',
    icon: '🔥',
    unlocked: false,
    requirement: { type: 'streak_days', value: 7 },
  },
  {
    id: 'score-1000',
    title: '千分达人',
    description: '累计获得1000分',
    icon: '🎯',
    unlocked: false,
    requirement: { type: 'total_score', value: 1000 },
  },
  {
    id: 'perfect-game',
    title: '完美通关',
    description: '游戏获得满分',
    icon: '⭐',
    unlocked: false,
    requirement: { type: 'game_wins', gameType: 'quiz', value: 1 },
  },
]

// API 函数
export const getCoursesBySubject = (subject: string): Course[] => {
  return mockCourses.filter(course => course.subject === subject)
}

export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id)
}

export const getGameById = (id: string): Game | undefined => {
  return mockGames.find(game => game.id === id)
}

export const getVideosBySubject = (subject: string): VideoContent[] => {
  return mockVideos.filter(video => video.category === subject)
}

export const getRecommendedVideos = (userProgress: any): VideoContent[] => {
  if (!userProgress) return mockVideos

  const completedVideos = userProgress.completedLessons
    .filter((id: string) => id.startsWith('video-'))
    .map((id: string) => id.replace('video-', ''))

  return mockVideos.filter(video => !completedVideos.includes(video.id))
}

export const checkAchievements = (progress: any): Achievement[] => {
  if (!progress) return []

  return mockAchievements.filter(achievement => {
    if (progress.earnedBadges?.includes(achievement.id)) return false

    const req = achievement.requirement
    switch (req.type) {
      case 'lessons_completed': {
        const completedCount = Object.values(progress.subjects)
          .reduce((sum: number, subject: any) => sum + subject.completedLessons.length, 0)
        return completedCount >= req.value
      }

      case 'total_score': {
        const totalScore = Object.values(progress.subjects)
          .reduce((sum: number, subject: any) => sum + subject.totalScore, 0)
        return totalScore >= req.value
      }

      case 'streak_days':
        return progress.streak?.days >= req.value

      case 'game_wins':
        // 简化检查
        return progress.totalPlayTime > 0

      default:
        return false
    }
  })
}