import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { AuroraScene } from '../components/obituary/AuroraScene';
import { useObituaryStore, ObituaryEntry } from '../store/useObituaryStore';
import { useStore } from '../store/useStore';
import Button from '../components/ui/Button';
import { Scroll, Sparkles, Video, Mic, Heart, Feather, BookOpen, Clock, Lock, X, Eye } from 'lucide-react';

export default function DigitalObituary() {
  const { entries, createEntry, sealEntry, deleteEntry } = useObituaryStore();
  const { heirs } = useStore();
  const [hasSeenIntro, setHasSeenIntro] = useState(entries.length > 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [newEntry, setNewEntry] = useState<Partial<ObituaryEntry>>({ type: 'letter' });
  const [isGenerating, setIsGenerating] = useState(false);

  const simulateAiGeneration = () => {
    setIsGenerating(true);
    let text = "My dearest family, \n\nIf you are reading this, it means I have passed on. Please know that my final thoughts were full of love and gratitude for the time we shared. I've left instructions to ensure you are taken care of. Do not mourn for too long, but celebrate the joyful moments we had. I am at peace.\n\nAlways with you,\n[Name]";
    
    let currentText = "";
    let i = 0;
    setNewEntry({ ...newEntry, content: "" });
    
    const interval = setInterval(() => {
      currentText += text.charAt(i);
      setNewEntry(prev => ({ ...prev, content: currentText }));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 15);
  };

  const handleCreate = () => {
    createEntry({
      type: newEntry.type as any,
      title: newEntry.title || 'My Final Letter',
      content: newEntry.content || '',
      recipientHeirId: newEntry.recipientHeirId || 'all',
      isLocked: true // These are always sealed upon creation
    });
    setIsModalOpen(false);
    setStep(1);
    setNewEntry({ type: 'letter' });
  };

  const getIcon = (type: string) => {
    if (type === 'voice') return <Mic size={20} />;
    if (type === 'video') return <Video size={20} />;
    return <Feather size={20} />;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-6 px-4 md:px-8 pb-24 md:pb-8">
      
      {/* Header */}
      <header className="flex flex-col items-center justify-center text-center pt-8 pb-4">
        <h1 className="text-4xl font-serif text-white tracking-wide mb-3 text-glow-purple">
          Your Final Words
        </h1>
        <p className="text-purple-200/60 max-w-md text-lg">
          Some things are too important to leave unsaid.
        </p>
      </header>

      {/* 3D Scene */}
      <div className="h-[200px] w-full rounded-[2rem] bg-[#050510] relative overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(139,92,255,0.1)] border border-purple-900/30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <AuroraScene />
        </Canvas>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#050510]/80"></div>
      </div>

      {!hasSeenIntro ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-surface/40 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 text-center"
        >
          <BookOpen size={48} className="mx-auto text-purple-400 mb-6 opacity-80" />
          <p className="text-xl text-text leading-relaxed font-serif mb-6">
            This space is private. Only visible to your heirs after recovery is complete. 
            You can update these anytime. Writing them is one of the most loving things you can do.
          </p>
          <Button 
            variant="primary" 
            className="bg-purple-600 hover:bg-purple-700 text-white border-none px-8 py-3 text-lg !rounded-full shadow-[0_0_20px_rgba(147,51,234,0.4)]"
            onClick={() => { setHasSeenIntro(true); setIsModalOpen(true); }}
          >
            Begin Writing
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-serif text-white">Your Sealed Messages</h2>
            <Button 
              variant="secondary" 
              className="text-purple-400 border-purple-500/30 hover:bg-purple-500/10"
              onClick={() => setIsModalOpen(true)}
            >
              Add Message
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entries.map((entry) => {
              const heir = heirs.find(h => h.id === entry.recipientHeirId);
              return (
                <motion.div 
                  key={entry.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface/30 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 relative group hover:border-purple-500/40 transition-colors"
                >
                  <div className="absolute top-6 right-6 p-2 bg-amber-500/10 rounded-full border border-amber-500/20" title="Private - Sealed">
                    <Lock size={16} className="text-amber-500" />
                  </div>

                  <h3 className="text-2xl font-serif text-white mb-2">{heir ? `To ${heir.name}` : 'To My Family'}</h3>
                  <div className="flex items-center gap-2 mb-6 text-sm text-purple-300/60">
                    <span className="flex items-center gap-1">{getIcon(entry.type)} <span className="capitalize">{entry.type}</span></span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> {new Date(entry.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-purple-500/10">
                    <button className="text-sm font-medium text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                      <Eye size={16}/> Preview (Owner Only)
                    </button>
                    <button onClick={() => deleteEntry(entry.id)} className="text-sm text-muted hover:text-red-400 transition-colors">
                      Delete
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Multistep Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md transition-all">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-3xl bg-[#0a0a14] rounded-3xl border border-purple-500/30 overflow-hidden flex flex-col max-h-[90vh] shadow-[0_0_100px_rgba(147,51,234,0.15)]"
            >
              <div className="p-6 border-b border-purple-500/10 flex justify-between items-center">
                <div className="flex items-center gap-3 text-purple-200">
                  <Feather size={20} className="text-purple-500"/> 
                  <span className="font-serif text-xl tracking-wide">Write Message</span>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-text p-2 rounded-full hover:bg-surface"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    <h3 className="text-2xl font-serif text-white text-center">Who is this message for?</h3>
                    <div className="max-w-sm mx-auto">
                      <select 
                        className="w-full bg-surface border border-purple-500/30 rounded-xl px-5 py-4 text-white text-lg outline-none focus:border-purple-500 transition-colors"
                        value={newEntry.recipientHeirId || 'all'} 
                        onChange={(e) => setNewEntry({...newEntry, recipientHeirId: e.target.value})}
                      >
                        <option value="all">Create a general message for all heirs</option>
                        {heirs.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                      </select>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    <h3 className="text-2xl font-serif text-white text-center">How would you like to deliver your message?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { id: 'letter', icon: Feather, title: 'Written Letter', desc: 'Your words, their forever.' },
                        { id: 'voice', icon: Mic, title: 'Voice Transcript', desc: 'As if they could hear you.' },
                        { id: 'video', icon: Video, title: 'Video Script', desc: 'A message from beyond.' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setNewEntry({ ...newEntry, type: t.id as any })}
                          className={`p-8 rounded-2xl border flex flex-col items-center justify-center gap-4 transition-all text-center ${
                            newEntry.type === t.id ? 'bg-purple-900/20 border-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.2)] text-white' : 'bg-surface/30 border-purple-500/20 hover:border-purple-500/50 text-purple-200/50 hover:text-purple-200'
                          }`}
                        >
                          <t.icon size={36} className="mb-2" />
                          <div>
                            <span className="font-serif text-lg block mb-1">{t.title}</span>
                            <span className="text-xs opacity-60 italic">{t.desc}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 flex flex-col h-full min-h-[400px]">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-serif text-white flex items-center gap-2">
                        {getIcon(newEntry.type || 'letter')} Express yourself
                      </h3>
                      <button 
                        onClick={simulateAiGeneration}
                        disabled={isGenerating}
                        className="text-xs font-medium px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center gap-2 hover:bg-amber-500/20 transition-all"
                      >
                       <Sparkles size={14} /> Need help finding the words?
                      </button>
                    </div>
                    
                    <textarea 
                      className="w-full flex-1 rounded-2xl p-6 text-lg text-white font-serif placeholder-purple-200/30 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all bg-[#0d0d1a] border border-purple-900/50"
                      placeholder="Start with 'Dear Name,'...&#10;Tell them what they meant to you.&#10;Share your final wishes and guidance.&#10;Let them know you are at peace."
                      value={newEntry.content || ''}
                      onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                    />
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 bg-[#fdfbf7] p-12 rounded-[2rem] shadow-inner text-black transform rotate-[0.5deg]">
                    <div className="font-serif text-xl leading-relaxed text-[#2a2a2a]">
                       <p className="mb-8 font-medium">
                         To: {heirs.find(h => h.id === newEntry.recipientHeirId)?.name || 'My Family'}
                       </p>
                       <div className="whitespace-pre-wrap">{newEntry.content}</div>
                       <p className="mt-12 text-sm text-gray-400 italic font-sans text-right">
                         Written on {new Date().toLocaleDateString()}
                       </p>
                    </div>
                  </motion.div>
                )}
                
                {step === 5 && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center py-12">
                    <motion.div 
                       initial={{ scale: 0.8, rotateX: 45 }} 
                       animate={{ scale: 1, rotateX: 0 }} 
                       className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(245,158,11,0.4)]"
                    >
                      <Lock size={48} />
                    </motion.div>
                    <h3 className="text-3xl font-serif text-white mb-4">Seal This Message</h3>
                    <p className="text-lg text-purple-200/60 max-w-md mx-auto">
                      Your message will be sealed. They will receive it when the time comes.
                    </p>
                  </motion.div>
                )}

              </div>

              <div className="p-6 border-t border-purple-500/10 bg-surface/30 flex justify-between">
                 {step > 1 ? (
                   <Button variant="secondary" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10" onClick={() => setStep(step - 1)}>Go Back</Button>
                 ) : <div></div>}
                 
                 {step < 5 ? (
                   <Button variant="primary" onClick={() => setStep(step + 1)} className="bg-purple-600 hover:bg-purple-700 text-white border-none min-w-[120px]">
                     {step === 4 ? 'Looks Good' : 'Next'}
                   </Button>
                 ) : (
                   <Button variant="primary" className="bg-amber-500 hover:bg-amber-600 text-white border-none focus:ring-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)] px-8 py-3 text-lg" onClick={handleCreate}>
                     <Lock size={20} className="mr-2"/> Seal Now
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
