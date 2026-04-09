import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    prefix: '$',
    value: 140,
    suffix: 'B+',
    desc: 'in crypto lost permanently each year',
    color: 'text-red-400',
    accent: 'border-red-500/30',
    bg: 'bg-red-500/5',
  },
  {
    prefix: '',
    value: 89,
    suffix: '%',
    desc: 'of families locked out of digital assets after a death',
    color: 'text-amber-400',
    accent: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
    showBar: true,
  },
  {
    prefix: '',
    value: 3,
    suffix: ' min',
    desc: 'to protect your entire legacy with Transfer Legacy',
    color: 'text-emerald-400',
    accent: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
  },
];

function StatCard({ stat, visible }: { stat: typeof stats[0]; visible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const target = stat.value;
    const duration = 2000;
    const step = 20;
    const increment = Math.max(1, Math.ceil((target / duration) * step));
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, step);
    return () => clearInterval(timer);
  }, [visible, stat.value]);

  return (
    <div className={`${stat.bg} border ${stat.accent} rounded-2xl p-8 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-300`}>
      <div className={`text-5xl md:text-6xl font-display font-black ${stat.color} leading-tight`}>
        {stat.prefix}{count}{stat.suffix}
      </div>
      {stat.showBar && (
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: visible ? `${stat.value}%` : 0 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
            className="h-full rounded-full bg-amber-400/60"
          />
        </div>
      )}
      <p className="text-[#8B949E] text-sm leading-relaxed">{stat.desc}</p>
    </div>
  );
}

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="problem" ref={ref} className="py-16 bg-[#0B0E14]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-5">The Problem</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#F0F6FC] leading-[1.1]">
            $140 Billion in crypto disappears every year.{' '}
            <span className="text-[#8B949E] font-normal">Most of it because no one told their family.</span>
          </h2>
        </motion.div>

        {/* Stats — distinct cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <StatCard stat={stat} visible={visible} />
            </motion.div>
          ))}
        </div>

        {/* Narrative story */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl border border-white/5 overflow-hidden"
        >
          {/* Left — the painful reality */}
          <div className="bg-[#151A25]/50 backdrop-blur-sm p-10 md:p-14 flex flex-col justify-center border-r border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="inline-block text-xs font-bold tracking-widest uppercase text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full mb-6 w-fit">
              Without Transfer Legacy
            </div>
            <div className="space-y-5">
              {[
                'Family discovers wallets but has no seed phrase',
                'Exchange accounts frozen — no death certificate accepted',
                'Years pass. Lawyers charge thousands. Access denied.',
                'Your life\'s work: gone.',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <p className="text-[#8B949E] text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — the solution */}
          <div className="bg-[#090C12]/50 backdrop-blur-sm p-10 md:p-14 flex flex-col justify-center relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="inline-block text-xs font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full mb-6 w-fit">
              With Transfer Legacy
            </div>
            <div className="space-y-5">
              {[
                'Your vault is set up in 3 minutes',
                'Trusted guardians receive their key fragments securely',
                'When you\'re inactive, your family gets guided access',
                'Your legacy transfers exactly as you intended.',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[#F0F6FC] text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
