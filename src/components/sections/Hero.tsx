import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, Users, ChevronDown } from 'lucide-react';
import { WaitlistForm } from '../ui/WaitlistForm';
import { CountdownTimer } from '../ui/CountdownTimer';
import { Waitlist3DScene } from '../3d/Waitlist3DScene';

const trustBadges = [
  { icon: Lock, text: 'Zero-knowledge security' },
  { icon: Sparkles, text: '3-minute setup' },
  { icon: Users, text: 'Trusted by 2,400+ families' },
];

const wordColors: Record<string, string> = {
  'Crypto.': 'text-white',
  'Family.': 'text-white',
  'Protected': 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500',
  'Forever.': 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500',
};

const headlineLines = [
  ['Your', 'Crypto.'],
  ['Your', 'Family.'],
  ['Protected', 'Forever.'],
];

export default function Hero() {
  const launchDate = import.meta.env.VITE_LAUNCH_DATE || '2026-09-01T00:00:00Z';

  const scrollDown = () => {
    const el = document.querySelector('#problem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-20 flex items-center overflow-hidden bg-[#020409]">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      {/* 3D Scene — desktop right half */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block pointer-events-none">
        <Suspense fallback={null}>
          <Waitlist3DScene />
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-20 lg:py-32">

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 w-fit mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-xs font-bold text-indigo-300 tracking-wider uppercase">
              Private Beta — Limited Spots
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
            {headlineLines.map((line, li) => (
              <motion.div
                key={li}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + li * 0.12, duration: 0.7, ease: 'easeOut' }}
              >
                {line.map((word, wi) => (
                  <span
                    key={wi}
                    className={`mr-4 ${wordColors[word] ?? 'text-white'}`}
                  >
                    {word}
                  </span>
                ))}
              </motion.div>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-[#8B949E] max-w-lg mb-8 leading-relaxed"
          >
            The zero-knowledge vault that transfers your digital assets to your loved ones —
            automatically, securely, exactly when they need it most.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#8B949E] font-medium mb-10"
          >
            {trustBadges.map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon size={15} className="text-indigo-400" />
                {text}
              </span>
            ))}
          </motion.div>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <WaitlistForm />
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-14 pt-8 border-t border-white/5"
          >
            <p className="text-xs text-[#8B949E] mb-5 font-medium uppercase tracking-widest">
              Beta Launches In:
            </p>
            <CountdownTimer targetDate={launchDate} />
          </motion.div>
        </div>
      </div>

      {/* Mobile 3D scene */}
      <div className="absolute inset-y-0 inset-x-0 -z-0 lg:hidden opacity-20 pointer-events-none">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8B949E] hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
