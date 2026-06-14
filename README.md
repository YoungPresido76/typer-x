# Typer X — Companion App

A gamified typing companion app built with React, Vite, and TypeScript.

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Toast.tsx
│   ├── layout/               # Layout components
│   │   ├── Header.tsx
│   │   └── BottomNav.tsx
│   └── modals/              # Modal dialogs
│       ├── LevelUpModal.tsx
│       ├── DailyRewardModal.tsx
│       ├── StreakBoostModal.tsx
│       └── MissionCompleteModal.tsx
├── screens/                 # Full-page screens
│   ├── HomeScreen.tsx
│   ├── MissionsScreen.tsx
│   ├── ShopScreen.tsx
│   ├── StatsScreen.tsx
│   ├── ProfileScreen.tsx
│   └── LeaderboardScreen.tsx
├── store/
│   └── useStore.ts          # Zustand state management
├── lib/
│   └── xpFormula.ts         # XP calculation utilities
├── types/
│   └── index.ts             # TypeScript interfaces
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── index.css               # Global styles
```

## Design System

### Colors
- **Primary**: `#FF7A1A` (Orange)
- **Secondary**: `#FFB347` (Amber)
- **Base**: `#121417` (Dark)
- **Surface**: `#1A1D22` (Darker)
- **Success**: `#22CC5E` (Green)
- **Error**: `#EF4444` (Red)
- **Info**: `#3882F6` (Blue)

### Typography
- **Display**: Plus Jakarta Sans
- **Monospace**: JetBrains Mono

### Spacing Scale
- xs: 4px, s: 8px, m: 12px, l: 16px, xl: 20px, xxl: 28px

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Key Features (Foundation)

✅ Tailwind CSS with design system tokens  
✅ TypeScript interfaces for all data types  
✅ XP formula implementation (1000 × level^1.5)  
✅ Zustand state management with mock data  
✅ 5 reusable UI components  
✅ 6 full-screen views  
✅ Responsive navigation (Bottom Tab Bar)  
✅ Dark theme with orange accent  

## Next Steps

1. **Chat A**: Build HomeScreen with animations
2. **Chat B**: Implement MissionsScreen
3. **Chat C**: Develop ShopScreen
4. **Chat D**: Build StatsScreen
5. **Chat E**: Create ProfileScreen
6. **Chat F**: Implement all modal animations
7. **Chat 3**: Firebase integration (Auth, Firestore, Functions)
8. **Deploy**: Netlify deployment

## Deployment

This app is configured for Netlify deployment:

```bash
npm run build
# Deploy the 'dist' folder
```

The `netlify.toml` file configures:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect rules

## References

See the `files/` folder for architectural planning documents.
