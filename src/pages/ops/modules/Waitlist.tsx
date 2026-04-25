import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Search, Download, Trash2, Tag, Calendar, MoreHorizontal } from 'lucide-react';
import { opsApi } from '../../../lib/opsApi';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import toast from 'react-hot-toast';

export default function WaitlistManager() {
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const data = await opsApi.get<any[]>('/ops/waitlist');
      setEntries(data);
    } catch (err) {
      toast.error('Failed to load waitlist');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEntries = entries.filter(e => 
    e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.name && e.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleExport = () => {
    const headers = ['ID', 'Email', 'Name', 'Joined At', 'Metadata'];
    const csv = [
      headers.join(','),
      ...filteredEntries.map(e => [
        e.id,
        e.email,
        e.name || '',
        new Date(e.created_at).toISOString(),
        JSON.stringify(e.meta || {})
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `waitlist_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="text-indigo-500" />
            Waitlist Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Tracking {entries.length} early adopters and potential clients
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="default" 
            className="rounded-xl flex items-center gap-2 border-slate-800"
            onClick={handleExport}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search signups by email or name..."
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card className="bg-slate-900/40 border-slate-800 rounded-2xl overflow-hidden p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/30 text-slate-400 text-xs uppercase tracking-widest font-bold">
              <th className="px-6 py-4">Participant</th>
              <th className="px-6 py-4">Tags/Source</th>
              <th className="px-6 py-4">Joined At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {isLoading ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500 whitespace-pre">Loading signups...</td></tr>
            ) : filteredEntries.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">No entries found matching your search</td></tr>
            ) : filteredEntries.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{entry.email}</div>
                      <div className="text-xs text-slate-500">{entry.name || 'Anonymous User'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {entry.meta?.source ? (
                      <Badge variant="info" className="text-[10px]">
                        {entry.meta.source}
                      </Badge>
                    ) : (
                      <Badge variant="default" className="text-[10px] opacity-50">
                        organic
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(entry.created_at).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-500 hover:text-white transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </motion.div>
  );
}
