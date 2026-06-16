import { useStore } from '@/store/useStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getLevelTitle } from '@/lib/xpFormula'
import { Mail, Edit2 } from 'lucide-react'

export const ProfileScreen = () => {
  const player = useStore((state) => state.player)

  if (!player) {
    return <div className="text-center py-10">Loading...</div>
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
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 className="text-2xl font-bold text-white">{player.username}</h3>
          <Badge variant="primary" size="md" className="mt-2">
            {getLevelTitle(player.level)}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" fullWidth icon={<Edit2 size={18} />}>
            Edit Profile
          </Button>
          <Button variant="secondary" fullWidth>
            Change Avatar
          </Button>
        </div>
      </Card>

      {/* Account Info */}
      <Card variant="default" className="mb-6">
        <h3 className="font-semibold text-white mb-4">Account Information</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-gray-400 flex items-center gap-2">
              <Mail size={16} /> Email
            </span>
            <span className="text-white text-sm">user@example.com</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-gray-400">User ID</span>
            <span className="text-white text-sm font-mono">{player.uid}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Member Since</span>
            <span className="text-white text-sm">June 2026</span>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card variant="default">
        <h3 className="font-semibold text-white mb-4">Settings</h3>
        <div className="space-y-2">
          <button className="w-full p-3 bg-raised hover:bg-pressed rounded-m transition-smooth text-left text-sm">
            Notification Settings
          </button>
          <button className="w-full p-3 bg-raised hover:bg-pressed rounded-m transition-smooth text-left text-sm">
            Privacy Settings
          </button>
          <button className="w-full p-3 bg-raised hover:bg-pressed rounded-m transition-smooth text-left text-sm text-error">
            Sign Out
          </button>
        </div>
      </Card>
    </div>
  )
}
