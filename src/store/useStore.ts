import { create } from 'zustand'
import type { StoreState, Player, Mission, ShopItem, LeaderboardEntry } from '@/types'
import { supabase } from '@/lib/supabase'
import { calculateLevel } from '@/lib/xpFormula'

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

  // ── Load all player data from Supabase after sign-in ─────────────
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

    const player: Player = {
      uid: playerRow.id,
      username: playerRow.username,
      avatarUrl:
        playerRow.avatar_url ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${playerRow.username}`,
      level: calculateLevel(playerRow.total_xp),
      totalXp: playerRow.total_xp,
      coins: playerRow.coins,
      streak: playerRow.streak,
      lastPlayedDate: playerRow.last_played_date,
    }
    set({ player })

    // 2. Missions
    const { data: missionRows } = await supabase
      .from('missions')
      .select('*')
      .eq('player_id', userId)
      .order('created_at', { ascending: true })

    if (missionRows) {
      const missions: Mission[] = missionRows.map((m) => ({
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
      const shopItems: ShopItem[] = catalogRows.map((item) => {
        const ownership = item.player_shop_items?.[0]
        return {
          id: item.id,
          name: item.name,
          category: item.category,
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

  // ── Refresh leaderboard from Supabase view ───────────────────────
  refreshLeaderboard: async () => {
    const { data: rows } = await supabase
      .from('leaderboard')
      .select('*')
      .order('rank', { ascending: true })
      .limit(50)

    if (rows) {
      const entries: LeaderboardEntry[] = rows.map((row) => ({
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

  claimMission: async (missionId: string) => {
    const { missions, player } = get()
    const mission = missions.find((m) => m.id === missionId)
    if (!mission || !mission.completed || mission.claimed || !player) return

    // Update Supabase
    await supabase
      .from('missions')
      .update({ claimed: true })
      .eq('id', missionId)
      .eq('player_id', player.uid)

    // Award XP + coins via server function
    await supabase.rpc('submit_typing_session', {
      p_words_typed: mission.xpReward,
      p_duration_seconds: 60,
    })

    // Update coins locally
    await supabase
      .from('players')
      .update({ coins: player.coins + mission.coinsReward })
      .eq('id', player.uid)

    // Refresh player data
    await get().loadPlayerData(player.uid)

    // Update mission in local state
    set({
      missions: missions.map((m) =>
        m.id === missionId ? { ...m, claimed: true } : m
      ),
    })
  },

  purchaseItem: async (itemId: string) => {
    const { shopItems, player } = get()
    const item = shopItems.find((i) => i.id === itemId)
    if (!item || item.owned || !player || player.coins < item.price) return

    // Deduct coins
    const { error } = await supabase
      .from('players')
      .update({ coins: player.coins - item.price })
      .eq('id', player.uid)

    if (error) return

    // Record ownership
    await supabase.from('player_shop_items').upsert({
      player_id: player.uid,
      item_id: itemId,
      owned: true,
      equipped: false,
    })

    set({
      player: { ...player, coins: player.coins - item.price },
      shopItems: shopItems.map((i) =>
        i.id === itemId ? { ...i, owned: true } : i
      ),
    })
  },
}))
