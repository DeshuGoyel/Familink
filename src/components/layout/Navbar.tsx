import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Bell, Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useEffect, useState } from 'react';
import { Logo } from '../ui/Logo';

const navLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Assets', to: '/assets' },
  { label: 'Guardians', to: '/guardians' },
  { label: 'Trust', to: '/trust' },
];

export default function Navbar() {
  const { user, toggleNotifications, notifications, isMobileSidebarOpen, toggleMobileSidebar, toggleSidebar } = useStore();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 20));
    return unsub;
  }, [scrollY]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 flex items-center',
        scrolled ? 'bg-surface/85 backdrop-blur-xl border-b border-base' : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-full">

          {/* Left: hamburger + brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="hidden md:flex p-2 rounded-xl text-secondary hover:text-primary bg-surface/50 border border-base hover:border-brand-primary/20 transition-all shadow-sm"
              title="Toggle Sidebar"
            >
              <Menu size={18} strokeWidth={2} />
            </button>

            <Link to="/" className="group">
              <Logo size={28} showTagline={false} />
            </Link>
          </div>

          {/* Centre – Navigation links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'px-4 py-2 rounded-xl text-[11px] font-medium uppercase tracking-[0.25em] transition-all',
                    isActive
                      ? 'text-brand-primary bg-brand-primary/5 border border-brand-primary/10'
                      : 'text-secondary hover:text-primary hover:bg-surface/50'
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleNotifications}
                className="relative p-2 text-secondary hover:text-primary rounded-xl hover:bg-surface transition"
                aria-label="Toggle notifications"
                title="Notifications"
              >
                <Bell size={19} strokeWidth={1.8} />
                {unreadCount > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-brand-primary rounded-full" />
                )}
              </button>
            </div>

            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-base hover:border-brand-primary/30 transition-all shadow-sm"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold bg-gradient-to-br from-brand-primary to-brand-primary/80"
              >
                {user.name.charAt(0)}
              </div>
              <span className="hidden lg:inline text-[11px] font-bold uppercase tracking-wider text-primary">{user.name.split(' ')[0]}</span>
            </Link>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center">
              <button onClick={toggleMobileSidebar} className="p-2 text-secondary hover:text-primary rounded-xl transition" aria-label="Toggle Menu">
                {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
