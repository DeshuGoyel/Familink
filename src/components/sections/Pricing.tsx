import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  {
    name: 'Guardian',
    monthlyPrice: 0,
    yearlyPrice: 0,
    desc: 'Try it free. No credit card.',
    features: [
      '1 encrypted vault',
      '2 guardians',
      'Up to 10 items',
      'Email delivery',
    ],
    cta: 'Join Waitlist Free',
    highlighted: false,
  },
  {
    name: 'Legacy',
    monthlyPrice: 24,
    yearlyPrice: 12,
    desc: 'For serious asset protection.',
    features: [
      'Unlimited vault items',
      '5 guardians',
      'Crypto & hardware wallets',
      'AI Legacy Planner',
      'Priority support',
    ],
    cta: 'Claim Founding Price',
    highlighted: true,
    badge: 'Most Popular — Founding Rate',
  },
  {
    name: 'Dynasty',
    monthlyPrice: 49,
    yearlyPrice: 29,
    desc: 'For families and estates.',
    features: [
      'Everything in Legacy',
      'Family accounts',
      'Attorney delivery',
      'API access',
      'White-glove onboarding',
    ],
    cta: 'Contact Us',
    highlighted: false,
  },
];

const TOTAL_SPOTS = 5000;
const CLAIMED = 2417;

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
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

  const progress = Math.round((CLAIMED / TOTAL_SPOTS) * 100);

  return (
    <section id="pricing" ref={ref} className="py-20 bg-[#11151F]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Founding spots progress — above heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mb-12"
        >
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-[#8B949E]">Founding spots claimed</span>
            <span className="text-amber-400 font-bold">{CLAIMED.toLocaleString()} / {TOTAL_SPOTS.toLocaleString()}</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: visible ? `${progress}%` : 0 }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
            />
          </div>
          <p className="text-xs text-[#8B949E] mt-2">{TOTAL_SPOTS - CLAIMED} founding spots remaining at this price.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-5">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F0F6FC] mb-4">
            Founding Member Pricing
          </h2>
          <p className="text-[#8B949E] text-lg mb-8">
            Lock in your rate forever before public launch.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-[#151A25] border border-white/10 rounded-full p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${!yearly ? 'bg-[#F0F6FC] text-[#020409]' : 'text-[#8B949E] hover:text-[#F0F6FC]'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${yearly ? 'bg-indigo-500 text-white' : 'text-[#8B949E] hover:text-[#F0F6FC]'}`}
            >
              Yearly
              <span className="text-[10px] font-black bg-indigo-300/20 px-2 py-0.5 rounded-full">SAVE 40%</span>
            </button>
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
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative rounded-3xl border p-8 flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? 'border-indigo-500/50 bg-[#151A25] shadow-[0_0_50px_rgba(79,92,255,0.15)]'
                  : 'border-white/10 bg-[#151A25] hover:border-white/20 hover:-translate-y-1'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full whitespace-nowrap font-mono tracking-wide shadow-[0_0_15px_rgba(79,92,255,0.5)]">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-display font-bold text-[#F0F6FC]">{plan.name}</h3>
                <p className="text-xs text-[#8B949E] mt-1">{plan.desc}</p>
              </div>

              <div className="mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={yearly ? 'y' : 'm'}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-end gap-1"
                  >
                    <span className="text-5xl font-display font-black text-[#F0F6FC]">
                      ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-[#8B949E] mb-2 text-sm">/mo</span>
                  </motion.div>
                </AnimatePresence>
                {yearly && plan.monthlyPrice > plan.yearlyPrice && (
                  <p className="text-xs text-emerald-400 mt-1 font-medium">
                    Billed annually — was ${plan.monthlyPrice}/mo
                  </p>
                )}
              </div>

              <ul className="space-y-3.5 mb-8 flex-1">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-[#8B949E]">
                    <span className="text-indigo-400 text-base leading-none">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${
                  plan.highlighted
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,92,255,0.3)]'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-[#8B949E] mt-8 font-medium">
          Cancel any time. Price locks in at founding rate. No auto-upgrades.
        </p>
      </div>
    </section>
  );
}
