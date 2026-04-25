import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Shield, 
  ChevronRight,
  LogOut,
  ScrollText, 
  FileText, 
  ClipboardCheck, 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Settings as SettingsIcon 
} from 'lucide-react';
import { useOpsStore } from '../../store/useOpsStore';
import { cn } from '../../utils/cn';
import { useBodyClass } from '../../hooks/useBodyClass';

// Modules
import OpsDashboard from './modules/Dashboard';
import WaitlistManager from './modules/Waitlist';
import SystemSettings from './modules/SystemSettings';
import AdminMgmt from './modules/AdminMgmt';
import LeanCMS from './modules/LeanCMS';
import AuditLogs from './modules/AuditLogs';

const NAV_GROUPS = [
  {
    name: 'Main',
    items: [
      { name: 'Overview', path: '/ops/dashboard', icon: LayoutDashboard },
      { name: 'Waitlist', path: '/ops/waitlist', icon: Users },
    ]
  },
  {
    name: 'Staff',
    items: [
      { name: 'Administrators', path: '/ops/admins', icon: ShieldCheck },
    ]
  },
  {
    name: 'System',
    items: [
      { name: 'Lean CMS', path: '/ops/cms', icon: FileText },
      { name: 'Configuration', path: '/ops/settings', icon: SettingsIcon },
      { name: 'Audit Logs', path: '/ops/audit', icon: ScrollText },
    ]
  }
];

export default function OpsPortal() {
  useBodyClass('allow-cursor');
  const { isAuthenticated, isHydrated, admin, logout } = useOpsStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Protected route check - Wait for hydration to avoid flash-redirect
  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      navigate('/ops/login', { replace: true });
    }
  }, [isHydrated, isAuthenticated, navigate]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#020409] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/ops/login');
  };

  return (
    <div className="min-h-screen bg-[#020409] text-slate-200 flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-[#0B0E14] border-r border-slate-800 transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
            <Shield className="w-8 h-8 text-indigo-500 mr-3 flex-shrink-0" />
            {isSidebarOpen && (
              <span className="font-bold text-lg tracking-tight text-white truncate">
                Ops Center
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 custom-scrollbar">
            {NAV_GROUPS.map((group) => (
              <div key={group.name} className="space-y-2">
                {isSidebarOpen && (
                  <h3 className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                    {group.name}
                  </h3>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative",
                          isActive 
                            ? "bg-indigo-500/10 text-indigo-400 font-medium shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]" 
                            : "text-slate-400 hover:bg-slate-800/30 hover:text-white"
                        )}
                      >
                        <Icon className={cn("w-5 h-5 flex-shrink-0 transition-transform duration-300", isActive ? "text-indigo-400 scale-110" : "group-hover:text-indigo-400 group-hover:scale-110")} />
                        {isSidebarOpen && (
                          <span className="ml-3 truncate text-sm">{item.name}</span>
                        )}
                        {isActive && (
                          <motion.div 
                            layoutId="active-pill"
                            className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-slate-800/50 bg-slate-900/20">
            <div className={cn("flex items-center", isSidebarOpen ? "space-x-3" : "justify-center")}>
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                {admin?.email.charAt(0).toUpperCase()}
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{admin?.email}</p>
                  <p className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold">
                    {admin?.role_name}
                  </p>
                </div>
              )}
            </div>
            <button 
              onClick={handleLogout}
              className={cn(
                "mt-4 flex items-center w-full py-2 text-slate-500 hover:text-red-400 transition-colors",
                isSidebarOpen ? "space-x-2 px-4" : "justify-center"
              )}
            >
              <LogOut className="w-4 h-4" />
              {isSidebarOpen && <span className="text-xs font-semibold">Sign Out</span>}
            </button>
          </div>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white border border-slate-800 shadow-xl hover:bg-indigo-500 transition-colors hidden md:flex"
        >
          {isSidebarOpen ? <X className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300 overflow-y-auto bg-[#020409]",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="dashboard" element={<OpsDashboard />} />
              <Route path="waitlist" element={<WaitlistManager />} />
              <Route path="admins" element={<AdminMgmt />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="cms" element={<LeanCMS />} />
              <Route path="audit" element={<AuditLogs />} />
              <Route path="*" element={<Navigate to="/ops/dashboard" replace />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
