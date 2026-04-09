import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const comparisonRows = [
  {
    factor: 'If you die unexpectedly',
    linkkey: 'Automatic guided transfer to your heirs',
    hardware: 'Lost forever without PIN & phrase',
    paper: 'Lost if the paper is lost or hidden',
    manager: 'Account locked — no death verification',
  },
  {
    factor: 'Technical knowledge required',
    linkkey: 'None — AI guides heirs step by step',
    hardware: 'Full blockchain knowledge needed',
    paper: 'Must know what a wallet even is',
    manager: 'Still need master password & 2FA device',
  },
  {
    factor: 'Theft protection',
    linkkey: 'Zero-knowledge, no single point of failure',
    hardware: 'Physical theft can mean full loss',
    paper: 'Anyone who finds the paper has everything',
    manager: 'Single point of failure — one password',
  },
  {
    factor: 'Family access after death',
    linkkey: '✓ Purpose-built for inheritance',
    hardware: '✗ Not designed for this',
    paper: '~ Only if they find and read it',
    manager: '✗ Requires your device & recovery codes',
  },
];

const securityPoints = [
  { label: 'Encryption', detail: 'AES-256 end-to-end. Client-side only.' },
  { label: 'Architecture', detail: 'Zero-knowledge — server stores only ciphertext.' },
  { label: 'Key splitting', detail: "Shamir's Secret Sharing. Distributed trust." },
  { label: 'Hardware keys', detail: 'YubiKey & FIDO2 supported for guardians.' },
];

function ScoreGauge({ visible }: { visible: boolean }) {
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let cur = 0;
    const iv = setInterval(() => {
      cur += 2;
      if (cur >= 100) { setScore(100); clearInterval(iv); }
      else setScore(cur);
    }, 28);
    return () => clearInterval(iv);
  }, [visible]);

  const circumference = 2 * Math.PI * 115;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-full max-w-xs aspect-square mx-auto flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 260 260">
        <circle cx="130" cy="130" r="115" stroke="rgba(255,255,255,0.05)" strokeWidth="14" fill="none" />
        <circle
          cx="130" cy="130" r="115"
          stroke="url(#gaugeGrad)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-300 ease-out"
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f9a8d4" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-5xl font-black text-white">{score}%</span>
        <span className="text-xs font-bold text-white/35 tracking-widest uppercase mt-2">Legacy Score</span>
        <span className="text-[10px] text-orange-400/60 mt-1">After 3 min setup</span>
      </div>

      {/* Axis labels */}
      {[
        { label: 'Vault Set', top: '6%', left: '50%', color: '#818cf8', translateX: '-50%' },
        { label: 'Guardians', top: '50%', right: '-6%', color: '#fb923c', translateY: '-50%' },
        { label: 'Documents', bottom: '6%', left: '50%', color: '#34d399', translateX: '-50%' },
        { label: 'Trigger Set', top: '50%', left: '-6%', color: '#c084fc', translateY: '-50%' },
      ].map((l) => (
        <div
          key={l.label}
          className="absolute text-[9px] font-bold px-2 py-1 rounded-full whitespace-nowrap backdrop-blur-sm"
          style={{
            top: l.top, bottom: l.bottom, left: l.left, right: l.right,
            color: l.color, background: `${l.color}20`,
            transform: `translateX(${l.translateX ?? '0'}) translateY(${l.translateY ?? '0'})`,
          }}
        >
          {l.label}
        </div>
      ))}
    </div>
  );
}

export default function Security() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section id="security" ref={ref} className="relative py-28 overflow-hidden" style={{ background: '#090B14' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.4), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p
            className="text-xs font-bold tracking-[0.22em] uppercase mb-5"
            style={{
              background: 'linear-gradient(135deg, #818cf8, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Security
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 max-w-2xl leading-tight tracking-tight">
            We are mathematically incapable of reading your data.
          </h2>
          <p className="text-white/40 text-lg max-w-xl">
            Not "privacy policy" promises. Actual cryptographic impossibility.
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Security points */}
          <div className="space-y-3">
            {securityPoints.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 group hover:-translate-y-0.5"
                style={{ background: '#131722', borderColor: 'rgba(129,140,248,0.12)' }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center"
                  style={{ background: 'rgba(129,140,248,0.1)', borderColor: 'rgba(129,140,248,0.2)' }}
                >
                  <CheckCircle2 size={18} style={{ color: '#818cf8' }} />
                </div>
                <div>
                  <p className="font-bold text-white mb-0.5">{p.label}</p>
                  <p className="text-sm text-white/40">{p.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex justify-center"
          >
            <ScoreGauge visible={visible} />
          </motion.div>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-black text-white mb-8 tracking-tight">
            What actually happens when you die?
          </h3>

          <div className="overflow-x-auto rounded-3xl border" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <th className="text-left py-4 px-6 text-white/35 font-semibold w-[200px]">Scenario</th>
                  <th
                    className="py-4 px-6 text-center font-black"
                    style={{
                      background: 'linear-gradient(135deg, #f9a8d4, #f97316)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Transfer Legacy
                  </th>
                  <th className="py-4 px-6 text-center text-white/30 font-medium">Hardware Wallet</th>
                  <th className="py-4 px-6 text-center text-white/30 font-medium">Paper Backup</th>
                  <th className="py-4 px-6 text-center text-white/30 font-medium">Password Mgr</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: i < comparisonRows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                      background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : undefined,
                    }}
                  >
                    <td className="py-4 px-6 text-white/35 text-xs leading-relaxed font-medium">{row.factor}</td>
                    <td className="py-4 px-6 text-center text-xs font-semibold" style={{ color: '#34d399' }}>{row.linkkey}</td>
                    <td className="py-4 px-6 text-center text-xs text-white/30">{row.hardware}</td>
                    <td className="py-4 px-6 text-center text-xs text-white/30">{row.paper}</td>
                    <td className="py-4 px-6 text-center text-xs text-white/30">{row.manager}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.3), transparent)' }}
      />
    </section>
  );
}
