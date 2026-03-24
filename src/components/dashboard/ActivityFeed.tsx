import { useStore } from '../../store/useStore';
import { Lock, User, FileText, Key, Mail } from 'lucide-react';

const icons: Record<string, any> = { Lock, User, FileText, Key, Mail };

export default function ActivityFeed() {
  const { activity } = useStore();

  return (
    <div className="space-y-4">
      {activity.map((item) => {
        const Icon = icons[item.icon] || Lock;
        return (
          <div key={item.id} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-surface transition-colors">
            <div className="mt-0.5 p-2 bg-primary/10 text-primary rounded-lg">
              <Icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">{item.message}</p>
              <p className="text-xs text-muted mt-1">{item.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
