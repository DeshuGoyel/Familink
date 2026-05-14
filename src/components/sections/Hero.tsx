import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Lock, Sparkles, ChevronDown, ShieldCheck, Shield, ArrowRight } from 'lucide-react';
import LandingVaultObject from '../3d/LandingVaultObject';
import { Link } from 'react-router-dom';

/* ─── Avatar stack ─────────────────────────────────────────── */
const avatars = [
  { bg: '#D4AF37', initials: 'MK' },
  { bg: '#1E293B', initials: 'SR' },
  { bg: '#10B981', initials: 'AP' },
  { bg: '#F59E0B', initials: 'JL' },
  { bg: '#4F5CFF', initials: 'RD' },
];

/* ─── Floating glass stat card ──────────────────────────────── */
function StatChip({
  children, delay, className,
}: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white/[0.04] backdrop-blur-2xl border border-white/[0.10] rounded-2xl shadow-2xl px-5 py-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Feature pill ──────────────────────────────────────────── */
function FeaturePill({ icon: Icon, label, delay }: { icon: React.ElementType; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.10] backdrop-blur-xl px-4 py-2 rounded-full"
    >
      <Icon size={13} className="text-white/60" />
      <span className="text-white/80 text-xs font-semibold tracking-tight whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const vaultY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollDown = () => {
    const el = document.querySelector('#how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: '80px', background: '#000000' }}
    >
      {/* ── Full bleed background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep radial glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #160040 0%, #000000 70%)'
        }} />
        {/* Purple accent top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,58,212,0.35) 0%, transparent 65%)' }}
        />
        {/* Orange accent bottom right */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(249,115,22,0.12) 0%, transparent 60%)' }}
        />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />
        {/* Breathing blobs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] left-[20%] w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[20%] right-[15%] w-64 h-64 bg-pink-600/15 rounded-full blur-[80px]"
        />
      </div>

      {/* ── Content layer ── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-0 py-12"
      >
        {/* LEFT — Copy */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl lg:max-w-none">

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10"
          >
            <div className="flex -space-x-2.5">
              {avatars.map((a) => (
                <div
                  key={a.initials}
                  className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: a.bg }}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <span className="text-white/60 text-sm font-medium">
              <span className="text-white font-semibold">2,400+ families</span> protected
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <ShieldCheck size={11} /> Private Beta
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(79,92,255,0.9)] animate-pulse" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary">
              Institutional Legacy Protocol
            </p>
          </motion.div>

          {/* Headline */}
          <h1 className="mb-8">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-[0.88] text-white"
            >
              100 Years.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-[0.88]"
              style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F59E0B 50%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              100% Secure.
            </motion.span>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="text-white/50 text-base md:text-lg max-w-md leading-relaxed mb-10 font-medium"
          >
            The world's first complete digital asset succession platform. Protect your crypto, identities, and memories with absolute zero-knowledge security.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/dashboard">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white h-14 px-8 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-colors shadow-2xl shadow-brand-primary/30 cursor-pointer"
              >
                <Shield size={16} /> Access Vault Dashboard
              </motion.div>
            </Link>
            <Link to="/onboarding">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.10] text-white/90 h-14 px-8 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-colors border border-white/[0.12] backdrop-blur-sm cursor-pointer"
              >
                Start Onboarding <ArrowRight size={16} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-3"
          >
            <FeaturePill icon={Lock} label="AES-256 Encrypted" delay={0.9} />
            <FeaturePill icon={Shield} label="Zero-Knowledge" delay={1.0} />
            <FeaturePill icon={Users} label="Multi-Guardian" delay={1.1} />
          </motion.div>
        </div>

        {/* RIGHT — 3D Vault */}
        <div className="flex-1 relative flex items-center justify-center min-h-[460px] w-full lg:w-auto">

          {/* Glow behind vault */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full bg-purple-600/20 blur-[80px]" />
          </div>

          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
              className="w-72 h-72 rounded-full border border-white/15"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 2, 2], opacity: [0.2, 0, 0] }}
              transition={{ duration: 3, delay: 0.7, repeat: Infinity, ease: 'easeOut' }}
              className="w-72 h-72 rounded-full border border-white/10"
            />
          </div>

          {/* 3D Canvas */}
          <motion.div
            style={{ y: vaultY }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[340px] h-[340px] xl:w-[420px] xl:h-[420px]"
          >
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.5], fov: 42 }}>
              <ambientLight intensity={0.65} />
              <Suspense fallback={null}>
                <LandingVaultObject />
                <Environment preset="city" />
              </Suspense>
            </Canvas>

            {/* Guardian badge */}
            <div className="absolute left-1/2 bottom-[14%] -translate-x-1/2 flex items-center gap-2 bg-white/[0.08] border border-white/[0.15] backdrop-blur-xl rounded-full px-4 py-2 shadow-2xl">
              <div className="w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center">
                <Sparkles size={11} className="text-white" />
              </div>
              <span className="text-white/85 text-xs font-semibold tracking-tight">Guardian vault armed</span>
            </div>
          </motion.div>

          {/* Floating stat chips */}
          <StatChip delay={0.85} className="absolute top-[8%] left-[0%]">
            <p className="text-white text-2xl font-bold leading-none tabular-nums">$140B+</p>
            <p className="text-white/50 text-[11px] mt-1 font-medium">Crypto lost yearly</p>
          </StatChip>

          <StatChip delay={1.0} className="absolute bottom-[18%] right-[0%]">
            <p className="text-white text-base font-bold leading-none">Zero-Knowledge</p>
            <p className="text-white/50 text-[11px] mt-1 font-medium">Military-grade privacy</p>
          </StatChip>

          <StatChip delay={1.1} className="absolute bottom-[5%] left-[5%]">
            <p className="text-white text-2xl font-bold leading-none tabular-nums">5 min</p>
            <p className="text-white/50 text-[11px] mt-1 font-medium">To secure your legacy</p>
          </StatChip>

          {/* End-to-end chip */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute top-[38%] right-[-4%] flex items-center gap-2 bg-white/[0.05] border border-white/[0.10] backdrop-blur-xl px-4 py-2.5 rounded-full shadow-lg"
          >
            <Lock size={12} className="text-white/70" />
            <span className="text-white/85 text-xs font-semibold whitespace-nowrap">End-to-end Encrypted</span>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/30 hover:text-white/60 transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
}
