import { useRef } from 'react';
import { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, Users, Lock, Sparkles, ChevronDown, ShieldCheck } from 'lucide-react';
import { WaitlistForm } from '../ui/WaitlistForm';
import { CountdownTimer } from '../ui/CountdownTimer';

/* ─── Avatar stack ─────────────────────────────────────────── */
const avatars = [
  { bg: '#6366f1', initials: 'MK' },
  { bg: '#8b5cf6', initials: 'SR' },
  { bg: '#ec4899', initials: 'AP' },
  { bg: '#f59e0b', initials: 'JL' },
  { bg: '#10b981', initials: 'RD' },
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
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute bg-white/[0.12] backdrop-blur-xl border border-white/25 rounded-2xl shadow-2xl shadow-black/20 ${className}`}
    >
      {children}
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
      className={`absolute flex items-center gap-2 bg-white/[0.14] backdrop-blur-xl border border-white/25 px-4 py-2.5 rounded-full shadow-xl ${className}`}
    >
      <Icon className="w-3.5 h-3.5 text-white" />
      <span className="text-white text-sm font-semibold whitespace-nowrap leading-none">{label}</span>
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
      className="relative min-h-screen flex overflow-hidden bg-[#090B14]"
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
                className="w-8 h-8 rounded-full border-2 border-[#090B14] flex items-center justify-center text-white text-[10px] font-bold"
                style={{ backgroundColor: a.bg }}
              >
                {a.initials}
              </div>
            ))}
          </div>
          <p className="text-sm text-white/50">
            <span className="text-white font-semibold">2,400+ families</span> protected
          </p>
          <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
            <ShieldCheck size={11} />
            Private Beta
          </span>
        </motion.div>

        {/* Headline — Wallet-style split weight */}
        <h1 className="leading-[1.05] mb-7">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block text-5xl md:text-6xl xl:text-[68px] font-light text-white/40 tracking-tight"
          >
            Your Digital
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.33, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block text-5xl md:text-6xl xl:text-[68px] font-black text-white tracking-tight"
          >
            Legacy,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.46, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block text-5xl md:text-6xl xl:text-[68px] font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #f9a8d4 0%, #f97316 45%, #c084fc 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Protected Forever.
          </motion.span>
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62, duration: 0.8 }}
          className="text-base md:text-lg text-white/45 max-w-md mb-9 leading-relaxed"
        >
          The only platform that transfers your crypto to your family automatically —
          without lawyers, seed phrases, or any technical knowledge.
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

        {/* Micro copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.92, duration: 0.5 }}
          className="text-sm text-white/35 flex items-center gap-2 mb-12"
        >
          <ArrowRight size={12} className="text-orange-400 flex-shrink-0" />
          Free forever plan · No credit card needed
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="pt-8 border-t border-white/[0.07]"
        >
          <p className="text-[11px] text-white/35 mb-5 font-semibold uppercase tracking-[0.18em]">
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
            background: '#090B14',
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          }}
        />

        {/* Main gradient */}
        <motion.div className="absolute inset-0" style={{ y: gradientY }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(145deg, #2d1b5e 0%, #7c3aed 12%, #be185d 30%, #f97316 52%, #fb923c 65%, #c084fc 82%, #818cf8 100%)',
            }}
          />
          {/* Soft light leak */}
          <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.08] via-transparent to-black/30" />
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
          animate={{ opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute top-[8%] right-[10%] w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[15%] left-[15%] w-56 h-56 bg-purple-300/15 rounded-full blur-2xl" />
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
            className="relative w-48 h-48 flex items-center justify-center"
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
            <div className="absolute inset-3 rounded-full border border-white/15" />
            <div className="absolute inset-7 rounded-full border border-white/20" />
            {/* Icon box */}
            <div className="relative w-24 h-24 rounded-[22px] bg-white/[0.18] backdrop-blur-2xl border border-white/35 flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
              <Shield className="w-12 h-12 text-white" strokeWidth={1.5} />
              {/* Sparkle badge */}
              <div className="absolute -top-3 -right-3 w-7 h-7 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/40">
                <Sparkles className="w-4 h-4 text-yellow-900" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Floating stat cards ─────────────────────────── */}
        <GlassCard delay={0.8} className="top-[11%] left-[8%] px-5 py-4">
          <p className="text-white text-2xl font-black leading-none">$140B+</p>
          <p className="text-white/60 text-[11px] mt-1 font-medium">Crypto lost yearly</p>
        </GlassCard>

        <GlassCard delay={0.95} className="bottom-[22%] right-[5%] px-5 py-4">
          <p className="text-white text-lg font-black leading-none">Zero-Knowledge</p>
          <p className="text-white/60 text-[11px] mt-1 font-medium">Military-grade privacy</p>
        </GlassCard>

        <GlassCard delay={1.05} className="bottom-[8%] left-[7%] px-5 py-4">
          <p className="text-white text-2xl font-black leading-none">5 min</p>
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
        style={{ background: 'linear-gradient(to top, rgba(249,115,22,0.12), transparent)' }}
      />

      {/* ── Scroll cue ────────────────────────────────────── */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="absolute bottom-7 left-[26%] -translate-x-1/2 z-20 text-white/25 hover:text-white/70 transition-colors hidden lg:block"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={26} />
        </motion.div>
      </motion.button>
    </section>
  );
}
