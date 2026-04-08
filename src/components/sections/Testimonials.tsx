import { motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus T.',
    role: 'Crypto Investor',
    initials: 'MT',
    color: 'from-indigo-500 to-indigo-700',
    stars: 5,
    verified: true,
    size: 'normal',
    quote: 'After my brother passed without leaving access to his wallets, I knew I needed to act. Transfer Legacy is the product I wished existed three years ago.',
  },
  {
    name: 'Priya K.',
    role: 'Software Engineer',
    initials: 'PK',
    color: 'from-purple-500 to-purple-700',
    stars: 5,
    verified: true,
    size: 'tall',
    quote: "The guardian network concept is brilliant. My parents aren't technical, but with the step-by-step AI guidance they'd be fine. Finally an inheritance tool I trust with my actual portfolio.",
  },
  {
    name: 'David R.',
    role: 'Financial Advisor',
    initials: 'DR',
    color: 'from-blue-500 to-blue-700',
    stars: 5,
    verified: false,
    size: 'normal',
    quote: "I've been recommending this to all my high-net-worth clients. It fills a critical gap that traditional financial planning completely ignores.",
  },
  {
    name: 'Sarah J.',
    role: 'DeFi Developer',
    initials: 'SJ',
    color: 'from-emerald-500 to-emerald-700',
    stars: 5,
    verified: true,
    size: 'tall',
    quote: "The zero-knowledge architecture is legitimate — I actually read the whitepaper. This isn't security theater. The cryptography is sound and the UX is surprisingly clean.",
  },
  {
    name: 'Tom W.',
    role: 'Angel Investor',
    initials: 'TW',
    color: 'from-orange-500 to-orange-700',
    stars: 4,
    verified: false,
    size: 'normal',
    quote: 'Set up in under 10 minutes. Assigned 5 guardians across family and friends. Feels like a weight has been lifted.',
  },
  {
    name: 'Elena M.',
    role: 'Estate Attorney',
    initials: 'EM',
    color: 'from-pink-500 to-pink-700',
    stars: 5,
    verified: true,
    size: 'normal',
    quote: 'From a legal perspective, this is the digital equivalent of a properly executed trust document. I recommend it to every client with meaningful crypto holdings.',
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className={`shrink-0 bg-[#0D1117] border border-white/5 hover:border-indigo-500/20 rounded-2xl p-6 flex flex-col transition-colors ${t.size === 'tall' ? 'w-[360px]' : 'w-[320px]'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          {[...Array(t.stars)].map((_, i) => (
            <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
          ))}
          {t.stars < 5 && <Star size={13} className="text-white/10 fill-white/10" />}
        </div>
        {t.verified && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 px-2 py-0.5 rounded-full">
            <BadgeCheck size={10} />
            Verified
          </div>
        )}
      </div>
      <p className="text-[#8B949E] text-sm leading-relaxed mb-5 flex-1">"{t.quote}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
          {t.initials}
        </div>
        <div>
          <p className="font-bold text-white text-sm">{t.name}</p>
          <p className="text-[#8B949E] text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-28 bg-[#020409] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-5">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Trusted by real families.
          </h2>
          <p className="text-xl text-[#8B949E] max-w-xl">
            From crypto investors to estate attorneys — everyone agrees the gap is real.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020409] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020409] to-transparent z-10 pointer-events-none" />
        <div
          className="flex gap-4 w-max items-start"
          style={{ animation: 'scroll-x 50s linear infinite' }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
