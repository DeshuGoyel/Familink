import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { LayoutDashboard, Wallet, Users, KeyRound, Bot, ShieldCheck, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Assets', path: '/assets', icon: Wallet },
  { name: 'Guardians', path: '/guardians', icon: Users },
  { name: 'Heirs', path: '/heirs', icon: KeyRound },
  { name: 'AI Planner', path: '/ai-planner', icon: Bot },
  { name: 'Trust Center', path: '/trust', icon: ShieldCheck },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
];

export default function Sidebar() {
  const { user } = useStore();
  const location = useLocation();

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 pt-16 bg-surface border-r border-border z-40">
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary glow-blue font-medium"
                    : "text-muted hover:bg-surface hover:text-text"
                )}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 mb-4 p-2 rounded-xl bg-surface/50 border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">{user.name}</p>
              <p className="text-xs text-muted truncate">{user.email}</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 w-full px-4 py-2 text-muted hover:text-danger transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-border z-50 px-6 py-3 flex justify-between">
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 p-2 transition-colors",
                isActive ? "text-primary" : "text-muted hover:text-text"
              )}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
