import { Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIInsightBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-purple-500/10 to-transparent border border-primary/30 p-6 glow-blue mt-6 mb-6">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/30 blur-3xl rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-xl text-primary">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text mb-1 flex items-center gap-2">
              AI Insight
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">New</span>
            </h3>
            <p className="text-muted text-sm max-w-xl">
              Your vault is missing a guardian for NFT assets. Add one to reach 100% legacy score.
            </p>
          </div>
        </div>
        
        <Link 
          to="/guardians" 
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-colors whitespace-nowrap"
        >
          Fix Now
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
