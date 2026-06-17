import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useStore } from '@/store/useStore'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { LoginScreen } from '@/screens/LoginScreen'
import { HomeScreen } from '@/screens/HomeScreen'
import { MissionsScreen } from '@/screens/MissionsScreen'
import { ShopScreen } from '@/screens/ShopScreen'
import { StatsScreen } from '@/screens/StatsScreen'
import { ProfileScreen } from '@/screens/ProfileScreen'
import { LeaderboardScreen } from '@/screens/LeaderboardScreen'
import { Keyboard } from 'lucide-react'

const TITLES: Record<string, string> = {
  home:        'Dashboard',
  missions:    'Missions',
  shop:        'Shop',
  stats:       'Statistics',
  profile:     'Profile',
  leaderboard: 'Leaderboard',
}

function App() {
  const { user, loading }  = useAuth()
  const activeTab          = useStore((s) => s.activeTab)
  const loadPlayerData     = useStore((s) => s.loadPlayerData)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (user?.id) loadPlayerData(user.id)
  }, [user?.id, loadPlayerData])

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':        return <HomeScreen />
      case 'missions':    return <MissionsScreen />
      case 'shop':        return <ShopScreen />
      case 'stats':       return <StatsScreen />
      case 'profile':     return <ProfileScreen />
      case 'leaderboard': return <LeaderboardScreen />
      default:            return <HomeScreen />
    }
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0F12] flex flex-col items-center justify-center gap-5">
        <div
          className="w-16 h-16 rounded-[20px] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #FF7A1A, #FFB347)',
            boxShadow: '0 8px 28px rgba(255,122,26,0.45)',
          }}
        >
          <Keyboard size={30} className="text-white" />
        </div>
        <div className="w-7 h-7 border-2 border-white/10 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  /* ── Not signed in ── */
  if (!user) return <LoginScreen />

  /* ── Main app ── */
  return (
    <div className="bg-[#0D0F12] min-h-screen text-white overflow-x-hidden">

      {/* Ambient bubbles */}
      <div className="bubble-bg">
        <div className="bubble" style={{ width: 420, height: 420, background: 'rgba(255,122,26,0.10)', left: '-10%', top: '8%', animationDuration: '22s' }} />
        <div className="bubble" style={{ width: 300, height: 300, background: 'rgba(171,85,247,0.09)', right: '3%', top: '35%', animationDuration: '28s', animationDelay: '-8s' }} />
        <div className="bubble" style={{ width: 240, height: 240, background: 'rgba(79,142,247,0.08)', left: '42%', bottom: '18%', animationDuration: '18s', animationDelay: '-4s' }} />
      </div>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Topbar */}
      <Header
        title={TITLES[activeTab] || 'Dashboard'}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Page content */}
      <main className="relative z-10 pt-[60px]">
        {renderScreen()}
      </main>

      {/* Bottom nav */}
      <BottomNav />
    </div>
  )
}

export default App
