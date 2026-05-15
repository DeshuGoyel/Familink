import { useStore } from '../store/useStore';
import {
  Shield, Users, KeyRound, Plus, Wallet, Bot, ChevronRight
} from 'lucide-react';
import LegacyScoreGauge from '../components/dashboard/LegacyScoreGauge';
import ProofOfLifeCard from '../components/dashboard/ProofOfLifeCard';
import AssetDonutChart from '../components/dashboard/AssetDonutChart';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import AIInsightBanner from '../components/dashboard/AIInsightBanner';
import FutureProjectionCard from '../components/dashboard/FutureProjectionCard';
import VaultNotarizationCard from '../components/dashboard/VaultNotarizationCard';
import DeathSimulator from '../components/dashboard/DeathSimulator';
import { Canvas } from '@react-three/fiber';
import VaultScene from '../components/3d/VaultScene';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
});

/* ── Stat Card – Transfer Legacy style ── */
function StatCard({
  label, value, sub, icon: Icon, colorClass, delay = 0
}: {
  label: string; value: React.ReactNode; sub?: string;
  icon: React.ElementType; colorClass: string; delay?: number;
}) {
  return (
    <Card {...fadeUp(delay)} variant="glass" className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 bg-surface/50 border border-base ${colorClass} shadow-inner`}>
          <Icon size={20} strokeWidth={2} />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted/60">{label}</span>
      </div>
      <p className="text-4xl font-digits font-bold text-primary tracking-tight leading-none mb-2">{value}</p>
      {sub && <p className="text-[11px] text-secondary font-medium tracking-tight">{sub}</p>}
    </Card>
  );
}

/* ── Quick action card ── */
function QuickCard({ to, icon: Icon, label, colorClass }: {
  to: string; icon: React.ElementType; label: string; colorClass: string;
}) {
  return (
    <Link to={to} className="group">
      <Card variant="outline" className="p-5 flex flex-col items-center gap-4 text-center transition-all group-hover:border-brand-primary/30 bg-surface/10 hover:bg-surface/30">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-surface/50 border border-base ${colorClass} shadow-inner`}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <span className="text-[12px] font-bold text-primary tracking-tight">{label}</span>
      </Card>
    </Link>
  );
}

export default function Dashboard() {
  const { user, assets, guardians, heirs } = useStore();
  const navigate = useNavigate();

  const totalValue = assets.reduce((acc, a) => acc + (a.value || 0), 0);
  const activeGuardians = guardians.filter(g => g.status === 'Confirmed').length;

  return (
    <div className="min-h-screen pt-6 relative overflow-hidden bg-page">
      {/* Background Institutional Layer */}
      <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none" />

      <div className="px-4 sm:px-6 lg:px-8 pb-28 md:pb-12 max-w-7xl mx-auto space-y-10 relative z-10">

        {/* ── Page Header ── */}
        <motion.header {...fadeUp(0)} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary">
                Institutional Access Live
              </p>
            </div>
            <h1 className="text-5xl sm:text-5xl font-display font-bold tracking-tight leading-[0.9] text-primary">
              Welcome back,<br />
              <span className="gold-gradient italic">{user.name.split(' ')[0]}</span>
            </h1>
            <p className="text-secondary text-base mt-6 font-medium tracking-tight max-w-xl border-l-2 border-brand-primary/20 pl-4">
              Your institutional succession protocol is active, secured by a decentralized cryptographic heartbeat and sovereign nodes.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-brand-primary/20 backdrop-blur-md">
                <Shield size={14} className="text-brand-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Vault Security: High</span>
             </div>
             <p className="text-[9px] text-muted font-mono uppercase tracking-widest">
               Last Protocol Audit: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </p>
          </div>
        </motion.header>

        {/* ── AI Banner ── */}
        <motion.div {...fadeUp(0.05)}>
          <AIInsightBanner />
        </motion.div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card {...fadeUp(0.08)} variant="default" className="p-5 col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col items-center justify-center border-brand-primary/20 bg-surface/80">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-primary mb-3 self-start">Legacy Score</span>
            <LegacyScoreGauge score={user.score} />
          </Card>

          <StatCard
            label="Assets Protected" value={assets.length}
            sub={`$${totalValue.toLocaleString()} protected value`}
            icon={Shield} colorClass="text-brand-primary" delay={0.12}
          />
          <StatCard
            label="Active Guardians" value={activeGuardians}
            sub={`${guardians.length} total assigned`}
            icon={Users} colorClass="text-brand-gold" delay={0.16}
          />
          <StatCard
            label="Heirs Registered" value={heirs.length}
            sub="Succession protocol active"
            icon={KeyRound} colorClass="text-trust-500" delay={0.2}
          />
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left 2/3 */}
          <div className="lg:col-span-2 space-y-8">

            {/* Vault Hero Card */}
            <motion.div {...fadeUp(0.24)}>
              <Card 
                variant="default"
                className="overflow-hidden cursor-pointer group border-base"
                onClick={() => navigate('/assets')}
              >
                <div className="px-8 pt-8 pb-4 flex items-start justify-between relative z-10">
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-2">Encrypted Vault</p>
                    <h3 className="text-2xl font-display font-bold text-primary tracking-tight">Succession Vault Infrastructure</h3>
                    <p className="text-sm text-secondary mt-2 font-medium">
                      Total Protected Assets:{' '}
                      <span className="text-primary font-digits font-bold">${totalValue.toLocaleString()}</span>
                    </p>
                  </div>
                  <div className="flex gap-2 relative z-10">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={e => { e.stopPropagation(); navigate('/assets'); }}
                      className="h-9"
                    >
                      View All
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={e => { e.stopPropagation(); navigate('/assets'); }}
                      className="h-9"
                    >
                      <Plus size={16} className="mr-1" /> Add Asset
                    </Button>
                  </div>
                </div>

                {/* 3D Vault */}
                <div
                  className="mx-6 mb-6 rounded-2xl h-72 sm:h-80 overflow-hidden relative border border-base bg-page"
                >
                  <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }}>
                    <VaultScene score={user.score} />
                  </Canvas>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                    <span
                      className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-secondary bg-surface/80 border border-base backdrop-blur-md"
                    >
                      Interactive Zero-Knowledge Visualisation
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Projections + Notarization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div {...fadeUp(0.28)}><FutureProjectionCard /></motion.div>
              <motion.div {...fadeUp(0.32)}><VaultNotarizationCard /></motion.div>
            </div>
          </div>

          {/* Right 1/3 */}
          <div className="space-y-8">
            <motion.div {...fadeUp(0.24)}><ProofOfLifeCard /></motion.div>
            <motion.div {...fadeUp(0.28)}><DeathSimulator /></motion.div>

            {/* Asset distribution */}
            <motion.div {...fadeUp(0.32)}>
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Asset Allocation</span>
                </div>
                <AssetDonutChart />
              </Card>
            </motion.div>

            {/* Activity feed */}
            <motion.div {...fadeUp(0.36)}>
              <Card variant="default" className="overflow-hidden p-0">
                <div className="flex items-center justify-between px-6 py-5 border-b border-base">
                  <span className="text-[14px] font-bold text-primary">Audit Logs</span>
                  <button
                    onClick={() => navigate('/assets')}
                    className="text-[12px] text-brand-primary font-bold hover:text-brand-primary/80 flex items-center gap-1 transition-colors"
                  >
                    All Logs <ChevronRight size={14} />
                  </button>
                </div>
                <div className="p-2">
                   <ActivityFeed />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <motion.div {...fadeUp(0.4)}>
          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted/60">Succession Quick Actions</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            <QuickCard to="/assets"     icon={Wallet}   label="Secure Asset"     colorClass="text-brand-primary" />
            <QuickCard to="/guardians"  icon={Users}    label="Add Guardian"    colorClass="text-brand-gold" />
            <QuickCard to="/heirs"      icon={KeyRound} label="Assign Heir"      colorClass="text-trust-500" />
            <QuickCard to="/ai-planner" icon={Bot}      label="AI Succession"    colorClass="text-brand-primary" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
