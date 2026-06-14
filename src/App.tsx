import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { HomeScreen } from '@/screens/HomeScreen'
import { MissionsScreen } from '@/screens/MissionsScreen'
import { ShopScreen } from '@/screens/ShopScreen'
import { StatsScreen } from '@/screens/StatsScreen'
import { ProfileScreen } from '@/screens/ProfileScreen'
import { LeaderboardScreen } from '@/screens/LeaderboardScreen'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />
      case 'missions':
        return <MissionsScreen />
      case 'shop':
        return <ShopScreen />
      case 'stats':
        return <StatsScreen />
      case 'profile':
        return <ProfileScreen />
      case 'leaderboard':
        return <LeaderboardScreen />
      default:
        return <HomeScreen />
    }
  }

  const getHeaderTitle = () => {
    const titles: Record<string, string> = {
      home: 'Typer X',
      missions: 'Missions',
      shop: 'Shop',
      stats: 'Statistics',
      profile: 'Profile',
      leaderboard: 'Leaderboard',
    }
    return titles[activeTab] || 'Typer X'
  }

  return (
    <div className="bg-base min-h-screen text-white">
      <Header
        title={getHeaderTitle()}
        subtitle={activeTab === 'home' ? 'Level up with every keystroke' : undefined}
      />
      {renderScreen()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
