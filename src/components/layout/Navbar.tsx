import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Bell, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const {
    user,
    toggleNotifications,
    notifications,
    isMobileSidebarOpen,
    toggleMobileSidebar,
  } = useStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center border-b border-[rgba(255,255,255,0.07)] lg:pl-[240px]"
      style={{ background: 'var(--color-bg-page)' }}
    >
      <div className="flex items-center justify-between w-full px-5">

        {/* Left: mobile hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileSidebar}
            className="flex lg:hidden p-1.5 rounded-md transition-colors"
            style={{ color: '#9B97A3' }}
            aria-label="Toggle menu"
          >
            {isMobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Mobile brand (sidebar hidden) */}
          <Link to="/" className="lg:hidden flex items-center gap-2">
            <span
              className="font-display text-sm font-normal"
              style={{ color: '#E9E6DF', letterSpacing: '-0.01em' }}
            >
              Transfer Legacy
            </span>
          </Link>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Notifications */}
          <button
            onClick={toggleNotifications}
            className="relative p-2 rounded-md transition-colors hover:bg-[rgba(255,255,255,0.05)]"
            style={{ color: '#9B97A3' }}
            aria-label="Notifications"
          >
            <Bell size={17} strokeWidth={1.75} />
            {unreadCount > 0 && (
              <span
                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-primary"
              />
            )}
          </button>

          <ThemeToggle />

          {/* User avatar pill */}
          <Link
            to="/settings"
            className="ml-1 flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-[8px] border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.13)] transition-colors"
            style={{ background: 'var(--color-bg-surface)' }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 bg-brand-primary"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:inline text-[12px] font-medium" style={{ color: '#E9E6DF' }}>
              {user.name.split(' ')[0]}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
