import React from 'react';
import { useStore } from '../../store/useStore';
import { Lock, User, FileText, Key, Mail, ChevronRight, ShieldCheck, Activity as Pulse } from 'lucide-react';
import { motion } from 'framer-motion';

const icons: Record<string, React.ElementType> = { Lock, User, FileText, Key, Mail };

export default function ActivityFeed() {
  const { activity } = useStore();

  return (
    <div className="space-y-3">
      {activity.map((item, index) => {
        const Icon = icons[item.icon] || Lock;
        const isCritical = item.message.toLowerCase().includes('failed') || item.message.toLowerCase().includes('security');
        
        return (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-center justify-between p-3.5 rounded-xl bg-surface-raised/40 border border-base/40 hover:border-brand-primary/30 hover:bg-surface-raised/60 transition-all cursor-default relative overflow-hidden"
          >
            {/* Thread Line Decor */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-3.5 relative z-10">
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-500 group-hover:rotate-[360deg]",
                isCritical 
                  ? "text-red-400 bg-red-400/10 border-red-400/20" 
                  : "text-brand-primary bg-brand-primary/10 border-brand-primary/20"
              )}>
                <Icon size={14} strokeWidth={2.5} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter",
                    isCritical ? "bg-red-400/20 text-red-400" : "bg-brand-primary/20 text-brand-primary"
                  )}>
                    {isCritical ? 'Critical' : 'Protocol Log'}
                  </span>
                  <span className="text-[10px] font-bold text-primary tracking-tight truncate max-w-[140px]">
                    {item.message}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-muted font-bold uppercase tracking-widest">{item.time}</span>
                  <span className="w-0.5 h-0.5 rounded-full bg-muted/30" />
                  <span className="text-[9px] text-muted/60 font-mono">TXN: {item.id.slice(0, 10).toUpperCase()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-all">
              <div className="hidden sm:flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={10} className="text-brand-success" />
                  <span className="text-[8px] font-bold text-brand-success uppercase tracking-widest">Verified</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-muted/40 group-hover:text-brand-primary transition-colors" />
            </div>
          </motion.div>
        );
      })}
      
      {activity.length === 0 && (
         <div className="py-12 text-center border border-dashed border-base rounded-2xl bg-surface/20">
           <Pulse size={24} className="mx-auto text-muted/20 mb-3" />
           <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em]">
             System Idle • No Active Logs
           </p>
         </div>
      )}
    </div>
  );
}

// Helper to avoid import bloat
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
