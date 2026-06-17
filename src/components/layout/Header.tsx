import { Bell } from 'lucide-react'

interface HeaderProps {
  title: string
  onMenuClick: () => void
}

export const Header = ({ title, onMenuClick }: HeaderProps) => {
  return (
    <header
      className="glass-topbar fixed top-0 left-0 right-0 z-30 h-[60px] flex items-center justify-between px-5"
    >
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="neu w-10 h-10 rounded-[11px] flex flex-col items-center justify-center gap-[5px] p-2.5 transition-smooth hover:-translate-y-0.5"
        >
          <span className="block w-[18px] h-[2px] rounded-full bg-gray-400" />
          <span className="block w-[13px] h-[2px] rounded-full bg-gray-400" />
          <span className="block w-[16px] h-[2px] rounded-full bg-gray-400" />
        </button>
        <span className="text-[17px] font-bold text-white">{title}</span>
      </div>

      {/* Right: Bell */}
      <div className="flex items-center gap-2.5">
        <button
          className="neu relative w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-gray-400 hover:text-white transition-smooth hover:-translate-y-0.5"
        >
          <Bell size={16} />
          <span
            className="absolute top-[8px] right-[8px] w-1.5 h-1.5 rounded-full border-[2px]"
            style={{ background: '#FF7A1A', borderColor: '#0D0F12' }}
          />
        </button>
      </div>
    </header>
  )
}
