import { useStore } from '@/store/useStore'
import { Card } from '@/components/ui/Card'
import { BarChart3 } from 'lucide-react'

export const StatsScreen = () => {
  const player = useStore((state) => state.player)

  if (!player) {
    return <div className="text-center py-10">Loading...</div>
  }

  const stats = [
    { label: 'Total XP', value: player.totalXp.toLocaleString(), icon: '⚡' },
    { label: 'Level', value: player.level, icon: '📈' },
    { label: 'Coins', value: player.coins.toLocaleString(), icon: '💰' },
    { label: 'Streak', value: `${player.streak} days`, icon: '🔥' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <h2 className="text-2xl font-bold mb-6">Statistics</h2>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} variant="default">
            <div className="text-center">
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-2">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Stats */}
      <Card variant="default">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart3 size={20} /> Detailed Analytics
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-gray-400">Last Played</span>
            <span className="text-white font-medium">{player.lastPlayedDate}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-gray-400">Current Streak</span>
            <span className="text-accent font-medium">{player.streak} days 🔥</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Account Status</span>
            <span className="text-success font-medium">Active ✓</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
