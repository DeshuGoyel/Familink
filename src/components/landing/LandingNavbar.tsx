import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import ThemeToggle from '../layout/ThemeToggle';

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Security', href: '#security' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = navLinks.map(l => document.querySelector(l.href)).filter(Boolean) as HTMLElement[];
      let current = '';
      for (const section of sections) {
        if (window.scrollY >= section.offsetTop - 300) current = '#' + section.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-[72px] flex items-center',
          scrolled
            ? 'bg-surface/80 backdrop-blur-2xl border-b border-base shadow-2xl'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 overflow-hidden flex items-center justify-center">
              <img src="/logo-dark.png" alt="Transfer Legacy" className="w-full h-full object-contain dark:block hidden" />
              <img src="/logo-light.png" alt="Transfer Legacy" className="w-full h-full object-contain dark:hidden block" />
            </div>
            <span className="font-bold text-[18px] tracking-tight text-primary uppercase letter-spacing-[0.05em]">
              Transfer{' '}
              <span
                className="font-black"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #D4A72C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Legacy
              </span>
            </span>
          </a>

          {/* Desktop Links — Matching Sidebar label style */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  'px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300',
                  activeSection === link.href
                    ? 'text-brand-primary bg-brand-primary/10 shadow-[inset_0_0_12px_rgba(212,167,44,0.1)]'
                    : 'text-secondary hover:text-primary hover:bg-surface/50'
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => scrollTo('#waitlist')}
              className="px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] text-secondary border border-base hover:border-strong hover:bg-surface/50 transition-all duration-300"
            >
              Sign in
            </button>
            <button
              onClick={() => scrollTo('#waitlist')}
              className="px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:shadow-[0_0_35px_rgba(59,130,246,0.4)]"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #D4A72C 100%)',
                color: 'white',
              }}
            >
              Secure Legacy
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-primary p-2 rounded-xl hover:bg-surface/50 transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            className="fixed inset-0 z-[100] bg-page flex flex-col px-8 pt-24 pb-12"
          >
            {/* Gradient accent */}
            <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-20"
              style={{ background: 'radial-gradient(circle at top right, var(--color-brand-primary), transparent 60%)' }}
            />
            <button
              className="absolute top-5 right-6 text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <X size={26} />
            </button>

            <nav className="flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-3xl font-bold text-primary hover:text-brand-primary text-left transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <div className="mt-auto">
              <button
                onClick={() => scrollTo('#waitlist')}
                className="w-full py-4 rounded-2xl text-base font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #D4A72C 100%)' }}
              >
                Secure Your Legacy
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
