import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/user-store'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useToastHook } from '@/components/ui/Toast'

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const login = useUserStore(state => state.login)
  const navigate = useNavigate()
  const { toast } = useToastHook()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      toast({ title: '请输入用户名', variant: 'warning' })
      return
    }

    if (username.length < 2) {
      toast({ title: '用户名至少需要2个字符', variant: 'warning' })
      return
    }

    login(username.trim())
    toast({
      title: `欢迎你，${username}！`,
      description: '开始你的学习之旅吧！',
      variant: 'success'
    })
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-2">🎓 学习助手</CardTitle>
          <p className="text-gray-600">小学三年级学习伙伴</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">你的名字</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入你的名字"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                maxLength={10}
              />
            </div>

            <Button
              type="submit"
              size="huge"
              variant="fun"
              className="w-full text-lg font-bold"
            >
              开始学习 🚀
            </Button>

            <div className="text-center text-sm text-gray-500 mt-4">
              <p>💡 提示：不需要密码，记住你的名字即可</p>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
            <p className="font-semibold mb-2">🎯 功能特色：</p>
            <ul className="space-y-1 text-gray-700">
              <li>📚 趣味课程学习</li>
              <li>🎮 游戏化练习</li>
              <li>🎬 视频教学</li>
              <li>🏆 成就系统</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}