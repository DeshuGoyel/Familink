import { motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus T.', role: 'Crypto Investor', initials: 'MT',
    accent: '#818cf8', bgFrom: '#312e81', bgTo: '#6366f1',
    stars: 5, verified: true, tall: false,
    quote: 'After my brother passed without leaving access to his wallets, I knew I needed to act. Transfer Legacy is the product I wished existed three years ago.',
  },
  {
    name: 'Priya K.', role: 'Software Engineer', initials: 'PK',
    accent: '#c084fc', bgFrom: '#4a1d96', bgTo: '#9333ea',
    stars: 5, verified: true, tall: true,
    quote: "The guardian network concept is brilliant. My parents aren't technical, but with the AI guidance they'd be fine. Finally an inheritance tool I trust with my actual portfolio.",
  },
  {
    name: 'David R.', role: 'Financial Advisor', initials: 'DR',
    accent: '#60a5fa', bgFrom: '#1e3a5f', bgTo: '#3b82f6',
    stars: 5, verified: false, tall: false,
    quote: "I've been recommending this to all my high-net-worth clients. It fills a critical gap that traditional financial planning completely ignores.",
  },
  {
    name: 'Sarah J.', role: 'DeFi Developer', initials: 'SJ',
    accent: '#34d399', bgFrom: '#064e3b', bgTo: '#10b981',
    stars: 5, verified: true, tall: true,
    quote: "The zero-knowledge architecture is legitimate — I actually read the whitepaper. This isn't security theater. The cryptography is sound and the UX is surprisingly clean.",
  },
  {
    name: 'Tom W.', role: 'Angel Investor', initials: 'TW',
    accent: '#fb923c', bgFrom: '#7c2d12', bgTo: '#f97316',
    stars: 4, verified: false, tall: false,
    quote: 'Set up in under 10 minutes. Assigned 5 guardians across family and friends. Feels like a weight has been lifted.',
  },
  {
    name: 'Elena M.', role: 'Estate Attorney', initials: 'EM',
    accent: '#f9a8d4', bgFrom: '#831843', bgTo: '#ec4899',
    stars: 5, verified: true, tall: false,
    quote: 'From a legal perspective, this is the digital equivalent of a properly executed trust document. I recommend it to every client with meaningful crypto holdings.',
  },
];

function Card({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="shrink-0 flex flex-col rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        width: t.tall ? '360px' : '300px',
        background: '#131722',
        borderColor: `${t.accent}20`,
      }}
    >
      {/* Top accent bar */}
      <div className="h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)` }} />

      <div className="p-6 flex flex-col flex-1">
        {/* Stars + verified */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < t.stars ? 'fill-amber-400 text-amber-400' : 'text-white/10 fill-white/10'}
              />
            ))}
          </div>
          {t.verified && (
            <div
              className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ color: '#34d399', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.15)' }}
            >
              <BadgeCheck size={10} />
              Verified
            </div>
          )}
        </div>

        <p className="text-sm text-white/40 leading-relaxed flex-1 mb-5">"{t.quote}"</p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${t.bgFrom}, ${t.bgTo})` }}
          >
            {t.initials}
          </div>
          <div>
            <p className="font-bold text-white text-sm">{t.name}</p>
            <p className="text-white/30 text-xs">{t.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: '#0C0E18' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.3), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs font-bold tracking-[0.22em] uppercase mb-5"
            style={{
              background: 'linear-gradient(135deg, #34d399, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Trusted by real families.
          </h2>
          <p className="text-white/40 text-lg max-w-xl">
            From crypto investors to estate attorneys — everyone agrees the gap is real.
          </p>
        </motion.div>
      </div>

      {/* Scrolling marquee */}
      <div className="relative">
        {/* Edge fades */}
        <div
          className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0C0E18, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0C0E18, transparent)' }}
        />

        <div
          className="flex gap-4 w-max items-start pl-6"
          style={{ animation: 'scroll-x 55s linear infinite' }}
        >
          {doubled.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
