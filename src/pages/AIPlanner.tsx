import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Bot, ShieldAlert, Lightbulb, ShieldCheck, Send, Sparkles, AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react';
import Card from '../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const aiReplies = [
  "I can certainly help with that. Based on your current vault 72/100 score, I recommend adding at least one more guardian to the protocol.",
  "That's a critical question. For digital business inheritance, you should provide direct instructions on how to access the registrar and DNS settings.",
  "I've analyzed your setup. You have 3 guardians, which is excellent for Shamir's Secret Sharing. However, your beneficiary 'Raj' has not yet verified their recovery credentials.",
  "To improve your vault integrity, consider adding detailed synthesis notes to your 'Institutional Portfolio'. Only 12% of high-net-worth users do this, but it increases recovery success by 80% with our perpetual storage layer."
];

const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let index = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
  }, [text]);
  
  return <span>{displayed}</span>;
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
});

export default function AIPlanner() {
  const { user, assets, guardians } = useStore();
  const [messages, setMessages] = useState([
    { role: 'ai', content: `Greetings ${user.name.split(' ')[0]}. I am your autonomous succession advisor. Your current Legacy Health Score is ${user.score}%. I have analyzed your vault and identified three critical optimizations for your digital inheritance protocol. Would you like to review them?` }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: inputVal }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const confirmedCount = guardians.filter(g => g.status === 'Confirmed').length;
      const missingInstructions = assets.filter(a => !a.instructions).length;
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `Analyzing protocol for "${inputVal}"... Based on your current configuration of ${assets.length} assets and ${confirmedCount} confirmed guardians, I recommend hardening your recovery instructions for ${missingInstructions > 0 ? `${missingInstructions} incomplete assets` : 'all legacy items'}.` 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleActionClick = (action: string) => {
    setMessages(prev => [...prev, { role: 'user', content: action }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: `Protocol initialized for: "${action}". I am analyzing your specific risk profile now...` }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-page text-primary selection:bg-brand-primary/30 pt-8">
      <main className="px-4 sm:px-6 lg:px-8 pb-24 md:pb-12 max-w-7xl mx-auto space-y-8">
        
        {/* ── Page Header ── */}
        <motion.header {...fadeUp(0)} className="flex items-center space-x-6">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full" />
            <motion.div 
               animate={{ boxShadow: ['0 0 10px rgba(79,92,255,0.4)', '0 0 40px rgba(79,92,255,0.8)', '0 0 10px rgba(79,92,255,0.4)'] }}
               transition={{ repeat: Infinity, duration: 3 }}
               className="w-14 h-14 bg-brand-primary text-obsidian-950 rounded-2xl flex items-center justify-center relative z-10"
            >
              <Bot size={32} />
            </motion.div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                Cognitive Legacy Synthesis
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary tracking-tight leading-none">
              Institutional <span className="italic text-brand-primary">Legacy Planner</span>
            </h1>
            <p className="text-muted text-sm mt-2 font-medium">Powered by Gemini · Your sovereign inheritance advisor.</p>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* ── Chat Container ── */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-2 flex flex-col h-[650px] bg-surface/40 border border-base/60 rounded-[32px] overflow-hidden backdrop-blur-md relative shadow-2xl">
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-6 rounded-3xl font-medium leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-brand-primary text-obsidian-950 rounded-br-none shadow-lg shadow-brand-primary/10' 
                        : 'bg-page/60 border border-base text-obsidian-100 rounded-bl-none'
                    }`}>
                      <p className="text-sm">
                        {msg.role === 'ai' ? <TypewriterText text={msg.content} /> : msg.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-page/40 border border-base px-5 py-4 rounded-3xl rounded-bl-none flex items-center space-x-2">
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* ── Chat Input ── */}
            <div className="p-6 border-t border-base/60 bg-page/40">
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { label: 'Analyze Gaps', icon: Sparkles },
                  { label: 'Generate Mandates', icon: Bot },
                  { label: 'Risk Assessment', icon: AlertTriangle },
                  { label: 'Legal Audit', icon: ShieldCheck }
                ].map((action, i) => (
                  <button 
                    key={i}
                    onClick={() => handleActionClick(action.label)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-base text-[10px] font-bold uppercase tracking-widest text-muted hover:text-brand-primary hover:border-brand-primary/50 transition-all active:scale-95 shadow-sm"
                  >
                    <action.icon size={12} />
                    {action.label}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSend} className="relative group">
                <input
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="Ask advisor about vault protocols..."
                  className="w-full bg-surface border border-base rounded-2xl pl-6 pr-14 py-4 text-primary focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/30 text-sm font-medium transition-all"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-brand-primary text-obsidian-950 rounded-xl hover:bg-brand-primary transition-all shadow-lg active:scale-95"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>

          {/* ── Sidebar Metrics ── */}
          <div className="space-y-8">
            <motion.div {...fadeUp(0.3)}>
              <Card className="flex flex-col items-center justify-center p-10 text-center bg-surface/50 border border-base/60 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary0 mb-8">Legacy Protocol Health</h3>
                
                <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                  <svg className="transform -rotate-90 w-full h-full">
                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-obsidian-800" />
                    <motion.circle 
                      cx="80" cy="80" r="70" 
                      stroke="#4F5CFF" 
                      strokeWidth="6" 
                      fill="transparent" 
                      strokeDasharray={Math.PI * 140} 
                      initial={{ strokeDashoffset: Math.PI * 140 }}
                      animate={{ strokeDashoffset: (Math.PI * 140) * (1 - user.score / 100) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="drop-shadow-[0_0_15px_rgba(79,92,255,0.4)]" 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-5xl font-digits font-bold text-primary">{user.score}</span>
                    <span className="text-[10px] font-bold text-obsidian-600 uppercase tracking-widest mt-1">Sovereign Index</span>
                  </div>
                </div>

                <div className="w-full space-y-4">
                  {[
                    { 
                      label: 'Asset Synthesis', 
                      value: `${Math.round((assets.filter(a => a.instructions).length / assets.length) * 100)}%`, 
                      color: 'text-brand-primary' 
                    },
                    { 
                      label: 'Guardian Quorum', 
                      value: `${Math.round((guardians.filter(g => g.status === 'Confirmed').length / guardians.length) * 100)}%`, 
                      color: 'text-amber-500' 
                    },
                    { 
                      label: 'Mandate Coverage', 
                      value: `${Math.round((assets.filter(a => a.beneficiaryId).length / assets.length) * 100)}%`, 
                      color: 'text-trust-500' 
                    }
                  ].map((m, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-primary0">{m.label}</span>
                      <span className={cn(m.color, "font-digits")}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* ── Intelligence Feed ── */}
            <div className="space-y-4">
              <motion.div {...fadeUp(0.4)} className="p-6 rounded-3xl border border-red-500/20 bg-red-500/5 flex items-start gap-4 group hover:bg-red-500/10 transition-all">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <ShieldAlert className="text-red-500" size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1 group-hover:text-red-400 transition-colors">Critical Vulnerability</h4>
                  <p className="text-[10px] text-muted font-medium leading-relaxed mb-3">Your hardware vault has no secondary recovery path. 47% of recovery attempts fail without a fragmented key backup.</p>
                  <button className="text-[9px] font-bold text-red-500 uppercase tracking-[0.2em] flex items-center group-hover:translate-x-1 transition-transform">
                    Initialize Repair <ChevronRight size={10} className="ml-1" />
                  </button>
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.5)} className="p-6 rounded-3xl border border-brand-primary/20 bg-brand-primary/5 flex items-start gap-4 group hover:bg-brand-primary/10 transition-all">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="text-brand-primary" size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1 group-hover:text-brand-primary transition-colors">Optimization Suggested</h4>
                  <p className="text-[10px] text-muted font-medium leading-relaxed mb-3">Append a biometric synthesis (video) to your memory capsules to ensure heir continuity.</p>
                  <button className="text-[9px] font-bold text-brand-primary uppercase tracking-[0.2em] flex items-center group-hover:translate-x-1 transition-transform">
                    Enable Synthesis <ChevronRight size={10} className="ml-1" />
                  </button>
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.6)} className="p-6 rounded-3xl border border-green-500/20 bg-green-500/5 flex items-start gap-4 group hover:bg-green-500/10 transition-all">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-green-500" size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1 group-hover:text-green-400 transition-colors">Integrity Verified</h4>
                  <p className="text-[10px] text-muted font-medium leading-relaxed">Your sovereign BTC recovery path has reached a 100% verification threshold with 3 active guardians.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
