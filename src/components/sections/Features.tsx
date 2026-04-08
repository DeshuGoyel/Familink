import { motion } from 'framer-motion';
import { Shield, Users, Zap, Key, Database, Bot } from 'lucide-react';


function TimelineVisual() {
  const events = [
    { label: 'Active', color: 'bg-emerald-500', done: true },
    { label: 'Missed check-in', color: 'bg-amber-500', done: true },
    { label: 'Warning sent', color: 'bg-orange-500', done: true },
    { label: 'Transfer Mode', color: 'bg-red-500 animate-pulse', done: false },
  ];
  return (
    <div className="flex items-center gap-2 mt-6 w-full overflow-x-auto pb-2">
      {events.map((e, i) => (
        <div key={i} className="flex items-center gap-2 shrink-0">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-3 h-3 rounded-full ${e.color}`} />
            <span className="text-[10px] text-[#8B949E] whitespace-nowrap">{e.label}</span>
          </div>
          {i < events.length - 1 && (
            <div className="w-8 h-px bg-white/15 shrink-0 mb-3" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-28 bg-[#020409]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-5">Features</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F0F6FC] mb-3">
            Everything your family needs.
          </h2>
          <p className="text-xl text-[#8B949E]">And nothing they don't.</p>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 auto-rows-[minmax(260px,auto)]">

          {/* Zero-Knowledge Security — large */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-3 bg-[#0D1117] border border-indigo-500/20 hover:border-indigo-500/40 rounded-3xl p-8 flex flex-col md:flex-row relative overflow-hidden group transition-all duration-300 hover:bg-[#111827]"
          >
            <div className="flex-1 flex flex-col z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                <Shield size={22} className="text-indigo-400" />
              </div>
              <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-3">
                Zero-Knowledge Privacy
              </h3>
              <p className="text-[#8B949E] leading-relaxed mb-4 max-w-sm">
                Not even our engineers can see what you've stored. Your data is encrypted before it ever leaves your device.
              </p>
              <p className="text-xs text-indigo-300/70 font-mono bg-indigo-500/5 border border-indigo-500/10 rounded-lg px-3 py-2 w-fit">
                → We are mathematically incapable of reading your vault.
              </p>
            </div>
            {/* Decorative lock SVG */}
            <div className="flex-shrink-0 flex items-center justify-center w-full md:w-48 mt-8 md:mt-0">
              <svg viewBox="0 0 80 100" className="w-28 h-28 text-indigo-500/30 group-hover:text-indigo-500/50 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="10" y="40" width="60" height="50" rx="8" />
                <path d="M25 40V28a15 15 0 0 1 30 0v12" />
                <circle cx="40" cy="63" r="5" fill="currentColor" />
                <line x1="40" y1="68" x2="40" y2="76" />
              </svg>
            </div>
          </motion.div>

          {/* Multi-Guardian Recovery — tall */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 lg:row-span-2 bg-[#0D1117] border border-amber-500/20 hover:border-amber-500/40 rounded-3xl p-8 flex flex-col relative overflow-hidden group transition-all duration-300 hover:bg-[#111510]"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
              <Users size={22} className="text-amber-400" />
            </div>
            <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-3">
              Multi-Guardian Recovery
            </h3>
            <p className="text-[#8B949E] leading-relaxed mb-3">
              Trusted people each hold a fragment. No single person holds everything — no single point of failure.
            </p>
            <p className="text-xs text-amber-300/70 font-mono bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2 w-fit text-wrap">
              → Based on military-grade secret splitting.
            </p>

            {/* Guardian network diagram */}
            <div className="flex-1 flex items-center justify-center mt-8 relative">
              {/* Center key */}
              <div className="w-14 h-14 rounded-full bg-[#020409] border-2 border-amber-500/40 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(217,119,6,0.2)]">
                <Key size={20} className="text-amber-400" />
              </div>
              {/* Orbiting guardians */}
              {[0, 120, 240].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const x = Math.cos(rad) * 60;
                const y = Math.sin(rad) * 60;
                return (
                  <div
                    key={i}
                    className="absolute w-10 h-10 bg-[#111] border border-amber-500/20 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Users size={10} className="text-amber-400" />
                    </div>
                  </div>
                );
              })}
              {/* Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" overflow="visible">
                {[0, 120, 240].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const cx = 0, cy = 0;
                  const ex = cx + Math.cos(rad) * 60;
                  const ey = cy + Math.sin(rad) * 60;
                  return (
                    <line
                      key={i}
                      x1="50%" y1="50%"
                      x2={`calc(50% + ${ex}px)`}
                      y2={`calc(50% + ${ey}px)`}
                      stroke="rgba(217,119,6,0.2)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* Bitcoin & Crypto Native — small */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2 bg-[#0D1117] border border-orange-500/20 hover:border-orange-500/40 rounded-3xl p-8 flex flex-col relative overflow-hidden group transition-all duration-300 hover:bg-[#12100A]"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
              <Key size={22} className="text-orange-400" />
            </div>
            <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-3">
              Crypto Native
            </h3>
            <p className="text-[#8B949E] text-sm leading-relaxed mb-4">
              BTC, ETH, SOL, seed phrases, hardware wallets. Templates for 50+ wallet types.
            </p>
            <div className="flex gap-2 flex-wrap">
              {['Bitcoin', 'Ethereum', 'Solana', 'Ledger', 'Trezor'].map(t => (
                <span key={t} className="text-[10px] font-semibold text-orange-400/70 bg-orange-500/10 border border-orange-500/15 px-2 py-1 rounded-md">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Dead Man's Switch — large */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-3 bg-[#0D1117] border border-red-500/20 hover:border-red-500/40 rounded-3xl p-8 flex flex-col relative overflow-hidden group transition-all duration-300 hover:bg-[#130B0B]"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
              <Zap size={22} className="text-red-400" />
            </div>
            <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-3">
              Dead Man's Switch
            </h3>
            <p className="text-[#8B949E] text-sm leading-relaxed mb-2 max-w-lg">
              Smart inactivity detection with multiple escalation stages — warnings first, guardians contacted, then automatic transfer. Fully customizable from 7 days to 12 months.
            </p>
            <TimelineVisual />
          </motion.div>

          {/* All Digital Assets */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="lg:col-span-2 bg-[#0D1117] border border-purple-500/20 hover:border-purple-500/40 rounded-3xl p-8 flex flex-col relative overflow-hidden group transition-all duration-300 hover:bg-[#0E0A12]"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
              <Database size={22} className="text-purple-400" />
            </div>
            <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-3">
              All Your Digital Assets
            </h3>
            <p className="text-[#8B949E] text-sm leading-relaxed">
              Crypto, NFTs, social accounts, email, legal documents — everything in one encrypted place.
            </p>
          </motion.div>

          {/* AI Planner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="lg:col-span-3 bg-[#0D1117] border border-cyan-500/20 hover:border-cyan-500/40 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start relative overflow-hidden group transition-all duration-300 hover:bg-[#090F12]"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
              <Bot size={22} className="text-cyan-400" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-3">
                AI Legacy Planner
              </h3>
              <p className="text-[#8B949E] text-sm leading-relaxed">
                Proactively spots gaps in your inheritance plan and tells you exactly what to fix — before it's too late.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
