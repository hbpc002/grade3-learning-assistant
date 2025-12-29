import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { VideoCard } from './VideoCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToastHook } from '@/components/ui/Toast'
import { useUserStore } from '@/stores/user-store'
import { mockVideos, getVideosBySubject } from '@/api/mock-data'
import { VideoContent } from '@/types'

export const VideoPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'chinese' | 'math' | 'english'>('all')
  const { toast } = useToastHook()
  const completeLesson = useUserStore(state => state.completeLesson)
  const addXP = useUserStore(state => state.addXP)

  const getFilteredVideos = () => {
    if (selectedSubject === 'all') return mockVideos
    return getVideosBySubject(selectedSubject)
  }

  const handleVideoClick = (video: VideoContent) => {
    if (video.source === 'baidu百科') {
      // 打开百度百科搜索
      const searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(video.keywords[0])}视频`
      window.open(searchUrl, '_blank')

      // 记录观看
      completeLesson(`video-${video.id}`, video.category, 50)
      addXP(30)

      toast({
        title: '🎬 已打开百度百科',
        description: `观看 "${video.title}" 可获得30 XP`,
        variant: 'success'
      })
    } else {
      // 本地视频（模拟）
      toast({
        title: '🎬 视频播放',
        description: `正在播放: ${video.title}`,
        variant: 'default'
      })

      // 模拟完成
      setTimeout(() => {
        completeLesson(`video-${video.id}`, video.category, 100)
        addXP(50)
        toast({
          title: '✅ 视频观看完成',
          description: `获得 50 XP！`,
          variant: 'success'
        })
      }, 3000)
    }
  }

  const videos = getFilteredVideos()

  return (
    <div className="space-y-6">
      {/* 标题区域 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-2">🎬 视频学习</h1>
        <p className="text-gray-600">观看生动有趣的视频，轻松学习知识！</p>
      </div>

      {/* 视频来源说明 */}
      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-semibold mb-1">视频来源说明</p>
              <p className="text-sm text-gray-700">
                <strong>内置视频：</strong>直接播放，观看完成获得奖励
                <br />
                <strong>百度百科：</strong>点击跳转到百度百科观看，同样获得奖励
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 科目筛选 */}
      <div className="flex gap-3 flex-wrap">
        <Button
          variant={selectedSubject === 'all' ? 'fun' : 'outline'}
          size="lg"
          onClick={() => setSelectedSubject('all')}
        >
          全部
        </Button>
        <Button
          variant={selectedSubject === 'chinese' ? 'chinese' : 'outline'}
          size="lg"
          onClick={() => setSelectedSubject('chinese')}
        >
          语文
        </Button>
        <Button
          variant={selectedSubject === 'math' ? 'math' : 'outline'}
          size="lg"
          onClick={() => setSelectedSubject('math')}
        >
          数学
        </Button>
        <Button
          variant={selectedSubject === 'english' ? 'english' : 'outline'}
          size="lg"
          onClick={() => setSelectedSubject('english')}
        >
          英语
        </Button>
      </div>

      {/* 视频列表 */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {selectedSubject === 'all' ? '全部视频' :
             selectedSubject === 'chinese' ? '语文视频' :
             selectedSubject === 'math' ? '数学视频' : '英语视频'}
          </h2>
          <Badge variant="secondary">共 {videos.length} 个</Badge>
        </div>

        {videos.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <p className="text-gray-600 text-lg">暂无视频，敬请期待！</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map(video => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => handleVideoClick(video)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 推荐视频 */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-xl">🌟 热门推荐</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• <strong>认识时钟和时间</strong> - 学习时间概念</p>
            <p>• <strong>加法运算技巧</strong> - 掌握快速计算</p>
            <p>• <strong>认识动物世界</strong> - 探索自然奥秘</p>
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