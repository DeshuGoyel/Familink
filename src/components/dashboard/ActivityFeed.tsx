import { useStore } from '../../store/useStore';
import { Lock, User, FileText, Key, Mail, ChevronRight } from 'lucide-react';

const icons: Record<string, any> = { Lock, User, FileText, Key, Mail };

export default function ActivityFeed() {
  const { activity } = useStore();

  return (
    <div className="space-y-2">
      {activity.map((item, index) => {
        const Icon = icons[item.icon] || Lock;
        // Mock status based on index for visual variety
        const statusColor = index % 3 === 0 ? 'text-brand-primary bg-brand-primary/10 border-brand-primary/20' 
                          : index % 3 === 1 ? 'text-brand-gold bg-brand-gold/10 border-brand-gold/20' 
                          : 'text-trust-500 bg-trust-500/10 border-trust-500/20';

        return (
          <div 
            key={item.id} 
            className="group flex items-center justify-between p-4 rounded-2xl bg-surface/30 border border-base/50 hover:bg-surface hover:border-base transition-all cursor-default"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${statusColor} transition-colors group-hover:scale-105`}>
                <Icon size={16} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-primary truncate group-hover:text-vault-50 transition-colors tracking-tight">
                  {item.message}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted font-bold uppercase tracking-widest">{item.time}</span>
                  <span className="w-1 h-1 rounded-full bg-base" />
                  <span className="text-[10px] text-secondary font-mono tracking-tighter">ID: {item.id.slice(0, 8)}</span>
                </div>
              </div>
            </div>
            
            <button className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-page transition-all">
              <ChevronRight size={16} className="text-muted" />
            </button>
          </div>
        );
      })}
      
      {activity.length === 0 && (
         <div className="py-8 text-center text-[10px] text-muted font-bold uppercase tracking-widest border border-dashed border-base rounded-2xl">
           No recent activity logs.
         </div>
      )}
    </div>
  );
}
