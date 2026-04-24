import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScrollText, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Activity, 
  Info,
  Clock,
  Shield,
  LogIn,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { opsApi } from '../../../lib/opsApi';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import toast from 'react-hot-toast';
import { cn } from '../../../utils/cn';

interface AuditLog {
  id: string;
  admin_id: string | null;
  admin_email: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: any | null;
  ip_address: string | null;
  created_at: string;
}

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterAction, setFilterAction] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const ACTIONS = ['login', 'change_password', 'create_admin', 'delete_admin', 'create_role', 'update_role', 'delete_role', 'update_branding', 'update_cms'];

  useEffect(() => {
    fetchLogs();
  }, [filterAction]);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const data = await opsApi.get<AuditLog[]>('/ops/logs', {
        params: {
          ...(filterAction ? { action: filterAction } : {}),
          limit: '100'
        }
      });
      setLogs(data || []);
    } catch (err) {
      toast.error('Failed to load activity logs');
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    (log.admin_email?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
    (log.action?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
    (log.entity_type?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
  );

  const getActionIcon = (action: string) => {
    const act = action || '';
    if (act.includes('login')) return <LogIn className="w-3.5 h-3.5 text-blue-400" />;
    if (act.includes('admin')) return <User className="w-3.5 h-3.5 text-indigo-400" />;
    if (act.includes('role')) return <Shield className="w-3.5 h-3.5 text-amber-400" />;
    if (act.includes('branding') || act.includes('settings') || act.includes('cms')) return <Activity className="w-3.5 h-3.5 text-emerald-400" />;
    return <ScrollText className="w-3.5 h-3.5 text-slate-400" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ScrollText className="text-indigo-500" />
            Audit Logs
          </h1>
          <p className="text-slate-400 text-sm mt-1">Immutable trail of administrative actions and system events</p>
        </div>
        <button 
          onClick={fetchLogs}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all hover:bg-slate-800"
        >
          <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
        </button>
      </div>

      <Card className="bg-slate-900/40 border-slate-800 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search logs by email, action, or entity..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500 ml-2" />
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 min-w-[160px]"
            >
              <option value="">All Actions</option>
              {ACTIONS.map(a => (
                <option key={a} value={a}>{a.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {isLoading ? (
          <div className="py-20 text-center text-slate-500">Retrieving system logs...</div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-20 text-center text-slate-500 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl">
            No activity logs found for the current criteria.
          </div>
        ) : filteredLogs.map((log) => (
          <div key={log.id} className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "group flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-900/40 border transition-all hover:bg-slate-900/60 rounded-2xl",
                expandedLog === log.id ? "border-indigo-500/50 bg-slate-900/80" : "border-slate-800/50"
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center justify-center shrink-0">
                {getActionIcon(log.action)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-white capitalize">{(log.action || 'Unknown').replace('_', ' ')}</span>
                  <ArrowRight className="w-3 h-3 text-slate-700" />
                  <span className="text-xs font-medium text-slate-400 truncate max-w-[200px]">
                    {log.entity_type ? `${log.entity_type}: ` : ''}
                    <span className="text-indigo-400/80 font-mono text-[10px]">{log.entity_id || 'system'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <User className="w-3 h-3" />
                    <span className="font-medium text-slate-400">{log.admin_email || 'System Auth'}</span>
                  </div>
                  {log.ip_address && (
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 border-l border-slate-800 pl-3">
                      <Activity className="w-3 h-3" />
                      <span>{log.ip_address}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-1 rounded-md border border-slate-800">
                  <Clock className="w-3 h-3" />
                  {new Date(log.created_at).toLocaleTimeString()}
                  <span className="mx-1 text-slate-800">|</span>
                  {new Date(log.created_at).toLocaleDateString()}
                </div>
                {log.metadata && (
                  <button 
                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group/meta transition-colors"
                  >
                    <Info className="w-3 h-3" />
                    {expandedLog === log.id ? "Hide Details" : "View Details"}
                  </button>
                )}
              </div>
            </motion.div>
            
            <AnimatePresence>
              {expandedLog === log.id && log.metadata && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mx-4 p-4 bg-slate-950 border-x border-b border-indigo-500/20 rounded-b-2xl">
                    <pre className="text-[10px] font-mono text-slate-400 overflow-x-auto custom-scrollbar p-2 bg-slate-900/50 rounded-lg">
                      {JSON.stringify(log.metadata, null, 2)}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
