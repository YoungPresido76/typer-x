import { useStore } from '@/store/useStore'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { Flame } from 'lucide-react'
import { calculateLevel, xpToNextLevel, xpProgress, getLevelTitle } from '@/lib/xpFormula'

export const HomeScreen = () => {
  const player = useStore((state) => state.player)
  const setActiveTab = useStore((state) => state.setActiveTab)

  if (!player) {
    return <div className="text-center py-10">Loading...</div>
  }

  const currentLevel = calculateLevel(player.totalXp)
  const nextLevelXp = xpToNextLevel(player.totalXp)
  const progressPercent = xpProgress(player.totalXp)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      {/* Profile Card */}
      <Card variant="elevated" className="mb-6">
        <div className="flex items-center gap-4">
          <img
            src={player.avatarUrl}
            alt={player.username}
            className="w-16 h-16 rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{player.username}</h2>
            <p className="text-sm text-gray-400">{getLevelTitle(currentLevel)}</p>
          </div>
          <Badge variant="primary" size="lg">
            Lv {currentLevel}
          </Badge>
        </div>
      </Card>

      {/* XP Progress */}
      <Card variant="default" className="mb-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-300">XP Progress</span>
            <span className="text-sm text-primary font-bold">
              {player.totalXp.toLocaleString()}
            </span>
          </div>
          <ProgressBar progress={progressPercent} variant="primary" animated />
        </div>
        <p className="text-xs text-gray-500">
          {nextLevelXp.toLocaleString()} XP to next level
        </p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card variant="default">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{player.coins}</p>
            <p className="text-xs text-gray-400 mt-1">Coins</p>
          </div>
        </Card>
        <Card variant="default">
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{player.streak}</p>
            <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
              Day Streak <Flame size={12} />
            </p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card variant="default">
        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
        <div className="space-y-2">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className="w-full p-3 bg-raised hover:bg-pressed rounded-m text-left transition-smooth text-sm"
          >
            View Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('missions')}
            className="w-full p-3 bg-raised hover:bg-pressed rounded-m text-left transition-smooth text-sm"
          >
            Check Missions
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className="w-full p-3 bg-raised hover:bg-pressed rounded-m text-left transition-smooth text-sm"
          >
            Visit Shop
          </button>
        </div>
      </Card>
    </div>
  )
}
