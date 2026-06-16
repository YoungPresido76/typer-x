import { useState } from 'react'
import { Keyboard, Zap, Trophy, ArrowRight } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export const LoginScreen = () => {
  const { signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    await signInWithGoogle()
    // Supabase redirects to Google — loading stays true until redirect
  }

  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-between px-6 py-12">

      {/* Top — Branding */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">

        {/* Logo Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-orange">
            <Keyboard size={44} className="text-white" />
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 w-24 h-24 rounded-2xl bg-primary/30 blur-xl -z-10" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-black tracking-widest text-white mb-2">
          TYPER<span className="text-primary"> X</span>
        </h1>
        <p className="text-sm font-semibold tracking-[0.3em] text-primary uppercase mb-8">
          Gamified Keyboard Experience
        </p>

        {/* Feature highlights */}
        <div className="space-y-3 mb-12 w-full max-w-xs">
          {[
            { icon: Zap, text: 'Earn XP with every word you type' },
            { icon: Trophy, text: 'Level up and unlock new features' },
            { icon: Keyboard, text: 'Compete on the global leaderboard' },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 bg-surface border border-border rounded-lg px-4 py-3"
            >
              <Icon size={18} className="text-primary shrink-0" />
              <span className="text-sm text-gray-300">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom — Auth buttons */}
      <div className="w-full max-w-xs space-y-3">
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-[#E86A0A] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-orange"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {/* Google logo */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
              </svg>
              Continue with Google
              <ArrowRight size={18} />
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-500 px-4">
          By continuing you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

    </div>
  )
}
