import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ReactConfetti from 'react-confetti';
import { useStore } from '../store/useStore';

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

  const skipStep = () => {
    setStep(s => s + 1);
  };

  const finish = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col pt-16">
      <div className="w-full max-w-2xl mx-auto px-4 py-8 flex items-center justify-between">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`w-12 h-1.5 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-surface border border-border'}`} />
          ))}
        </div>
        <button onClick={() => navigate('/')} className="text-muted hover:text-text text-sm">Cancel</button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-md text-center">
              <h1 className="text-4xl font-bold text-text mb-4">Welcome to LinkKey</h1>
              <p className="text-xl text-muted mb-8">Let's protect your digital legacy in 5 minutes.</p>
              <Button size="lg" onClick={nextStep} fullWidth className="py-4 text-lg">
                Let's Go <ArrowRight className="ml-2 inline" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-md">
              <h2 className="text-3xl font-bold text-text mb-4 text-center">Add Your First Asset</h2>
              <p className="text-muted mb-8 text-center">What's the most important digital asset you want to protect?</p>
              
              <div className="space-y-4 mb-8">
                <Input 
                  label="Asset Name" 
                  placeholder="e.g. Main Crypto Wallet" 
                  value={assetName}
                  onChange={e => setAssetName(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={skipStep} className="text-muted">Skip</Button>
                <div className="flex space-x-2">
                  <Button variant="secondary" onClick={() => setStep(s => s - 1)}><ArrowLeft size={18}/></Button>
                  <Button onClick={nextStep} disabled={!assetName}>Continue <ArrowRight size={18} className="ml-2"/></Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-md">
              <h2 className="text-3xl font-bold text-text mb-4 text-center">Invite a Guardian</h2>
              <p className="text-muted mb-8 text-center">They'll help your family recover your assets securely.</p>
              
              <div className="space-y-4 mb-8 text-left">
                <Input 
                  label="Guardian Email" 
                  placeholder="guardian@email.com" 
                  type="email"
                  value={guardianEmail}
                  onChange={e => setGuardianEmail(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={skipStep} className="text-muted">Skip</Button>
                <div className="flex space-x-2">
                  <Button variant="secondary" onClick={() => setStep(s => s - 1)}><ArrowLeft size={18}/></Button>
                  <Button onClick={nextStep} disabled={!guardianEmail}>Continue <ArrowRight size={18} className="ml-2"/></Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-md">
              <h2 className="text-3xl font-bold text-text mb-4 text-center">Add an Heir</h2>
              <p className="text-muted mb-8 text-center">Who should receive your assets if something happens?</p>
              
              <div className="space-y-4 mb-8 text-left">
                <Input 
                  label="Heir Name" 
                  placeholder="e.g. Emily Asha" 
                  value={heirName}
                  onChange={e => setHeirName(e.target.value)}
                />
                <Input 
                  label="Heir Email" 
                  placeholder="emily@email.com" 
                  type="email"
                  value={heirEmail}
                  onChange={e => setHeirEmail(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={skipStep} className="text-muted">Skip</Button>
                <div className="flex space-x-2">
                  <Button variant="secondary" onClick={() => setStep(s => s - 1)}><ArrowLeft size={18}/></Button>
                  <Button onClick={nextStep} disabled={!heirName || !heirEmail}>Continue <ArrowRight size={18} className="ml-2"/></Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
              <ReactConfetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={300} />
              
              <h2 className="text-4xl font-bold text-text mb-2">🎉 Your Vault is Live!</h2>
              <p className="text-xl text-muted mb-12">Here is your starting Legacy Score.</p>
              
              <div className="flex justify-center mb-12">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="transform -rotate-90 w-full h-full">
                    <circle cx="96" cy="96" r="80" stroke="#111827" strokeWidth="12" fill="transparent" />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#F59E0B"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 80}
                      initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                      animate={{ strokeDashoffset: (2 * Math.PI * 80) * (1 - 0.65) }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                      style={{ filter: `drop-shadow(0 0 12px rgba(245, 158, 11, 0.5))` }}
                    />
                  </svg>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute flex flex-col items-center">
                    <span className="text-5xl font-bold text-text">65</span>
                    <span className="text-sm text-muted uppercase tracking-wider mt-1">/ 100</span>
                  </motion.div>
                </div>
              </div>

              <Button size="lg" onClick={finish} fullWidth className="py-4 text-lg">
                Go to Dashboard <ArrowRight className="ml-2 inline" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
