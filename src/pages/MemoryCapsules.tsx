import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { FloatingCapsules } from '../components/capsules/FloatingCapsules';
import { useCapsuleStore, MemoryCapsule } from '../store/useCapsuleStore';
import { useStore } from '../store/useStore';
import Button from '../components/ui/Button';
import { Lock, Unlock, Heart, Mail, Mic, Video, Sparkles, X, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

export default function MemoryCapsules() {
  const { capsules, createCapsule, sealCapsule, deleteCapsule } = useCapsuleStore();
  const { heirs, assets } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [newCapsule, setNewCapsule] = useState<Partial<MemoryCapsule>>({
    type: 'letter',
    unlockCondition: 'on_recovery'
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const simulateAiGeneration = () => {
    setIsGenerating(true);
    let text = "Dear loved one, \n\nI am writing this to make sure you know how much you mean to me. I've left some things behind to help you in the future, but what matters most is the memories we shared. Please use this asset wisely and remember to take care of the family. \n\nWith all my love.";
    
    // Typing effect simulation
    let currentText = "";
    let i = 0;
    setNewCapsule({ ...newCapsule, content: "" });
    
    const interval = setInterval(() => {
      currentText += text.charAt(i);
      setNewCapsule(prev => ({ ...prev, content: currentText }));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 20); // 20ms per char
  };

  const handleCreate = () => {
    createCapsule(newCapsule as MemoryCapsule);
    setIsModalOpen(false);
    setStep(1);
    setNewCapsule({ type: 'letter', unlockCondition: 'on_recovery' });
  };

  const getIcon = (type: string) => {
    if (type === 'voice_note') return <Mic size={20} />;
    if (type === 'video_note') return <Video size={20} />;
    return <Mail size={20} />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            Memory Capsules
          </h1>
          <p className="text-muted mt-2">Leave a piece of yourself behind.</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 group"
        >
          <Heart size={18} className="text-red-400 group-hover:scale-110 transition-transform" />
          Create Capsule
        </Button>
      </header>

      {/* 3D Scene */}
      <div className="h-64 w-full rounded-2xl bg-gradient-to-b from-surface/50 to-surface border border-border/50 relative overflow-hidden flex items-center justify-center shadow-lg">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <FloatingCapsules capsules={capsules} />
        </Canvas>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
      </div>

      {/* Capsules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capsules.map((capsule) => {
          const heir = heirs.find(h => h.id === capsule.recipientHeirId);
          const asset = assets.find(a => a.id === capsule.assetId);

          return (
            <motion.div 
              key={capsule.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glassmorphism rounded-2xl p-6 relative border hover:border-primary/30 transition-colors"
              style={{ borderColor: capsule.isLocked ? 'rgba(245, 158, 11, 0.3)' : 'rgba(79, 92, 255, 0.2)' }}
            >
              <div className="absolute top-4 right-4">
                {capsule.isLocked ? (
                  <div className="p-2 bg-amber-500/10 rounded-full text-amber-500" title="Locked">
                    <Lock size={16} />
                  </div>
                ) : (
                  <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-500" title="Unlocked">
                    <Unlock size={16} />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-surface border ${capsule.isLocked ? 'border-amber-500/20 text-amber-500' : 'border-primary/20 text-primary'}`}>
                  {getIcon(capsule.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-text">{capsule.title}</h3>
                  <p className="text-xs text-muted flex items-center gap-1">
                    For: <span className="text-text">{heir?.name || 'All Heirs'}</span>
                  </p>
                </div>
              </div>

              {asset && (
                <div className="mb-4 text-xs bg-surface/50 p-2 rounded-lg border border-border/50 flex flex-col">
                  <span className="text-muted">Linked to:</span>
                  <span className="font-medium text-text truncate">{asset.name}</span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-xs text-muted mb-1">Unlocks:</p>
                <span className="text-sm font-medium text-text">
                  {capsule.unlockCondition === 'on_recovery' ? 'When vault is recovered' : `On ${capsule.unlockDate}`}
                </span>
              </div>

              <div className="relative h-20 mb-6 bg-surface p-3 rounded-lg border border-border/50 overflow-hidden text-sm">
                {capsule.isLocked ? (
                  <>
                    <div className="absolute inset-0 backdrop-blur-[2px] bg-background/50 flex flex-col items-center justify-center z-10">
                      <Lock size={14} className="text-amber-500 mb-1" />
                      <span className="text-[10px] text-amber-500 font-medium tracking-wider uppercase">Sealed</span>
                    </div>
                    <p className="text-muted opacity-50 blur-[2px] select-none">
                      {capsule.content.substring(0, 100)}...
                    </p>
                  </>
                ) : (
                  <p className="text-text/90 italic">"{capsule.content.substring(0, 80)}..."</p>
                )}
              </div>

              <div className="flex justify-between items-center gap-2">
                {!capsule.isLocked && (
                  <Button variant="secondary" className="flex-1 text-amber-500 hover:text-amber-400 hover:border-amber-500" onClick={() => sealCapsule(capsule.id)}>
                    Seal Now
                  </Button>
                )}
                <Button variant="secondary" className="flex-1 border-red-500/30 text-red-500 hover:bg-red-500/10" onClick={() => deleteCapsule(capsule.id)}>
                  Delete
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {capsules.length === 0 && (
        <div className="text-center py-16 px-4 border border-dashed border-border/50 rounded-2xl bg-surface/20">
          <Heart size={48} className="mx-auto text-muted/30 mb-4" />
          <h3 className="text-xl font-medium text-text mb-2">No capsules yet</h3>
          <p className="text-muted max-w-sm mx-auto mb-6">Create your first memory capsule to leave a personal message for your heirs.</p>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>Create Capsule</Button>
        </div>
      )}

      {/* Multistep Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#0f1219] rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-border/50 flex justify-between items-center bg-surface/50">
                <h2 className="text-xl font-bold text-text flex items-center gap-2">
                  <Heart size={20} className="text-primary"/> Create Memory Capsule
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-text transition-colors p-1"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Step Indicators */}
                <div className="flex justify-between items-center mb-8 px-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                        step === s ? 'bg-primary text-white shadow-[0_0_10px_rgba(79,92,255,0.5)]' : 
                        step > s ? 'bg-emerald-500 text-white' : 'bg-surface border border-border text-muted'
                      }`}>
                        {step > s ? <CheckCircle2 size={16} /> : s}
                      </div>
                      {s < 5 && (
                        <div className={`w-12 md:w-20 h-1 mx-2 rounded-full transition-colors ${step > s ? 'bg-emerald-500' : 'bg-border'}`} />
                      )}
                    </div>
                  ))}
                </div>

                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-lg font-semibold text-text">What kind of message is this?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['letter', 'voice_note', 'video_note'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setNewCapsule({ ...newCapsule, type: type as any })}
                          className={`p-6 rounded-xl border flex flex-col items-center justify-center gap-4 transition-all ${
                            newCapsule.type === type ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(79,92,255,0.1)]' : 'bg-surface/30 border-border hover:border-primary/50 text-muted hover:text-text'
                          }`}
                        >
                          <div className={`p-4 rounded-full ${newCapsule.type === type ? 'bg-primary text-white' : 'bg-surface border border-border'}`}>
                            {getIcon(type)}
                          </div>
                          <span className="font-medium capitalize">{type.replace('_', ' ')}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-lg font-semibold text-text">Who is this for and what is it about?</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-muted mb-2">Capsule Title</label>
                        <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text" placeholder="e.g. My thoughts on the house" value={newCapsule.title || ''} onChange={(e) => setNewCapsule({...newCapsule, title: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm text-muted mb-2">Recipient</label>
                        <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text outline-none focus:border-primary" value={newCapsule.recipientHeirId || 'all'} onChange={(e) => setNewCapsule({...newCapsule, recipientHeirId: e.target.value})}>
                          <option value="all">All Heirs</option>
                          {heirs.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-muted mb-2">Link to Asset (Optional)</label>
                        <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text outline-none focus:border-primary" value={newCapsule.assetId || ''} onChange={(e) => setNewCapsule({...newCapsule, assetId: e.target.value})}>
                          <option value="">None</option>
                          {assets.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 flex flex-col h-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-text flex items-center gap-2">
                        {getIcon(newCapsule.type || 'letter')} Write your message
                      </h3>
                      <button 
                        onClick={simulateAiGeneration}
                        disabled={isGenerating}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center gap-1 hover:bg-amber-500/20 transition-colors"
                      >
                       <Sparkles size={14} /> {isGenerating ? 'Generating...' : 'Generate with AI'}
                      </button>
                    </div>
                    {newCapsule.type === 'voice_note' && (
                      <div className="p-4 bg-surface rounded-xl border border-border/50 mb-2 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse"><Mic className="text-primary"/></div>
                        <div className="flex-1 space-y-2">
                          <p className="text-xs text-muted">Write the transcript for your simulated voice note</p>
                          <div className="h-4 w-full flex items-center gap-1 opacity-50">
                             {[...Array(20)].map((_,i) => <div key={i} className="h-full bg-primary rounded-full animate-pulse" style={{ width: '4px', height: `${Math.random()*100}%`}}></div>)}
                          </div>
                        </div>
                      </div>
                    )}
                    <textarea 
                      className="w-full flex-1 min-h-[250px] bg-background border border-border rounded-xl p-4 text-text placeholder-muted resize-none focus:outline-none focus:border-primary/50"
                      placeholder="Start writing..."
                      value={newCapsule.content || ''}
                      onChange={(e) => setNewCapsule({...newCapsule, content: e.target.value})}
                    />
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h3 className="text-lg font-semibold text-text">When should this unlock?</h3>
                    <div className="space-y-4">
                      <button 
                        onClick={() => setNewCapsule({...newCapsule, unlockCondition: 'on_recovery'})}
                        className={`w-full p-4 text-left rounded-xl border transition-all ${newCapsule.unlockCondition === 'on_recovery' ? 'bg-primary/10 border-primary text-text shadow-[0_0_15px_rgba(79,92,255,0.1)]' : 'bg-surface/30 border-border text-muted hover:border-primary/50'}`}
                      >
                        <div className="flex items-center gap-3 font-medium mb-1"><Unlock size={18} /> On Recovery (Default)</div>
                        <p className="text-sm opacity-80 pl-7">Unlocks safely only when your vault is officially recovered by your heirs.</p>
                      </button>
                      
                      <div className="relative">
                        <button 
                          onClick={() => setNewCapsule({...newCapsule, unlockCondition: 'on_date'})}
                          className={`w-full p-4 text-left rounded-xl border transition-all ${newCapsule.unlockCondition === 'on_date' ? 'bg-primary/10 border-primary text-text' : 'bg-surface/30 border-border text-muted hover:border-primary/50'}`}
                        >
                          <div className="flex items-center gap-3 font-medium mb-1"><Clock size={18} /> On Specific Date</div>
                          <p className="text-sm opacity-80 pl-7">Set a time capsule to open on a future birthday or anniversary.</p>
                        </button>
                        {newCapsule.unlockCondition === 'on_date' && (
                          <div className="p-4 mt-2 bg-background border border-border rounded-xl">
                            <input type="date" className="w-full bg-surface border border-border text-text px-4 py-2 rounded-lg" value={newCapsule.unlockDate || ''} onChange={(e) => setNewCapsule({...newCapsule, unlockDate: e.target.value})} />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-6">
                      <Lock size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-text">Ready to Seal?</h3>
                    <p className="text-muted max-w-md mx-auto">
                      Once sealed, this capsule will be securely locked and encrypted until the chosen unlock condition is met.
                    </p>
                    <div className="p-4 bg-surface rounded-xl border border-border/50 inline-block text-left mt-4 w-full max-w-sm">
                      <p className="text-sm font-medium text-text mb-1">{newCapsule.title}</p>
                      <p className="text-xs text-muted mb-2 flex gap-2"><span>Type: {newCapsule.type}</span> | <span>Unlocks: {newCapsule.unlockCondition}</span></p>
                      <div className="h-10 overflow-hidden relative">
                         <p className="text-xs text-muted italic">"{newCapsule.content}"</p>
                         <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>

              <div className="p-4 border-t border-border/50 bg-surface/50 flex justify-between">
                 {step > 1 ? (
                   <Button variant="secondary" onClick={() => setStep(step - 1)}>Back</Button>
                 ) : <div></div>}
                 
                 {step < 5 ? (
                   <Button variant="primary" onClick={() => setStep(step + 1)} className="flex items-center gap-2">
                     Next <ChevronRight size={16}/>
                   </Button>
                 ) : (
                   <Button variant="primary" className="bg-amber-500 hover:bg-amber-600 text-white border-none focus:ring-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]" onClick={handleCreate}>
                     <Lock size={16} className="mr-2"/> Seal Capsule
                   </Button>
                 )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
