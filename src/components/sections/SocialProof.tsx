import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "I lost $40k in ETH when my brother passed. No one knew his seed phrase. Transfer Legacy would have saved everything.",
    name: "Marcus T.", role: "Crypto investor — Austin, TX", initials: "MT",
    accent: '#818cf8', avatarGrad: 'linear-gradient(135deg, #312e81, #6366f1)',
  },
  {
    quote: "Finally a product that explains inheritance to my non-tech family in plain language. This fills a massive, neglected gap.",
    name: "Priya K.", role: "Software engineer — London", initials: "PK",
    accent: '#c084fc', avatarGrad: 'linear-gradient(135deg, #4a1d96, #9333ea)',
    verified: true,
  },
  {
    quote: "The guardian network concept is brilliant. My parents aren't technical at all — with the step-by-step guidance, they'd be fine.",
    name: "David R.", role: "Financial advisor — New York", initials: "DR",
    accent: '#f97316', avatarGrad: 'linear-gradient(135deg, #7c2d12, #f97316)',
    verified: true,
  },
];

const media = ['Forbes', 'CoinDesk', 'TechCrunch', 'Bloomberg', 'Wired'];

export default function SocialProof() {
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const target = 2417;
    const step = 16;
    const inc = Math.ceil(target / (2000 / step));
    let cur = 0;
    const iv = setInterval(() => {
      cur = Math.min(cur + inc, target);
      setCount(cur);
      if (cur >= target) clearInterval(iv);
    }, step);
    return () => clearInterval(iv);
  }, [visible]);

  useEffect(() => {
    const iv = setInterval(() => setActive(p => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(iv);
  }, []);

  const progress = Math.round((2417 / 5000) * 100);
  const t = testimonials[active];

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden bg-page border-y border-border-base/50"
    >
      {/* Ambient */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(249,115,22,0.06), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">

          {/* Counter */}
          <div>
            <div className="flex items-end gap-2 mb-2">
              <motion.span
                animate={{ scale: count === 2417 ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="text-5xl font-bold text-primary leading-none"
              >
                {count.toLocaleString()}
              </motion.span>
              <span className="text-4xl font-bold mb-1 gradient-text-brand">
                +
              </span>
            </div>
            <p className="text-secondary text-lg mb-8">people protecting their digital legacy</p>

            <div className="flex items-center justify-between text-sm mb-2.5">
              <span className="text-secondary/80 font-medium">Founding spots claimed</span>
              <span className="font-bold text-brand-primary">{progress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-muted/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: visible ? `${progress}%` : 0 }}
                transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"
              />
            </div>
            <p className="text-xs text-secondary/40 mt-2">{5000 - 2417} founding slots remaining at current pricing.</p>
          </div>

          {/* Testimonial rotator */}
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl p-7 relative overflow-hidden bg-surface dark:bg-[#131722] border border-border-base border-l-[3px]"
                style={{ borderLeftColor: t.accent }}
              >
                {t.verified && (
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full mb-4 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/15">
                    ✓ Verified Beta User
                  </div>
                )}
                <Quote size={16} className="mb-3" style={{ color: `${t.accent}60` }} />
                <p className="text-secondary text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ background: t.avatarGrad }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">{t.name}</p>
                    <p className="text-secondary/50 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot nav */}
            <div className="flex gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? '24px' : '6px',
                    background: i === active ? t.accent : 'currentColor',
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${i === active ? '' : 'bg-muted/30'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* "As seen in" */}
        <div className="flex flex-col items-center gap-4 border-t border-border-base pt-8">
          <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-[0.22em]">As seen in</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {media.map((m) => (
              <span
                key={m}
                className="text-base font-bold tracking-wider text-secondary/20 hover:text-secondary/50 transition-colors duration-200 cursor-default"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
