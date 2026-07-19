import { motion } from 'framer-motion';
import { 
  CheckCircle2, AlertCircle, Shield, Lock, 
  Users, Key, FileText, ChevronRight, Info, EyeOff, ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
});

export default function SecurityCenter() {
  const { assets, guardians } = useStore();
  const navigate = useNavigate();

  const instructionsCount = assets.filter(a => a.instructions && a.instructions.trim().length > 0).length;

  const checks = [
    { 
      good: true, 
      title: 'Vault Cryptographic Encryption', 
      sub: 'AES-256 local client-side encryption. We never see your plaintext data or key.', 
      badge: 'Protected',
      category: 'Cryptography',
      icon: Lock,
      actionText: 'View Details',
      onAction: () => navigate('/settings')
    },
    { 
      good: guardians.length >= 2, 
      title: 'Guardian Quorum Threshold', 
      sub: guardians.length >= 2 
        ? `Sufficient coverage. Quorum of guardians (${guardians.length}) holds key fragments.` 
        : `Vulnerable coverage. You have ${guardians.length} of 2 minimum required guardians to prevent single-point of failure access.`, 
      badge: guardians.length >= 2 ? 'Threshold Met' : 'Action Required',
      category: 'Decentralized Trust',
      icon: Users,
      actionText: guardians.length >= 2 ? 'Manage Network' : 'Add Guardian',
      onAction: () => navigate('/guardians')
    },
    { 
      good: true, 
      title: "Dead Man's Switch Liveness Detection", 
      sub: 'Status Active — heartbeats configured on a rolling 30-day verification period.', 
      badge: 'Active Switch',
      category: 'Inactivity Monitoring',
      icon: Shield,
      actionText: 'Check-In Settings',
      onAction: () => navigate('/check-in')
    },
    { 
      good: instructionsCount > 0, 
      title: 'Family Letters of Instruction', 
      sub: instructionsCount > 0 
        ? `${instructionsCount} written instruction sets will be unlocked for your heirs.` 
        : 'Zero instructions written. Your heirs will receive encrypted assets without guides.', 
      badge: instructionsCount > 0 ? `${instructionsCount} Setup` : 'Needs Guide',
      category: 'Plain Language Instructions',
      icon: FileText,
      actionText: instructionsCount > 0 ? 'Edit Instructions' : 'Create Guide',
      onAction: () => navigate('/trust')
    },
    { 
      good: true, 
      title: 'Two-Factor Authentication', 
      sub: 'Required for credentials vault alterations or password rotations.', 
      badge: 'Enforced',
      category: 'Authentication Security',
      icon: Key,
      actionText: 'Manage 2FA',
      onAction: () => navigate('/settings')
    },
    { 
      good: false, 
      title: 'Emergency Fallback Contact', 
      sub: 'Setup a secondary legacy emergency contact in case your guardians become unreachable.', 
      badge: 'Not Set',
      category: 'Emergency Protocol',
      icon: AlertCircle,
      actionText: 'Configure',
      onAction: () => navigate('/settings')
    },
    { 
      good: true, 
      title: 'Last System Security Audit', 
      sub: 'Completed automated ZK architecture check and verification of key shard generation.', 
      badge: 'Passed',
      category: 'System Health',
      icon: ShieldCheck,
      actionText: 'Verify Logs',
      onAction: () => navigate('/developer')
    },
  ];

  const passCount = checks.filter(c => c.good).length;
  const scorePercent = Math.round((passCount / checks.length) * 100);

  return (
    <div className="min-h-screen bg-page text-primary pt-6 pb-20">
      <main className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        
        {/* ── Page Header ── */}
        <motion.header {...fadeUp(0)} className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-base/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                System Security Panel
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary tracking-tight">
              Vault <span className="italic text-brand-primary">Security Center</span>
            </h1>
            <p className="text-muted text-xs mt-2 font-medium">
              An institutional overview of your cryptographic health, guardian trust, and legacy fail-safes.
            </p>
          </div>
          
          <div className="flex items-center gap-4 shrink-0 bg-surface/30 p-4 rounded-2xl border border-base/60">
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Circular progress track */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-base/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-brand-primary"
                  strokeWidth="3.5"
                  strokeDasharray={`${scorePercent}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute font-display text-[15px] font-bold text-primary">{passCount}/7</div>
            </div>
            <div>
              <p className="text-[9px] font-bold text-muted uppercase tracking-widest">Readiness Score</p>
              <h3 className="text-lg font-bold text-primary">{scorePercent}% Protected</h3>
            </div>
          </div>
        </motion.header>

        {/* ── Callout Box ── */}
        {scorePercent < 100 && (
          <motion.div {...fadeUp(0.05)} className="p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex gap-3 text-left">
            <Info size={18} className="text-brand-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] text-brand-gold font-bold uppercase tracking-wider">Security Gaps Detected</p>
              <p className="text-xs text-muted mt-1 leading-normal">
                Your vault is not fully secured. To increase security, address items that show an <strong>Action Required</strong> or <strong>Not Set</strong> status below (like inviting 2 or more guardians).
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Security Audits List ── */}
        <div className="space-y-4">
          {checks.map((check, idx) => {
            const CheckIcon = check.icon;
            return (
              <motion.div key={idx} {...fadeUp(0.1 + idx * 0.05)}>
                <Card className="p-6 bg-surface/40 hover:bg-surface border-base/60 transition-all duration-300 relative group flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Active gold overlay border */}
                  {!check.good && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3.5px] h-[36px] rounded-full bg-brand-gold" />
                  )}
                  
                  <div className="flex items-start gap-4 flex-grow">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                      check.good 
                        ? 'bg-brand-primary-dim text-brand-primary border-brand-primary/20' 
                        : 'bg-brand-gold/10 text-brand-gold border-brand-gold/25'
                    }`}>
                      <CheckIcon size={18} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[9px] font-bold text-muted uppercase tracking-widest font-mono">{check.category}</span>
                        <Badge variant={check.good ? 'success' : 'warning'} className="text-[8px] font-bold px-1.5 py-0">
                          {check.badge}
                        </Badge>
                      </div>
                      <h4 className="text-[15px] font-semibold text-primary tracking-tight mt-1.5">{check.title}</h4>
                      <p className="text-muted text-xs leading-normal mt-1 max-w-2xl">{check.sub}</p>
                    </div>
                  </div>

                  <button 
                    onClick={check.onAction}
                    className="shrink-0 h-9 px-4 rounded-lg bg-base border border-base hover:border-brand-primary/30 text-secondary hover:text-primary text-[12px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start md:self-center"
                  >
                    {check.actionText} <ChevronRight size={14} />
                  </button>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </main>
    </div>
  );
}
