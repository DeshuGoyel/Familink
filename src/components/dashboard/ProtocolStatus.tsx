import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Lock } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ProtocolStatusProps {
  isCollapsed?: boolean;
}

export default function ProtocolStatus({ isCollapsed }: ProtocolStatusProps) {
  return (
    <div className={cn(
      "mb-4 rounded-2xl bg-raised/30 border border-base/40 relative overflow-hidden group transition-all duration-300",
      isCollapsed ? "mx-1 p-2 cursor-help" : "mx-3 p-4"
    )}>
      {isCollapsed && (
        <div className="absolute left-full top-0 ml-4 p-3 bg-raised border border-border-base rounded-xl text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-x-[-4px] group-hover:translate-x-0 pointer-events-none z-[60] shadow-xl min-w-[200px]">
          <div className="font-bold text-primary mb-1 text-left">ZK-Protocol Active</div>
          <div className="text-[10px] text-muted mb-2 text-left font-mono">Sovereign Layer 2 SECURE</div>
          <div className="flex justify-between items-center text-[9px] font-medium text-muted uppercase tracking-wider">
            <span>Vault Health</span>
            <span className="text-brand-success font-bold">100%</span>
          </div>
        </div>
      )}
      {/* Background Pulse */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-4 -bottom-4"
        >
          <Activity size={80} className="text-brand-primary" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "mb-3")}>
          <div className="relative">
            <ShieldCheck size={16} className="text-brand-success" />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-brand-success/20 rounded-full blur-sm"
            />
          </div>
          {!isCollapsed && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Protocol Active</span>
          )}
        </div>

        {!isCollapsed && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[9px] font-medium text-muted uppercase tracking-wider">
              <span>ZK-Vault Health</span>
              <span className="text-brand-success font-bold">100%</span>
            </div>
            <div className="h-1 bg-page rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                className="h-full bg-brand-success"
              />
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <Lock size={10} className="text-brand-primary" />
              <span className="text-[9px] font-bold text-muted uppercase tracking-widest">Sovereign Layer 2 SECURE</span>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="flex flex-col items-center gap-2 mt-2">
             <div className="w-1 h-1 rounded-full bg-brand-success animate-ping" />
             <Lock size={12} className="text-muted/40" />
          </div>
        )}
      </div>
    </div>
  );
}
