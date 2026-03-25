import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Bot, ArrowRight, ShieldAlert, Lightbulb, ShieldCheck, Send } from 'lucide-react';
import Card from '../components/ui/Card';
import { motion } from 'framer-motion';

const aiReplies = [
  "I can certainly help with that. Based on your current vault 72/100 score, I recommend adding at least one more guardian.",
  "That's a great question. For NFT inheritance, you should provide direct instructions on how to access the specific wallet they are stored in.",
  "I've analyzed your setup. You have 3 guardians, which is excellent for Shamir's Secret Sharing. However, your son Raj is still in 'In Recovery' status.",
  "To improve your score, consider adding detailed notes to your 'Main BTC Wallet' asset. Only 12% of users do this, but it increases recovery success by 80%."
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
    }, 15);
    return () => clearInterval(interval);
  }, [text]);
  
  return <span>{displayed}</span>;
};

export default function AIPlanner() {
  const { user } = useStore();
  const [messages, setMessages] = useState([
    { role: 'ai', content: `Hi ${user.name.split(' ')[0]} 👋 I've analyzed your vault. You're missing recovery instructions for your NFTs. Want me to generate them for you?` }
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
      const reply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleActionClick = (action: string) => {
    setMessages(prev => [...prev, { role: 'user', content: action }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: `I am executing action: "${action}". Here are your tailored suggestions...` }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-secondary">
<main className="pt-6 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <header className="flex items-center space-x-4">
            <motion.div 
               animate={{ boxShadow: ['0 0 10px rgba(79,92,255,0.4)', '0 0 30px rgba(79,92,255,0.8)', '0 0 10px rgba(79,92,255,0.4)'] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary"
            >
              <Bot size={28} />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-text">AI Legacy Planner</h1>
              <p className="text-muted mt-1">Powered by Gemini · Your personal inheritance advisor</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col h-[600px] glassmorphism rounded-2xl border border-border overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-surface border border-border text-text rounded-bl-none'
                    }`}>
                      {msg.role === 'ai' ? <TypewriterText text={msg.content} /> : msg.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-surface border border-border p-4 rounded-2xl rounded-bl-none flex space-x-2">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 rounded-full bg-muted" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 rounded-full bg-muted" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 rounded-full bg-muted" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-4 border-t border-border bg-surface/50">
                <div className="flex flex-wrap gap-2 mb-4">
                  {['🔍 Analyze my gaps', '📝 Generate heir instructions', '⚠️ Check for risks', '📊 Estimate asset value', '🌍 Check legal compliance'].map(action => (
                    <button 
                      key={action}
                      onClick={() => handleActionClick(action)}
                      className="px-3 py-1.5 rounded-full bg-surface border border-border text-xs text-muted hover:text-primary hover:border-primary/50 transition"
                    >
                      {action}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSend} className="relative">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    placeholder="Ask AI about your legacy plan..."
                    className="w-full bg-surface border border-border rounded-xl pl-4 pr-12 py-3 text-text focus:outline-none focus:border-primary/50 text-sm"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="flex flex-col items-center justify-center p-8 text-center bg-surface/80 border border-border">
                <h3 className="text-muted font-medium mb-4">Legacy Health Check</h3>
                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                  <svg className="transform -rotate-90 w-full h-full">
                    <circle cx="64" cy="64" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-surface" />
                    <circle cx="64" cy="64" r="50" stroke="#4F5CFF" strokeWidth="8" fill="transparent" strokeDasharray={Math.PI * 100} strokeDashoffset={(Math.PI * 100) * (1 - 0.72)} className="drop-shadow-[0_0_10px_rgba(79,92,255,0.5)] transition-all duration-1000" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold text-text">72</span>
                    <span className="text-xs text-muted">/ 100</span>
                  </div>
                </div>
                <div className="w-full space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-muted">Assets</span><span className="text-accent">90%</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted">Guardians</span><span className="text-yellow-500">60%</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted">Heirs</span><span className="text-accent">80%</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted">Instructions</span><span className="text-danger">40%</span></div>
                </div>
              </Card>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-danger/30 bg-danger/5 flex items-start space-x-3">
                  <ShieldAlert className="text-danger mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="text-sm font-semibold text-text mb-1">Risk Detected</h4>
                    <p className="text-xs text-muted mb-2">Your ETH wallet has no guardian specifically assigned. 47% of ETH inheritance cases fail without this.</p>
                    <button className="text-xs font-semibold text-danger flex items-center hover:opacity-80">Fix this <ArrowRight size={12} className="ml-1" /></button>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-start space-x-3">
                  <Lightbulb className="text-primary mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="text-sm font-semibold text-text mb-1">Suggestion</h4>
                    <p className="text-xs text-muted mb-2">Add a video message for your heirs to personalize their experience.</p>
                    <button className="text-xs font-semibold text-primary flex items-center hover:opacity-80">Add video <ArrowRight size={12} className="ml-1" /></button>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 flex items-start space-x-3">
                  <ShieldCheck className="text-accent mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="text-sm font-semibold text-text mb-1">Strong Point</h4>
                    <p className="text-xs text-muted">Your BTC wallet recovery path is excellent — 3 guardians confirmed.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
