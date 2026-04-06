import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "I lost $40k in ETH when my brother passed. No one knew his seed phrase. Transfer Legacy would have saved everything.",
    name: "Marcus T.",
    role: "Crypto investor, Austin TX",
    initials: "MT",
    color: "bg-indigo-500",
  },
  {
    quote: "Finally a product that explains inheritance to my non-tech family in simple language. This fills a massive gap.",
    name: "Priya K.",
    role: "Software engineer, London",
    initials: "PK",
    color: "bg-purple-500",
  },
  {
    quote: "I've been looking for a solution like this for years. The guardian network concept is brilliant.",
    name: "David R.",
    role: "Financial advisor, NYC",
    initials: "DR",
    color: "bg-blue-500",
  },
];

export default function SocialProof() {
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Count-up animation
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

  // Auto-rotate testimonials
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Counter + Progress */}
          <div>
            <div className="flex items-end gap-3 mb-2">
              <motion.span 
                animate={{ scale: count === 2417 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="text-6xl font-display font-bold text-white inline-block origin-bottom"
              >
                {count.toLocaleString()}
              </motion.span>
              <span className="text-2xl font-bold text-indigo-400 mb-2">+</span>
            </div>
            <p className="text-[#8B949E] text-lg mb-8">
              people protecting their digital legacy
            </p>

            {/* Progress bar */}
            <div className="mb-3 flex items-center justify-between text-sm font-medium">
              <span className="text-[#8B949E]">Founding spots claimed</span>
              <span className="text-gold font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: visible ? `${progress}%` : 0 }}
                transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              />
            </div>
            <p className="text-xs text-[#8B949E] mt-2">
              {5000 - 2417} founding slots remaining at current pricing
            </p>
          </div>

          {/* Testimonial Rotator */}
          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
                className="bg-[#020409] border border-white/10 rounded-2xl p-8 relative"
              >
                <Quote size={20} className="text-indigo-400 mb-4" />
                <p className="text-white text-lg leading-relaxed mb-6">
                  "{testimonials[active].quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${testimonials[active].color} flex items-center justify-center text-white font-bold text-sm`}>
                    {testimonials[active].initials}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{testimonials[active].name}</p>
                    <p className="text-[#8B949E] text-xs">{testimonials[active].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex gap-2 mt-4 justify-end">
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
      </div>
    </section>
  );
}
