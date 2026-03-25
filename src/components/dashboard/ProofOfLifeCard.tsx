import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Button from '../ui/Button';

export default function ProofOfLifeCard() {
  const { user, performCheckIn } = useStore();
  
  const nextCheckIn = new Date(user.nextCheckInDate);
  const now = new Date();
  const daysUntilNext = Math.ceil((nextCheckIn.getTime() - now.getTime()) / (1000 * 3600 * 24));
  
  const isUrgent = daysUntilNext <= 2;
  const isOverdue = daysUntilNext < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glassmorphism rounded-2xl p-6 relative overflow-hidden transition-all duration-300 border ${
        isOverdue ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 
        isUrgent ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 
        'hover:border-primary/30'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text flex items-center gap-2">
            Proof of Life
            {isOverdue ? (
              <ShieldAlert className="text-red-500 animate-pulse" size={18} />
            ) : isUrgent ? (
              <ShieldAlert className="text-amber-500 animate-pulse" size={18} />
            ) : (
              <ShieldCheck className="text-green-500" size={18} />
            )}
          </h3>
          <p className="text-muted text-sm mt-1">
            Active monitoring of your vault status.
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Clock size={16} className={isOverdue ? 'text-red-400' : isUrgent ? 'text-amber-400' : 'text-primary'} />
            <span className={isOverdue ? 'text-red-400' : isUrgent ? 'text-amber-400' : 'text-text'}>
              {Math.abs(daysUntilNext)} {Math.abs(daysUntilNext) === 1 ? 'day' : 'days'} {isOverdue ? 'overdue' : 'remaining'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-surface/50 rounded-xl p-4 mb-5">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted">Last check-in</span>
          <span className="text-text font-medium">
            {new Date(user.checkInHistory[0]?.date || Date.now()).toLocaleDateString()}
          </span>
        </div>
      </div>

      <Button 
        className="w-full relative group overflow-hidden" 
        variant={isOverdue ? 'primary' : 'outline'}
        onClick={() => performCheckIn('App Tap')}
      >
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
        <span className="relative z-10 font-bold">I am still here</span>
      </Button>
    </motion.div>
  );
}
