interface MissionCompleteModalProps {
  isOpen: boolean
  missionTitle: string
  xpReward: number
  coinsReward: number
  onClose: () => void
}

export const MissionCompleteModal = ({
  isOpen,
  missionTitle,
  xpReward,
  coinsReward,
  onClose,
}: MissionCompleteModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface border border-border rounded-l p-6 max-w-sm shadow-level-5">
        <h2 className="text-2xl font-bold text-success mb-2">Mission Complete! ✓</h2>
        <p className="text-gray-300 mb-4">{missionTitle}</p>
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
          Awesome!
        </button>
      </div>
    </div>
  )
}
