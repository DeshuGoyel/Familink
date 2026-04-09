import { motion } from 'framer-motion';
import { WaitlistForm } from '../ui/WaitlistForm';

const trustBadges = [
  { icon: '🔒', text: 'No spam ever' },
  { icon: '⚡', text: 'Cancel anytime' },
  { icon: '🛡️', text: 'Your data is encrypted' },
  { icon: '🌍', text: 'Available worldwide' },
];

export default function FinalCTA() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-[#0B0E14] overflow-hidden py-24">
      {/* Noise + radial glow background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Eyebrow */}
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-8">
            Don't wait
          </p>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#F0F6FC] mb-6 leading-[1.05]">
            Your family shouldn't need{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              a cryptographer
            </span>
            <br />
            to inherit what you built.
          </h2>

          <p className="text-xl text-[#8B949E] mb-12 max-w-2xl mx-auto">
            Join 2,400+ people who already have their digital inheritance plan in place.
          </p>

          <div className="max-w-xl mx-auto mb-10">
            <WaitlistForm />
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#8B949E] font-medium mb-14">
            {trustBadges.map((badge, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>{badge.icon}</span>
                {badge.text}
              </span>
            ))}
          </div>

          {/* Founder sign-off */}
          <div className="border-t border-white/5 pt-10">
            <p className="text-[#8B949E] text-sm italic max-w-lg mx-auto">
              "We built this because we lived the problem. No family should lose what their loved one spent years building."
            </p>
            <p className="text-[#8B949E]/50 text-xs mt-3 font-medium">
              — Deshu & Vikash, Transfer Legacy
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
