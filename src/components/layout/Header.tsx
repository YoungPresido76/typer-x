import { Settings, LogOut } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
  showSettings?: boolean
  onSettingsClick?: () => void
  onLogoutClick?: () => void
}

export const Header = ({
  title,
  subtitle,
  showSettings = true,
  onSettingsClick,
  onLogoutClick,
}: HeaderProps) => {
  return (
    <header className="bg-surface border-b border-border sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {showSettings && (
            <button
              onClick={onSettingsClick}
              className="p-2 hover:bg-raised rounded-s transition-smooth text-gray-400 hover:text-primary"
            >
              <Settings size={20} />
            </button>
          )}
          {onLogoutClick && (
            <button
              onClick={onLogoutClick}
              className="p-2 hover:bg-raised rounded-s transition-smooth text-gray-400 hover:text-error"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
