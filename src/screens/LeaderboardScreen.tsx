import { useStore } from '@/store/useStore'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Medal } from 'lucide-react'

export const LeaderboardScreen = () => {
  const leaderboard = useStore((state) => state.leaderboard)
  const player = useStore((state) => state.player)

  const getRankMedal = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <h2 className="text-2xl font-bold mb-2">🌍 Leaderboard</h2>
      <p className="text-sm text-gray-400 mb-6">Global ranking - All-time XP</p>

      {leaderboard.length === 0 ? (
        <Card variant="default" className="text-center py-8">
          <p className="text-gray-400">No leaderboard data available</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {leaderboard.map((entry) => {
            const isCurrentUser = player?.uid === entry.uid
            return (
              <Card
                key={entry.uid}
                variant={isCurrentUser ? 'raised' : 'default'}
                className={isCurrentUser ? 'border-primary' : ''}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-2xl font-bold text-primary w-10 text-center">
                      {getRankMedal(entry.rank)}
                    </span>
                    <img
                      src={entry.avatarUrl}
                      alt={entry.username}
                      className="w-12 h-12 rounded-s"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{entry.username}</p>
                      <p className="text-xs text-gray-400">
                        {entry.totalXp.toLocaleString()} XP
                      </p>
                    </div>
                  </div>
                  <Badge variant="primary" size="md">
                    Lv {entry.level}
                  </Badge>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Current User Pinned */}
      {player && (
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-gray-400 text-center mb-3">YOUR RANK</p>
          <Card variant="elevated">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <span className="text-2xl font-bold text-primary">#4</span>
                <img src={player.avatarUrl} alt={player.username} className="w-12 h-12 rounded-s" />
                <div>
                  <p className="font-semibold text-white">{player.username}</p>
                  <p className="text-xs text-gray-400">{player.totalXp.toLocaleString()} XP</p>
                </div>
              </div>
              <Badge variant="primary" size="md">
                Lv {player.level}
              </Badge>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
