import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { VideoContent } from '@/types'

interface VideoCardProps {
  video: VideoContent
  onClick: () => void
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const isExternal = video.source === 'baidu百科'

  return (
    <Card className="hover:shadow-xl transition-all h-full flex flex-col">
      <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg flex items-center justify-center text-white text-5xl">
        {isExternal ? '🌐' : '▶️'}
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{video.title}</CardTitle>
        <CardDescription className="line-clamp-2">{video.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex justify-between items-center mb-3">
          <Badge variant={isExternal ? 'outline' : 'default'}>
            {isExternal ? '百度百科' : '内置视频'}
          </Badge>
          {video.duration && (
            <span className="text-sm text-gray-600">⏱️ {Math.floor(video.duration / 60)}分钟</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {video.keywords.slice(0, 3).map(keyword => (
            <Badge key={keyword} variant="secondary" className="text-xs">
              {keyword}
            </Badge>
          ))}
        </div>

        <Button
          onClick={onClick}
          className="w-full font-semibold"
          variant={isExternal ? 'outline' : 'default'}
          size="sm"
        >
          {isExternal ? '🔗 打开百科' : '🎬 观看视频'}
        </Button>
      </CardContent>
    </Card>
  )
}