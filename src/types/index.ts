// Player data
export interface Player {
  uid: string
  username: string
  level: number
  totalXp: number
  coins: number
  streak: number
  avatarUrl: string
  lastPlayedDate: string
}

// Leaderboard entry
export interface LeaderboardEntry {
  uid: string
  username: string
  avatarUrl: string
  level: number
  totalXp: number
  rank: number
}

// Mission
export interface Mission {
  id: string
  title: string
  description: string
  xpReward: number
  coinsReward: number
  target: number
  progress: number
  completed: boolean
  claimed: boolean
  icon: string // key into iconMap, see src/lib/icons.ts
}

// Shop item
export interface ShopItem {
  id: string
  name: string
  category: 'theme' | 'sound' | 'effect' | 'avatar'
  price: number
  owned: boolean
  description: string
  icon: string // key into iconMap, see src/lib/icons.ts
}

// Store state
export interface StoreState {
  activeTab: string
  setActiveTab: (tab: string) => void
  player: Player | null
  missions: Mission[]
  shopItems: ShopItem[]
  leaderboard: LeaderboardEntry[]
  setPlayer: (player: Player) => void
  setMissions: (missions: Mission[]) => void
  setShopItems: (items: ShopItem[]) => void
  setLeaderboard: (entries: LeaderboardEntry[]) => void
  incrementXp: (xp: number) => void
  claimMission: (missionId: string) => void
  purchaseItem: (itemId: string) => void
}

// Level info
export interface LevelInfo {
  level: number
  title: string
  xpToNextLevel: number
  cumulativeXp: number
  xpProgress: number
}

// Auth state
export interface AuthState {
  user: {
    uid: string
    email: string
    displayName: string
    photoURL: string
  } | null
  isAuthenticated: boolean
  isGuest: boolean
}
