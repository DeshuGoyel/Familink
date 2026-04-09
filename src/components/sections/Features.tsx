import { motion } from 'framer-motion';
import { Shield, Users, Zap, Key, Database, Bot } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Zero-Knowledge Privacy',
    desc: "Not even our engineers can see what you've stored. Your data is encrypted before it ever leaves your device.",
    sub: '\u2192 We are mathematically incapable of reading your vault.',
    accent: '#818cf8',
    glow: 'rgba(129,140,248,0.1)',
    border: 'rgba(129,140,248,0.18)',
    span: 'lg:col-span-3',
  },
  {
    icon: Users,
    title: 'Multi-Guardian Recovery',
    desc: "Trusted people each hold a fragment. No single point of failure.",
    sub: '\u2192 Based on military-grade secret splitting.',
    accent: '#fb923c',
    glow: 'rgba(251,146,60,0.1)',
    border: 'rgba(251,146,60,0.18)',
    span: 'lg:col-span-2 lg:row-span-2',
    tall: true,
  },
  {
    icon: Key,
    title: 'Crypto Native',
    desc: 'BTC, ETH, SOL, seed phrases, hardware wallets. Templates for 50+ wallet types.',
    tags: ['Bitcoin', 'Ethereum', 'Solana', 'Ledger', 'Trezor'],
    accent: '#f97316',
    glow: 'rgba(249,115,22,0.1)',
    border: 'rgba(249,115,22,0.18)',
    span: 'lg:col-span-2',
  },
  {
    icon: Zap,
    title: "Dead Man's Switch",
    desc: "Smart inactivity detection with escalation stages \u2014 warnings first, then automatic transfer. Fully customisable from 7 days to 12 months.",
    timeline: true,
    accent: '#f43f5e',
    glow: 'rgba(244,63,94,0.1)',
    border: 'rgba(244,63,94,0.18)',
    span: 'lg:col-span-3',
  },
  {
    icon: Database,
    title: 'All Digital Assets',
    desc: 'Crypto, NFTs, social accounts, email, legal documents — one encrypted place.',
    accent: '#c084fc',
    glow: 'rgba(192,132,252,0.1)',
    border: 'rgba(192,132,252,0.18)',
    span: 'lg:col-span-2',
  },
  {
    icon: Bot,
    title: 'AI Legacy Planner',
    desc: "Proactively spots gaps in your inheritance plan and tells you exactly what to fix — before it's too late.",
    accent: '#22d3ee',
    glow: 'rgba(34,211,238,0.1)',
    border: 'rgba(34,211,238,0.18)',
    span: 'lg:col-span-3',
  },
];

const timelineEvents = [
  { label: 'Active', color: '#34d399' },
  { label: 'Missed check-in', color: '#fb923c' },
  { label: 'Warning sent', color: '#f97316' },
  { label: 'Transfer Mode', color: '#f43f5e', pulse: true },
];

const guardianDegrees = [0, 120, 240];

export default function Features() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: '#0C0E18' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p
            className="text-xs font-bold tracking-[0.22em] uppercase mb-5"
            style={{
              background: 'linear-gradient(135deg, #fb923c, #f43f5e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Features
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
            Everything your family needs.
          </h2>
          <p className="text-xl text-white/35">And nothing they don't.</p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 auto-rows-[minmax(240px,auto)]">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`relative ${f.span} rounded-3xl border overflow-hidden group transition-all duration-300 hover:-translate-y-1`}
                style={{ background: '#131722', borderColor: f.border }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 20% 20%, ${f.glow.replace('0.1)', '0.25)')}, transparent 65%)` }}
                />

                <div className="relative z-10 p-8 h-full flex flex-col">
                  <div
                    className="w-11 h-11 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ background: f.glow, borderColor: f.border }}
                  >
                    <Icon size={20} style={{ color: f.accent }} />
                  </div>

                  <h3 className="text-xl font-black text-white mb-3 tracking-tight">{f.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">{f.desc}</p>

                  {f.sub && (
                    <p
                      className="text-xs px-3 py-2 rounded-xl border font-mono w-fit mt-auto"
                      style={{ color: `${f.accent}90`, background: f.glow, borderColor: f.border }}
                    >
                      {f.sub}
                    </p>
                  )}

                  {/* Tags (Crypto Native) */}
                  {f.tags && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {f.tags.map(t => (
                        <span
                          key={t}
                          className="text-[10px] font-bold px-2.5 py-1 rounded-lg border"
                          style={{ color: `${f.accent}80`, background: f.glow, borderColor: f.border }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Timeline (Dead Man's Switch) */}
                  {f.timeline && (
                    <div className="flex items-center gap-3 mt-6 overflow-x-auto pb-1">
                      {timelineEvents.map((e, idx) => (
                        <div key={idx} className="flex items-center gap-2 shrink-0">
                          <div className="flex flex-col items-center gap-1.5">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: e.color,
                                boxShadow: e.pulse ? `0 0 12px ${e.color}` : undefined,
                                animation: e.pulse ? 'pulse 1.5s infinite' : undefined,
                              }}
                            />
                            <span className="text-[10px] text-white/35 whitespace-nowrap">{e.label}</span>
                          </div>
                          {idx < timelineEvents.length - 1 && (
                            <div className="w-10 h-px mb-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Guardian diagram (Multi-Guardian, tall cell) */}
                  {f.tall && (
                    <div className="flex-1 flex items-center justify-center mt-4 relative min-h-[160px]">
                      <div
                        className="w-14 h-14 rounded-full border-2 flex items-center justify-center z-10"
                        style={{
                          background: '#0C0E18',
                          borderColor: f.border,
                          boxShadow: `0 0 20px ${f.glow}`,
                        }}
                      >
                        <Key size={20} style={{ color: f.accent }} />
                      </div>
                      {guardianDegrees.map((deg, idx) => {
                        const rad = (deg * Math.PI) / 180;
                        const x = Math.cos(rad) * 64;
                        const y = Math.sin(rad) * 64;
                        return (
                          <div
                            key={idx}
                            className="absolute w-10 h-10 rounded-full border flex items-center justify-center"
                            style={{
                              background: '#0C0E18',
                              borderColor: f.border,
                              transform: `translate(${x}px, ${y}px)`,
                            }}
                          >
                            <Users size={14} style={{ color: f.accent }} />
                          </div>
                        );
                      })}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" overflow="visible">
                        {guardianDegrees.map((deg, idx) => {
                          const rad = (deg * Math.PI) / 180;
                          const ex = Math.cos(rad) * 64;
                          const ey = Math.sin(rad) * 64;
                          return (
                            <line
                              key={idx}
                              x1="50%" y1="50%"
                              x2={`calc(50% + ${ex}px)`}
                              y2={`calc(50% + ${ey}px)`}
                              stroke={f.border}
                              strokeWidth="1"
                              strokeDasharray="4 4"
                            />
                          );
                        })}
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
