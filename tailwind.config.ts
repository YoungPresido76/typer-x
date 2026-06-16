import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A1A',
        secondary: '#FFB347',
        base: '#121417',
        surface: '#1A1D22',
        raised: '#222528',
        pressed: '#0B0D11',
        border: '#2D3037',
        success: '#22CC5E',
        info: '#3882F6',
        error: '#EF4444',
        accent: '#AB55F7',
        // Wave animation colors
        wave: {
          cyan: '#06B6D4',
          violet: '#7C3AED',
          amber: '#F59E0B',
        },
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
      },
      fontFamily: {
        plus: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xs: '4px',
        s: '8px',
        m: '12px',
        l: '16px',
        xl: '20px',
        xxl: '28px',
      },
      boxShadow: {
        'level-1': '0 2px 10px rgba(0, 0, 0, 0.15)',
        'level-2': '0 4px 16px rgba(0, 0, 0, 0.2)',
        'level-3': '0 8px 24px rgba(0, 0, 0, 0.3)',
        'level-4': '0 16px 40px rgba(0, 0, 0, 0.5)',
        'level-5': '0 24px 64px rgba(0, 0, 0, 0.8)',
      },
      spacing: {
        xs: '4px',
        s: '8px',
        m: '12px',
        l: '16px',
        xl: '20px',
        xxl: '28px',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config
