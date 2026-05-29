import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const toggleStoreTheme = useStore(state => state.toggleTheme);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-surface/50 border border-border-base animate-pulse" />;
  }

  const isDark = theme === 'dark';

  const handleToggle = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    if (setTheme) setTheme(nextTheme);
    if (toggleStoreTheme) toggleStoreTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="relative w-10 h-10 rounded-xl bg-surface border border-border-base hover:border-brand-primary/50 transition-all duration-300 flex items-center justify-center group overflow-hidden shadow-sm"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.3, ease: "spring", stiffness: 300, damping: 20 }}
              className="absolute inset-0"
            >
              <Moon className="w-5 h-5 text-brand-primary" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.3, ease: "spring", stiffness: 300, damping: 20 }}
              className="absolute inset-0"
            >
              <Sun className="w-5 h-5 text-brand-gold" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-300" />
    </button>
  );
}
