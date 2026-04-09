import { motion } from 'framer-motion';
import { Lock, Users, KeyRound } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Lock,
    title: 'Encrypt everything in 3 minutes',
    desc: 'Add your seed phrases, wallet passwords, exchange accounts, and documents. Everything is encrypted locally — it never leaves your device in plaintext.',
    detail: 'Works with BTC, ETH, SOL, hardware wallets, password managers, and any text secret.',
    side: 'left',
  },
  {
    number: '02',
    icon: Users,
    title: 'Choose people you trust',
    desc: 'Assign guardians — close friends or family — who each hold a unique fragment. No single person holds everything. No single point of failure.',
    detail: 'Based on Shamir\'s Secret Sharing. Even if one guardian is compromised, your vault stays safe.',
    side: 'right',
  },
  {
    number: '03',
    icon: KeyRound,
    title: 'Your family inherits — automatically',
    desc: 'If you stop checking in, your vault enters transfer mode. Guardians receive guided instructions in plain English. No blockchain knowledge required.',
    detail: 'Multiple fail-safes and escalation delays ensure false triggers are impossible.',
    side: 'left',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-[#11151F]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-5">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F0F6FC]">
            Three steps. Three minutes.
          </h2>
          <p className="text-xl text-[#8B949E] mt-4 max-w-xl mx-auto">
            Built for humans, not cryptographers.
          </p>
        </motion.div>

        {/* Steps — alternating editorial layout */}
        <div className="flex flex-col gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isRight = step.side === 'right';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 ${
                  i < steps.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                {/* Number background watermark */}
                <div
                  className={`absolute ${isRight ? 'right-0 lg:right-8' : 'left-0 lg:left-8'} top-1/2 -translate-y-1/2 text-[160px] md:text-[200px] font-black text-white/[0.025] select-none pointer-events-none leading-none font-display`}
                >
                  {step.number}
                </div>

                {/* Text side */}
                <div className={`relative z-10 ${isRight ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Icon size={22} className="text-indigo-400" />
                    </div>
                    <span className="text-sm font-bold text-indigo-400/60 font-mono">Step {step.number}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-[#F0F6FC] mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#8B949E] text-base leading-relaxed mb-5">
                    {step.desc}
                  </p>
                  <p className="text-sm text-indigo-300/60 bg-indigo-500/5 border border-indigo-500/15 rounded-xl px-4 py-3">
                    {step.detail}
                  </p>
                </div>

                {/* Visual side */}
                <div className={`relative z-10 ${isRight ? 'lg:order-1' : ''} flex justify-center`}>
                  <div className="w-full max-w-sm aspect-square rounded-3xl bg-[#090C18] border border-white/5 flex items-center justify-center relative overflow-hidden">
                    {/* Ambient glow */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl" />
                    </div>
                    {/* Step icon — large */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="w-24 h-24 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Icon size={44} className="text-indigo-400" strokeWidth={1.5} />
                      </div>
                      <div className="text-xs font-mono text-indigo-400/50 tracking-wider">
                        [{step.number}] {step.title.split(' ').slice(0, 2).join(' ').toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
