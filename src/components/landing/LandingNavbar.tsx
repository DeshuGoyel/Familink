import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#090B14]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_40px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 overflow-hidden flex items-center justify-center">
              <img src="/logo-dark.png" alt="Transfer Legacy" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-[17px] tracking-tight text-white">
              Transfer{' '}
              <span
                className="font-black"
                style={{
                  background: 'linear-gradient(135deg, #f9a8d4, #f97316)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Legacy
              </span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === link.href
                    ? 'text-white bg-white/8'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollTo('#waitlist')}
              className="px-5 py-2 rounded-full text-sm font-bold text-white border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-200"
            >
              Sign in
            </button>
            <button
              onClick={() => scrollTo('#waitlist')}
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
              style={{
                background: 'linear-gradient(135deg, #f9a8d4 0%, #f97316 50%, #c084fc 100%)',
                color: '#fff',
              }}
            >
              Join Waitlist
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
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
            className="fixed inset-0 z-[100] bg-[#090B14] flex flex-col px-8 pt-24 pb-12"
          >
            {/* Gradient accent */}
            <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(249,115,22,0.12), transparent 60%)' }}
            />
            <button
              className="absolute top-5 right-6 text-white/60 hover:text-white transition-colors"
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
                  className="text-3xl font-bold text-white/80 hover:text-white text-left transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <div className="mt-auto">
              <button
                onClick={() => scrollTo('#waitlist')}
                className="w-full py-4 rounded-2xl text-base font-bold text-white shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                style={{ background: 'linear-gradient(135deg, #f9a8d4 0%, #f97316 50%, #c084fc 100%)' }}
              >
                Claim Your Spot
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
