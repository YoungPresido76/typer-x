import { Trophy } from 'lucide-react'

interface LevelUpModalProps {
  isOpen: boolean
  level: number
  onClose: () => void
}

export const LevelUpModal = ({ isOpen, level, onClose }: LevelUpModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface border border-border rounded-l p-6 max-w-sm shadow-level-5 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <Trophy size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">Level Up!</h2>
        <p className="text-gray-300 mb-4">You've reached Level {level}</p>
        <button
          onClick={onClose}
          className="w-full bg-primary text-white py-2 rounded-l hover:bg-[#E66A0A]"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
