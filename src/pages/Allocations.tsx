import { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { PieChart, HeartHandshake, Box, Wallet, Users, Plus, Trash2, ArrowRight, AlertCircle, Briefcase, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Allocations() {
  const { assets, heirs, charities, allocations, addAllocation, updateAllocation, removeAllocation } = useStore();
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(assets.length > 0 ? assets[0].id : null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'heir' | 'charity'>('heir');

  const selectedAsset = assets.find(a => a.id === selectedAssetId);
  const assetAllocations = allocations.filter(a => a.assetId === selectedAssetId);
  const totalAllocated = assetAllocations.reduce((sum, a) => sum + a.percentage, 0);
  const remainingPercent = 100 - totalAllocated;

  const handleSliderChange = (id: string, newValue: number, oldValue: number) => {
    const diff = newValue - oldValue;
    if (diff > remainingPercent) {
      updateAllocation(id, oldValue + remainingPercent);
    } else {
      updateAllocation(id, newValue);
    }
  };

  const addRecipient = (recipientId: string, type: 'heir' | 'charity') => {
    if (assetAllocations.find(a => a.recipientId === recipientId)) {
      toast.error('Recipient already added to this asset');
      return;
    }
    if (remainingPercent <= 0) {
      toast.error('Asset is fully allocated. Reduce another recipient first.');
      return;
    }
    addAllocation({
      assetId: selectedAssetId!,
      recipientId,
      type,
      percentage: Math.min(25, remainingPercent) // Auto assign either 25% or remainder
    });
    setIsModalOpen(false);
    toast.success('Recipient added');
  };

  const getRecipientDetails = (a: any) => {
    if (a.type === 'heir') {
      const h = heirs.find(heir => heir.id === a.recipientId);
      return { name: h?.name || 'Unknown', icon: Users, color: '#4F5CFF' }; // primary
    } else {
      const c = charities.find(charity => charity.id === a.recipientId);
      return { name: c?.name || 'Unknown', icon: HeartHandshake, color: '#10B981' }; // emerald
    }
  };

  const chartData = useMemo(() => {
    const data = assetAllocations.map(a => {
      const details = getRecipientDetails(a);
      return { name: details.name, value: a.percentage, color: details.color };
    });
    if (remainingPercent > 0) {
      data.push({ name: 'Unallocated', value: remainingPercent, color: 'rgba(255,255,255,0.1)' });
    }
    return data;
  }, [assetAllocations, remainingPercent]);

  return (
    <div className="min-h-screen bg-secondary">
      <main className="pt-6 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text flex items-center gap-3">
                Smart Allocations
              </h1>
              <p className="text-muted mt-1">Precisely route your assets to heirs or charities after unlocking.</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Asset List Sidebar */}
            <div className="lg:col-span-1 border border-border rounded-2xl bg-surface/50 overflow-hidden flex flex-col h-[600px]">
              <div className="p-4 border-b border-border bg-surface/80">
                <h2 className="font-semibold text-text uppercase text-xs tracking-wider">Vault Assets</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
                {assets.length === 0 ? (
                  <div className="p-4 text-center text-muted text-sm my-10">No assets in vault.</div>
                ) : (
                  assets.map(asset => (
                    <button
                      key={asset.id}
                      onClick={() => setSelectedAssetId(asset.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${
                        selectedAssetId === asset.id 
                          ? 'bg-primary/20 border border-primary/50 text-text shadow-[0_0_15px_rgba(79,92,255,0.1)]' 
                          : 'bg-transparent border border-transparent text-muted hover:bg-surface-light border-border/50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${selectedAssetId === asset.id ? 'bg-primary text-white' : 'bg-surface border border-border'}`}>
                        {asset.type === 'Crypto' ? <Wallet size={16} /> :
                         asset.type === 'Retirement' ? <Briefcase size={16} /> : <Box size={16} />}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-medium text-sm truncate">{asset.name}</p>
                        <p className="text-xs opacity-70">${asset.value?.toLocaleString() || 0}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Distribution Canvas */}
            <div className="lg:col-span-3 border border-border rounded-2xl bg-surface/50 overflow-hidden flex flex-col min-h-[600px] relative">
              {!selectedAssetId || !selectedAsset ? (
                <div className="flex-1 flex flex-col items-center justify-center text-muted p-6">
                  <PieChart size={48} className="mb-4 opacity-20" />
                  <p>Select an asset from the list to manage its distributions.</p>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-border bg-surface flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-text">{selectedAsset.name}</h2>
                      <p className="text-sm text-muted">Total Value: <strong className="text-primary">${selectedAsset.value?.toLocaleString() || 0}</strong></p>
                    </div>
                    <div className={`px-4 py-2 rounded-xl border text-sm font-medium flex items-center gap-2 ${
                      remainingPercent === 0 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                    }`}>
                      {remainingPercent === 0 ? <ShieldCheck size={16} /> : <AlertCircle size={16} />}
                      {remainingPercent === 0 ? '100% Allocated' : `${remainingPercent}% Unassigned`}
                    </div>
                  </div>

                  <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    
                    {/* Allocation Sliders */}
                    <div className="space-y-4 w-full">
                      <div className="flex justify-between items-end mb-6">
                        <h3 className="font-semibold text-text">Recipients</h3>
                        <Button variant="secondary" onClick={() => setIsModalOpen(true)} className="h-8 text-xs py-0">
                          <Plus size={14} className="mr-1" /> Add
                        </Button>
                      </div>

                      {assetAllocations.length === 0 ? (
                         <div className="p-6 text-center border border-dashed border-border/50 rounded-xl bg-surface/20">
                           <p className="text-muted text-sm mb-4">No recipients assigned to this asset yet.</p>
                           <Button onClick={() => setIsModalOpen(true)}>Add Recipient</Button>
                         </div>
                      ) : (
                        <div className="space-y-4">
                          <AnimatePresence>
                            {assetAllocations.map(a => {
                              const details = getRecipientDetails(a);
                              const Icon = details.icon;
                              const valueAmount = (selectedAsset.value || 0) * (a.percentage / 100);
                              
                              return (
                                <motion.div 
                                  key={a.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  className="p-4 bg-surface rounded-xl border border-border/50 space-y-3"
                                >
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                      <div className="p-1.5 rounded-lg bg-background border border-border/50" style={{ color: details.color }}>
                                        <Icon size={14} />
                                      </div>
                                      <span className="font-medium text-sm text-text">{details.name}</span>
                                      <span className="text-[10px] uppercase tracking-wider text-muted ml-2">{a.type}</span>
                                    </div>
                                    <button onClick={() => removeAllocation(a.id)} className="text-muted hover:text-red-500 transition-colors">
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                  
                                  <div className="flex items-center gap-4">
                                    <input 
                                      type="range" 
                                      min="1" 
                                      max="100" 
                                      value={a.percentage}
                                      onChange={(e) => handleSliderChange(a.id, parseInt(e.target.value), a.percentage)}
                                      className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary" 
                                    />
                                    <span className="w-12 text-right font-mono font-bold text-primary">{a.percentage}%</span>
                                  </div>
                                  
                                  <div className="text-right text-xs text-muted">
                                    Est. Value: ${valueAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>

                    {/* Visual Chart */}
                    <div className="flex flex-col items-center justify-center p-6 bg-surface/30 rounded-2xl border border-border/50 h-[350px]">
                       <ResponsiveContainer width="100%" height="100%">
                          <RePieChart>
                            <Pie
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                              stroke="none"
                            >
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value: any) => [`${value}%`, 'Allocation']}
                              contentStyle={{ backgroundColor: 'rgb(24 24 27)', border: '1px solid rgb(39 39 42)', borderRadius: '12px' }}
                            />
                          </RePieChart>
                       </ResponsiveContainer>
                       {assetAllocations.length > 0 && (
                         <div className="mt-4 flex flex-wrap gap-4 justify-center">
                            {chartData.map((d, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-xs">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></span>
                                <span className="text-muted">{d.name}</span>
                              </div>
                            ))}
                         </div>
                       )}
                    </div>

                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Select Recipient">
         <div className="flex p-1 bg-surface rounded-xl border border-border mb-6">
           <button 
             onClick={() => setModalTab('heir')}
             className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${modalTab === 'heir' ? 'bg-primary text-white shadow-md' : 'text-muted hover:text-text'}`}
           >
             My Heirs
           </button>
           <button 
             onClick={() => setModalTab('charity')}
             className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1 ${modalTab === 'charity' ? 'bg-emerald-500 text-white shadow-md' : 'text-muted hover:text-text'}`}
           >
             <HeartHandshake size={14} /> Charities
           </button>
         </div>

         <div className="max-h-80 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
           {modalTab === 'heir' ? (
             heirs.length === 0 ? <p className="text-center text-muted p-4">You have not added any heirs.</p> :
             heirs.map(heir => (
               <button 
                 key={heir.id}
                 onClick={() => addRecipient(heir.id, 'heir')}
                 className="w-full text-left p-4 rounded-xl border border-border bg-surface hover:border-primary/50 transition-colors flex justify-between items-center group"
               >
                 <div>
                   <p className="font-semibold text-text">{heir.name}</p>
                   <p className="text-xs text-muted">{heir.email}</p>
                 </div>
                 <ArrowRight size={16} className="text-muted group-hover:text-primary transition-colors" />
               </button>
             ))
           ) : (
             charities.map(charity => (
               <button 
                 key={charity.id}
                 onClick={() => addRecipient(charity.id, 'charity')}
                 className="w-full text-left p-4 rounded-xl border border-border bg-surface hover:border-emerald-500/50 transition-colors flex justify-between items-center group"
               >
                 <div className="pr-4">
                   <p className="font-semibold text-text">{charity.name}</p>
                   <p className="text-[10px] text-emerald-500 uppercase tracking-wider mb-1">{charity.category}</p>
                   <p className="text-xs text-muted line-clamp-2">{charity.description}</p>
                 </div>
                 <Plus size={16} className="text-muted group-hover:text-emerald-500 transition-colors flex-shrink-0" />
               </button>
             ))
           )}
         </div>
      </Modal>
    </div>
  );
}
