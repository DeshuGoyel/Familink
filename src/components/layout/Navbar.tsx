import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Shield, Bell, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/cn';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, toggleNotifications, notifications, isMobileSidebarOpen, toggleMobileSidebar, toggleSidebar } = useStore();
  const { scrollY } = useScroll();
  
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.4]);
  const blur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.nav 
      style={{ 
        backgroundColor: `rgba(0, 0, 0, ${bgOpacity.get()})`,
        backdropFilter: blur,
      }}
      className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300",
        scrollY.get() > 50 ? "border-b border-primary/20 shadow-[0_4px_30px_rgba(79,92,255,0.1)]" : "border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleSidebar} 
              className="hidden md:flex p-2 text-muted hover:text-text rounded-md hover:bg-surface border border-transparent hover:border-border transition-colors focus:outline-none"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                LinkKey
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-muted hover:text-text transition">Dashboard</Link>
            <Link to="/assets" className="text-muted hover:text-text transition">Assets</Link>
            <Link to="/trust" className="text-muted hover:text-text transition">Trust</Link>
            <Link to="/ai-planner" className="flex items-center space-x-1 text-primary hover:text-primary/80 transition">
              <span>AI Planner</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleNotifications} className="relative p-2 text-muted hover:text-text focus:outline-none">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
              )}
            </button>
            <ThemeToggle />
            <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 rounded-full bg-surface border border-border hover:border-primary/50 transition">
              <User className="w-4 h-4 text-muted" />
              <span className="text-sm font-medium">{user.name}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileSidebar} className="text-muted hover:text-text">
              {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

    </motion.nav>
  );
}
