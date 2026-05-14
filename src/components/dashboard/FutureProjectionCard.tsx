import { ArrowRight, Sparkles, Target } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';

export default function FutureProjectionCard() {
  const { assets } = useStore();
  
  const totalValue = assets.reduce((acc, asset) => acc + (asset.value || 0), 0);
  // Simple assumed growth rate: 8% per year over 10 years
  const years = 10;
  const currentYear = new Date().getFullYear();
  const targetYear = currentYear + years;
  
  const projectedValue = totalValue * Math.pow(1.08, years);
  const growth = projectedValue - totalValue;
  const growthPercentage = totalValue > 0 ? ((growth / totalValue) * 100).toFixed(0) : 0;
  
  return (
    <Card 
      className="p-8 relative overflow-hidden group hover:border-brand-primary/40 transition-all duration-500 bg-surface/30 border border-base/60 rounded-[32px]"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-colors duration-700 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20 shadow-inner">
                <Target size={16} />
              </div>
              <h3 className="text-lg font-display font-bold text-primary tracking-tight">
                Future <span className="italic text-brand-primary">Projection</span>
              </h3>
            </div>
            <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 flex items-center gap-1.5 shadow-inner">
              <Sparkles size={10} className="text-brand-primary" />
              <span className="text-[9px] font-bold text-muted uppercase tracking-widest">AI Synthesis</span>
            </div>
          </div>

          <p className="text-muted text-[11px] mb-8 font-medium leading-relaxed">
            Based on your current institutional asset mix and a standard 8% annual growth model.
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-primary0 uppercase tracking-widest mb-2">Estimated Value ({targetYear})</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-bold text-primary tracking-tighter">
                  ${projectedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
                <span className="text-sm font-bold text-emerald-400">
                  +{growthPercentage}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-page/50 border border-base shadow-inner">
                <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Net Growth</p>
                <p className="text-sm font-display font-bold text-primary">
                  +${growth.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-page/50 border border-base shadow-inner">
                <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Target Year</p>
                <p className="text-sm font-display font-bold text-primary">{targetYear}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <Link 
            to="/ai-planner"
            className="flex items-center justify-between p-4 rounded-2xl bg-brand-primary text-obsidian-950 font-bold text-[11px] uppercase tracking-widest group/btn hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/20"
          >
            <span>Review Growth Strategy</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
