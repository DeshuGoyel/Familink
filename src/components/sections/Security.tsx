import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const comparisonRows = [
  {
    factor: 'If you die unexpectedly',
    linkkey: 'Automatic guided transfer to your heirs',
    hardware: 'Lost forever without the PIN & phrase combo',
    paper: 'Lost if the paper is lost, burnt or hidden',
    manager: 'Account locked — no death verification',
  },
  {
    factor: 'Technical knowledge required',
    linkkey: 'None — AI guides heirs step by step',
    hardware: 'Full blockchain knowledge required',
    paper: 'Knowledge of what a wallet is required',
    manager: 'Still need master password & 2FA device',
  },
  {
    factor: 'Theft protection',
    linkkey: 'Zero-knowledge, no single point of failure',
    hardware: 'Physical theft can still mean full loss',
    paper: 'Anyone who finds the paper has everything',
    manager: 'Single point of failure — one password',
  },
  {
    factor: 'Family access after death',
    linkkey: '✓ Purpose-built for inheritance',
    hardware: '✗ Not designed for this case at all',
    paper: '~ Only if they can find and read it',
    manager: '✗ Requires your device & recovery codes',
  },
];

const securityPoints = [
  { label: 'Encryption', detail: 'AES-256 end-to-end. Client-side only.' },
  { label: 'Architecture', detail: 'Zero-knowledge — server stores only ciphertext.' },
  { label: 'Key splitting', detail: "Shamir's Secret Sharing. Distributed trust." },
  { label: 'Hardware keys', detail: 'YubiKey & FIDO2 supported for guardians.' },
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
    <div className="relative w-full max-w-xs aspect-square mx-auto flex items-center justify-center">
      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 280 280">
        <circle cx="140" cy="140" r="120" stroke="rgba(255,255,255,0.05)" strokeWidth="16" fill="none" />
        <circle
          cx="140" cy="140" r="120"
          stroke="url(#gaugeGradient)"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-out"
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F5CFF" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-5xl font-display font-black text-[#F0F6FC]">{score}%</span>
        <span className="text-xs font-bold text-[#8B949E] tracking-widest uppercase mt-2">Legacy Score</span>
        <span className="text-[10px] text-indigo-400/70 mt-1">After 3 min setup</span>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[8%] left-[50%] -translate-x-1/2 text-[9px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded-full whitespace-nowrap backdrop-blur-sm">
          Vault Set
        </div>
        <div className="absolute top-[50%] right-[-8%] -translate-y-1/2 text-[9px] font-bold text-amber-300 bg-amber-500/20 px-2 py-1 rounded-full whitespace-nowrap backdrop-blur-sm">
          Guardians Added
        </div>
        <div className="absolute bottom-[8%] left-[50%] -translate-x-1/2 translate-y-1/2 text-[9px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-1 rounded-full whitespace-nowrap backdrop-blur-sm">
          Documents Stored
        </div>
        <div className="absolute top-[50%] left-[-8%] -translate-y-1/2 text-[9px] font-bold text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full whitespace-nowrap backdrop-blur-sm">
          Trigger Set
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
    <section id="security" ref={ref} className="py-28 bg-[#0A0D18]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-5">Security</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F0F6FC] mb-4 max-w-2xl leading-tight">
            We are mathematically incapable of reading your data.
          </h2>
          <p className="text-[#8B949E] text-lg max-w-xl">
            Not "privacy policy" promises. Actual cryptographic impossibility.
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Security bullets */}
          <div>
            <div className="space-y-4">
              {securityPoints.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex items-start gap-5 p-5 rounded-2xl bg-[#0D1117] border border-white/5 hover:border-indigo-500/20 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#F0F6FC] mb-0.5">{p.label}</p>
                    <p className="text-sm text-[#8B949E]">{p.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gauge */}
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

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-display font-bold text-[#F0F6FC] mb-8">
            What actually happens when you die?
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-4 px-5 text-[#8B949E] font-medium w-[200px]">Scenario</th>
                  <th className="py-4 px-5 text-center text-indigo-400 font-bold">Transfer Legacy</th>
                  <th className="py-4 px-5 text-center text-[#8B949E] font-medium">Hardware Wallet</th>
                  <th className="py-4 px-5 text-center text-[#8B949E] font-medium">Paper Backup</th>
                  <th className="py-4 px-5 text-center text-[#8B949E] font-medium">Password Mgr</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                    <td className="py-4 px-5 text-[#8B949E] font-medium text-xs leading-relaxed">{row.factor}</td>
                    <td className="py-4 px-5 text-center">
                      <span className="text-emerald-400 text-xs font-medium">{row.linkkey}</span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="text-red-400/70 text-xs">{row.hardware}</span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="text-amber-400/70 text-xs">{row.paper}</span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="text-red-400/70 text-xs">{row.manager}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
