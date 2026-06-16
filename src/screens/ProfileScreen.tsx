import { useStore } from '@/store/useStore'
import { useAuth } from '@/hooks/useAuth'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getLevelTitle } from '@/lib/xpFormula'
import { Mail, LogOut } from 'lucide-react'

export const ProfileScreen = () => {
  const player = useStore((state) => state.player)
  const { user, signOut } = useAuth()

  if (!player) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      {/* Profile Header */}
      <Card variant="elevated" className="mb-6">
        <div className="text-center mb-6">
          <img
            src={player.avatarUrl}
            alt={player.username}
            className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-primary/30"
          />
          <h3 className="text-2xl font-bold text-white">{player.username}</h3>
          <Badge variant="primary" size="md" className="mt-2">
            {getLevelTitle(player.level)}
          </Badge>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center bg-raised rounded-lg py-3">
            <p className="text-xl font-bold text-primary">{player.level}</p>
            <p className="text-xs text-gray-400 mt-1">Level</p>
          </div>
          <div className="text-center bg-raised rounded-lg py-3">
            <p className="text-xl font-bold text-secondary">{player.coins.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Coins</p>
          </div>
          <div className="text-center bg-raised rounded-lg py-3">
            <p className="text-xl font-bold text-accent">{player.streak}</p>
            <p className="text-xs text-gray-400 mt-1">Streak</p>
          </div>
        </div>

        <Button variant="secondary" fullWidth>
          Change Avatar
        </Button>
      </Card>

      {/* Account Info */}
      <Card variant="default" className="mb-6">
        <h3 className="font-semibold text-white mb-4">Account Information</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-gray-400 flex items-center gap-2">
              <Mail size={16} /> Email
            </span>
            <span className="text-white text-sm">{user?.email ?? '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-gray-400">Total XP</span>
            <span className="text-primary text-sm font-bold">
              {player.totalXp.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Member Since</span>
            <span className="text-white text-sm">
              {new Date(player.lastPlayedDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </Card>

      {/* Sign Out */}
      <Card variant="default">
        <Button
          variant="ghost"
          fullWidth
          icon={<LogOut size={18} />}
          onClick={signOut}
          className="text-error hover:bg-error/10"
        >
          Sign Out
        </Button>
      </Card>
    </div>
  )
}
