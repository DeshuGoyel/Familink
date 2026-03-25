import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, ShieldAlert, CheckCircle2, ChevronRight, X, HeartPulse } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Button from '../ui/Button';

export default function DeathSimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState(0);
  const { assets, guardians } = useStore();

  const confirmedGuardiansCount = guardians.filter(g => g.status === 'confirmed').length;
  const guardianThreshold = 2; // Assuming 2
  const thresholdMet = confirmedGuardiansCount >= guardianThreshold;

  const handleStart = () => {
    setIsOpen(true);
    setPhase(1);
  };

  const advancePhase = () => setPhase(prev => prev + 1);

  return (
    <>
      <Button 
        variant="primary"
        onClick={handleStart}
        className="w-full bg-red-950/40 hover:bg-red-900/60 border border-red-500/20 hover:border-red-500/50 text-red-100 group transition-all duration-500 flex flex-col items-center justify-center p-6 h-auto"
      >
        <div className="flex items-center gap-2 mb-2">
           <HeartPulse className="text-red-500 group-hover:scale-110 transition-transform" size={24} />
           <span className="font-serif text-lg">What if I die tonight?</span>
        </div>
        <span className="text-xs text-red-200/50 group-hover:text-red-200/80 transition-colors">See your family's recovery experience</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95">
            <div className="absolute inset-0 pointer-events-none">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.1)_0%,transparent_100%)]"></div>
            </div>

            <motion.div className="w-full max-w-4xl max-h-screen overflow-y-auto p-4 relative z-10 flex flex-col items-center text-center">
              
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                <X size={24} />
              </button>

              {/* Phase 1: OPENING */}
              {phase === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-6 pt-20"
                >
                  <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-3xl md:text-5xl font-serif text-white/90">
                    Tonight, at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}...
                  </motion.h2>
                  <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }} className="text-xl md:text-3xl font-serif text-red-200/80">
                    Your family would need to recover your legacy.
                  </motion.h3>
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="text-lg text-white/50">
                    Here's what would happen.
                  </motion.p>
                  
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }} className="pt-12">
                    <Button variant="primary" onClick={advancePhase} className="bg-red-700 hover:bg-red-600 text-white border-none px-8 py-3 text-lg">
                      Begin Simulation
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* Phase 2: ASSET RECOVERY */}
              {phase === 2 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl text-left bg-[#0f0f13] border border-white/10 rounded-2xl p-8">
                  <h3 className="text-2xl font-serif text-white mb-6 border-b border-white/10 pb-4">What your heirs can access</h3>
                  
                  <div className="space-y-4">
                    {assets.map((asset, i) => {
                       const isRecoverable = thresholdMet && asset.instructions;
                       const status = isRecoverable ? 'RECOVERABLE' : (thresholdMet ? 'PARTIALLY RECOVERABLE' : 'NOT RECOVERABLE');
                       const color = isRecoverable ? 'text-emerald-400' : (thresholdMet ? 'text-amber-400' : 'text-red-400');
                       const Icon = isRecoverable ? CheckCircle2 : (thresholdMet ? AlertTriangle : ShieldAlert);
                       
                       return (
                         <motion.div 
                           key={asset.id} 
                           initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
                           className={`p-4 rounded-xl bg-black/40 border border-white/5 flex gap-4 items-start`}
                         >
                            <Icon className={`shrink-0 mt-1 ${color}`} size={20} />
                            <div>
                               <p className="font-semibold text-white/90">{asset.name} <span className={`text-xs ml-2 px-2 py-0.5 rounded-full border border-current ${color}`}>{status}</span></p>
                               <p className="text-sm text-white/50 mt-1">
                                 {isRecoverable ? "Instructions present. Guardian threshold met." : 
                                  (!thresholdMet ? "No guardian threshold met. Recovery blocked." : "No heir instructions added.")}
                               </p>
                            </div>
                         </motion.div>
                       )
                    })}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                    <Button variant="secondary" onClick={advancePhase} className="text-white">Next: Guardians <ChevronRight size={16}/></Button>
                  </div>
                </motion.div>
              )}

              {/* Phase 3: GUARDIAN STATUS */}
              {phase === 3 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl text-left bg-[#0f0f13] border border-white/10 rounded-2xl p-8">
                  <h3 className="text-2xl font-serif text-white mb-6 border-b border-white/10 pb-4">Who would help your family?</h3>
                  
                  {!thresholdMet && (
                     <div className="mb-6 bg-red-950/50 border border-red-500/30 rounded-xl p-4 flex gap-3 text-red-200">
                        <AlertTriangle className="shrink-0 text-red-500" />
                        <p>Your recovery threshold requires {guardianThreshold} guardians. Only {confirmedGuardiansCount} is confirmed. <strong>Recovery would fail tonight.</strong></p>
                     </div>
                  )}

                  <div className="space-y-4">
                    {guardians.map((guardian, i) => (
                      <motion.div key={guardian.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} className="p-4 rounded-xl bg-black/40 border border-white/5 flex gap-4 items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${guardian.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                          {guardian.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                           <p className="font-medium text-white/90">{guardian.name} <span className="text-xs text-white/40 ml-2">({guardian.relationship})</span></p>
                           <p className="text-sm text-white/50">{guardian.status === 'confirmed' ? "Would be notified immediately." : "Not confirmed. Would NOT receive notification."}</p>
                        </div>
                        {guardian.status === 'confirmed' ? <CheckCircle2 className="text-emerald-400" size={18}/> : <Clock className="text-amber-400" size={18}/>}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                    <Button variant="secondary" onClick={advancePhase} className="text-white">Next: Action Plan <ChevronRight size={16}/></Button>
                  </div>
                </motion.div>
              )}

              {/* Phase 4: ACTION PLAN & CLOSING */}
              {phase === 4 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl bg-[#0f0f13] border border-white/10 rounded-2xl p-8">
                  <h3 className="text-3xl font-serif text-white mb-2">Fix these gaps now</h3>
                  <p className="text-white/50 mb-8">The best gift you can give your family is a clear path through uncertainty.</p>
                  
                  <div className="space-y-3 text-left bg-black/40 rounded-xl p-6 border border-white/5 mb-8">
                     {!thresholdMet && (
                       <div className="flex items-center justify-between">
                         <span className="flex items-center gap-2 text-red-300"><span className="w-2 h-2 rounded-full bg-red-500"></span> Confirm 1 more guardian</span>
                         <span className="text-xs text-white/30 border border-white/10 px-2 py-1 rounded">Takes 2 mins</span>
                       </div>
                     )}
                     <div className="flex items-center justify-between">
                       <span className="flex items-center gap-2 text-amber-300"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Add instructions to remaining assets</span>
                       <span className="text-xs text-white/30 border border-white/10 px-2 py-1 rounded">Takes 5 mins</span>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="primary" onClick={() => setIsOpen(false)} className="bg-white text-black hover:bg-gray-200 border-none font-bold px-8 py-3">
                      Start Fixing Now
                    </Button>
                    <Button variant="secondary" onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white border-white/20">
                      Remind Me Tomorrow
                    </Button>
                  </div>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
