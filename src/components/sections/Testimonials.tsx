import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "I had 6 wallets across 4 exchanges. My wife had no idea. Transfer Legacy gave me peace of mind in one afternoon.",
    author: "Rahul M.",
    role: "Mumbai · ₹2.3Cr in crypto secured",
    initials: "RM",
    bg: "#e8621a"
  },
  {
    quote: "As an estate attorney, I recommend Transfer Legacy to every client with digital assets. Nothing else handles this properly.",
    author: "Jennifer K.",
    role: "New York · Estate Planning Attorney",
    initials: "JK",
    bg: "#c9922a"
  },
  {
    quote: "Set up for my entire family in 20 minutes. The guardian system is exactly what this space needed.",
    author: "Ahmad R.",
    role: "Dubai · 340 ETH secured",
    initials: "AR",
    bg: "#4ecdc4"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-page overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-primary">Trusted by the <span className="gold-gradient italic">Sovereign.</span></h2>
          <p className="text-secondary font-medium">Real stories from families who protected their future.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Card className="h-full p-10 border-border-base bg-surface hover:bg-white/50 dark:hover:bg-white/[0.02] transition-all flex flex-col justify-between group">
                <div>
                  <Quote className="text-brand-primary/20 mb-6 group-hover:text-brand-primary/40 transition-colors" size={40} />
                  <p className="text-xl text-primary leading-relaxed mb-8 font-medium italic">
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 border-t border-border-base pt-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: t.bg }}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-primary font-bold text-lg leading-none mb-1">{t.author}</h4>
                    <p className="text-muted text-xs font-medium uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-border-base shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="text-xs font-bold text-primary tracking-widest uppercase">2,847 families have protected their crypto this month</p>
          </div>
        </div>
      </div>
    </section>
  );
}
