import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "I had 6 wallets across 4 exchanges. My wife had no idea. Transfer Legacy gave me peace of mind in one afternoon.",
    author: "Rahul M.",
    role: "Mumbai, India",
    stars: 5,
  },
  {
    quote: "As an estate attorney, I recommend Transfer Legacy to every client with digital assets. Nothing else handles this properly.",
    author: "Jennifer K.",
    role: "New York, NY",
    stars: 5,
  },
  {
    quote: "Set up for my entire family in 20 minutes. The guardian system is exactly what this space needed.",
    author: "Ahmad R.",
    role: "Dubai, UAE",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-page border-y border-base relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-4 text-brand-primary">
            User Stories
          </p>
          <h2 className="font-display font-light text-primary leading-[1.08] tracking-tight text-[clamp(2.2rem,5vw,3.8rem)]">
            Trusted by <span className="font-script text-[1.1em] text-brand-primary inline-block -rotate-[2deg] translate-y-1">families worldwide</span>
          </h2>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border border-border-base rounded-[12px] p-8 bg-surface/50 transition-all duration-300 hover:translate-y-[-2px] flex flex-col justify-between"
            >
              <div>
                {/* Gold Stars */}
                <div className="flex gap-1 mb-6 text-brand-gold">
                  {[...Array(t.stars)].map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-primary text-[14px] leading-relaxed mb-8 font-light italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-border-base">
                <h4 className="text-primary font-semibold text-[13px] leading-none mb-1">
                  {t.author}
                </h4>
                <p className="text-secondary text-[11px] font-light uppercase tracking-wider">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
