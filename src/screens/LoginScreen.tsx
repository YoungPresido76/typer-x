import { useState } from 'react'
import { Keyboard, Zap, Trophy, ArrowRight } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const LoginScreen = () => {
  const { signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    await signInWithGoogle()
  }

  return (
    <div className="min-h-screen bg-[#0D0F12] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Ambient bubbles */}
      <div className="bubble-bg">
        <div className="bubble" style={{ width: 520, height: 520, background: 'rgba(255,122,26,0.18)', left: '-15%', top: '-15%', animationDuration: '22s' }} />
        <div className="bubble" style={{ width: 380, height: 380, background: 'rgba(171,85,247,0.14)', right: '-12%', bottom: '5%', animationDuration: '28s', animationDelay: '-8s' }} />
        <div className="bubble" style={{ width: 260, height: 260, background: 'rgba(255,179,71,0.10)', left: '45%', top: '65%', animationDuration: '18s', animationDelay: '-4s' }} />
      </div>

      {/* Liquid glass card */}
      <div
        className="relative z-10 w-full max-w-[340px] rounded-[28px] p-8 animate-slide-up"
        style={{
          background: 'rgba(18, 20, 28, 0.75)',
          backdropFilter: 'blur(32px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.6)',
          border: '1px solid rgba(255,255,255,0.11)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.72), 0 1px 0 rgba(255,255,255,0.07) inset',
        }}
      >
        {/* Inner top sheen */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-[28px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)' }}
        />

        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-[72px] h-[72px] rounded-[20px] mx-auto mb-4 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FF7A1A, #FFB347)',
              boxShadow: '0 8px 28px rgba(255,122,26,0.45), 0 0 0 1px rgba(255,255,255,0.1) inset',
            }}
          >
            <Keyboard size={32} className="text-white" />
          </div>
          <h1 className="text-[28px] font-black tracking-[0.22em] gradient-text">TYPER X</h1>
          <p className="text-[10px] text-gray-500 tracking-[0.28em] uppercase mt-1.5 font-semibold">
            Gamified Keyboard Experience
          </p>
        </div>

        {/* Feature pills */}
        <div className="space-y-2 mb-8">
          {[
            { icon: Zap,      text: 'Earn XP with every word you type' },
            { icon: Trophy,   text: 'Level up & unlock powerful features' },
            { icon: Keyboard, text: 'Compete on the global leaderboard' },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <Icon size={14} className="text-primary shrink-0" />
              <span className="text-[12px] text-gray-300 leading-tight">{text}</span>
            </div>
          ))}
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold text-[13px] text-white transition-all duration-200 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, #FF7A1A 0%, #FFB347 100%)',
            boxShadow: '0 6px 24px rgba(255,122,26,0.42), 0 1px 0 rgba(255,255,255,0.15) inset',
          }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
              </svg>
              Continue with Google
              <ArrowRight size={15} />
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-gray-600 mt-4 leading-relaxed">
          By continuing you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
