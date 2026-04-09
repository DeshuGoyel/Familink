import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  {
    name: 'Guardian',
    monthlyPrice: 0,
    yearlyPrice: 0,
    desc: 'Try it free. No credit card.',
    features: ['1 encrypted vault', '2 guardians', 'Up to 10 items', 'Email delivery'],
    cta: 'Join Waitlist Free',
    highlighted: false,
    accent: '#818cf8',
  },
  {
    name: 'Legacy',
    monthlyPrice: 24,
    yearlyPrice: 12,
    desc: 'For serious asset protection.',
    features: ['Unlimited vault items', '5 guardians', 'Crypto & hardware wallets', 'AI Legacy Planner', 'Priority support'],
    cta: 'Claim Founding Price',
    highlighted: true,
    badge: 'Most Popular — Founding Rate',
    accent: '#f97316',
  },
  {
    name: 'Dynasty',
    monthlyPrice: 49,
    yearlyPrice: 29,
    desc: 'For families and estates.',
    features: ['Everything in Legacy', 'Family accounts', 'Attorney delivery', 'API access', 'White-glove onboarding'],
    cta: 'Contact Us',
    highlighted: false,
    accent: '#c084fc',
  },
];

const TOTAL = 5000;
const CLAIMED = 2417;

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const progress = Math.round((CLAIMED / TOTAL) * 100);

  return (
    <section id="pricing" ref={ref} className="relative py-28 overflow-hidden" style={{ background: '#090B14' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.5), transparent)' }}
      />

      {/* Ambient gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Founding spots bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mb-14"
        >
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-white/40">Founding spots claimed</span>
            <span className="font-bold" style={{ color: '#fb923c' }}>{CLAIMED.toLocaleString()} / {TOTAL.toLocaleString()}</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: visible ? `${progress}%` : 0 }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #f97316, #fb923c)' }}
            />
          </div>
          <p className="text-xs text-white/30 mt-2">{TOTAL - CLAIMED} founding spots remaining at this price.</p>
        </motion.div>

        {/* Header + toggle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p
            className="text-xs font-bold tracking-[0.22em] uppercase mb-5"
            style={{
              background: 'linear-gradient(135deg, #fb923c, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Founding Member Pricing
          </h2>
          <p className="text-white/40 text-lg mb-8">Lock in your rate forever before public launch.</p>

          {/* Toggle */}
          <div
            className="inline-flex items-center rounded-full p-1.5 border"
            style={{ background: '#131722', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {['Monthly', 'Yearly'].map((label) => {
              const active = yearly ? label === 'Yearly' : label === 'Monthly';
              return (
                <button
                  key={label}
                  onClick={() => setYearly(label === 'Yearly')}
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-250"
                  style={active
                    ? { background: 'linear-gradient(135deg, #f97316, #fb923c)', color: 'white' }
                    : { color: 'rgba(255,255,255,0.35)' }
                  }
                >
                  {label}
                  {label === 'Yearly' && (
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded-full"
                      style={active ? { background: 'rgba(255,255,255,0.2)' } : { background: 'rgba(249,115,22,0.15)', color: '#f97316' }}
                    >
                      SAVE 40%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.13, duration: 0.65 }}
              className="relative rounded-3xl border flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: plan.highlighted
                  ? 'linear-gradient(160deg, #1a1008 0%, #131722 100%)'
                  : '#131722',
                borderColor: plan.highlighted ? `${plan.accent}50` : 'rgba(255,255,255,0.07)',
                boxShadow: plan.highlighted ? `0 0 50px ${plan.accent}18` : undefined,
              }}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-black px-4 py-1.5 rounded-full whitespace-nowrap tracking-wide"
                  style={{
                    background: 'linear-gradient(135deg, #f97316, #fb923c)',
                    color: '#fff',
                    boxShadow: '0 0 20px rgba(249,115,22,0.5)',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Top accent bar */}
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${plan.accent}, transparent)` }} />

              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <h3
                    className="text-xl font-black tracking-tight"
                    style={{ color: plan.highlighted ? plan.accent : 'white' }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-xs text-white/35 mt-1">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={yearly ? 'y' : 'm'}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-end gap-1"
                    >
                      <span className="text-5xl font-black text-white">
                        ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-white/30 mb-2 text-sm">/mo</span>
                    </motion.div>
                  </AnimatePresence>
                  {yearly && plan.monthlyPrice > plan.yearlyPrice && (
                    <p className="text-xs text-emerald-400 mt-1 font-medium">
                      Billed annually — was ${plan.monthlyPrice}/mo
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3.5 mb-8 flex-1">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-white/45">
                      <span className="text-base leading-none" style={{ color: plan.accent }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300"
                  style={plan.highlighted
                    ? {
                        background: 'linear-gradient(135deg, #f97316, #fb923c)',
                        color: 'white',
                        boxShadow: '0 0 20px rgba(249,115,22,0.35)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }
                  }
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-white/25 mt-8 font-medium">
          Cancel any time. Price locks in at founding rate. No auto-upgrades.
        </p>
      </div>
    </section>
  );
}
