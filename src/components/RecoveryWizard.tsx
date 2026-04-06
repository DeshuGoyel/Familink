import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Shield, Download, ArrowRight, ArrowLeft, Users } from 'lucide-react';
import Button from './ui/Button';
import ProgressBar from './ui/ProgressBar';
import ReactConfetti from 'react-confetti';
import { Canvas } from '@react-three/fiber';
import RisingKey from './3d/RisingKey';

import { useStore } from '../store/useStore';

interface Props {
  heirName: string;
  onClose: () => void;
}

export default function RecoveryWizard({ heirName, onClose }: Props) {
  const { guardians } = useStore();
  const displayGuardians = guardians.length >= 3 
    ? guardians.slice(0, 3).map(g => g.name) 
    : ['Sarah Chen', 'Michael Rodriguez', 'David Kim'];
  const [step, setStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const totalSteps = 4;

  const handleNext = () => {
    if (step === 2) {
      setIsSimulating(true);
      setTimeout(() => {
        setIsSimulating(false);
        setStep(3);
      }, 3000);
    } else if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-secondary/95 backdrop-blur-3xl overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-12 min-h-screen flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-text">Recovery Simulation: {heirName}</h2>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </div>

        <div className="mb-12">
          <div className="flex justify-between text-sm text-muted mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <ProgressBar value={step * 25} max={100} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-md text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-6 glow-blue">
                  <Shield size={32} />
                </div>
                <h3 className="text-3xl font-bold text-text mb-4">Verify Identity</h3>
                <p className="text-muted mb-8">Please upload a government-issued ID and a short video selfie to verify your identity before initiating recovery.</p>
                <div className="border border-dashed border-border rounded-xl p-8 mb-8 bg-surface/50">
                  <p className="text-sm text-muted">Drag & drop files here, or click to select</p>
                  <Button variant="secondary" className="mt-4">Upload Documents</Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-md text-center">
                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500 mx-auto mb-6">
                  <Users size={32} />
                </div>
                <h3 className="text-3xl font-bold text-text mb-4">Guardian Approval</h3>
                <p className="text-muted mb-8">LinkKey requires 2 out of 3 assigned guardians to approve this recovery request.</p>
                
                <div className="space-y-4 mb-8">
                  {displayGuardians.map((g, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border">
                      <span className="text-text font-medium">{g}</span>
                      {isSimulating ? (
                        <div className="flex space-x-1">
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }} className="w-2 h-2 rounded-full bg-primary" />
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 + 0.2 }} className="w-2 h-2 rounded-full bg-primary" />
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 + 0.4 }} className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                      ) : (
                        <span className="text-muted text-sm">Awaiting Request</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full text-center">
                <h3 className="text-3xl font-bold text-text mb-4">Reconstructing Key</h3>
                <p className="text-muted mb-8">Cryptographic key fragments are being combined...</p>
                <div className="h-64 w-full">
                  <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <RisingKey />
                  </Canvas>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl text-center relative z-50">
                <div className="fixed inset-0 pointer-events-none z-[-1]">
                  <ReactConfetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} colors={['#4F5CFF', '#22C55E', '#EC4899', '#F59E0B']} />
                </div>
                <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent mx-auto mb-6 glow-green relative z-10">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-4xl font-bold text-text mb-4 relative z-10">Access Granted</h3>
                <p className="text-xl text-muted mb-8 relative z-10">The vault has been successfully decrypted.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8 relative z-10">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-4 bg-surface rounded-xl border border-border flex items-center justify-between hover:bg-surface/80 transition-colors cursor-pointer group">
                      <span className="text-text font-medium">Asset Package #{i}</span>
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 rounded-lg p-2 group-hover:bg-primary group-hover:text-white transition-all"><Download size={18} /></Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-between">
          <Button variant="secondary" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1 || step === 4 || isSimulating}>
            <ArrowLeft className="mr-2" size={18} /> Back
          </Button>
          <Button onClick={step === 4 ? onClose : handleNext} disabled={isSimulating} className="bg-primary hover:bg-primary/90 text-white">
            {isSimulating ? 'Simulating...' : step === 4 ? 'Finish Simulation' : step === 3 ? 'Decrypt Vault' : 'Next Step'}
            {step !== 4 && <ArrowRight className="ml-2" size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
}
