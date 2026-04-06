import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const securityPoints = [
  "AES-256 end-to-end encryption",
  "Zero-knowledge architecture (we never see your data)",
  "Shamir's Secret Sharing for key splitting",
  "Optional hardware key (YubiKey) support"
];

function LegacyScoreGauge({ visible }: { visible: boolean }) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= 100) {
        setScore(100);
        clearInterval(interval);
      } else {
        setScore(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [visible]);

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-full max-w-sm aspect-square mx-auto flex items-center justify-center">
      {/* Background track */}
      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 280 280">
        <circle
          cx="140"
          cy="140"
          r="120"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="20"
          fill="none"
        />
        {/* Animated fill */}
        <circle
          cx="140"
          cy="140"
          r="120"
          stroke="url(#gradient)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F5CFF" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Score Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-6xl font-display font-black text-[#F0F6FC]">
          {score}%
        </span>
        <span className="text-sm font-bold text-[#8B949E] tracking-widest uppercase mt-2">
          Legacy Score
        </span>
      </div>

      {/* Floating Labels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded-full whitespace-nowrap opacity-80 backdrop-blur-sm">
          Vault Set
        </div>
        <div className="absolute top-[50%] right-[-10%] -translate-y-1/2 text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-1 rounded-full whitespace-nowrap opacity-80 backdrop-blur-sm">
          Guardians Added
        </div>
        <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 translate-y-1/2 text-[10px] font-bold text-green-300 bg-green-500/20 px-2 py-1 rounded-full whitespace-nowrap opacity-80 backdrop-blur-sm">
          Documents Stored
        </div>
        <div className="absolute top-[50%] left-[-10%] -translate-y-1/2 text-[10px] font-bold text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full whitespace-nowrap opacity-80 backdrop-blur-sm">
          Trigger Configured
        </div>
      </div>
    </div>
  );
}

export default function Security() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="security" ref={ref} className="py-28 bg-[#0D1117] relative overflow-hidden">
      {/* Subtle circuit pattern bg */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4F5CFF 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div className="flex flex-col">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-[#F0F6FC] mb-10 leading-[1.2]"
            >
              Military-Grade Security You Can Actually Understand
            </motion.h2>

            <ul className="space-y-6">
              {securityPoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-4 text-lg text-[#8B949E]"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                    ✓
                  </div>
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right Gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <LegacyScoreGauge visible={visible} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
