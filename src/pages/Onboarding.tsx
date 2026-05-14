import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Shield, Users, KeyRound, Wallet, CheckCircle2, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ReactConfetti from 'react-confetti';
import { useStore } from '../store/useStore';

const steps = [
  { label: 'Welcome', icon: Shield },
  { label: 'Asset', icon: Wallet },
  { label: 'Guardian', icon: Users },
  { label: 'Heir', icon: KeyRound },
  { label: 'Done', icon: CheckCircle2 },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { addAsset, addGuardian, addHeir } = useStore();

  const [assetName, setAssetName] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [heirName, setHeirName] = useState('');
  const [heirEmail, setHeirEmail] = useState('');

  const nextStep = () => {
    if (step === 2 && assetName) {
      addAsset({ name: assetName, type: 'Crypto', value: 0, status: 'Protected', date: new Date().toISOString().split('T')[0] });
    }
    if (step === 3 && guardianEmail) {
      addGuardian({ name: 'Guardian', email: guardianEmail });
    }
    if (step === 4 && heirName && heirEmail) {
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
                  isCompleted ? 'bg-brand-primary border-brand-primary text-obsidian-950' :
                  isActive    ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' :
                                'bg-surface/30 border-base text-obsidian-700'
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

          {/* ── Step 1: Welcome ── */}
          {step === 1 && (
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
                Let's secure your entire digital estate in under 5 minutes. Institutional-grade protection, zero knowledge.
              </p>
              <Button variant="primary" size="lg" onClick={nextStep} fullWidth className="h-14 text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-brand-primary/20">
                Begin Protocol <ArrowRight className="ml-2 inline" size={18} />
              </Button>
              <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-obsidian-700">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-brand-primary" /> AES-256 Encrypted</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-brand-primary" /> Zero Knowledge</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-brand-primary" /> 5 Minutes</span>
              </div>
            </motion.div>
          )}

          {/* ── Step 2: First Asset ── */}
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
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                  <Wallet size={26} className="text-orange-400" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-2">Step 2 of 4</p>
                <h2 className="text-3xl font-display font-bold text-primary tracking-tight mb-2">First Asset</h2>
                <p className="text-muted text-sm font-medium mb-8">What's the most critical digital asset you want to protect in your vault?</p>
                <Input
                  label="Asset Designation"
                  placeholder="e.g. Main Crypto Wallet"
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

          {/* ── Step 3: Guardian ── */}
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
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-6">
                  <Users size={26} className="text-brand-gold" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-2">Step 3 of 4</p>
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

          {/* ── Step 4: Heir ── */}
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
                <div className="w-14 h-14 rounded-2xl bg-trust-500/10 border border-trust-500/20 flex items-center justify-center mb-6">
                  <KeyRound size={26} className="text-trust-500" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-2">Step 4 of 4</p>
                <h2 className="text-3xl font-display font-bold text-primary tracking-tight mb-2">Register an Heir</h2>
                <p className="text-muted text-sm font-medium mb-8">Who receives your digital estate when succession triggers? You can add more after setup.</p>
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

          {/* ── Step 5: Complete ── */}
          {step === 5 && (
            <motion.div
              key="5"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md text-center"
            >
              <ReactConfetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={300} colors={['#4F5CFF', '#D4AF37', '#10B981', '#F97316']} />

              <div className="w-20 h-20 rounded-[28px] bg-trust-500/10 border border-trust-500/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                <Sparkles size={36} className="text-trust-500" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-trust-500 mb-4">Vault Initialized</p>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-primary tracking-tight leading-[0.95] mb-3">
                Your Legacy is <span className="italic text-trust-500">Secured</span>
              </h2>
              <p className="text-secondary text-base mb-10 font-medium max-w-sm mx-auto">Your digital succession vault is live. Here is your initial Legacy Score.</p>

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
                      animate={{ strokeDashoffset: (2 * Math.PI * 76) * (1 - 0.65) }}
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
                    <span className="text-5xl font-bold tabular-nums text-primary leading-none">65</span>
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
