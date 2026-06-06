import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/useStore';
import { api } from '../../lib/api';

interface BrandingData {
  brand_name: string;
  logo_url?: string;
  waitlist_enabled: boolean;
}

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [branding, setBranding] = useState<BrandingData>({
    brand_name: 'Transfer Legacy',
    logo_url: '',
    waitlist_enabled: true,
  });
  const { isAuthenticated } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    async function fetchBranding() {
      try {
        const res = await api.get<BrandingData>('/app/branding', { skipAead: true });
        // Under local setup / skipAead, get resolves to SuccessEnvelope<BrandingData>
        // Let's handle both envelope wrap and raw data cases
        const data = (res as any).data ? (res as any).data : res;
        if (data && data.brand_name) {
          setBranding(data);
        }
      } catch (err) {
        console.warn('Failed to load navbar branding, using defaults:', err);
      }
    }
    
    fetchBranding();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] px-6 md:px-16 py-5 flex items-center justify-between transition-all duration-300",
        scrolled ? "bg-blueprint-bg/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent border-transparent"
      )}
    >
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-8 h-8 bg-blueprint-or/10 border border-blueprint-or/30 rounded-lg flex items-center justify-center group-hover:bg-blueprint-or/20 transition-colors overflow-hidden">
          {branding.logo_url ? (
            <img src={branding.logo_url} alt="Logo" className="w-full h-full object-contain p-1" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-blueprint-or stroke-2 fill-none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          )}
        </div>
        <div className="font-display text-lg font-semibold text-white tracking-wide">
          {branding.brand_name}
        </div>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <a href="/#how" className="text-sm text-blueprint-muted2 hover:text-white transition-colors tracking-wide">How it works</a>
        <a href="/#features" className="text-sm text-blueprint-muted2 hover:text-white transition-colors tracking-wide">Features</a>
        <a href="/#pricing" className="text-sm text-blueprint-muted2 hover:text-white transition-colors tracking-wide">Pricing</a>
        <a href="/#faq" className="text-sm text-blueprint-muted2 hover:text-white transition-colors tracking-wide">FAQ</a>
      </div>

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-blueprint-or text-white px-5 py-2 rounded-lg font-sans text-sm font-medium transition-all relative overflow-hidden hover:bg-blueprint-or2 hover:-translate-y-px shadow-[0_8px_24px_rgba(249,115,22,0.35)] flex items-center gap-2"
          >
            Go to Dashboard
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-white stroke-2 fill-none">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        ) : (
          <>
            <Link to="/login" className="hidden sm:block">
              <button className="bg-transparent border border-white/10 text-blueprint-muted2 px-5 py-2 rounded-lg font-sans text-sm transition-all hover:border-white/20 hover:text-white">
                Sign in
              </button>
            </Link>
            {branding.waitlist_enabled ? (
              <a href="#cta-email" onClick={(e) => {
                e.preventDefault();
                const ctaEl = document.getElementById('cta-email');
                if (ctaEl) {
                  ctaEl.scrollIntoView({ behavior: 'smooth' });
                  ctaEl.focus();
                }
              }}>
                <button className="bg-blueprint-or text-white px-5 py-2 rounded-lg font-sans text-sm font-medium transition-all relative overflow-hidden hover:bg-blueprint-or2 hover:-translate-y-px shadow-[0_8px_24px_rgba(249,115,22,0.35)]">
                  Join Waitlist
                </button>
              </a>
            ) : (
              <Link to="/onboarding">
                <button className="bg-blueprint-or text-white px-5 py-2 rounded-lg font-sans text-sm font-medium transition-all relative overflow-hidden hover:bg-blueprint-or2 hover:-translate-y-px shadow-[0_8px_24px_rgba(249,115,22,0.35)]">
                  Get started free
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
