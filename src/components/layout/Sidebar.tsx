import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  Users, 
  Package, 
  History, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Code2,
  Lock,
  BarChart2
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../utils/cn';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: Package, label: 'Asset Vault', path: '/vault' },
  { icon: Users, label: 'Guardians', path: '/guardians' },
  { icon: Shield, label: 'Trust Center', path: '/trust' },
  { icon: Lock, label: 'AI Planner', path: '/planner' },
  { icon: Code2, label: 'Dev Portal', path: '/developer' },
  { icon: History, label: 'Activity', path: '/activity' },
];

const bottomItems = [
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Support', path: '/support' },
];

export default function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar, user } = useStore();

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface border-r border-base transition-all duration-300 z-40 flex flex-col hidden lg:flex",
        isSidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
              isActive 
                ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
                : "text-secondary hover:text-primary hover:bg-page hover:text-primary border border-transparent"
            )}
          >
            <item.icon size={20} className={cn(
              "shrink-0 transition-transform group-hover:scale-110",
              "group-[.active]:text-brand-primary"
            )} />
            {!isSidebarCollapsed && (
              <span className="font-medium text-sm tracking-tight">{item.label}</span>
            )}
            {isSidebarCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-raised border border-base rounded-lg text-xs font-bold text-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowpawn pointer-events-none z-[60] shadow-xl">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-base space-y-1">
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
              isActive 
                ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
                : "text-secondary hover:text-primary hover:bg-page hover:text-primary border border-transparent"
            )}
          >
            <item.icon size={20} />
            {!isSidebarCollapsed && (
              <span className="font-medium text-sm tracking-tight">{item.label}</span>
            )}
          </NavLink>
        ))}
        
        {/* User Profile / Logout */}
        <div className={cn(
          "mt-4 p-3 rounded-2xl bg-page/50 border border-base flex items-center gap-3",
          isSidebarCollapsed ? "justify-center px-0" : "px-3"
        )}>
          <div className="w-8 h-8 rounded-full bg-raised border border-base flex items-center justify-center shrink-0 overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[10px] font-bold text-muted">{user.name.charAt(0)}</span>
            )}
          </div>
          {!isSidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-primary truncate">{user.name}</p>
              <p className="text-[10px] text-muted truncate">{user.email}</p>
            </div>
          )}
          {!isSidebarCollapsed && (
            <button className="text-muted hover:text-error transition-colors">
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-10 w-6 h-6 rounded-full bg-surface border border-base flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary/50 transition-all z-[60] shadow-lg"
      >
        {isSidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
