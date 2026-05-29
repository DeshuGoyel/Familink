import { ArrowRight, Sparkles, Target, ShieldAlert } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';

export default function FutureProjectionCard() {
  const { assets, user } = useStore();
  const jurisdiction = user.jurisdiction || 'global';
  
  const totalValue = assets.reduce((acc, asset) => acc + (asset.value || 0), 0);
  const years = 10;
  const currentYear = new Date().getFullYear();
  const targetYear = currentYear + years;
  
  const projectedValue = totalValue * Math.pow(1.08, years);
  const growth = projectedValue - totalValue;
  const growthPercentage = totalValue > 0 ? ((growth / totalValue) * 100).toFixed(0) : 0;

  // Jurisdictional Tax Intelligence
  const taxConfigs: Record<string, { rate: number; label: string; info: string }> = {
    global: { rate: 0.15, label: 'Intl Baseline', info: 'Assumes standard international wealth transfer tax.' },
    india: { rate: 0.0, label: 'Zero Tax', info: 'Current India laws impose no inheritance tax on digital assets.' },
    usa: { rate: 0.4, label: 'Estate Tax', info: 'Federal estate tax threshold applies (up to 40%).' },
    uk: { rate: 0.4, label: 'IHT Rate', info: 'UK Inheritance Tax is generally 40% above the nil-rate band.' },
    uae: { rate: 0.0, label: 'Tax Free', info: 'UAE offers 0% inheritance tax for most virtual assets.' },
  };

  const config = taxConfigs[jurisdiction] || taxConfigs.global;
  const estimatedTax = projectedValue * config.rate;
  const afterTaxValue = projectedValue - estimatedTax;

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
                Institutional <span className="italic text-brand-primary">Projection</span>
              </h3>
            </div>
            <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 flex items-center gap-1.5 shadow-inner">
              <Sparkles size={10} className="text-brand-primary" />
              <span className="text-[9px] font-bold text-muted uppercase tracking-widest">Sovereign Intel</span>
            </div>
          </div>

          <p className="text-muted text-[11px] mb-8 font-medium leading-relaxed">
            Projected value in <span className="text-primary">{targetYear}</span> under <span className="text-brand-primary uppercase">{jurisdiction}</span> tax framework.
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Net Transferable ({targetYear})</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-bold text-primary tracking-tighter">
                  ${afterTaxValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
                <span className="text-sm font-bold text-emerald-400">
                  +{growthPercentage}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-page/50 border border-base shadow-inner">
                <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Gross Projection</p>
                <p className="text-sm font-display font-bold text-primary">
                  ${projectedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-page/50 border border-base shadow-inner">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[9px] font-bold text-muted uppercase tracking-widest">{config.label}</p>
                  <ShieldAlert size={10} className={config.rate > 0 ? 'text-brand-gold' : 'text-emerald-400'} />
                </div>
                <p className={`text-sm font-display font-bold ${config.rate > 0 ? 'text-brand-gold' : 'text-emerald-400'}`}>
                  {config.rate > 0 ? `-$${estimatedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : '0% Tax'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-3 rounded-xl bg-surface/50 border border-base/50">
          <p className="text-[9px] text-secondary leading-tight italic">
            "{config.info}"
          </p>
        </div>

        <div className="mt-auto pt-8">
          <Link 
            to="/knowledge/tax-planning"
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
