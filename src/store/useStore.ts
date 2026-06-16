import { create } from 'zustand'
import type { StoreState, Player, Mission, ShopItem, LeaderboardEntry } from '@/types'
import { supabase } from '@/lib/supabase'
import { calculateLevel } from '@/lib/xpFormula'

// ── Raw DB row shapes (explicit — avoids TypeScript "never" inference) ──

interface PlayerRow {
  id: string
  username: string
  avatar_url: string
  total_xp: number
  level: number
  coins: number
  streak: number
  last_played_date: string
}

interface MissionRow {
  id: string
  title: string
  description: string
  icon: string
  xp_reward: number
  coins_reward: number
  target: number
  progress: number
  completed: boolean
  claimed: boolean
}

interface ShopItemRow {
  id: string
  name: string
  category: string
  price: number
  description: string
  icon: string
  player_shop_items: { owned: boolean; equipped: boolean }[] | null
}

interface LeaderboardRow {
  id: string
  username: string
  avatar_url: string
  level: number
  total_xp: number
  rank: number
}

// ── Store ─────────────────────────────────────────────────────────────────

export const useStore = create<StoreState>((set, get) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),

  player: null,
  missions: [],
  shopItems: [],
  leaderboard: [],

  setPlayer: (player) => set({ player }),
  setMissions: (missions) => set({ missions }),
  setShopItems: (items) => set({ shopItems: items }),
  setLeaderboard: (entries) => set({ leaderboard: entries }),

  // ── Load all player data after sign-in ─────────────────────────────
  loadPlayerData: async (userId: string) => {
    // 1. Player profile
    const { data: playerRow, error: playerErr } = await supabase
      .from('players')
      .select('*')
      .eq('id', userId)
      .single()

    if (playerErr || !playerRow) {
      console.error('Failed to load player:', playerErr?.message)
      return
    }

    const row = playerRow as PlayerRow

    const player: Player = {
      uid: row.id,
      username: row.username,
      avatarUrl:
        row.avatar_url ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${row.username}`,
      level: calculateLevel(row.total_xp),
      totalXp: row.total_xp,
      coins: row.coins,
      streak: row.streak,
      lastPlayedDate: row.last_played_date,
    }
    set({ player })

    // 2. Missions
    const { data: missionRows } = await supabase
      .from('missions')
      .select('*')
      .eq('player_id', userId)
      .order('created_at', { ascending: true })

    if (missionRows) {
      const missions: Mission[] = (missionRows as MissionRow[]).map((m) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        icon: m.icon,
        xpReward: m.xp_reward,
        coinsReward: m.coins_reward,
        target: m.target,
        progress: m.progress,
        completed: m.completed,
        claimed: m.claimed,
      }))
      set({ missions })
    }

    // 3. Shop items (catalog + ownership)
    const { data: catalogRows } = await supabase
      .from('shop_items')
      .select('*, player_shop_items!left(owned, equipped)')
      .eq('player_shop_items.player_id', userId)

    if (catalogRows) {
      const shopItems: ShopItem[] = (catalogRows as ShopItemRow[]).map((item) => {
        const ownership = item.player_shop_items?.[0]
        return {
          id: item.id,
          name: item.name,
          category: item.category as ShopItem['category'],
          price: item.price,
          description: item.description,
          icon: item.icon,
          owned: ownership?.owned ?? false,
          equipped: ownership?.equipped ?? false,
        }
      })
      set({ shopItems })
    }

    // 4. Leaderboard
    await get().refreshLeaderboard()
  },

  // ── Leaderboard ────────────────────────────────────────────────────
  refreshLeaderboard: async () => {
    const { data: rows } = await supabase
      .from('leaderboard')
      .select('*')
      .order('rank', { ascending: true })
      .limit(50)

    if (rows) {
      const entries: LeaderboardEntry[] = (rows as LeaderboardRow[]).map((row) => ({
        uid: row.id,
        username: row.username,
        avatarUrl:
          row.avatar_url ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${row.username}`,
        level: row.level,
        totalXp: row.total_xp,
        rank: row.rank,
      }))
      set({ leaderboard: entries })
    }
  },

  // ── XP (local update — keyboard bridge will call this) ─────────────
  incrementXp: (xp) =>
    set((state) => {
      if (!state.player) return state
      const newTotalXp = state.player.totalXp + xp
      return {
        player: {
          ...state.player,
          totalXp: newTotalXp,
          level: calculateLevel(newTotalXp),
        },
      }
    }),

  // ── Claim mission reward ───────────────────────────────────────────
  claimMission: async (missionId: string) => {
    const { missions, player } = get()
    const mission = missions.find((m) => m.id === missionId)
    if (!mission || !mission.completed || mission.claimed || !player) return

    await supabase
      .from('missions')
      .update({ claimed: true } as Record<string, unknown>)
      .eq('id', missionId)
      .eq('player_id', player.uid)

    await supabase
      .from('players')
      .update({ coins: player.coins + mission.coinsReward } as Record<string, unknown>)
      .eq('id', player.uid)

    await get().loadPlayerData(player.uid)

    set({
      missions: missions.map((m) =>
        m.id === missionId ? { ...m, claimed: true } : m
      ),
    })
  },

  // ── Purchase shop item ─────────────────────────────────────────────
  purchaseItem: async (itemId: string) => {
    const { shopItems, player } = get()
    const item = shopItems.find((i) => i.id === itemId)
    if (!item || item.owned || !player || player.coins < item.price) return

    const { error } = await supabase
      .from('players')
      .update({ coins: player.coins - item.price } as Record<string, unknown>)
      .eq('id', player.uid)

    if (error) return

    await supabase
      .from('player_shop_items')
      .upsert({
        player_id: player.uid,
        item_id: itemId,
        owned: true,
        equipped: false,
      } as Record<string, unknown>)

    set({
      player: { ...player, coins: player.coins - item.price },
      shopItems: shopItems.map((i) =>
        i.id === itemId ? { ...i, owned: true } : i
      ),
    })
  },
}))
