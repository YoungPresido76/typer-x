// Auto-shaped to match supabase/schema.sql
// If you later run `supabase gen types typescript`, replace this file.

export interface Database {
  public: {
    Tables: {
      players: {
        Row: {
          id: string
          username: string
          avatar_url: string
          total_xp: number
          level: number
          coins: number
          streak: number
          highest_streak: number
          last_played_date: string
          created_at: string
        }
        Insert: {
          id: string
          username: string
          avatar_url?: string
          total_xp?: number
          level?: number
          coins?: number
          streak?: number
          highest_streak?: number
          last_played_date?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['players']['Insert']>
      }
      missions: {
        Row: {
          id: string
          player_id: string
          title: string
          description: string
          icon: string
          xp_reward: number
          coins_reward: number
          target: number
          progress: number
          completed: boolean
          claimed: boolean
          mission_type: 'daily' | 'weekly' | 'achievement'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['missions']['Row'], 'created_at'> & {
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['missions']['Insert']>
      }
      shop_items: {
        Row: {
          id: string
          name: string
          category: 'theme' | 'sound' | 'effect' | 'avatar'
          price: number
          description: string
          icon: string
        }
        Insert: Database['public']['Tables']['shop_items']['Row']
        Update: Partial<Database['public']['Tables']['shop_items']['Row']>
      }
      player_shop_items: {
        Row: {
          player_id: string
          item_id: string
          owned: boolean
          equipped: boolean
          acquired_at: string
        }
        Insert: Omit<Database['public']['Tables']['player_shop_items']['Row'], 'acquired_at'> & {
          acquired_at?: string
        }
        Update: Partial<Database['public']['Tables']['player_shop_items']['Insert']>
      }
      typing_sessions: {
        Row: {
          id: string
          player_id: string
          words_typed: number
          duration_seconds: number
          xp_awarded: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['typing_sessions']['Row'], 'id' | 'created_at' | 'xp_awarded'> & {
          id?: string
          created_at?: string
          xp_awarded?: number
        }
        Update: never
      }
    }
    Views: {
      leaderboard: {
        Row: {
          id: string
          username: string
          avatar_url: string
          level: number
          total_xp: number
          rank: number
        }
      }
    }
    Functions: {
      submit_typing_session: {
        Args: { p_words_typed: number; p_duration_seconds: number }
        Returns: {
          xp_awarded: number
          new_total_xp: number
          new_level: number
          leveled_up: boolean
        }
      }
      calculate_level: {
        Args: { p_total_xp: number }
        Returns: number
      }
    }
  }
}
