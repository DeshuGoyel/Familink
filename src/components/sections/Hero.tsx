import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Users, Lock, Sparkles, ChevronDown, ShieldCheck } from 'lucide-react';
import { Waitlist3DScene } from '../3d/Waitlist3DScene';
import { WaitlistForm } from '../ui/WaitlistForm';
import { CountdownTimer } from '../ui/CountdownTimer';
import { api } from '../../lib/api';
import { Link } from 'react-router-dom';

/* ─── Avatar stack ─────────────────────────────────────────── */
const avatars = [
  { bg: '#F97316', initials: 'MK' },
  { bg: '#A855F7', initials: 'SR' },
  { bg: '#EC4899', initials: 'AP' },
  { bg: '#F59E0B', initials: 'JL' },
  { bg: '#10B981', initials: 'RD' },
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
      className={`absolute bg-white/[0.06] dark:bg-black/[0.3] backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-2xl shadow-2xl ${className}`}
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
      className={`absolute flex items-center gap-2 bg-white/[0.08] dark:bg-black/[0.3] backdrop-blur-xl border border-white/10 dark:border-white/5 px-4 py-2.5 rounded-full shadow-xl ${className}`}
    >
      <Icon className="w-3.5 h-3.5 text-brand-primary" />
      <span className="text-primary text-sm font-semibold whitespace-nowrap leading-none">{label}</span>
    </motion.div>
  );
}

export default function Hero() {
  const launchDate = import.meta.env.VITE_LAUNCH_DATE || '2026-09-01T00:00:00Z';
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const leftOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [branding, setBranding] = useState({
    waitlist_enabled: true,
  });

  useEffect(() => {
    async function loadBranding() {
      try {
        const res = await api.get<any>('/app/branding', { skipAead: true });
        const data = res.data ? res.data : res;
        if (data && typeof data.waitlist_enabled === 'boolean') {
          setBranding(data);
        }
      } catch (err) {
        console.warn('Failed to load branding in Hero, using defaults:', err);
      }
    }
    loadBranding();
  }, []);

  const scrollDown = () => {
    const el = document.querySelector('#problem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex overflow-hidden bg-page"
      style={{ paddingTop: '72px' }}
    >
      {/* Background aurora */}
      <div className="absolute inset-0 pointer-events-none bg-aurora opacity-30 z-0" />

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

        {/* Headline — Wallet-style split weight */}
        <h1 className="leading-[1.05] mb-7">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block text-5xl md:text-6xl xl:text-[68px] font-light text-secondary tracking-tight"
          >
            Your Digital
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.33, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block text-5xl md:text-6xl xl:text-[68px] font-black text-primary tracking-tight"
          >
            Legacy,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.46, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block text-5xl md:text-6xl xl:text-[68px] font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, var(--color-gradient-pink) 0%, var(--color-brand-primary) 45%, var(--color-gradient-purple) 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Protected Forever.
          </motion.span>
        </h1>

        <p className="text-lg md:text-xl text-secondary max-w-2xl mb-10 leading-relaxed font-sans">
          Transfer Legacy uses AI and zero-knowledge cryptography to secure your crypto, NFTs, and digital assets for the people you love.
        </p>

        {/* Waitlist or Direct Actions */}
        <div className="w-full max-w-md">
          {branding.waitlist_enabled ? (
            <div className="flex flex-col gap-6">
              <WaitlistForm />
              <div className="pt-6 border-t border-base/50">
                <p className="text-xs text-muted mb-3 font-semibold uppercase tracking-widest">
                  Beta Launches In:
                </p>
                <CountdownTimer targetDate={launchDate} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/onboarding" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-14 px-8 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-base font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-brand transition-all duration-300">
                  Protect My Legacy <ArrowRight size={18} />
                </button>
              </Link>
              <Link to="/dashboard" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-14 px-8 rounded-xl bg-surface border border-base text-primary text-base font-bold flex items-center justify-center gap-2 hover:bg-hover transition-all duration-300">
                  Access Dashboard
                </button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── RIGHT 3D GRAPHICS PANEL ───────────────────────── */}
      <div className="absolute right-0 top-0 bottom-0 w-[48%] hidden lg:block z-10 pointer-events-none select-none">
        {/* Colorful gradient container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="absolute right-0 top-0 bottom-0 w-[85%] overflow-hidden rounded-l-[48px] border-l border-white/10 shadow-2xl"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'linear-gradient(145deg, var(--color-gradient-purple) 0%, var(--color-brand-primary) 50%, var(--color-gradient-pink) 100%)',
            }}
          />
          {/* Soft light leak */}
          <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.04] via-transparent to-black/40" />
          {/* Texture noise */}
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
            }}
          />
        </motion.div>

        {/* Breathing blobs */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute top-[8%] right-[10%] w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[15%] left-[15%] w-56 h-56 bg-brand-gold/10 rounded-full blur-2xl" />
        </motion.div>

        {/* ── Central 3D Canvas Visual ──────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[360px] h-[360px] xl:w-[430px] xl:h-[430px] flex items-center justify-center"
          >
            {/* Pulse rings */}
            <motion.div
              className="absolute inset-0 rounded-full border border-brand-primary/20"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-brand-primary/10"
              animate={{ scale: [1, 2, 2], opacity: [0.4, 0, 0] }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Static rings */}
            <div className="absolute inset-10 rounded-full border border-base/30" />
            <div className="absolute inset-20 rounded-full border border-base/50" />
            <div className="absolute inset-0 rounded-full bg-black/10 blur-3xl" />
            
            <div className="w-full h-full relative z-10">
              <Waitlist3DScene />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-[52%] h-28 w-56 -translate-x-1/2 rounded-full bg-black/25 blur-2xl" />
            <div className="absolute left-1/2 top-[72%] -translate-x-1/2 rounded-full border border-base bg-surface/60 px-4 py-2 text-xs font-semibold text-primary/80 shadow-2xl backdrop-blur-xl">
              Succession protocol active
              {/* Sparkle badge */}
              <div className="absolute -top-3 -right-3 w-7 h-7 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand/40">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Floating stat cards ─────────────────────────── */}
        <GlassCard delay={0.8} className="top-[11%] left-[8%] px-5 py-4">
          <p className="text-primary text-2xl font-black leading-none">$140B+</p>
          <p className="text-secondary text-[11px] mt-1 font-medium font-sans">Crypto lost yearly</p>
        </GlassCard>

        <GlassCard delay={0.95} className="bottom-[22%] right-[5%] px-5 py-4">
          <p className="text-primary text-lg font-black leading-none">Zero-Knowledge</p>
          <p className="text-secondary text-[11px] mt-1 font-medium font-sans">Military-grade privacy</p>
        </GlassCard>

        <GlassCard delay={1.05} className="bottom-[8%] left-[7%] px-5 py-4">
          <p className="text-primary text-2xl font-black leading-none">5 min</p>
          <p className="text-secondary text-[11px] mt-1 font-medium font-sans">To secure your legacy</p>
        </GlassCard>

        {/* ── Feature chips ───────────────────────────────── */}
        <GlassChip icon={Lock} label="End-to-end Encrypted" delay={1.15} className="top-[40%] right-[3%]" />
        <GlassChip icon={Users} label="Multi-Guardian Recovery" delay={1.25} className="top-[60%] left-[5%]" />

        {/* ── Decorative geometry ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.45, rotate: 45 }}
          transition={{ delay: 0.7, duration: 1.3 }}
          className="absolute top-[7%] right-[7%] w-11 h-11 border-2 border-base/40 rounded-xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="absolute bottom-[32%] right-[28%] w-5 h-5 bg-brand-primary/25 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 1.05 }}
          className="absolute top-[72%] right-[12%] w-20 h-20 border border-base/30 rounded-full"
        />
      </div>

      {/* ── Mobile gradient wash ──────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 lg:hidden pointer-events-none z-0"
        style={{ background: 'linear-gradient(to top, rgba(249,115,22,0.08), transparent)' }}
      />

      {/* ── Scroll cue ────────────────────────────────────── */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="absolute bottom-7 left-[26%] -translate-x-1/2 z-20 text-muted/30 hover:text-primary transition-colors hidden lg:block"
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
