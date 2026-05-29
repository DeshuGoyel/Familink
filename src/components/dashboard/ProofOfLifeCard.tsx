import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Clock, Activity, Settings2 } from 'lucide-react';
import { useCheckinStore } from '../../store/useCheckinStore';
import Button from '../ui/Button';
import { trackEvent, EVENTS } from '../seo/Analytics';

export default function ProofOfLifeCard() {
  const { checkinSettings, completeCheckin } = useCheckinStore();
  
  const last = checkinSettings.lastCheckinAt ? new Date(checkinSettings.lastCheckinAt) : new Date(Date.now() - 86400000);
  const nextDue = new Date(last);
  if (checkinSettings.frequency === 'weekly') nextDue.setDate(nextDue.getDate() + 7);
  if (checkinSettings.frequency === 'biweekly') nextDue.setDate(nextDue.getDate() + 14);
  if (checkinSettings.frequency === 'monthly') nextDue.setMonth(nextDue.getMonth() + 1);

  const now = new Date();
  const diffTime = nextDue.getTime() - now.getTime();
  const daysUntilNext = Math.ceil(diffTime / (1000 * 3600 * 24));
  
  const isUrgent = daysUntilNext <= 2;
  const isOverdue = daysUntilNext < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-surface/40 backdrop-blur-md rounded-[32px] p-8 relative overflow-hidden transition-all duration-500 border ${
        isOverdue ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.15)]' : 
        isUrgent ? 'border-brand-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.15)]' : 
        'border-base/60 hover:border-brand-primary/40'
      }`}
    >
      {/* Heartbeat Pulse Background */}
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Activity size={120} className={isOverdue ? 'text-red-500' : isUrgent ? 'text-brand-gold' : 'text-brand-primary'} />
        </motion.div>
      </div>

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-display font-bold text-primary tracking-tight">Proof of <span className="italic text-brand-primary">Life</span></h3>
            {isOverdue ? (
              <ShieldAlert className="text-red-500 animate-pulse" size={20} />
            ) : isUrgent ? (
              <ShieldAlert className="text-brand-gold animate-pulse" size={20} />
            ) : (
              <ShieldCheck className="text-emerald-400" size={20} />
            )}
          </div>
          <p className="text-secondary text-[11px] font-medium tracking-wide flex items-center gap-1.5 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
            Heartbeat Monitoring Active
          </p>
        </div>
        <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted hover:text-primary transition-colors">
          <Settings2 size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
        <div className="p-4 rounded-2xl bg-page/50 border border-base shadow-inner">
          <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Status</p>
          <p className={`text-sm font-display font-bold ${isOverdue ? 'text-red-400' : isUrgent ? 'text-brand-gold' : 'text-emerald-400'}`}>
            {isOverdue ? 'Critical' : isUrgent ? 'Action Required' : 'Vault Secured'}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-page/50 border border-base shadow-inner">
          <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-1">Frequency</p>
          <p className="text-sm font-display font-bold text-primary uppercase tracking-tight">{checkinSettings.frequency}</p>
        </div>
      </div>

      <div className="bg-surface/50 border border-base/50 rounded-2xl p-5 mb-8 shadow-inner relative z-10">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Next Verification Due</span>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isOverdue ? 'text-red-400' : isUrgent ? 'text-brand-gold' : 'text-brand-primary'}`}>
            {Math.abs(daysUntilNext)} Days {isOverdue ? 'Overdue' : 'Left'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-page rounded-full overflow-hidden mb-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(0, Math.min(100, (daysUntilNext / 30) * 100))}%` }}
            className={`h-full ${isOverdue ? 'bg-red-500' : isUrgent ? 'bg-brand-gold' : 'bg-brand-primary'}`}
          />
        </div>
        <div className="flex justify-between items-center text-[9px] font-bold text-muted uppercase">
          <span>{last.toLocaleDateString()}</span>
          <span>{nextDue.toLocaleDateString()}</span>
        </div>
      </div>

      <Button 
        className="w-full h-14 relative group overflow-hidden shadow-xl shadow-brand-primary/10" 
        variant={isOverdue || isUrgent ? 'primary' : 'secondary'}
        onClick={() => {
          completeCheckin('tap');
          trackEvent(EVENTS.HEARTBEAT_SYNC, {
            frequency: checkinSettings.frequency,
            status: isOverdue ? 'overdue' : isUrgent ? 'urgent' : 'nominal'
          });
        }}
      >
        <span className="relative z-10 font-bold uppercase tracking-widest text-[11px]">Initiate Heartbeat Sync</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </Button>

      <p className="text-center mt-6 text-[10px] font-medium text-muted">
        Fail-safe protocol: Succession triggers after <span className="text-primary font-bold">48 hours</span> of inactivity.
      </p>
    </motion.div>
  );
}
