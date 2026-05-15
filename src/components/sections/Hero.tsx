import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock, Sparkles, ChevronDown, ShieldCheck, ArrowRight } from 'lucide-react';
import Globe from '../3d/Globe';
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
      className={`bg-surface/80 backdrop-blur-2xl border border-border-base rounded-2xl shadow-lg px-5 py-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden bg-page"
    >
      {/* ── Advanced Background Layer ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Mesh Gradient (Dark Mode) */}
        <div className="absolute inset-0 opacity-[0.4] hidden dark:block" style={{
          background: `
            radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
            radial-gradient(at 50% 0%, hsla(225,39%,30%,0.3) 0, transparent 50%), 
            radial-gradient(at 100% 0%, hsla(339,49%,30%,0.2) 0, transparent 50%),
            radial-gradient(at 100% 100%, hsla(225,39%,30%,0.2) 0, transparent 50%),
            radial-gradient(at 0% 100%, hsla(253,16%,7%,1) 0, transparent 50%)
          `
        }} />

        {/* Premium Light Mode Mesh Gradient */}
        <div className="absolute inset-0 opacity-[0.8] dark:hidden" style={{
          background: `
            radial-gradient(at 0% 0%, hsla(210, 100%, 98%, 1) 0, transparent 50%), 
            radial-gradient(at 50% 0%, hsla(249, 100%, 96%, 1) 0, transparent 50%), 
            radial-gradient(at 100% 0%, hsla(35, 100%, 96%, 1) 0, transparent 50%),
            radial-gradient(at 100% 100%, hsla(210, 100%, 98%, 1) 0, transparent 50%)
          `
        }} />

        {/* Subtler Dynamic Light Rays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[100vh] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(249,115,22,0.02)_120deg,transparent_240deg)] animate-[spin_30s_linear_infinite]" />

        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px',
        }} />

        {/* Deep Horizon Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-page via-transparent to-transparent z-10" />
      </div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 flex flex-col items-center text-center"
      >
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/50 border border-border-base backdrop-blur-md mb-12 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">4,200+ Families Protected</span>
        </motion.div>

        {/* Massive Headline */}
        <div className="max-w-5xl mb-12 relative">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] text-primary"
          >
            Your Crypto Dies With You — <br />
            <span className="gold-gradient italic text-[0.8em]">Unless You Plan.</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute -top-12 -right-12 w-32 h-32 bg-brand-primary/10 blur-[60px] -z-10"
          />
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-secondary text-xl md:text-2xl max-w-4xl leading-relaxed mb-16 font-medium tracking-tight"
        >
          Transfer Legacy is the zero-knowledge encrypted vault that ensures your <br className="hidden md:block" />
          Bitcoin, Ethereum, and digital assets reach your heirs — exactly as you intend.
        </motion.p>

        {/* Centered Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-col items-center gap-4 mb-24"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link to="/onboarding">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-16 px-12 rounded-2xl bg-brand-primary text-white text-lg font-bold flex items-center gap-3 shadow-lg hover:shadow-brand transition-all duration-500"
              >
                Create Your Free Vault — Takes 15 Minutes <ArrowRight size={20} />
              </motion.div>
            </Link>
            <Link to="/dashboard">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="h-16 px-12 rounded-2xl bg-surface border border-border-base text-primary text-lg font-bold flex items-center gap-3 backdrop-blur-xl transition-all"
              >
                Access Dashboard
              </motion.div>
            </Link>
          </div>
          <p className="text-muted text-sm font-medium">No credit card. No seed phrase shared with us. Ever.</p>
        </motion.div>

        {/* 3D Scene / Stats Overlay */}
        <div className="relative w-full max-w-6xl aspect-[16/9] md:aspect-[21/9] mb-32 group">
          {/* 3D Globe */}
          <div className="absolute inset-0 z-0 opacity-90 dark:opacity-100 transition-opacity">
             <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#D4AF37" />
                <Suspense fallback={null}>
                  <Globe />
                  <Environment preset="night" />
                </Suspense>
              </Canvas>
          </div>

          {/* Bento Stats Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <StatChip delay={1.0} className="self-start justify-self-start">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-primary text-xl font-bold font-digits leading-none">$189B+</p>
                    <p className="text-muted text-[10px] uppercase tracking-widest mt-1 font-bold">Permanently Lost</p>
                  </div>
               </div>
            </StatChip>

            <StatChip delay={1.2} className="self-end justify-self-start md:mb-12">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Lock size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-primary text-xl font-bold leading-none">Zero-Knowledge</p>
                    <p className="text-muted text-[10px] uppercase tracking-widest mt-1 font-bold">We Never Hold Keys</p>
                  </div>
               </div>
            </StatChip>

            <StatChip delay={1.4} className="self-start justify-self-end">
               <div className="flex items-center gap-3 text-left">
                  <div className="flex -space-x-2">
                    {avatars.slice(0, 3).map(a => (
                      <div key={a.initials} className="w-8 h-8 rounded-full border-2 border-page flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: a.bg, color: 'white' }}>{a.initials}</div>
                    ))}
                  </div>
                  <div>
                    <p className="text-primary text-xl font-bold font-digits leading-none">2,847</p>
                    <p className="text-muted text-[10px] uppercase tracking-widest mt-1 font-bold">Families Protected</p>
                  </div>
               </div>
            </StatChip>

            <StatChip delay={1.6} className="self-end justify-self-end md:mb-12">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <Sparkles size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-primary text-xl font-bold leading-none">15 Minutes</p>
                    <p className="text-muted text-[10px] uppercase tracking-widest mt-1 font-bold">To Protect Everything</p>
                  </div>
               </div>
            </StatChip>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted/30"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
}
