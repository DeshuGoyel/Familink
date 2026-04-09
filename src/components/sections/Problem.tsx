import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { prefix: '$', value: 140, suffix: 'B+', desc: 'in crypto lost permanently each year', color: '#f87171', glow: 'rgba(248,113,113,0.15)' },
  { prefix: '', value: 89, suffix: '%',  desc: 'of families locked out of digital assets after a death', color: '#fb923c', glow: 'rgba(251,146,60,0.15)', showBar: true },
  { prefix: '', value: 3,  suffix: ' min', desc: 'to protect your entire legacy with Transfer Legacy', color: '#34d399', glow: 'rgba(52,211,153,0.15)' },
];

function AnimatedCounter({ target, delay }: { target: number; delay: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      let cur = 0;
      const step = setInterval(() => {
        cur += Math.ceil(target / 50);
        if (cur >= target) { setCount(target); clearInterval(step); }
        else setCount(cur);
      }, 30);
      return () => clearInterval(step);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [started, target, delay]);

  return <span ref={ref}>{count}</span>;
}

export default function Problem() {
  return (
    <section id="problem" className="relative py-28 overflow-hidden" style={{ background: '#0C0E18' }}>
      {/* Gradient accent top */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 max-w-3xl"
        >
          <p className="text-xs font-bold tracking-[0.22em] uppercase mb-5"
            style={{ background: 'linear-gradient(135deg, #f9a8d4, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            The Problem
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight">
            $140 Billion in crypto vanishes every year.{' '}
            <span className="text-white/30 font-light">No one told their family.</span>
          </h2>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.14, duration: 0.65 }}
              className="relative rounded-3xl p-8 border border-white/[0.07] overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              style={{ background: '#151A28' }}
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 30% 30%, ${stat.glow}, transparent 70%)` }}
              />
              <div className="text-6xl md:text-7xl font-black leading-none mb-3" style={{ color: stat.color }}>
                {stat.prefix}<AnimatedCounter target={stat.value} delay={i * 0.15} />{stat.suffix}
              </div>
              {stat.showBar && (
                <motion.div className="w-full h-1 rounded-full mb-3 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: 'easeOut', delay: 0.4 }}
                    className="h-full rounded-full"
                    style={{ background: stat.color }}
                  />
                </motion.div>
              )}
              <p className="text-white/40 text-sm leading-relaxed relative z-10">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Narrative split */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/[0.06]"
        >
          {/* Without */}
          <div className="relative p-10 md:p-14 border-r border-white/[0.06] group overflow-hidden" style={{ background: '#130F14' }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at 20% 20%, rgba(239,68,68,0.06), transparent 60%)' }}
            />
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-red-400 bg-red-500/10 border border-red-500/15 px-3 py-1.5 rounded-full mb-7">
              Without Transfer Legacy
            </span>
            <div className="space-y-5">
              {[
                'Family discovers wallets but has no seed phrase',
                'Exchange accounts frozen — no death certificate accepted',
                'Years of lawyers. Thousands in fees. Access denied.',
                'Your life\'s work: gone.',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full border border-red-500/40 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* With */}
          <div className="relative p-10 md:p-14 group overflow-hidden" style={{ background: '#0B1210' }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at 80% 20%, rgba(52,211,153,0.06), transparent 60%)' }}
            />
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 px-3 py-1.5 rounded-full mb-7">
              With Transfer Legacy
            </span>
            <div className="space-y-5">
              {[
                'Your vault is set up in 3 minutes',
                'Trusted guardians receive their key fragments securely',
                'When you\'re inactive, your family gets guided access',
                'Your legacy transfers exactly as you intended.',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full border border-emerald-500/40 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.3), transparent)' }}
      />
    </section>
  );
}
