import { motion } from 'framer-motion';
import { WaitlistForm } from '../ui/WaitlistForm';
import { ShieldCheck } from 'lucide-react';

const trustBadges = [
  { icon: '🔒', text: 'No spam ever' },
  { icon: '⚡', text: 'Cancel anytime' },
  { icon: '🛡️', text: 'Your data is encrypted' },
  { icon: '🌍', text: 'Available worldwide' },
];

export default function FinalCTA() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-page"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), rgba(59,130,246,0.3), transparent)' }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15), rgba(212,167,44,0.1), transparent 70%)' }}
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
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary"
          >
            <ShieldCheck size={14} />
            Founding member protocols active
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-5xl lg:text-5xl font-bold text-white mb-6 leading-[1.04] tracking-tight">
            The definitive protocol for your{' '}
            <span
              className="inline"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #D4A72C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              digital legacy.
            </span>
          </h2>

          <p className="text-xl text-white/35 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 2,400+ people who already have their digital inheritance plan in place.
          </p>

          {/* Form */}
          <div className="max-w-lg mx-auto mb-10">
            <WaitlistForm />
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-white/30 mb-16">
            {trustBadges.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>{b.icon}</span>
                {b.text}
              </span>
            ))}
          </div>

          {/* Founder note */}
          <div
            className="border-t pt-10 max-w-xl mx-auto"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p className="text-white/35 text-sm italic leading-relaxed mb-3">
              "We built this because we lived the problem. No family should lose what their loved one spent years building."
            </p>
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
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
