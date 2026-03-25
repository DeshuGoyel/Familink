import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useCheckinStore } from '../../store/useCheckinStore';
import { LayoutDashboard, Wallet, Users, KeyRound, Bot, ShieldCheck, Settings as SettingsIcon, LogOut, Activity, Heart, Scroll, IdCard, Terminal, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Assets', path: '/assets', icon: Wallet },
  { name: 'Guardians', path: '/guardians', icon: Users },
  { name: 'Heirs', path: '/heirs', icon: KeyRound },
  { name: 'Proof of Life', path: '/checkin', icon: Activity },
  { name: 'Memory Capsules', path: '/capsules', icon: Heart },
  { name: 'Final Words', path: '/obituary', icon: Scroll },
  { name: 'My Passport', path: '/passport', icon: IdCard },
  { name: 'Developer Docs', path: '/developer', icon: Terminal },
  { name: 'AI Planner', path: '/ai-planner', icon: Bot },
  { name: 'Trust Center', path: '/trust', icon: ShieldCheck },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
];

export default function Sidebar() {
  const { user, isSidebarCollapsed, toggleSidebar, isMobileSidebarOpen, toggleMobileSidebar } = useStore();
  const { checkinSettings } = useCheckinStore();
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 pt-16 bg-surface border-r border-border z-50 flex flex-col transition-all duration-300 ease-in-out",
          // Desktop specific classes
          "md:translate-x-0 hidden md:flex",
          isSidebarCollapsed ? "w-20" : "w-64",
          // Mobile specific classes (overrides hidden with dynamic sliding)
          "!flex md:!flex transform",
          isMobileSidebarOpen ? "translate-x-0 !w-64" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Toggle Arrow (Desktop only) / Close Button (Mobile only) */}
        <button 
          onClick={isMobileSidebarOpen ? toggleMobileSidebar : toggleSidebar}
          className={cn(
            "absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover:bg-primary/80 transition-colors hidden md:flex",
            isMobileSidebarOpen && "!hidden"
          )}
        >
          {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Mobile Close Button (shown only on mobile) */}
        <button 
          onClick={toggleMobileSidebar}
          className="md:hidden absolute right-4 top-20 p-2 text-muted hover:text-text"
        >
          <X size={20} />
        </button>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            // When collapsed AND on desktop, don't show text. On mobile, always show full width
            const showText = !isSidebarCollapsed || isMobileSidebarOpen;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => { if (isMobileSidebarOpen) toggleMobileSidebar(); }}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative",
                   isActive
                    ? "bg-primary/10 text-primary border-l-2 border-primary glow-blue font-medium"
                    : "text-muted hover:bg-surface hover:text-text",
                   !showText ? "justify-center px-0 w-12 mx-auto" : "space-x-3"
                )}
                title={!showText ? item.name : undefined}
              >
                <div className="relative flex-shrink-0">
                  <Icon size={20} className={cn(isActive ? "text-primary" : "text-muted group-hover:text-primary")} />
                  {item.path === '/checkin' && (
                    <span className={cn(
                      "absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-surface animate-pulse",
                      checkinSettings.status === 'active' ? "bg-emerald-500" : "bg-red-500"
                    )} />
                  )}
                </div>
                {showText && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border">
          <div className={cn(
            "flex items-center mb-4 p-2 rounded-xl bg-surface/50 border border-border transition-all",
            (!isSidebarCollapsed || isMobileSidebarOpen) ? "space-x-3" : "justify-center"
          )}>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary font-bold">
              {user.name.charAt(0)}
            </div>
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">{user.name}</p>
                <p className="text-xs text-muted truncate">{user.email}</p>
              </div>
            )}
          </div>
          <button className={cn(
            "flex items-center w-full py-2 text-muted hover:text-danger transition-colors",
            (!isSidebarCollapsed || isMobileSidebarOpen) ? "space-x-2 px-4" : "justify-center px-0"
          )} title="Log out">
            <LogOut size={18} />
            {(!isSidebarCollapsed || isMobileSidebarOpen) && <span className="text-sm font-medium">Log out</span>}
          </button>
        </div>
      </aside>

      {/* Bottom Nav on Mobile overrides Sidebar bottom, keeping 5 primary items for quick access */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-border z-40 px-6 py-3 flex justify-between">
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

      {/* Global Top-Right Action Block (Master Key / Web3 Wallet) */}
      <div className="fixed top-4 right-4 sm:right-6 lg:right-8 z-50 flex items-center space-x-3 pointer-events-auto">
         <button className="hidden sm:flex items-center justify-center w-10 h-10 bg-surface/80 backdrop-blur-md border border-primary/30 rounded-full hover:bg-primary/10 transition-colors shadow-lg shadow-primary/5">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
         </button>
         <button className="flex items-center justify-center space-x-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors shadow-lg font-bold text-xs">
            <KeyRound size={14} className="text-black" />
            <span className="hidden sm:inline">Master Key</span>
         </button>
      </div>
    </>
  );
}
