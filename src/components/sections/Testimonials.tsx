import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus T.',
    role: 'Crypto Investor',
    initials: 'MT',
    color: 'from-indigo-500 to-indigo-700',
    stars: 5,
    quote:
      'After my brother passed without leaving access to his wallets, I knew I needed to act. Transfer Legacy is the product I wished existed 3 years ago.',
  },
  {
    name: 'Priya K.',
    role: 'Software Engineer',
    initials: 'PK',
    color: 'from-purple-500 to-purple-700',
    stars: 5,
    quote:
      "The guardian network concept is brilliant. My parents aren't technical, but with the step-by-step AI guidance they'd be fine. Finally an inheritance tool I trust.",
  },
  {
    name: 'David R.',
    role: 'Financial Advisor',
    initials: 'DR',
    color: 'from-blue-500 to-blue-700',
    stars: 5,
    quote:
      "I've been recommending this to all my high-net-worth clients. It fills a critical gap that traditional financial planning completely ignores.",
  },
  {
    name: 'Sarah J.',
    role: 'DeFi Developer',
    initials: 'SJ',
    color: 'from-green-500 to-green-700',
    stars: 5,
    quote:
      "The zero-knowledge architecture is legitimate — I read the whitepaper. This isn't security theater. The cryptography is sound and the UX is surprisingly clean.",
  },
  {
    name: 'Tom W.',
    role: 'Angel Investor',
    initials: 'TW',
    color: 'from-orange-500 to-orange-700',
    stars: 5,
    quote:
      'Set up in under 10 minutes. Assigned 5 guardians across different family members and close friends. Feels like a huge weight has been lifted.',
  },
  {
    name: 'Elena M.',
    role: 'Estate Attorney',
    initials: 'EM',
    color: 'from-pink-500 to-pink-700',
    stars: 5,
    quote:
      'From a legal perspective, this is the digital equivalent of a properly executed trust document. I recommend it to every client with meaningful crypto holdings.',
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="w-[340px] shrink-0 bg-[#0D1117] border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(t.stars)].map((_, i) => (
          <Star key={i} size={14} className="text-gold fill-gold" />
        ))}
      </div>
      <p className="text-[#8B949E] text-sm leading-relaxed mb-6">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
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
  // Duplicate cards for seamless infinite scroll
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-28 bg-[#0D1117] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="inline-block text-indigo-400 text-sm font-bold tracking-widest uppercase mb-4">
            What People Are Saying
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-5">
            Trusted by Thousands of Families
          </h2>
          <p className="text-xl text-[#8B949E] max-w-2xl mx-auto">
            From first-time crypto buyers to estate attorneys — everyone agrees the gap is real.
          </p>
        </motion.div>
      </div>

      {/* Infinite scroll track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0D1117] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0D1117] to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-5 w-max"
          style={{
            animation: 'scroll-x 40s linear infinite',
          }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
