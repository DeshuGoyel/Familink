import { motion } from 'framer-motion';
import { WaitlistForm } from '../ui/WaitlistForm';

const trustBadges = [
  { icon: '🔒', text: 'No spam ever' },
  { icon: '⚡', text: 'Cancel anytime' },
  { icon: '🛡️', text: 'Your data is encrypted' },
  { icon: '🌍', text: 'Available worldwide' },
];

export default function FinalCTA() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#020409] overflow-hidden py-32">
      {/* Background illustration / glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="absolute w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[150px]" />
        {/* Simple CSS key illustration in background */}
        <div className="absolute w-64 h-[500px] border-[20px] border-white/10 rounded-full flex flex-col justify-end items-center pb-20">
          <div className="w-16 h-16 bg-white/10 mb-4" />
          <div className="w-24 h-16 bg-white/10 mb-4 ml-8" />
          <div className="w-16 h-16 bg-white/10 mr-8" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold text-[#F0F6FC] mb-6 leading-tight">
            Don't Let Your Legacy <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Disappear.
            </span>
          </h2>
          <p className="text-xl text-[#8B949E] mb-12 max-w-2xl mx-auto">
            Join 2,400+ people who are building their digital inheritance plan today.
          </p>

          <div className="max-w-xl mx-auto mb-16">
            {/* Using WaitlistForm here, it will handle submission and confetti */}
            <WaitlistForm />
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-[#8B949E] font-medium">
            {trustBadges.map((badge, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>{badge.icon}</span>
                {badge.text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
