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
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map(l => document.querySelector(l.href)).filter(Boolean) as HTMLElement[];
      let current = '';
      for (const section of sections) {
        // Offset by 300px to trigger highlighting slightly before it hits the very top
        if (window.scrollY >= section.offsetTop - 300) {
          current = '#' + section.id;
        }
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0E14]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="/logo-dark.png" 
              alt="Transfer Legacy Logo" 
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Transfer <span className="text-gold">Legacy</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === link.href ? 'text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'text-[#8B949E] hover:text-white'
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
              className="px-6 py-2.5 rounded-full bg-gold text-black font-bold text-sm hover:bg-yellow-400 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
            >
              Join Waitlist
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#0B0E14] flex flex-col px-8 pt-24 pb-12"
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setMobileOpen(false)}
            >
              <X size={28} />
            </button>

            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-2xl font-display font-bold text-white text-left hover:text-gold transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <div className="mt-auto">
              <button
                onClick={() => scrollTo('#waitlist')}
                className="w-full py-4 rounded-full bg-gold text-black font-bold text-lg hover:bg-yellow-400 transition-all"
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
