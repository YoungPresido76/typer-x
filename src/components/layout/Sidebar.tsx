import { Home, Zap, ShoppingBag, BarChart3, User, Trophy, X, Flame } from 'lucide-react'
import { useStore } from '@/store/useStore'

const NAV_ITEMS = [
  { id: 'home',        label: 'Home',        icon: Home,         badge: null },
  { id: 'missions',    label: 'Missions',     icon: Zap,          badge: '2'  },
  { id: 'shop',        label: 'Shop',         icon: ShoppingBag,  badge: null },
  { id: 'stats',       label: 'Statistics',   icon: BarChart3,    badge: null },
  { id: 'leaderboard', label: 'Leaderboard',  icon: Trophy,       badge: null },
  { id: 'profile',     label: 'Profile',      icon: User,         badge: null },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const activeTab  = useStore((s) => s.activeTab)
  const setActive  = useStore((s) => s.setActiveTab)

  const navigate = (tab: string) => {
    setActive(tab)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
        }}
      />

      {/* Drawer */}
      <aside
        className="glass-sidebar fixed left-0 top-0 bottom-0 w-[280px] z-50 flex flex-col"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Top sheen */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6 border-b border-white/[0.06]">
          <span
            className="text-[20px] font-black tracking-widest"
            style={{
              background: 'linear-gradient(135deg, #FF7A1A, #FFB347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            TYPER X
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-smooth"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.09)',
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => {
            const isActive = activeTab === id
            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium transition-all duration-200"
                style={isActive ? {
                  background: 'rgba(255,255,255,0.09)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 16px rgba(0,0,0,0.3)',
                  color: '#fff',
                } : {
                  color: '#888899',
                  border: '1px solid transparent',
                }}
              >
                <span
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 transition-all duration-200"
                  style={isActive ? {
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    color: '#fff',
                    boxShadow: '0 2px 10px rgba(255,255,255,0.08)',
                  } : {
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#888899',
                  }}
                >
                  <Icon size={16} />
                </span>
                <span className="flex-1 text-left">{label}</span>
                {badge && (
                  <span
                    className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full min-w-[18px] text-center"
                    style={{ background: '#FF7A1A' }}
                  >
                    {badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Pro Pass card */}
        <div className="m-3 mb-5">
          <div
            className="rounded-[18px] p-4 relative overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, rgba(30,10,0,0.95), rgba(42,18,0,0.95))',
              border: '1px solid rgba(255,122,26,0.28)',
            }}
          >
            {/* Glow overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[18px]"
              style={{ background: 'linear-gradient(135deg, rgba(255,122,26,0.06), transparent)' }}
            />
            <p className="text-[10px] font-bold text-primary uppercase tracking-[1px] mb-1 flex items-center gap-1">
              <Flame size={10} /> Go Pro
            </p>
            <p className="text-[13px] font-bold text-white mb-1">Unlock Pro Pass</p>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              2× XP multiplier, exclusive themes, ad-free.
            </p>
            <button
              className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-white px-3 py-1.5 rounded-[8px] transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #FF7A1A, #FFB347)',
                boxShadow: '0 4px 14px rgba(255,122,26,0.38)',
              }}
            >
              <Zap size={11} /> Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
