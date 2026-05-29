import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Shield, Users, KeyRound, Wallet, CheckCircle2, Sparkles, Globe, Fingerprint, Lock, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import ReactConfetti from 'react-confetti';
import { useStore } from '../store/useStore';

const steps = [
  { label: 'Initialization', icon: Shield },
  { label: 'Jurisdiction', icon: Globe },
  { label: 'Assets', icon: Wallet },
  { label: 'Guardians', icon: Users },
  { label: 'Heirs', icon: KeyRound },
  { label: 'Secure', icon: CheckCircle2 },
];

const jurisdictions = [
  { value: 'global', label: 'Global (International Standards)' },
  { value: 'india', label: 'India (IT Act & Digital Succession)' },
  { value: 'usa', label: 'United States (Federal & IRS Compliance)' },
  { value: 'uk', label: 'United Kingdom (HMRC Digital Estate)' },
  { value: 'uae', label: 'UAE (VARA & DIFC Regulations)' },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [isInitializing, setIsInitializing] = useState(false);
  const navigate = useNavigate();
  const { addAsset, addGuardian, addHeir, setJurisdiction } = useStore();

  const [jurisdiction, setLocalJurisdiction] = useState('global');
  const [assetName, setAssetName] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [heirName, setHeirName] = useState('');
  const [heirEmail, setHeirEmail] = useState('');

  const nextStep = () => {
    if (step === 1) {
      setIsInitializing(true);
      setTimeout(() => {
        setIsInitializing(false);
        setStep(2);
      }, 3000);
      return;
    }
    if (step === 2) {
      setJurisdiction(jurisdiction);
    }
    if (step === 3 && assetName) {
      addAsset({ name: assetName, type: 'Crypto', value: 0, status: 'Protected', date: new Date().toISOString().split('T')[0] });
    }
    if (step === 4 && guardianEmail) {
      addGuardian({ name: 'Guardian', email: guardianEmail });
    }
    if (step === 5 && heirName && heirEmail) {
      addHeir({ name: heirName, email: heirEmail, relation: 'Family' });
    }
    setStep(s => s + 1);
  };

  const skipStep = () => setStep(s => s + 1);
  const finish = () => navigate('/dashboard');

  return (
    <div className="min-h-screen bg-page text-primary flex flex-col pt-16 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-aurora opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />

      {/* Progress bar */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex space-x-2">
          {steps.map((s, i) => {
            const idx = i + 1;
            const isCompleted = idx < step;
            const isActive = idx === step;
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${
                  isCompleted ? 'bg-brand-primary border-brand-primary text-inverse' :
                  isActive    ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' :
                                'bg-surface/30 border-base text-muted'
                }`}>
                  {isCompleted ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px transition-all duration-500 ${isCompleted ? 'bg-brand-primary' : 'bg-base'}`} />
                )}
              </div>
            );
          })}
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Step content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">

          {/* ── Initialization Overlay ── */}
          {isInitializing && (
            <motion.div
              key="initializing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-page/90 backdrop-blur-xl"
            >
              <div className="relative w-32 h-32 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-brand-primary/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-2 border-brand-gold/20 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Fingerprint size={48} className="text-brand-primary animate-pulse" />
                </div>
                {/* Scanning line */}
                <motion.div
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-brand-primary/50 shadow-[0_0_15px_rgba(79,92,255,0.5)] z-10"
                />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary mb-2">Generating Secure Environment</p>
                <div className="flex gap-1 justify-center">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-brand-primary"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 1: Welcome ── */}
          {step === 1 && !isInitializing && (
            <motion.div
              key="1"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md text-center"
            >
              <div className="w-20 h-20 rounded-[28px] bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(79,92,255,0.15)]">
                <Shield size={36} className="text-brand-primary" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse shadow-[0_0_8px_rgba(79,92,255,0.8)]" />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary">Succession Initialization</p>
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-primary tracking-tight leading-[0.95] mb-4">
                Welcome to <span className="italic text-brand-primary">Transfer Legacy</span>
              </h1>
              <p className="text-secondary text-base mb-10 font-medium leading-relaxed max-w-sm mx-auto">
                Secure your entire digital estate in under 5 minutes. Institutional-grade protection, zero knowledge.
              </p>
              <Button variant="primary" size="lg" onClick={nextStep} fullWidth className="h-14 text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-brand-primary/20">
                Begin Protocol <ArrowRight className="ml-2 inline" size={18} />
              </Button>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-brand-primary" /> AES-256 Encrypted</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-brand-primary" /> Zero Knowledge</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-brand-primary" /> SOC2 Compliant</span>
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Jurisdiction ── */}
          {step === 2 && (
            <motion.div
              key="2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
            >
              <div className="p-8 bg-surface/40 border border-base/60 rounded-[32px] backdrop-blur-md shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                  <Globe size={26} className="text-brand-primary" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-2">Step 2 of 5</p>
                <h2 className="text-3xl font-display font-bold text-primary tracking-tight mb-2">Compliance Hub</h2>
                <p className="text-muted text-sm font-medium mb-8">We customize your vault protocols based on your regional inheritance laws and tax regulations.</p>
                
                <Select
                  label="Select Primary Jurisdiction"
                  options={jurisdictions}
                  value={jurisdiction}
                  onChange={e => setLocalJurisdiction(e.target.value)}
                />

                <div className="mt-6 p-4 bg-brand-primary/5 rounded-xl border border-brand-primary/10">
                  <p className="text-[11px] text-secondary font-medium leading-relaxed">
                    <span className="text-brand-primary font-bold">Note:</span> This ensures your digital assets are handled according to <span className="uppercase">{jurisdiction}</span> legal frameworks.
                  </p>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <Button variant="ghost" onClick={skipStep} className="text-[10px] font-bold uppercase tracking-widest text-muted">Skip</Button>
                  <div className="flex space-x-3">
                    <Button variant="secondary" onClick={() => setStep(s => s - 1)} className="h-12 px-5"><ArrowLeft size={16} /></Button>
                    <Button onClick={nextStep} className="h-12 px-8 text-[10px] font-bold uppercase tracking-widest">
                      Continue <ArrowRight size={16} className="ml-2 inline" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: First Asset ── */}
          {step === 3 && (
            <motion.div
              key="3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
            >
              <div className="p-8 bg-surface/40 border border-base/60 rounded-[32px] backdrop-blur-md shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                  <Wallet size={26} className="text-orange-400" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-2">Step 3 of 5</p>
                <h2 className="text-3xl font-display font-bold text-primary tracking-tight mb-2">First Asset</h2>
                <p className="text-muted text-sm font-medium mb-8">What's the most critical digital asset you want to protect in your vault?</p>
                <Input
                  label="Asset Designation"
                  placeholder="e.g. Ledger Cold Storage"
                  value={assetName}
                  onChange={e => setAssetName(e.target.value)}
                />
                <div className="flex justify-between items-center mt-8">
                  <Button variant="ghost" onClick={skipStep} className="text-[10px] font-bold uppercase tracking-widest text-muted">Skip</Button>
                  <div className="flex space-x-3">
                    <Button variant="secondary" onClick={() => setStep(s => s - 1)} className="h-12 px-5"><ArrowLeft size={16} /></Button>
                    <Button onClick={nextStep} disabled={!assetName} className="h-12 px-8 text-[10px] font-bold uppercase tracking-widest">
                      Continue <ArrowRight size={16} className="ml-2 inline" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 4: Guardian ── */}
          {step === 4 && (
            <motion.div
              key="4"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
            >
              <div className="p-8 bg-surface/40 border border-base/60 rounded-[32px] backdrop-blur-md shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-6">
                  <Users size={26} className="text-brand-gold" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-2">Step 4 of 5</p>
                <h2 className="text-3xl font-display font-bold text-primary tracking-tight mb-2">Assign a Guardian</h2>
                <p className="text-muted text-sm font-medium mb-8">Guardians verify succession events. They never see your encrypted data — only approve the release.</p>
                <Input
                  label="Guardian Email"
                  placeholder="guardian@institution.com"
                  type="email"
                  value={guardianEmail}
                  onChange={e => setGuardianEmail(e.target.value)}
                />
                <div className="flex justify-between items-center mt-8">
                  <Button variant="ghost" onClick={skipStep} className="text-[10px] font-bold uppercase tracking-widest text-muted">Skip</Button>
                  <div className="flex space-x-3">
                    <Button variant="secondary" onClick={() => setStep(s => s - 1)} className="h-12 px-5"><ArrowLeft size={16} /></Button>
                    <Button onClick={nextStep} disabled={!guardianEmail} className="h-12 px-8 text-[10px] font-bold uppercase tracking-widest">
                      Continue <ArrowRight size={16} className="ml-2 inline" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 5: Heir ── */}
          {step === 5 && (
            <motion.div
              key="5"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
            >
              <div className="p-8 bg-surface/40 border border-base/60 rounded-[32px] backdrop-blur-md shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-trust-500/10 border border-trust-500/20 flex items-center justify-center mb-6">
                  <KeyRound size={26} className="text-trust-500" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-2">Step 5 of 5</p>
                <h2 className="text-3xl font-display font-bold text-primary tracking-tight mb-2">Register an Heir</h2>
                <p className="text-muted text-sm font-medium mb-8">Who receives your digital estate when succession triggers? Institutional protocol requires one valid heir.</p>
                <div className="space-y-4">
                  <Input label="Heir Full Name" placeholder="e.g. Emily Asha" value={heirName} onChange={e => setHeirName(e.target.value)} />
                  <Input label="Heir Email" placeholder="heir@email.com" type="email" value={heirEmail} onChange={e => setHeirEmail(e.target.value)} />
                </div>
                <div className="flex justify-between items-center mt-8">
                  <Button variant="ghost" onClick={skipStep} className="text-[10px] font-bold uppercase tracking-widest text-muted">Skip</Button>
                  <div className="flex space-x-3">
                    <Button variant="secondary" onClick={() => setStep(s => s - 1)} className="h-12 px-5"><ArrowLeft size={16} /></Button>
                    <Button onClick={nextStep} disabled={!heirName || !heirEmail} className="h-12 px-8 text-[10px] font-bold uppercase tracking-widest">
                      Finalize <ArrowRight size={16} className="ml-2 inline" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 6: Complete ── */}
          {step === 6 && (
            <motion.div
              key="6"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md text-center"
            >
              <ReactConfetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={300} colors={['#4F5CFF', '#D4AF37', '#10B981', '#F97316']} />

              <div className="w-20 h-20 rounded-[28px] bg-trust-500/10 border border-trust-500/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                <ShieldCheck size={36} className="text-trust-500" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-trust-500 mb-4">Vault Initialized</p>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-primary tracking-tight leading-[0.95] mb-3">
                Your Legacy is <span className="italic text-trust-500">Secured</span>
              </h2>
              <p className="text-secondary text-base mb-10 font-medium max-w-sm mx-auto">Your digital succession vault is live under <span className="uppercase text-brand-primary">{jurisdiction}</span> law.</p>

              {/* Score gauge */}
              <div className="flex justify-center mb-10">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="transform -rotate-90 w-full h-full">
                    <circle cx="88" cy="88" r="76" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="transparent" />
                    <motion.circle
                      cx="88" cy="88" r="76"
                      stroke="#D4AF37"
                      strokeWidth="10"
                      fill="transparent"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 76}
                      initial={{ strokeDashoffset: 2 * Math.PI * 76 }}
                      animate={{ strokeDashoffset: (2 * Math.PI * 76) * (1 - 0.75) }}
                      transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
                      style={{ filter: 'drop-shadow(0 0 14px rgba(212,175,55,0.6))' }}
                    />
                  </svg>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute flex flex-col items-center"
                  >
                    <span className="text-5xl font-bold tabular-nums text-primary leading-none">75</span>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">/ 100</span>
                  </motion.div>
                </div>
              </div>

              <Button variant="primary" size="lg" onClick={finish} fullWidth className="h-14 text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-brand-primary/20">
                Enter Your Vault <ArrowRight className="ml-2 inline" size={18} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
