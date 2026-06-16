import { Home, Zap, ShoppingBag, BarChart3, User } from 'lucide-react'
import { useStore } from '@/store/useStore'

export const BottomNav = () => {
  const activeTab = useStore((state) => state.activeTab)
  const setActiveTab = useStore((state) => state.setActiveTab)

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'missions', label: 'Missions', icon: Zap },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border">
      <div className="flex justify-around items-center h-20 max-w-2xl mx-auto px-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-s transition-smooth ${
              activeTab === id
                ? 'text-primary'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
