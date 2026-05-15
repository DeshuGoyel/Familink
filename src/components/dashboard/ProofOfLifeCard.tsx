import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Clock } from 'lucide-react';
import { useCheckinStore } from '../../store/useCheckinStore';
import Button from '../ui/Button';

export default function ProofOfLifeCard() {
  const { checkinSettings, completeCheckin } = useCheckinStore();
  
  const last = checkinSettings.lastCheckinAt ? new Date(checkinSettings.lastCheckinAt) : new Date(Date.now() - 86400000);
  const nextDue = new Date(last);
  if (checkinSettings.frequency === 'weekly') nextDue.setDate(nextDue.getDate() + 7);
  if (checkinSettings.frequency === 'biweekly') nextDue.setDate(nextDue.getDate() + 14);
  if (checkinSettings.frequency === 'monthly') nextDue.setMonth(nextDue.getMonth() + 1);

  const now = new Date();
  const daysUntilNext = Math.ceil((nextDue.getTime() - now.getTime()) / (1000 * 3600 * 24));
  
  const isUrgent = daysUntilNext <= 2;
  const isOverdue = daysUntilNext < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-surface/40 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden transition-all duration-300 border ${
        isOverdue ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 
        isUrgent ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 
        'border-border-base hover:border-brand-primary/30'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-primary flex items-center gap-2 tracking-tight">
            Proof of Life
            {isOverdue ? (
              <ShieldAlert className="text-red-500 animate-pulse" size={18} />
            ) : isUrgent ? (
              <ShieldAlert className="text-amber-500 animate-pulse" size={18} />
            ) : (
              <ShieldCheck className="text-brand-success" size={18} />
            )}
          </h3>
          <p className="text-muted text-sm mt-1 font-medium">
            Active monitoring of your vault status.
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Clock size={16} className={isOverdue ? 'text-red-400' : isUrgent ? 'text-brand-gold' : 'text-brand-primary'} />
            <span className={isOverdue ? 'text-red-400' : isUrgent ? 'text-brand-gold' : 'text-primary'}>
              {Math.abs(daysUntilNext)} {Math.abs(daysUntilNext) === 1 ? 'day' : 'days'} {isOverdue ? 'overdue' : 'remaining'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-surface/50 border border-border-base/50 rounded-xl p-4 mb-5 shadow-inner">
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="text-muted">Last check-in</span>
          <span className="text-primary font-digits">
            {checkinSettings.lastCheckinAt ? new Date(checkinSettings.lastCheckinAt).toLocaleDateString() : 'Never'}
          </span>
        </div>
      </div>

      <Button 
        className="w-full relative group overflow-hidden" 
        variant={isOverdue ? 'primary' : 'secondary'}
        onClick={() => completeCheckin('tap')}
      >
        <span className="relative z-10 font-bold">I am still here</span>
      </Button>
    </motion.div>
  );
}
