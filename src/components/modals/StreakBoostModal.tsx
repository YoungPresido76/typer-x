import { Flame } from 'lucide-react'

interface StreakBoostModalProps {
  isOpen: boolean
  streak: number
  onClose: () => void
}

export const StreakBoostModal = ({
  isOpen,
  streak,
  onClose,
}: StreakBoostModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface border border-border rounded-l p-6 max-w-sm shadow-level-5 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Flame size={32} className="text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-accent mb-2">Streak Boost!</h2>
        <p className="text-gray-300 mb-4">
          You're on a <span className="text-accent font-bold">{streak}-day</span> streak!
        </p>
        <button
          onClick={onClose}
          className="w-full bg-accent text-white py-2 rounded-l hover:bg-[#9B45E0]"
        >
          Keep Going!
        </button>
      </div>
    </div>
  )
}
