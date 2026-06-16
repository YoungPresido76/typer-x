import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useStore } from '@/store/useStore'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { LoginScreen } from '@/screens/LoginScreen'
import { HomeScreen } from '@/screens/HomeScreen'
import { MissionsScreen } from '@/screens/MissionsScreen'
import { ShopScreen } from '@/screens/ShopScreen'
import { StatsScreen } from '@/screens/StatsScreen'
import { ProfileScreen } from '@/screens/ProfileScreen'
import { LeaderboardScreen } from '@/screens/LeaderboardScreen'
import { Keyboard } from 'lucide-react'

function App() {
  const { user, loading } = useAuth()
  const activeTab = useStore((state) => state.activeTab)
  const loadPlayerData = useStore((state) => state.loadPlayerData)

  // Load real player data once user signs in
  useEffect(() => {
    if (user?.id) {
      loadPlayerData(user.id)
    }
  }, [user?.id, loadPlayerData])

  // ── Full-screen loading spinner ───────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-base flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-orange">
          <Keyboard size={32} className="text-white" />
        </div>
        <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  // ── Not signed in → show login/onboarding ────────────────────────
  if (!user) {
    return <LoginScreen />
  }

  // ── Signed in → show main app ────────────────────────────────────
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

  const headerTitles: Record<string, string> = {
    home: 'Typer X',
    missions: 'Missions',
    shop: 'Shop',
    stats: 'Statistics',
    profile: 'Profile',
    leaderboard: 'Leaderboard',
  }

  return (
    <div className="bg-base min-h-screen text-white">
      <Header
        title={headerTitles[activeTab] || 'Typer X'}
        subtitle={activeTab === 'home' ? 'Level up with every keystroke' : undefined}
      />
      {renderScreen()}
      <BottomNav />
    </div>
  )
}

export default App
