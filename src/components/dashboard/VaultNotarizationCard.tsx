import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ExternalLink, Shield } from 'lucide-react';
import { useNotarizationStore } from '../../store/useNotarizationStore';
import Button from '../ui/Button';
import { toast } from 'react-hot-toast';

export default function VaultNotarizationCard() {
  const { notarizeVault, getLatestHash } = useNotarizationStore();
  const [isNotarizing, setIsNotarizing] = useState(false);
  const latestHash = getLatestHash();

  const handleNotarize = async () => {
    setIsNotarizing(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    await notarizeVault("manual_notarization", { timestamp: Date.now() });
    setIsNotarizing(false);
    toast.success("Vault successfully notarized on blockchain!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism rounded-2xl p-6 relative overflow-hidden border border-emerald-500/30 shadow-[0_4px_20px_rgba(16,185,129,0.05)]"
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-semibold text-text flex items-center gap-2">
          Vault Notarized <ShieldCheck className="text-emerald-500" size={20} />
        </h3>
        <Shield size={60} className="absolute -top-4 -right-4 text-emerald-500/10 pointer-events-none" />
      </div>

      {latestHash ? (
        <div className="space-y-3 mb-6 relative z-10">
          <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
            <span className="text-muted">Last Notarized</span>
            <span className="text-text font-medium">{new Date(latestHash.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
            <span className="text-muted">Network</span>
            <span className="text-purple-400 font-medium capitalize flex items-center gap-1">{latestHash.chain}</span>
          </div>
          <div className="flex flex-col gap-1 text-sm pt-1">
            <span className="text-muted">Transaction Hash</span>
            <div className="bg-surface p-2 rounded truncate text-xs font-mono text-emerald-400 border border-emerald-500/20">
              {latestHash.blockchainRef}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-sm text-muted mb-6 bg-surface/50 p-4 rounded-xl border border-border">
          Your vault hasn't been notarized yet. Timestamp your instructions on the blockchain to make them legally defensible.
        </div>
      )}

      <div className="flex gap-2 relative z-10">
        <Button 
          variant="primary" 
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white border-none"
          onClick={handleNotarize}
          disabled={isNotarizing}
        >
          {isNotarizing ? 'Anchoring...' : 'Notarize Now'}
        </Button>
        {latestHash && (
          <Button variant="secondary" className="px-3" title="View on Explorer">
             <ExternalLink size={18} />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
