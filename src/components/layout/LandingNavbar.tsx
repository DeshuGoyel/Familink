import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { cn } from '../../utils/cn';

const navLinks = [
  { label: 'How it works', href: '#how' },
  { label: 'Security',  href: '#security' },
  { label: 'Pricing',   href: '#pricing' },
  { label: 'FAQ',       href: '#faq' },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 flex items-center",
          scrolled 
            ? "bg-page/90 backdrop-blur-xl border-b border-base" 
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-[1100px] mx-auto w-full px-6 flex items-center justify-between">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-7 h-7 rounded-full relative flex items-center justify-center"
              style={{
                background: 'conic-gradient(from 220deg, var(--color-brand-primary), var(--color-brand-primary-hover), var(--color-brand-gold), var(--color-brand-primary))'
              }}
            >
              <div className="w-[11px] h-[11px] rounded-full bg-page transition-colors duration-400" />
            </div>
            <span
              className="font-display font-medium text-[1.24rem] text-primary transition-opacity group-hover:opacity-75"
              style={{ letterSpacing: '-0.01em' }}
            >
              Transfer Legacy
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[13px] font-medium transition-colors text-secondary hover:text-primary"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              to="/login"
              className="text-[13px] font-medium transition-colors text-secondary hover:text-primary"
            >
              Sign in
            </Link>
            <Link
              to="/onboarding"
              className="inline-flex items-center px-4 py-2 rounded-[6px] text-[13px] font-semibold text-black transition-opacity hover:opacity-85"
              style={{ background: 'var(--color-brand-primary)' }}
            >
              Get started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="p-2 rounded-md text-secondary hover:text-primary transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col bg-page pt-16"
        >
          <div className="flex flex-col p-6 gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-[8px] text-[15px] font-medium transition-colors hover:bg-[rgba(255,255,255,0.05)] text-primary"
              >
                {label}
              </a>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <button
                  className="w-full py-3 rounded-[6px] text-[14px] font-medium border border-base text-secondary bg-transparent hover:bg-surface/50"
                >
                  Sign in
                </button>
              </Link>
              <Link to="/onboarding" onClick={() => setMobileOpen(false)}>
                <button
                  className="w-full py-3 rounded-[6px] text-[14px] font-semibold text-black"
                  style={{ background: 'var(--color-brand-primary)' }}
                >
                  Get started
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
