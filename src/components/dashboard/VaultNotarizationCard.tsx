import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ExternalLink, Shield, RefreshCw } from 'lucide-react';
import { useNotarizationStore } from '../../store/useNotarizationStore';
import { toast } from 'react-hot-toast';

export default function VaultNotarizationCard() {
  const { notarizeVault, getLatestHash } = useNotarizationStore();
  const [isNotarizing, setIsNotarizing] = useState(false);
  const latestHash = getLatestHash();

  const handleNotarize = async () => {
    setIsNotarizing(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 2000));
    await notarizeVault("manual_notarization", { timestamp: Date.now() });
    setIsNotarizing(false);
    toast.success("Vault successfully notarized on blockchain!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 relative overflow-hidden group hover:border-brand-primary/40 transition-all duration-500 bg-surface/30 border border-base/60 rounded-[32px]"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-lg font-display font-bold text-primary flex items-center gap-2">
            Vault Notarized <ShieldCheck className="text-emerald-500" size={20} />
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted/60 mt-1">Blockchain Anchoring</p>
        </div>
        <Shield size={60} className="absolute -top-4 -right-4 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors pointer-events-none" />
      </div>

      <div className="min-h-[140px] flex flex-col justify-center">
        {latestHash ? (
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center text-sm border-b border-base/50 pb-3">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Last Notarized</span>
              <span className="text-primary font-bold">{new Date(latestHash.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-base/50 pb-3">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Network</span>
              <span className="text-brand-primary font-bold capitalize">{latestHash.chain}</span>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Transaction Hash</span>
              <div className="bg-page/50 p-3 rounded-xl truncate text-[11px] font-mono text-emerald-400 border border-emerald-500/20 shadow-inner">
                {latestHash.blockchainRef}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-secondary font-medium mb-6 bg-page/50 p-5 rounded-2xl border border-base shadow-inner text-center">
            Your vault hasn't been notarized yet. Timestamp your instructions on the blockchain to make them legally defensible.
          </div>
        )}
      </div>

      <div className="flex gap-3 relative z-10 mt-6">
        <button 
          className={`flex-1 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg ${
            isNotarizing 
              ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 cursor-wait' 
              : 'bg-emerald-500 text-obsidian-950 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98]'
          }`}
          onClick={handleNotarize}
          disabled={isNotarizing}
        >
          {isNotarizing ? (
            <>
              <RefreshCw size={14} className="animate-spin" />
              Anchoring...
            </>
          ) : 'Notarize Now'}
        </button>
        {latestHash && (
          <button 
            className="w-14 rounded-2xl bg-surface border border-base flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary/30 transition-all"
            title="View on Explorer"
          >
             <ExternalLink size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
