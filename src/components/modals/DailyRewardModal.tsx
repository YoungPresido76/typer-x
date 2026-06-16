import { Gift } from 'lucide-react'

interface DailyRewardModalProps {
  isOpen: boolean
  xpReward: number
  coinsReward: number
  onClose: () => void
}

export const DailyRewardModal = ({
  isOpen,
  xpReward,
  coinsReward,
  onClose,
}: DailyRewardModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface border border-border rounded-l p-6 max-w-sm shadow-level-5 text-center">
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
          <Gift size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-success mb-2">Daily Reward!</h2>
        <div className="space-y-2 mb-4">
          <p className="text-gray-300">
            <span className="text-primary">+{xpReward}</span> XP
          </p>
          <p className="text-gray-300">
            <span className="text-secondary">+{coinsReward}</span> Coins
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-success text-white py-2 rounded-l hover:bg-[#1ABC4F]"
        >
          Claim
        </button>
      </div>
    </div>
  )
}
