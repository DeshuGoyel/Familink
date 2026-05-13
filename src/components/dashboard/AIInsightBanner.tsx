import { Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIInsightBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface/40 backdrop-blur-md border border-white/5 p-6 mt-6 mb-6 group transition-all hover:border-brand-primary/20">
      {/* Premium Glows */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-primary/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-brand-primary/15 transition-all duration-700" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-gold/5 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start md:items-center gap-5">
          <div className="w-12 h-12 bg-surface border border-white/10 rounded-xl flex items-center justify-center text-brand-primary shadow-inner">
            <Bot size={24} strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-lg font-display font-bold text-primary tracking-tight">AI Insight</h3>
              <span className="px-2 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-wider">New</span>
            </div>
            <p className="text-secondary text-sm max-w-xl font-medium leading-relaxed">
              Your vault is missing a guardian for NFT assets. Add one to reach 100% legacy score.
            </p>
          </div>
        </div>
        
        <Link 
          to="/guardians" 
          className="group/btn relative flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-white/90 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="relative z-10">Fix Now</span>
          <ArrowRight size={16} className="relative z-10 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
