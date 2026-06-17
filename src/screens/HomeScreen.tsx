import { useStore } from '@/store/useStore'
import { Flame, Zap, ShoppingBag, Trophy, BarChart3, User } from 'lucide-react'
import { calculateLevel, xpToNextLevel, xpProgress, getLevelTitle } from '@/lib/xpFormula'

export const HomeScreen = () => {
  const player      = useStore((s) => s.player)
  const leaderboard = useStore((s) => s.leaderboard)
  const setTab      = useStore((s) => s.setActiveTab)

  if (!player) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-white/10 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  const level    = calculateLevel(player.totalXp)
  const nextXp   = xpToNextLevel(player.totalXp)
  const progress = xpProgress(player.totalXp)
  const myRank   = leaderboard.find((e) => e.uid === player.uid)?.rank ?? '-'

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const QUICK = [
    {
      id: 'missions', icon: Zap,         label: 'Missions',    sub: '2 active',
      bg: 'linear-gradient(135deg,#FF7A1A,#FFB347)', glow: 'rgba(255,122,26,0.38)',
    },
    {
      id: 'shop', icon: ShoppingBag,     label: 'Shop',        sub: 'New drops',
      bg: 'linear-gradient(135deg,#9b6dff,#4f8ef7)', glow: 'rgba(155,109,255,0.38)',
    },
    {
      id: 'leaderboard', icon: Trophy,   label: 'Rank',        sub: `#${myRank}`,
      bg: 'linear-gradient(135deg,#f5c542,#ffb347)', glow: 'rgba(245,197,66,0.38)',
    },
  ]

  const FEATURES = [
    {
      id: 'stats',   icon: BarChart3, label: 'Statistics',
      sub: 'Your typing analytics',
      iconBg: 'rgba(79,142,247,0.12)', iconColor: '#4f8ef7',
    },
    {
      id: 'profile', icon: User,      label: 'Profile',
      sub: 'Your rank & showcase',
      iconBg: 'rgba(62,207,142,0.12)', iconColor: '#3ecf8e',
    },
  ]

  return (
    <div className="relative z-10 max-w-2xl mx-auto px-5 py-5 pb-28 space-y-4">

      {/* ── Welcome Card ── */}
      <div
        className="neu rounded-[22px] p-5 relative overflow-hidden animate-slide-up"
        style={{ animationDelay: '0ms', border: '1px solid rgba(255,255,255,0.03)' }}
      >
        {/* Orange radial glow */}
        <div
          className="absolute -right-10 -top-10 w-44 h-44 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,122,26,0.10) 0%, transparent 70%)' }}
        />

        <div className="flex items-start justify-between relative">
          {/* Left */}
          <div>
            <p className="text-[12px] text-gray-400 font-medium mb-1">{greeting}</p>
            <h2 className="text-[22px] font-extrabold tracking-tight text-white leading-tight">
              {player.username}
            </h2>
            <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1">
              <Flame size={11} className="text-primary" />
              {player.streak}-day streak — keep it up!
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">{getLevelTitle(level)}</p>
          </div>

          {/* Right: avatar + badges */}
          <div className="flex flex-col items-end gap-2.5">
            <div className="relative">
              <img
                src={player.avatarUrl}
                alt={player.username}
                className="w-[54px] h-[54px] rounded-[16px]"
                style={{ boxShadow: '0 4px 16px rgba(155,109,255,0.28)' }}
              />
              <span
                className="absolute -bottom-2 -right-2 text-[9px] font-black px-1.5 py-0.5 rounded-md"
                style={{
                  background: '#f5c542',
                  color: '#1a1a1a',
                  border: '2px solid #0D0F12',
                }}
              >
                LV {level}
              </span>
            </div>
            <div className="flex gap-1.5">
              <span
                className="flex items-center gap-1 text-[11px] text-gray-400 px-2 py-1 rounded-[8px]"
                style={{ background: '#222528' }}
              >
                <Flame size={10} className="text-primary" />
                <strong className="text-white font-bold">{player.streak}</strong>
              </span>
              <span
                className="flex items-center gap-1 text-[11px] text-gray-400 px-2 py-1 rounded-[8px]"
                style={{ background: '#222528' }}
              >
                <Zap size={10} style={{ color: '#f5c542' }} />
                <strong className="text-white font-bold">
                  {(player.totalXp / 1000).toFixed(1)}k XP
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── XP Bar ── */}
      <div
        className="animate-slide-up"
        style={{ animationDelay: '55ms' }}
      >
        <div className="flex justify-between text-[11px] text-gray-400 mb-2">
          <span>Level {level} · XP</span>
          <span>
            {player.totalXp.toLocaleString()} /{' '}
            {(player.totalXp + nextXp).toLocaleString()}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden neu-inset">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #9b6dff, #4f8ef7)',
              boxShadow: '0 0 12px rgba(79,142,247,0.55)',
              transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="animate-slide-up" style={{ animationDelay: '110ms' }}>
        <p className="text-[11px] font-bold text-gray-500 tracking-[1.2px] uppercase mb-3">
          Quick Actions
        </p>
        <div className="grid grid-cols-3 gap-3">
          {QUICK.map(({ id, icon: Icon, label, sub, bg, glow }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="neu rounded-[18px] p-4 text-center transition-all duration-200 hover:-translate-y-1 active:scale-95"
              style={{ border: '1px solid rgba(255,255,255,0.03)' }}
            >
              <div
                className="w-12 h-12 rounded-[14px] mx-auto mb-2.5 flex items-center justify-center"
                style={{ background: bg, boxShadow: `0 6px 18px ${glow}` }}
              >
                <Icon size={22} className="text-white" />
              </div>
              <p className="text-[12px] font-semibold text-white leading-tight">{label}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <div className="animate-slide-up" style={{ animationDelay: '165ms' }}>
        <p className="text-[11px] font-bold text-gray-500 tracking-[1.2px] uppercase mb-3">
          Features
        </p>
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map(({ id, icon: Icon, label, sub, iconBg, iconColor }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="neu rounded-[20px] p-5 text-left transition-all duration-200 hover:-translate-y-1 active:scale-95"
              style={{ border: '1px solid rgba(255,255,255,0.03)' }}
            >
              <div
                className="w-11 h-11 rounded-xl mb-3 flex items-center justify-center"
                style={{ background: iconBg }}
              >
                <Icon size={20} color={iconColor} />
              </div>
              <p className="text-[14px] font-bold text-white mb-1">{label}</p>
              <p className="text-[11px] text-gray-500 leading-relaxed">{sub}</p>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
