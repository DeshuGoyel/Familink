import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { WaitlistForm } from '../ui/WaitlistForm';

const words = ["Bitcoin", "Ethereum", "Family", "Legacy"];

const trustBadges = [
  { icon: '🔒', text: 'Zero-knowledge encryption' },
  { icon: '🛡️', text: 'No credit card required' },
  { icon: '🌍', text: 'Available worldwide' },
  { icon: '⚡', text: '14-day full refund' },
];

export default function FinalCTA() {
  const [index, setIndex] = useState(0);
  const [branding, setBranding] = useState({
    waitlist_enabled: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

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
      className="relative overflow-hidden bg-page border-t border-border-base"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15), rgba(212,167,44,0.1), transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto px-6 py-40 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-12 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-500"
          >
            <ShieldCheck size={14} />
            Institutional risk-reversal active
          </div>

          {/* Emotional Headline */}
          <h2 className="text-5xl md:text-7xl font-bold text-primary mb-8 leading-[1.04] tracking-tight">
            Your family deserves to inherit <br className="hidden md:block" />
            everything you <span className="gold-gradient italic">built.</span>
          </h2>

          <div className="flex flex-col items-center justify-center mb-16 h-20">
            <p className="text-2xl text-secondary font-medium tracking-tight mb-2">
              The definitive protocol for your
            </p>
            <div className="relative h-10 w-full flex justify-center overflow-hidden">
               <AnimatePresence mode="wait">
                 <motion.span
                   key={words[index]}
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: -20, opacity: 0 }}
                   transition={{ duration: 0.4, ease: "easeInOut" }}
                   className="text-4xl font-bold text-brand-primary"
                 >
                   {words[index]}.
                 </motion.span>
               </AnimatePresence>
             </div>
          </div>

          <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 2,847 crypto holders who already have their digital inheritance plan in place.
          </p>

          <div className="flex flex-col items-center gap-4 mb-16">
            {branding.waitlist_enabled ? (
              <div className="w-full max-w-md mx-auto">
                <WaitlistForm />
              </div>
            ) : (
              <>
                <Link to="/onboarding">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-16 px-12 rounded-2xl bg-brand-primary text-white text-lg font-bold flex items-center gap-3 shadow-lg hover:shadow-brand transition-all duration-500"
                  >
                    Create Your Free Vault <ArrowRight size={20} />
                  </motion.div>
                </Link>
                <p className="text-muted text-sm font-medium italic">14-day full refund. No questions. And your free vault stays free forever.</p>
              </>
            )}
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm text-muted">
            {trustBadges.map((b, i) => (
              <span key={i} className="flex items-center gap-2 font-medium">
                <span>{b.icon}</span>
                {b.text}
              </span>
            ))}
          </div>

          {/* Founder note */}
          <div
            className="border-t pt-10 mt-24 max-w-xl mx-auto border-border-base"
          >
            <p className="text-muted text-sm italic leading-relaxed mb-4">
              "We built this because we lived the problem. No family should lose what their loved one spent years building."
            </p>
            <p className="text-muted text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
              <span className="w-4 h-px bg-brand-primary/30" />
              Deshu & Vikash, Transfer Legacy
              <span className="w-4 h-px bg-brand-primary/30" />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
