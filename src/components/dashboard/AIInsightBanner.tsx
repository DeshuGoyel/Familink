import { Bot, ArrowRight, ShieldAlert, KeyRound, Shield, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useCheckinStore } from '../../store/useCheckinStore';

export default function AIInsightBanner() {
  const { user, assets, guardians, heirs } = useStore();
  const { checkinSettings } = useCheckinStore();

  const getInsight = () => {
    // 1. Critical Check-in Alert
    if (checkinSettings.status !== 'active') {
      return {
        title: "Protocol Violated",
        message: "Your verification pulse is overdue. The succession protocol is preparing to trigger.",
        link: "/check-in",
        linkText: "Resolve Now",
        icon: AlertTriangle,
        color: "text-red-500",
        bgHover: "hover:border-red-500/20",
        glow: "bg-red-500/10 group-hover:bg-red-500/15"
      };
    }

    // 2. Score Critical
    if (user.score < 50) {
      return {
        title: "Critical Resilience Alert",
        message: "Your vault's legacy score is critically low. Add guardians and assets immediately.",
        link: "/guardians",
        linkText: "Improve Score",
        icon: ShieldAlert,
        color: "text-brand-primary",
        bgHover: "hover:border-brand-primary/20",
        glow: "bg-brand-primary/10 group-hover:bg-brand-primary/15"
      };
    }

    // 3. Missing Guardians
    const confirmedGuardians = guardians.filter(g => g.status === 'Confirmed').length;
    if (confirmedGuardians < 2) {
      return {
        title: "Trust Network Incomplete",
        message: "Your vault is missing a 2-of-3 quorum. Add more guardians to reach a secure resilience score.",
        link: "/guardians",
        linkText: "Add Guardian",
        icon: Shield,
        color: "text-brand-gold",
        bgHover: "hover:border-brand-gold/20",
        glow: "bg-brand-gold/10 group-hover:bg-brand-gold/15"
      };
    }

    // 4. Missing Heirs
    if (heirs.length === 0 && assets.length > 0) {
      return {
        title: "Succession Plan Incomplete",
        message: "You have protected assets but no heirs assigned. Your legacy requires a designated recipient.",
        link: "/heirs",
        linkText: "Assign Heir",
        icon: KeyRound,
        color: "text-trust-500",
        bgHover: "hover:border-trust-500/20",
        glow: "bg-trust-500/10 group-hover:bg-trust-500/15"
      };
    }

    // Default Insight
    return {
      title: "AI Synthesis",
      message: "Your institutional vault is optimally configured. Continue monitoring your asset allocations.",
      link: "/ai-planner",
      linkText: "View Analytics",
      icon: Bot,
      color: "text-brand-primary",
      bgHover: "hover:border-brand-primary/20",
      glow: "bg-brand-primary/10 group-hover:bg-brand-primary/15"
    };
  };

  const insight = getInsight();
  const Icon = insight.icon;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-surface/40 backdrop-blur-md border border-white/5 p-6 mt-6 mb-6 group transition-all ${insight.bgHover}`}>
      {/* Premium Glows */}
      <div className={`absolute -top-12 -right-12 w-48 h-48 blur-[80px] rounded-full pointer-events-none transition-all duration-700 ${insight.glow}`} />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start md:items-center gap-5">
          <div className={`w-12 h-12 bg-surface border border-white/10 rounded-xl flex items-center justify-center ${insight.color} shadow-inner`}>
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-lg font-display font-bold text-primary tracking-tight">{insight.title}</h3>
              <span className={`px-2 py-0.5 rounded-full bg-white/5 border border-white/10 ${insight.color} text-[10px] font-bold uppercase tracking-wider`}>
                Insight
              </span>
            </div>
            <p className="text-secondary text-sm max-w-xl font-medium leading-relaxed">
              {insight.message}
            </p>
          </div>
        </div>
        
        <Link 
          to={insight.link} 
          className="group/btn relative flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-white/90 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 active:translate-y-0 shrink-0"
        >
          <span className="relative z-10">{insight.linkText}</span>
          <ArrowRight size={16} className="relative z-10 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
