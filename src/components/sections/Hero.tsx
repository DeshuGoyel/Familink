import { useRef } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Lock, Sparkles, ChevronDown, ShieldCheck } from 'lucide-react';
import LandingVaultObject from '../3d/LandingVaultObject';
import { WaitlistForm } from '../ui/WaitlistForm';
import { CountdownTimer } from '../ui/CountdownTimer';

/* ─── Avatar stack ─────────────────────────────────────────── */
const avatars = [
  { bg: '#D4AF37', initials: 'MK' }, // Gold
  { bg: '#1E293B', initials: 'SR' }, // Obsidian
  { bg: '#10B981', initials: 'AP' }, // Emerald
  { bg: '#F59E0B', initials: 'JL' }, // Amber
  { bg: '#0F172A', initials: 'RD' }, // Darker Obsidian
];

/* ─── Floating glass card ───────────────────────────────────── */
function GlassCard({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute bg-white/[0.03] backdrop-blur-3xl border border-white/[0.08] rounded-2xl shadow-2xl ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/* ─── Floating pill chip ────────────────────────────────────── */
function GlassChip({
  icon: Icon,
  label,
  delay,
  className,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className={`absolute flex items-center gap-2 bg-white/[0.05] backdrop-blur-2xl border border-white/[0.1] px-4 py-2.5 rounded-full shadow-lg ${className}`}
    >
      <Icon className="w-3.5 h-3.5 text-white/70" />
      <span className="text-white/90 text-sm font-medium tracking-tight whitespace-nowrap leading-none">{label}</span>
    </motion.div>
  );
}

export default function Hero() {
  const launchDate = import.meta.env.VITE_LAUNCH_DATE || '2026-09-01T00:00:00Z';
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const gradientY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollDown = () => {
    const el = document.querySelector('#problem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex overflow-hidden bg-page"
      style={{ paddingTop: '72px' }} /* navbar height — prevents overlap */
    >
      {/* ── LEFT CONTENT PANEL ────────────────────────────── */}
      <motion.div
        style={{ opacity: leftOpacity }}
        className="relative z-10 flex flex-col justify-center w-full lg:w-[52%] px-8 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-0"
      >
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-10 w-fit"
        >
          <div className="flex -space-x-2.5">
            {avatars.map((a) => (
              <div
                key={a.initials}
                className="w-8 h-8 rounded-full border-2 border-page flex items-center justify-center text-white text-[10px] font-bold"
                style={{ backgroundColor: a.bg }}
              >
                {a.initials}
              </div>
            ))}
          </div>
          <p className="text-sm text-secondary">
            <span className="text-primary font-semibold">2,400+ families</span> protected
          </p>
          <span className="flex items-center gap-1.5 text-brand-success text-xs font-semibold bg-brand-success/10 px-3 py-1.5 rounded-full border border-brand-success/20">
            <ShieldCheck size={11} />
            Private Beta
          </span>
        </motion.div>

        {/* Headline — Institutional Grade */}
        <h1 className="leading-[0.9] mb-10">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-bold tracking-tighter gradient-text-premium"
          >
            100 YEARS.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-bold tracking-tighter gold-gradient"
          >
            100% SECURE.
          </motion.span>
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62, duration: 0.8 }}
          className="text-base md:text-lg text-secondary max-w-lg mb-9 leading-relaxed text-balance"
        >
          The world's first complete digital asset succession platform.
          Protect your crypto, identities, and memories with absolute zero-knowledge security.
        </motion.p>

        {/* Waitlist form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.76, duration: 0.6 }}
          className="mb-3"
        >
          <WaitlistForm />
        </motion.div>

        {/* Monochrome Logo Cloud (Ditto Same) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="pt-12 border-t border-white/5 opacity-40 grayscale"
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-8 font-bold flex items-center gap-4">
            <span className="h-px w-8 bg-white/10" />
            As Seen In
            <span className="h-px w-8 bg-white/10" />
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center p-0.5">
                <img src="https://cryptologos.cc/logos/coinbase-base-logo.svg?v=032" className="h-full" alt="Coinbase" />
              </div>
              <span className="text-white text-[12px] font-bold tracking-tight">COINBASE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#F3BA2F] rounded-sm flex items-center justify-center p-0.5">
                <img src="https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=032" className="h-full" alt="Binance" />
              </div>
              <span className="text-white text-[12px] font-bold tracking-tight">BINANCE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#5741D9] rounded-sm flex items-center justify-center p-0.5">
                <img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=032" className="h-full" alt="Solana" />
              </div>
              <span className="text-white text-[12px] font-bold tracking-tight">SOLANA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center p-0.5">
                <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032" className="h-full" alt="Ethereum" />
              </div>
              <span className="text-white text-[12px] font-bold tracking-tight">ETHEREUM</span>
            </div>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="pt-8 border-t border-base"
        >
          <p className="text-[11px] text-muted mb-5 font-semibold uppercase tracking-[0.18em]">
            Beta launches in:
          </p>
          <CountdownTimer targetDate={launchDate} />
        </motion.div>
      </motion.div>

      {/* ── RIGHT GRADIENT PANEL ───────────────────────────── */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[54%] overflow-hidden">

        {/* Diagonal left cut */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: 'var(--color-bg-page)',
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          }}
        />

        {/* Main gradient */}
        <motion.div className="absolute inset-0" style={{ y: gradientY }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 70% 30%, #2e1065 0%, #000000 60%, #000000 100%)',
            }}
          />
          {/* Vibrant color wash */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_80%_40%,rgba(168,85,247,0.3)_0%,rgba(236,72,153,0.2)_40%,transparent_80%)]" />
          {/* Subtle orange accent light */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.12),transparent_50%)]" />
          {/* Texture noise */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
            }}
          />
        </motion.div>

        {/* Breathing blobs */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute top-[8%] right-[10%] w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[15%] left-[15%] w-56 h-56 bg-pink-500/15 rounded-full blur-2xl" />
          <div className="absolute top-[40%] right-[30%] w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Abstract SVG curves */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 600 700"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 2.8, ease: 'easeInOut' }}
            d="M 80 150 Q 280 -40 520 220 Q 680 420 400 620 Q 160 780 60 520 Q -30 330 80 150 Z"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ delay: 1.2, duration: 2.2, ease: 'easeInOut' }}
            d="M 120 260 Q 340 60 560 300 Q 700 480 420 660"
            stroke="white"
            strokeWidth="1"
            fill="none"
            strokeDasharray="6 4"
          />
        </svg>

        {/* ── Central Vault Visual ──────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[360px] h-[360px] xl:w-[430px] xl:h-[430px] flex items-center justify-center"
          >
            {/* Pulse rings */}
            <motion.div
              className="absolute inset-0 rounded-full border border-white/15"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-white/10"
              animate={{ scale: [1, 2, 2], opacity: [0.4, 0, 0] }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Static rings */}
            <div className="absolute inset-10 rounded-full border border-white/15" />
            <div className="absolute inset-20 rounded-full border border-white/20" />
            <div className="absolute inset-0 rounded-full bg-black/10 blur-3xl" />
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.5], fov: 42 }}>
              <ambientLight intensity={0.65} />
              <Suspense fallback={null}>
                <LandingVaultObject />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
            <div className="pointer-events-none absolute left-1/2 top-[52%] h-28 w-56 -translate-x-1/2 rounded-full bg-black/25 blur-2xl" />
            <div className="absolute left-1/2 top-[72%] -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 shadow-2xl backdrop-blur-xl">
              Guardian vault armed
              {/* Sparkle badge */}
              <div className="absolute -top-3 -right-3 w-7 h-7 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/40">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Floating stat cards ─────────────────────────── */}
        <GlassCard delay={0.8} className="top-[11%] left-[8%] px-5 py-4">
          <p className="text-white text-2xl font-bold leading-none">$140B+</p>
          <p className="text-white/60 text-[11px] mt-1 font-medium">Crypto lost yearly</p>
        </GlassCard>

        <GlassCard delay={0.95} className="bottom-[22%] right-[5%] px-5 py-4">
          <p className="text-white text-lg font-bold leading-none">Zero-Knowledge</p>
          <p className="text-white/60 text-[11px] mt-1 font-medium">Military-grade privacy</p>
        </GlassCard>

        <GlassCard delay={1.05} className="bottom-[8%] left-[7%] px-5 py-4">
          <p className="text-white text-2xl font-bold leading-none">5 min</p>
          <p className="text-white/60 text-[11px] mt-1 font-medium">To secure your legacy</p>
        </GlassCard>

        {/* ── Feature chips ───────────────────────────────── */}
        <GlassChip icon={Lock} label="End-to-end Encrypted" delay={1.15} className="top-[40%] right-[3%]" />
        <GlassChip icon={Users} label="Multi-Guardian Recovery" delay={1.25} className="top-[60%] left-[5%]" />

        {/* ── Decorative geometry ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.45, rotate: 45 }}
          transition={{ delay: 0.7, duration: 1.3 }}
          className="absolute top-[7%] right-[7%] w-11 h-11 border-2 border-white/35 rounded-xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="absolute bottom-[32%] right-[28%] w-5 h-5 bg-white/40 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 1.05 }}
          className="absolute top-[72%] right-[12%] w-20 h-20 border border-white/25 rounded-full"
        />
      </div>

      {/* ── Mobile gradient wash ──────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 lg:hidden pointer-events-none z-0"
        style={{ background: 'linear-gradient(to top, var(--color-bg-page), transparent)' }}
      />

      {/* ── Scroll cue ────────────────────────────────────── */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="absolute bottom-10 left-[26%] -translate-x-1/2 z-20 text-secondary hover:text-primary transition-colors hidden lg:block"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={32} strokeWidth={1} />
        </motion.div>
      </motion.button>
    </section>
  );
}
