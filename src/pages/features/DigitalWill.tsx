import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import SimulationCard from '../../components/ui/SimulationCard';
import { SEO } from '../../components/seo/SEO';

interface Asset {
  id: string;
  type: string;
  value: string;
  heir: string;
}

export default function DigitalWill() {
  const [step, setStep] = useState(1);
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', type: 'Bitcoin Wallet', value: '1.2 BTC', heir: 'Wife' }
  ]);

  const addAsset = () => {
    setAssets([...assets, { id: Date.now().toString(), type: '', value: '', heir: '' }]);
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  return (
    <div className="bg-page min-h-screen text-text">
      <SEO 
        title="Institutional Digital Wills | Transfer Legacy"
        description="Create a legally-binding, cryptographically-enforced digital will for your crypto assets, seed phrases, and private documents."
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-bold tracking-tight mb-8"
          >
            <ShieldCheck size={16} />
            LEGAL TECH 2.0
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
            YOUR WILL,<br />
            <span className="gradient-text-premium">REINVENTED.</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-12">
            Traditional wills fail for digital assets. Transfer Legacy provides the technical enforcement layer your estate plan is missing.
          </p>
        </div>
      </section>

      {/* Draftsman Simulation */}
      <section className="py-20 px-6 lg:px-8 max-w-5xl mx-auto">
        <SimulationCard
          title="Digital Will Draftsman"
          description="Simulate how your digital assets are mapped to your heirs with cryptographic release conditions."
          icon={<FileText />}
        >
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s}
                    className={cn(
                      "w-12 h-1.5 rounded-full transition-all duration-500",
                      step >= s ? "bg-brand-primary" : "bg-base"
                    )}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                Step {step} of 3
              </span>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold">Map Your Digital Assets</h4>
                    <Button variant="secondary" size="sm" onClick={addAsset} className="h-8 text-[11px] font-bold">
                      <Plus size={14} className="mr-1" /> ADD ASSET
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {assets.map((asset) => (
                      <div key={asset.id} className="flex gap-3 items-center p-4 bg-raised border border-base rounded-xl">
                        <div className="flex-1">
                          <input 
                            placeholder="Asset (e.g. Ledger PIN)" 
                            className="bg-transparent border-none text-sm font-bold w-full focus:outline-none"
                            defaultValue={asset.type}
                          />
                        </div>
                        <div className="flex-1">
                          <input 
                            placeholder="Assign Heir" 
                            className="bg-transparent border-none text-sm text-muted w-full focus:outline-none"
                            defaultValue={asset.heir}
                          />
                        </div>
                        <button onClick={() => removeAsset(asset.id)} className="text-muted hover:text-error transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h4 className="text-lg font-bold text-center">Set Release Protocol</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary mb-4">
                        <Users size={20} />
                      </div>
                      <h5 className="font-bold mb-2">Guardian Threshold</h5>
                      <p className="text-xs text-muted">2 out of 3 Guardians must verify death to release vault.</p>
                      <div className="mt-4 text-brand-primary font-black text-xl italic">2/3 SELECTION</div>
                    </div>
                    <div className="p-6 rounded-2xl border border-base bg-surface flex flex-col items-center text-center opacity-50 grayscale cursor-not-allowed">
                      <div className="w-10 h-10 rounded-full bg-base flex items-center justify-center text-muted mb-4">
                        <Lock size={20} />
                      </div>
                      <h5 className="font-bold mb-2">Inactivity Timer</h5>
                      <p className="text-xs text-muted">Auto-release after 90 days of check-in silence.</p>
                      <div className="mt-4 text-muted font-bold text-[10px]">PREMIUM ONLY</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-2xl font-black mb-2 italic tracking-tight">ENCRYPTION COMPLETE</h4>
                  <p className="text-sm text-muted max-w-xs mx-auto mb-8">
                    Your digital will is now cryptographically bound to your designated heirs.
                  </p>
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3 text-left">
                    <AlertCircle size={20} className="text-emerald-500 shrink-0" />
                    <p className="text-[11px] text-emerald-500/80 font-bold leading-tight uppercase tracking-wider">
                      Zero-Knowledge Protection active. Even Transfer Legacy cannot access your will content.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-4 border-t border-base flex justify-between items-center">
              {step > 1 ? (
                <Button variant="secondary" onClick={() => setStep(s => s - 1)}>
                  BACK
                </Button>
              ) : <div />}
              
              {step < 3 ? (
                <Button onClick={() => setStep(s => s + 1)} className="group">
                  CONTINUE <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <Button onClick={() => setStep(1)} className="glow-emerald">
                  RESTART SIMULATION
                </Button>
              )}
            </div>
          </div>
        </SimulationCard>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Lock, title: 'ZK-Enforcement', desc: 'Private keys are never stored in plain text. Locally encrypted.' },
            { icon: Users, title: 'Multi-Guardian', desc: 'No single point of failure. Distributed trust model.' },
            { icon: FileText, title: 'Legal-Ready', desc: 'Generates attorney-approved letters of instruction automatically.' }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl border border-base bg-surface/30">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6">
                <feature.icon size={20} />
              </div>
              <h4 className="text-xl font-bold mb-3 italic">{feature.title}</h4>
              <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
