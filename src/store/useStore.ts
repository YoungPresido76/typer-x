import { create } from 'zustand'
import type { StoreState, Player, Mission, ShopItem, LeaderboardEntry } from '@/types'

// Mock player data
const mockPlayer: Player = {
  uid: 'user-001',
  username: 'TyperX',
  level: 14,
  totalXp: 280000,
  coins: 2500,
  streak: 7,
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TyperX',
  lastPlayedDate: new Date().toISOString(),
}

// Mock missions
const mockMissions: Mission[] = [
  {
    id: 'mission-1',
    title: 'Daily Grind',
    description: 'Type 1000 words today',
    xpReward: 100,
    coinsReward: 50,
    target: 1000,
    progress: 750,
    completed: false,
    claimed: false,
    icon: 'keyboard',
  },
  {
    id: 'mission-2',
    title: 'Speed Demon',
    description: 'Type 100 words in 1 minute',
    xpReward: 150,
    coinsReward: 100,
    target: 100,
    progress: 100,
    completed: true,
    claimed: false,
    icon: 'zap',
  },
  {
    id: 'mission-3',
    title: 'Week Warrior',
    description: 'Maintain a 7-day typing streak',
    xpReward: 500,
    coinsReward: 250,
    target: 7,
    progress: 7,
    completed: true,
    claimed: true,
    icon: 'flame',
  },
  {
    id: 'mission-4',
    title: 'Accuracy Master',
    description: 'Type 100 words with 98% accuracy',
    xpReward: 200,
    coinsReward: 150,
    target: 100,
    progress: 85,
    completed: false,
    claimed: false,
    icon: 'target',
  },
]

// Mock shop items
const mockShopItems: ShopItem[] = [
  {
    id: 'theme-1',
    name: 'Neon Orange',
    category: 'theme',
    price: 500,
    owned: true,
    description: 'Default theme with vibrant orange accents',
    icon: 'palette',
  },
  {
    id: 'theme-2',
    name: 'Cyber Blue',
    category: 'theme',
    price: 800,
    owned: false,
    description: 'Cool blue futuristic theme',
    icon: 'palette',
  },
  {
    id: 'theme-3',
    name: 'Matrix Green',
    category: 'theme',
    price: 800,
    owned: false,
    description: 'Green terminal-inspired theme',
    icon: 'palette',
  },
  {
    id: 'sound-1',
    name: 'Mechanical',
    category: 'sound',
    price: 300,
    owned: true,
    description: 'Classic mechanical keyboard sounds',
    icon: 'sound',
  },
  {
    id: 'sound-2',
    name: 'Bubble Pop',
    category: 'sound',
    price: 400,
    owned: false,
    description: 'Playful bubble pop sounds',
    icon: 'sound',
  },
  {
    id: 'avatar-1',
    name: 'Ninja Typist',
    category: 'avatar',
    price: 600,
    owned: false,
    description: 'Stealthy ninja character avatar',
    icon: 'avatar',
  },
]

// Mock leaderboard
const mockLeaderboard: LeaderboardEntry[] = [
  {
    uid: 'user-phantom',
    username: 'PhantomType',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=phantom',
    level: 47,
    totalXp: 3500000,
    rank: 1,
  },
  {
    uid: 'user-speed',
    username: 'SpeedDemon',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=speed',
    level: 43,
    totalXp: 3100000,
    rank: 2,
  },
  {
    uid: 'user-master',
    username: 'KeyMaster',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=master',
    level: 41,
    totalXp: 2800000,
    rank: 3,
  },
  {
    uid: 'user-001',
    username: 'TyperX',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=typerx',
    level: 14,
    totalXp: 280000,
    rank: 4,
  },
]

export const useStore = create<StoreState>((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),

  player: mockPlayer,
  missions: mockMissions,
  shopItems: mockShopItems,
  leaderboard: mockLeaderboard,

  setPlayer: (player) => set({ player }),
  setMissions: (missions) => set({ missions }),
  setShopItems: (items) => set({ shopItems: items }),
  setLeaderboard: (entries) => set({ leaderboard: entries }),

  incrementXp: (xp) =>
    set((state) => {
      if (!state.player) return state
      return {
        player: {
          ...state.player,
          totalXp: state.player.totalXp + xp,
        },
      }
    }),

  claimMission: (missionId) =>
    set((state) => {
      const updatedMissions = state.missions.map((m) =>
        m.id === missionId && m.completed && !m.claimed
          ? { ...m, claimed: true }
          : m
      )
      return { missions: updatedMissions }
    }),

  purchaseItem: (itemId) =>
    set((state) => {
      const updatedItems = state.shopItems.map((item) =>
        item.id === itemId ? { ...item, owned: true } : item
      )
      return { shopItems: updatedItems }
    }),
}))
