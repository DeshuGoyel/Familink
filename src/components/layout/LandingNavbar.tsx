import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '../ui/Logo';
import ThemeToggle from './ThemeToggle';

export default function LandingNavbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center bg-page/80 backdrop-blur-xl border-b border-border-base"
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo size={32} showTagline={false} />
        </Link>

        {/* Nav Links - 3 Max */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#protocol" className="text-sm font-bold text-secondary hover:text-primary transition-colors tracking-wide">How It Works</a>
          <a href="#security" className="text-sm font-bold text-secondary hover:text-primary transition-colors tracking-wide">Security</a>
          <a href="#pricing" className="text-sm font-bold text-secondary hover:text-primary transition-colors tracking-wide">Pricing</a>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link to="/login" className="hidden sm:block text-sm font-bold text-secondary hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link to="/onboarding">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-[44px] px-6 rounded-xl bg-[#14b8a6] text-white text-sm font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all"
            >
              Protect My Crypto
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
