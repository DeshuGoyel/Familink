import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const founders = [
  {
    name: 'Deshu Goyel',
    role: 'Founder & CEO',
    bio: `Deshu spent three years watching crypto wealth become permanently inaccessible after unexpected deaths in his extended family. He started Transfer Legacy to solve the problem he knew was coming for millions of families — before it's too late.`,
    quote: `"The hardest part isn't building the vault. It's explaining to a grieving family why they can't access what was left for them."`,
    image: '/images/founder_deshu.png',
    accent: 'border-indigo-500/30',
    gradient: 'from-indigo-900/20 to-transparent',
    links: { twitter: '#', linkedin: '#' },
  },
  {
    name: 'Vikash Kumar Singh',
    role: 'Co-Founder & CTO',
    bio: `Vikash has worked on cryptographic protocols and distributed systems for the last 5 years. He designed the zero-knowledge architecture behind Transfer Legacy — ensuring no server, no employee, and no hacker can ever read your vault.`,
    quote: `"We built a system where the word 'trust' is replaced by the word 'proof'. Math doesn't lie."`,
    image: '/images/founder_vikash.png',
    accent: 'border-amber-500/30',
    gradient: 'from-amber-900/20 to-transparent',
    links: { twitter: '#', linkedin: '#' },
  },
];

export default function Founders() {
  return (
    <section id="founders" className="py-20 bg-[#0B0E14]">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-5">The Team</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Built by people who've felt this problem.
          </h2>
          <p className="text-[#8B949E] text-lg max-w-2xl">
            Not a team of generalists chasing a trend — two founders who got tired of waiting for someone else to solve this.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className={`group rounded-3xl border ${founder.accent} bg-[#151A25] overflow-hidden flex flex-col`}
            >
              {/* Photo banner */}
              <div className="relative h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b ${founder.gradient} z-10`} />
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col gap-5 flex-1">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white">{founder.name}</h3>
                  <p className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mt-1">{founder.role}</p>
                </div>

                <p className="text-[#8B949E] text-sm leading-relaxed flex-1">{founder.bio}</p>

                {/* Pull quote */}
                <blockquote className="border-l-2 border-indigo-500/40 pl-4 italic text-[#F0F6FC]/60 text-sm leading-relaxed">
                  {founder.quote}
                </blockquote>

                {/* Social links */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <a href={founder.links.twitter} className="flex items-center gap-2 text-xs text-[#8B949E] hover:text-white transition-colors">
                    <ExternalLink size={13} /> Twitter
                  </a>
                  <a href={founder.links.linkedin} className="flex items-center gap-2 text-xs text-[#8B949E] hover:text-white transition-colors">
                    <ExternalLink size={13} /> LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
