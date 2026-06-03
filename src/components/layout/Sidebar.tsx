import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Code2,
  Lock,
  BarChart2
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../utils/cn';
import ProtocolStatus from '../dashboard/ProtocolStatus';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',  path: '/dashboard' },
  { icon: BarChart2,       label: 'Analytics',  path: '/analytics' },
  { icon: Package,         label: 'Asset Vault', path: '/assets' },
  { icon: Users,           label: 'Guardians',  path: '/guardians' },
  { icon: Shield,          label: 'Trust Center', path: '/trust' },
  { icon: Lock,            label: 'AI Planner', path: '/ai-planner' },
  { icon: Code2,           label: 'Dev Portal', path: '/developer' },
  { icon: History,         label: 'Activity',   path: '/activity' },
];

const bottomItems = [
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Support', path: '/support' },
];

export default function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar, user, isMobileSidebarOpen, toggleMobileSidebar, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavLinkClick = () => {
    if (isMobileSidebarOpen) {
      toggleMobileSidebar();
    }
  };

  return (
    <>
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={toggleMobileSidebar}
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] glass-sidebar transition-all duration-300 z-40 flex flex-col w-64",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isSidebarCollapsed ? "lg:w-20" : "lg:w-64"
        )}
      >
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={handleNavLinkClick}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
              isActive 
                ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20 font-bold" 
                : "text-secondary hover:text-primary hover:bg-page border border-transparent"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={cn(
                  "shrink-0 transition-transform group-hover:scale-110",
                  "group-[.active]:text-brand-primary"
                )} />
                {!isSidebarCollapsed && (
                  <span className="font-medium text-sm tracking-tight">{item.label}</span>
                )}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-raised border border-border-base rounded-lg text-xs font-bold text-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-x-[-4px] group-hover:translate-x-0 whitespace-nowrap pointer-events-none z-[60] shadow-xl">
                    {item.label}
                  </div>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-1 w-1 h-6 bg-brand-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-border-base space-y-1">
        <ProtocolStatus isCollapsed={isSidebarCollapsed} />
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={handleNavLinkClick}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
              isActive 
                ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20 font-bold" 
                : "text-secondary hover:text-primary hover:bg-page border border-transparent"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} />
                {!isSidebarCollapsed && (
                  <span className="font-medium text-sm tracking-tight">{item.label}</span>
                )}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-raised border border-border-base rounded-lg text-xs font-bold text-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-x-[-4px] group-hover:translate-x-0 whitespace-nowrap pointer-events-none z-[60] shadow-xl">
                    {item.label}
                  </div>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-1 w-1 h-6 bg-brand-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
        
        {/* User Profile / Logout */}
        <div className={cn(
          "mt-4 p-3 rounded-2xl bg-page/50 border border-border-base flex items-center gap-3 relative group",
          isSidebarCollapsed ? "justify-center px-0 cursor-pointer" : "px-3"
        )}>
          <div className="w-8 h-8 rounded-full bg-raised border border-border-base flex items-center justify-center shrink-0 overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[10px] font-bold text-muted">{user.name.charAt(0)}</span>
            )}
          </div>
          {!isSidebarCollapsed ? (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-primary truncate">{user.name}</p>
                <p className="text-[10px] text-muted truncate">{user.email}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="text-muted hover:text-error transition-colors"
                title="Logout"
              >
                <LogOut size={14} />
              </button>
            </>
          ) : (
            <div className="absolute left-full ml-4 p-3 bg-raised border border-border-base rounded-xl text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-x-[-4px] group-hover:translate-x-0 pointer-events-auto z-[60] shadow-xl flex flex-col gap-2 min-w-[170px]">
              <div className="font-bold text-primary truncate text-left">{user.name}</div>
              <div className="text-[10px] text-muted truncate text-left">{user.email}</div>
              <hr className="border-border-base/40 my-1" />
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left text-muted hover:text-error transition-colors font-semibold"
              >
                <LogOut size={12} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className="hidden lg:flex absolute -right-3 top-10 w-6 h-6 rounded-full bg-surface border border-base items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary/50 transition-all z-[60] shadow-lg"
      >
        {isSidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
    </>
  );
}
