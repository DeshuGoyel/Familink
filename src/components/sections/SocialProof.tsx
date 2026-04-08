import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "I lost $40k in ETH when my brother passed. No one knew his seed phrase. Transfer Legacy would have saved everything.",
    name: "Marcus T.",
    role: "Crypto investor — Austin, TX",
    initials: "MT",
    accentColor: "border-l-indigo-500",
    avatarBg: "bg-indigo-600",
  },
  {
    quote: "Finally a product that explains inheritance to my non-tech family in plain language. This fills a massive, neglected gap.",
    name: "Priya K.",
    role: "Software engineer — London",
    initials: "PK",
    accentColor: "border-l-purple-500",
    avatarBg: "bg-purple-600",
    verified: true,
  },
  {
    quote: "The guardian network concept is brilliant. My parents aren't technical at all — with the step-by-step guidance, they'd be fine.",
    name: "David R.",
    role: "Financial advisor — New York",
    initials: "DR",
    accentColor: "border-l-blue-500",
    avatarBg: "bg-blue-600",
    verified: true,
  },
];

const mediaMentions = ['Forbes', 'CoinDesk', 'TechCrunch', 'Bloomberg', 'Wired'];

export default function SocialProof() {
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const target = 2417;
    const duration = 2000;
    const step = 16;
    const increment = Math.ceil((target / duration) * step);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [visible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.round((2417 / 5000) * 100);

  return (
    <section ref={ref} className="py-20 bg-[#0D1117] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">

          {/* Left — counter */}
          <div>
            <motion.div
              animate={{ scale: count === 2417 ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="text-7xl font-display font-black text-white leading-none mb-2 inline-block"
            >
              {count.toLocaleString()}
            </motion.div>
            <span className="text-3xl font-black text-indigo-400">+</span>
            <p className="text-[#8B949E] text-lg mt-2 mb-8">
              people protecting their digital legacy
            </p>

            <div className="mb-3 flex items-center justify-between text-sm font-medium">
              <span className="text-[#8B949E]">Founding spots claimed</span>
              <span className="text-amber-400 font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: visible ? `${progress}%` : 0 }}
                transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              />
            </div>
            <p className="text-xs text-[#8B949E] mt-2">{5000 - 2417} founding slots remaining at current pricing.</p>
          </div>

          {/* Right — testimonials */}
          <div className="relative min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
                className={`bg-[#020409] border border-white/5 border-l-4 ${testimonials[active].accentColor} rounded-2xl p-8 relative`}
              >
                {testimonials[active].verified && (
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full mb-4">
                    ✓ Verified Beta User
                  </div>
                )}
                <Quote size={18} className="text-indigo-400/50 mb-4" />
                <p className="text-white text-base leading-relaxed mb-6">
                  "{testimonials[active].quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${testimonials[active].avatarBg} flex items-center justify-center text-white font-bold text-xs`}>
                    {testimonials[active].initials}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{testimonials[active].name}</p>
                    <p className="text-[#8B949E] text-xs">{testimonials[active].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-indigo-500' : 'w-1.5 bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* "As seen in" strip */}
        <div className="border-t border-white/5 pt-8 flex flex-col items-center gap-4">
          <p className="text-xs font-bold text-[#8B949E] uppercase tracking-widest">As seen in</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {mediaMentions.map(m => (
              <span key={m} className="text-lg font-black text-[#8B949E]/40 tracking-wider hover:text-[#8B949E]/70 transition-colors">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
