import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    prefix: '$',
    value: 140,
    suffix: 'B+',
    desc: 'Lost crypto annually',
  },
  {
    prefix: '',
    value: 89,
    suffix: '%',
    desc: 'Families locked out of digital assets',
  },
  {
    prefix: '',
    value: 3,
    suffix: ' min',
    desc: 'Average time to protect your legacy with Transfer Legacy',
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
    <div className="bg-[#0D1117] border border-indigo-500/20 shadow-[0_0_20px_rgba(79,92,255,0.08)] hover:shadow-[0_0_30px_rgba(79,92,255,0.15)] hover:border-indigo-500/40 transition-all rounded-2xl p-8 flex flex-col gap-2">
      <div className="text-5xl font-display font-bold text-[#F0F6FC]">
        {stat.prefix}{count}{stat.suffix}
      </div>
      <p className="text-[#8B949E] font-medium">{stat.desc}</p>
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
    <section id="problem" ref={ref} className="py-28 bg-[#020409]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-4xl"
        >
          <span className="inline-block text-indigo-400 text-sm font-bold tracking-widest uppercase mb-4">
            WHY THIS MATTERS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#F0F6FC] leading-[1.1]">
            $140 Billion in crypto is permanently lost every year.<br />
            <span className="text-[#8B949E]">Most of it because no one told their family.</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
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

        {/* 2-Column Story / Illustration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#0D1117] rounded-3xl p-8 md:p-12 border border-white/5">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
             <h3 className="text-2xl font-bold text-white mb-4">The Real Risk Isn't Hackers.</h3>
             <p className="text-[#8B949E] text-lg leading-relaxed">
               Imagine building a life-changing portfolio over years, securing it meticulously on an offline hardware wallet, and then suddenly becoming inactive. Your family sees the ledger, but without the PIN, the seed phrase, or the knowledge of how to use it, your wealth is trapped forever. What was meant to be generational wealth becomes a permanent digital ghost.
             </p>
           </motion.div>
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex justify-center"
           >
             {/* Simple hand-drawn SVG illustration of confused family at computer */}
             <svg viewBox="0 0 400 300" className="w-full max-w-sm" fill="none" stroke="currentColor">
               <path d="M100 200 L300 200 L280 100 L120 100 Z" stroke="#8B949E" strokeWidth="4" strokeLinejoin="round" />
               <path d="M120 100 L120 50 C120 40 130 30 140 30 L260 30 C270 30 280 40 280 50 L280 100" fill="none" stroke="#8B949E" strokeWidth="4" />
               <rect x="140" y="50" width="120" height="40" rx="4" stroke="#4F5CFF" strokeWidth="3" opacity="0.6"/>
               <path d="M150 70 L250 70" stroke="#4F5CFF" strokeWidth="3" strokeDasharray="5,5" opacity="0.6" />
               
               {/* People silhouetes */}
               <circle cx="80" cy="120" r="25" stroke="#FFFFFF" strokeWidth="4"/>
               <path d="M40 220 Q80 150 120 220" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round"/>
               
               <circle cx="320" cy="140" r="20" stroke="#FFFFFF" strokeWidth="4"/>
               <path d="M290 220 Q320 160 350 220" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round"/>
               
               {/* Question Marks */}
               <path d="M200 130 C200 100 220 100 220 120 C220 140 200 150 200 150 M200 165 L200 170" stroke="#D4AF37" strokeLinecap="round" strokeWidth="4" />
             </svg>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
