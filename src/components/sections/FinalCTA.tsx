import { motion } from 'framer-motion';
import { WaitlistForm } from '../ui/WaitlistForm';
import { ArrowRight, ShieldCheck } from 'lucide-react';

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
      className="relative overflow-hidden"
      style={{ background: '#090B14' }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.5), rgba(249,115,22,0.5), transparent)' }}
      />

      {/* Diagonal gradient panel — mirrors the hero */}
      <div className="absolute inset-0 flex overflow-hidden pointer-events-none">
        {/* Left dark side */}
        <div className="hidden lg:block flex-1" style={{ background: '#090B14' }} />

        {/* Diagonal cut */}
        <div className="hidden lg:block w-28" style={{ background: '#090B14', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />

        {/* Right gradient */}
        <div
          className="hidden lg:block w-[45%]"
          style={{
            background: 'linear-gradient(145deg, #2d1b5e 0%, #7c3aed 15%, #be185d 35%, #f97316 55%, #fb923c 68%, #c084fc 85%, #818cf8 100%)',
            opacity: 0.35,
          }}
        />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07), rgba(192,132,252,0.05), transparent 70%)' }}
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
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border text-sm font-semibold"
            style={{ background: 'rgba(249,115,22,0.08)', borderColor: 'rgba(249,115,22,0.22)', color: '#fb923c' }}
          >
            <ShieldCheck size={14} />
            Founding member spots are limited
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.04] tracking-tight">
            Your family shouldn't need{' '}
            <span
              className="inline"
              style={{
                background: 'linear-gradient(135deg, #f9a8d4 0%, #f97316 50%, #c084fc 100%)',
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
            <p className="text-white/20 text-xs font-medium flex items-center justify-center gap-2">
              <ArrowRight size={11} style={{ color: '#f97316' }} />
              Deshu & Vikas, Transfer Legacy
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
