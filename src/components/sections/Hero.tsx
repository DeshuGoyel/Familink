import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { WaitlistForm } from '../ui/WaitlistForm';
import { CountdownTimer } from '../ui/CountdownTimer';
import { Waitlist3DScene } from '../3d/Waitlist3DScene';

const avatars = [
  { bg: 'bg-indigo-500', initials: 'MK' },
  { bg: 'bg-purple-500', initials: 'SR' },
  { bg: 'bg-blue-600', initials: 'AP' },
  { bg: 'bg-rose-500', initials: 'JL' },
];

export default function Hero() {
  const launchDate = import.meta.env.VITE_LAUNCH_DATE || '2026-09-01T00:00:00Z';

  const scrollDown = () => {
    const el = document.querySelector('#problem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-20 flex items-center overflow-hidden bg-[#0B0E14]">
      {/* Subtle ambient background — NOT the whole canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px]" />
      </div>

      {/* 3D Scene — ambient, lower opacity, desktop only */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block pointer-events-none opacity-60">
        <Suspense fallback={null}>
          <Waitlist3DScene />
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="w-full lg:w-[55%] flex flex-col justify-center py-16 lg:py-24">

          {/* Social proof badge — real, human */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-3 mb-10 w-fit"
          >
            <div className="flex -space-x-2">
              {avatars.map((a) => (
                <div
                  key={a.initials}
                  className={`w-8 h-8 rounded-full ${a.bg} border-2 border-[#0B0E14] flex items-center justify-center text-white text-[10px] font-bold`}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <div className="text-sm text-[#8B949E]">
              <span className="text-white font-semibold">2,400+ families</span> already protected
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
              <ShieldCheck size={12} />
              Private Beta
            </div>
          </motion.div>

          {/* Headline — editorial mixed weight */}
          <h1 className="font-display leading-[1.08] mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-[#8B949E] tracking-tight block"
            >
              Your Crypto.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.7, ease: 'easeOut' }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-[#8B949E] tracking-tight block"
            >
              Your Family.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight block italic"
            >
              Protected Forever.
            </motion.div>
          </h1>

          {/* Subheadline — direct, human */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="text-lg md:text-xl text-[#8B949E] max-w-lg mb-10 leading-relaxed"
          >
            The only platform that transfers your crypto to your family automatically — without lawyers, seed phrases, or any technical knowledge.
          </motion.p>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <WaitlistForm />
          </motion.div>

          {/* No card needed micro-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-4 text-sm text-[#8B949E] flex items-center gap-2"
          >
            <ArrowRight size={13} className="text-indigo-400" />
            Free forever plan available. No credit card needed.
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-14 pt-8 border-t border-white/5"
          >
            <p className="text-xs text-[#8B949E] mb-5 font-medium uppercase tracking-widest">
              Beta Launches In:
            </p>
            <CountdownTimer targetDate={launchDate} />
          </motion.div>
        </div>
      </div>

      {/* Mobile ambient scene */}
      <div className="absolute inset-y-0 inset-x-0 -z-0 lg:hidden opacity-10 pointer-events-none">
        <Suspense fallback={null}>
          <Waitlist3DScene />
        </Suspense>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8B949E]/50 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
