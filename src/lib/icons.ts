import {
  Keyboard,
  Zap,
  Flame,
  Target,
  TrendingUp,
  Coins,
  Trophy,
  Palette,
  Volume2,
  Sparkles,
  UserCircle2,
  type LucideIcon,
} from 'lucide-react'

/**
 * Central icon registry.
 * Mock data stores a string key here instead of an emoji —
 * this maps that key to a Lucide icon component.
 */
export const iconMap: Record<string, LucideIcon> = {
  keyboard: Keyboard,
  zap: Zap,
  flame: Flame,
  target: Target,
  trending: TrendingUp,
  coins: Coins,
  trophy: Trophy,
  palette: Palette,
  sound: Volume2,
  effect: Sparkles,
  avatar: UserCircle2,
}

export const getIcon = (key: string): LucideIcon => {
  return iconMap[key] ?? Sparkles
}
