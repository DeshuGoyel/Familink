import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  {
    name: 'GUARDIAN',
    monthlyPrice: 0,
    yearlyPrice: 0,
    desc: 'For getting started',
    features: [
      '1 vault',
      '2 guardians',
      '10 items',
      'Email delivery',
    ],
    cta: 'Join Waitlist Free',
    highlighted: false,
    badge: null,
  },
  {
    name: 'LEGACY',
    monthlyPrice: 24,
    yearlyPrice: 12,
    desc: 'For serious asset protection',
    features: [
      'Unlimited vault items',
      '5 guardians',
      'Crypto native',
      'Hardware key support',
      'Priority support',
    ],
    cta: 'Claim Founding Price',
    highlighted: true,
    badge: 'MOST POPULAR — FOUNDING RATE',
  },
  {
    name: 'DYNASTY',
    monthlyPrice: 49,
    yearlyPrice: 29,
    desc: 'For families and estates',
    features: [
      'Everything in Legacy',
      'Family accounts',
      'Attorney delivery',
      'API access',
      'White-glove onboarding',
    ],
    cta: 'Join Dynasty Waitlist',
    highlighted: false,
    badge: null,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="py-28 bg-[#020409]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F0F6FC] mb-5">
            Founding Member Pricing
          </h2>
          <p className="text-xl text-[#8B949E] max-w-2xl mx-auto mb-10">
            Lock in your rate forever before public launch.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-2 bg-[#0D1117] border border-white/10 rounded-full px-2 py-2">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${!yearly ? 'bg-[#F0F6FC] text-[#020409]' : 'text-[#8B949E] hover:text-[#F0F6FC]'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${yearly ? 'bg-indigo-500 text-[#F0F6FC]' : 'text-[#8B949E] hover:text-[#F0F6FC]'}`}
            >
              Yearly
              <span className="text-[10px] font-black bg-indigo-400 text-[#F0F6FC] px-1.5 py-0.5 rounded-full whitespace-nowrap">
                SAVE 40%+
              </span>
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative rounded-3xl border p-8 flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? 'border-gold/30 bg-[#0D1117] shadow-[0_0_40px_rgba(212,175,55,0.1)] scale-105 z-10'
                  : 'border-white/10 bg-[#0D1117]/50 hover:border-white/20 hover:-translate-y-1'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-[#020409] text-xs font-black px-4 py-1.5 rounded-full whitespace-nowrap drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-1">
                {plan.name} {plan.highlighted && '⭐'}
              </h3>
              <p className="text-sm text-[#8B949E] mb-6">{plan.desc}</p>

              {/* Price */}
              <div className="mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={yearly ? 'yearly' : 'monthly'}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col"
                  >
                    <div className="flex items-end gap-1">
                      <span className="text-5xl font-display font-black text-[#F0F6FC]">
                        ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-[#8B949E] mb-2 text-sm">/month</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <div className="h-4 mt-2">
                  {yearly && plan.monthlyPrice > plan.yearlyPrice && (
                    <p className="text-xs text-green-400 font-medium">
                      Billed annually (was ${plan.monthlyPrice} — {Math.round((1 - plan.yearlyPrice/plan.monthlyPrice)*100)}% off)
                    </p>
                  )}
                  {!yearly && plan.name !== 'GUARDIAN' && (
                     <p className="text-xs text-[#8B949E] font-medium">
                       Billed monthly
                     </p>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-[#8B949E]">
                    <span className="text-indigo-400 text-lg">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl text-sm font-bold transition-all ${
                plan.highlighted 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]' 
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
        
        <p className="text-center text-xs text-[#8B949E] mt-8 font-medium">
          Price locks in at founding rate after launch.
        </p>
      </div>
    </section>
  );
}
