import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { X, Key, User, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const icons: Record<string, any> = {
  Key, User, FileText, AlertTriangle, CheckCircle
};

export default function NotificationDrawer() {
  const { notifications, isNotificationOpen, toggleNotifications, markNotificationAsRead } = useStore();

  return (
    <AnimatePresence>
      {isNotificationOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed inset-y-0 right-0 w-80 bg-surface/95 backdrop-blur-xl border-l border-border z-[100] shadow-2xl flex flex-col pt-16"
        >
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-semibold text-text">Notifications</h2>
            <button onClick={toggleNotifications} className="text-muted hover:text-text transition">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {notifications.length === 0 ? (
              <p className="text-muted text-center pt-8">No notifications</p>
            ) : (
              notifications.map((n) => {
                const Icon = icons[n.icon] || AlertTriangle;
                return (
                  <button 
                    key={n.id} 
                    onClick={() => !n.read && markNotificationAsRead(n.id)}
                    className={`p-4 rounded-xl glassmorphism flex items-start space-x-3 w-full text-left transition-colors ${!n.read ? 'border-primary/50 bg-primary/5 hover:bg-primary/10' : 'hover:bg-surface'}`}
                  >
                    <div className={`p-2 rounded-full ${!n.read ? 'bg-primary/20 text-primary' : 'bg-surface text-muted'}`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${!n.read ? 'text-text font-medium' : 'text-muted'}`}>{n.message}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
