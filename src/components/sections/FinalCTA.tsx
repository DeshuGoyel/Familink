import { motion } from 'framer-motion';
import { WaitlistForm } from '../ui/WaitlistForm';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';

const trustBadges = [
  { icon: '🔒', text: 'No spam ever' },
  { icon: '⚡', text: 'Cancel anytime' },
  { icon: '🛡️', text: 'Your data is encrypted' },
  { icon: '🌍', text: 'Available worldwide' },
];

export default function FinalCTA() {
  const [branding, setBranding] = useState({
    waitlist_enabled: true,
  });

  useEffect(() => {
    async function loadBranding() {
      try {
        const res = await api.get<any>('/app/branding', { skipAead: true });
        const data = res.data ? res.data : res;
        if (data && typeof data.waitlist_enabled === 'boolean') {
          setBranding(data);
        }
      } catch (err) {
        console.warn('Failed to load branding in FinalCTA, using defaults:', err);
      }
    }
    loadBranding();
  }, []);

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-page"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"
      />

      {/* Diagonal gradient panel — mirrors the hero */}
      <div className="absolute inset-0 flex overflow-hidden pointer-events-none z-0">
        {/* Left dark side */}
        <div className="hidden lg:block flex-1 bg-page" />

        {/* Diagonal cut */}
        <div className="hidden lg:block w-28 bg-page" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />

        {/* Right gradient */}
        <div
          className="hidden lg:block w-[45%]"
          style={{
            background: 'linear-gradient(145deg, var(--color-gradient-purple) 0%, var(--color-brand-primary) 50%, var(--color-gradient-pink) 100%)',
            opacity: 0.2,
          }}
        />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.05), rgba(168,85,247,0.03), transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto px-6 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border text-sm font-semibold bg-brand-primary/10 border-brand-primary/20 text-brand-primary"
          >
            <ShieldCheck size={14} />
            Founding member spots are limited
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-6 leading-[1.04] tracking-tight">
            Your family shouldn't need{' '}
            <span
              className="inline"
              style={{
                background: 'linear-gradient(135deg, var(--color-gradient-pink) 0%, var(--color-brand-primary) 50%, var(--color-gradient-purple) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              a cryptographer
            </span>
            <br />
            to inherit what you built.
          </h2>

          <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 2,400+ people who already have their digital inheritance plan in place.
          </p>

          {/* Form / Onboarding */}
          <div className="max-w-lg mx-auto mb-10">
            {branding.waitlist_enabled ? (
              <WaitlistForm />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Link to="/onboarding">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-16 px-12 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white text-lg font-bold flex items-center gap-3 shadow-lg hover:shadow-brand transition-all duration-300"
                  >
                    Protect My Legacy <ArrowRight size={20} />
                  </motion.div>
                </Link>
              </div>
            )}
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-muted mb-16">
            {trustBadges.map((b, i) => (
              <span key={i} className="flex items-center gap-2 font-medium">
                <span>{b.icon}</span>
                {b.text}
              </span>
            ))}
          </div>

          {/* Founder note */}
          <div
            className="border-t pt-10 max-w-xl mx-auto border-base"
          >
            <p className="text-secondary text-sm italic leading-relaxed mb-3 font-sans">
              "We built this because we lived the problem. No family should lose what their loved one spent years building."
            </p>
            <p className="text-muted text-xs font-semibold flex items-center justify-center gap-2 uppercase tracking-wider">
              <span className="w-4 h-px bg-brand-primary/20" />
              Deshu & Vikash, Transfer Legacy
              <span className="w-4 h-px bg-brand-primary/20" />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
