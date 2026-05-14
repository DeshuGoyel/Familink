import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Wallet, Plus, Edit2, Trash2, Box, TrendingUp, Briefcase, FileText, Globe, Search, Shield, LayoutGrid, List } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { useForm as useRHForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateProjection } from '../utils/mathUtils';
import Card from '../components/ui/Card';

const assetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  value: z.number().optional().or(z.nan()),
  notes: z.string().optional()
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
});

export default function Assets() {
  const { assets, addAsset, updateAsset, deleteAsset } = useStore();
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const tabs = ['All', 'Crypto', 'NFTs', 'Documents', 'Accounts', 'Institutional', 'Other'];
  
  const filteredAssets = activeTab === 'All' 
    ? assets 
    : assets.filter(a => {
        if (activeTab === 'Crypto') return a.type === 'Crypto' || a.type === 'Wallet';
        if (activeTab === 'NFTs') return a.type === 'NFT';
        if (activeTab === 'Documents') return a.type === 'Document' || a.type === 'Legal';
        if (activeTab === 'Accounts') return a.type === 'Account' || a.type === 'Login';
        if (activeTab === 'Institutional') return a.type === 'Retirement' || a.type === 'Bank';
        return a.type === activeTab;
      });

  const totalValue = assets.reduce((acc, a) => acc + (a.value || 0), 0);

  const { register, handleSubmit, reset, formState: { errors } } = useRHForm({
    resolver: zodResolver(assetSchema)
  });

  const onSubmit = (data: unknown) => {
    if (editingId) {
      updateAsset(editingId, { ...data, date: new Date().toISOString().split('T')[0] });
      toast.success('Vault record updated');
    } else {
      addAsset({
        ...data,
        status: 'Protected',
        date: new Date().toISOString().split('T')[0],
        tags: [data.type.toLowerCase()]
      });
      toast.success('Asset secured in vault');
    }
    setIsModalOpen(false);
    setEditingId(null);
    reset();
  };

  const openAddModal = () => {
    setEditingId(null);
    reset({ name: '', type: '', value: undefined, notes: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (asset: unknown) => {
    setEditingId(asset.id);
    reset(asset);
    setIsModalOpen(true);
  };

  const handleQuickAddInstitutional = () => {
    addAsset({
      name: 'Capital Trust Retirement',
      type: 'Retirement',
      value: 150000,
      growthRate: 0.07,
      status: 'Protected',
      date: new Date().toISOString().split('T')[0],
      tags: ['retirement', 'institutional', 'long-term'],
      notes: 'Institutional retirement fund. Managed via primary brokerage.'
    } as unknown);
    toast.success('Institutional template added');
  };

  return (
    <div className="min-h-screen bg-page text-primary selection:bg-brand-primary/30 pt-6">
      <main className="px-4 sm:px-6 lg:px-8 pb-28 md:pb-12 max-w-7xl mx-auto space-y-10">
        
        {/* ── Page Header ── */}
        <motion.header {...fadeUp(0)} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(79,92,255,0.8)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                Asset Inventory Protocol
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-display font-bold text-primary tracking-tight leading-none">
              Asset <span className="italic text-brand-primary">Vault</span>
            </h1>
            <p className="text-muted text-sm font-medium max-w-xl">
              Securely archive your entire digital and institutional portfolio. {assets.length} items currently protected with <span className="text-obsidian-200">${totalValue.toLocaleString()}</span> in institutional value.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => handleQuickAddInstitutional()} variant="secondary" className="h-12 px-8 text-[10px] font-bold uppercase tracking-widest border-base">
              <Briefcase size={16} className="mr-2" /> Quick Template
            </Button>
            <Button onClick={openAddModal} variant="primary" className="h-12 px-8 text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-brand-primary/10">
              <Plus size={18} className="mr-2" /> Add New Asset
            </Button>
          </div>
        </motion.header>

        {/* ── Tabs / Search / View Toggle ── */}
        <motion.div {...fadeUp(0.05)} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-base/60 pb-6">
          <div className="flex space-x-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl whitespace-nowrap text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab 
                  ? 'bg-surface/80 text-brand-primary shadow-xl border border-base' 
                  : 'text-primary0 hover:text-secondary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group flex-1 lg:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian-600 group-focus-within:text-brand-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search protocol records..."
                className="bg-surface border border-base rounded-2xl pl-11 pr-4 py-3 text-sm text-obsidian-200 focus:border-brand-primary/50 w-full lg:w-72 transition-all placeholder:text-obsidian-700"
              />
            </div>
            <div className="flex bg-surface border border-base rounded-xl p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-surface/80 text-brand-primary shadow-sm' : 'text-obsidian-600'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-surface/80 text-brand-primary shadow-sm' : 'text-obsidian-600'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Asset Content ── */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredAssets.map((asset, i) => (
                <Card
                  key={asset.id}
                  {...fadeUp(0.1 + i * 0.05)}
                  className="p-8 group hover:border-brand-primary/30 transition-all cursor-default bg-surface/40 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 rounded-2xl bg-page flex items-center justify-center border border-base group-hover:bg-brand-primary/10 group-hover:border-brand-primary/30 transition-all duration-500 shadow-inner">
                        {asset.type === 'Crypto' ? <Wallet size={24} className="text-orange-400" /> :
                         asset.type === 'NFT' ? <Box size={24} className="text-pink-400" /> :
                         asset.type === 'Retirement' ? <Briefcase size={24} className="text-trust-500" /> :
                         asset.type === 'Document' ? <FileText size={24} className="text-brand-primary" /> :
                         <Globe size={24} className="text-brand-primary" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-primary tracking-tight group-hover:text-vault-50 transition-colors">{asset.name}</h3>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary0 mt-1">{asset.type}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <Badge variant={asset.status === 'Protected' ? 'success' : 'warning'} className="text-[9px] font-bold uppercase tracking-widest px-3">
                         {asset.status === 'Protected' ? 'Encrypted' : asset.status}
                       </Badge>
                       <Shield size={14} className="text-brand-primary/40" />
                    </div>
                  </div>
                  
                  {/* Projections */}
                  {((asset as unknown).growthRate || asset.type === 'Retirement' || asset.type === 'Crypto') && (
                    <div className="mb-8 p-5 bg-page/80 rounded-2xl border border-base/40 group-hover:border-brand-primary/10 transition-colors shadow-inner">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp size={12} className="text-trust-500" />
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-obsidian-600">Archival Projection</span>
                        </div>
                        <span className="text-[9px] font-bold text-trust-500/60 uppercase">10Y @ 7%</span>
                      </div>
                      <p className="text-2xl font-bold tracking-tight tabular-nums text-trust-500">
                        ${calculateProjection(asset.value || 0, (asset as unknown).growthRate || 0.07, 10).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-auto pt-8 border-t border-base/60 flex justify-between items-end">
                    <div>
                      <p className="text-[9px] font-bold text-obsidian-600 uppercase tracking-widest mb-1.5">Current Valuation</p>
                      <p className="text-3xl font-bold tracking-tight tabular-nums text-primary">${asset.value?.toLocaleString() || '0'}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => openEditModal(asset)} 
                        className="p-3 bg-page hover:bg-surface/80 rounded-xl text-primary0 hover:text-brand-primary transition-all border border-base hover:border-brand-primary/30 shadow-inner"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => { deleteAsset(asset.id); toast.success('Removed from vault'); }} 
                        className="p-3 bg-page hover:bg-red-500/10 rounded-xl text-obsidian-700 hover:text-red-500 transition-all border border-base hover:border-red-500/30 shadow-inner"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-surface/40 rounded-[32px] border border-base/60 overflow-hidden"
            >
              <table className="w-full text-left">
                <thead className="bg-page border-b border-base">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary0">Asset Designation</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary0">Type</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary0">Valuation</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary0">Protocol Status</th>
                    <th className="px-8 py-5 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-obsidian-800/60">
                  {filteredAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-surface/80/20 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-page flex items-center justify-center border border-base group-hover:border-brand-primary/30 transition-colors">
                            {asset.type === 'Crypto' ? <Wallet size={18} className="text-orange-400" /> :
                             asset.type === 'NFT' ? <Box size={18} className="text-pink-400" /> :
                             asset.type === 'Retirement' ? <Briefcase size={18} className="text-trust-500" /> :
                             asset.type === 'Document' ? <FileText size={18} className="text-brand-primary" /> :
                             <Globe size={18} className="text-brand-primary" />}
                          </div>
                          <span className="font-display font-bold text-primary">{asset.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-xs text-muted font-bold uppercase tracking-widest">{asset.type}</td>
                      <td className="px-8 py-6 font-bold tracking-tight tabular-nums text-primary">${asset.value?.toLocaleString()}</td>
                      <td className="px-8 py-6">
                        <Badge variant={asset.status === 'Protected' ? 'success' : 'warning'} className="text-[9px] font-bold uppercase tracking-widest px-3">
                          {asset.status === 'Protected' ? 'Encrypted' : asset.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button onClick={() => openEditModal(asset)} className="p-2 text-obsidian-600 hover:text-brand-primary transition-colors"><Edit2 size={16}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredAssets.length === 0 && (
          <motion.div {...fadeUp(0.2)} className="text-center py-32 bg-surface/30 rounded-[40px] border border-dashed border-base/60">
            <div className="w-20 h-20 bg-page rounded-3xl flex items-center justify-center mx-auto mb-6 border border-base shadow-inner">
              <Box size={32} className="text-obsidian-700" />
            </div>
            <h3 className="text-2xl font-display font-bold text-obsidian-200">Vault Empty</h3>
            <p className="text-primary0 text-sm mt-2 max-w-xs mx-auto font-medium">No archived records found in the {activeTab} sector. Initiate your first security protocol.</p>
            <Button onClick={openAddModal} variant="primary" className="mt-8 px-10 py-3 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Plus size={18} className="mr-2" /> Secure Asset
            </Button>
          </motion.div>
        )}
      </main>

      {/* ── Security Input Modal ── */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingId(null); reset(); }} title={editingId ? "Update Protocol Record" : "New Security Protocol"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <Select 
            label="Asset Sector"
            {...register('type')}
            error={errors.type?.message as string}
            options={[
              { value: '', label: 'Select Sector' },
              { value: 'Crypto', label: 'Cryptocurrency / Web3' },
              { value: 'NFT', label: 'Digital Collectible' },
              { value: 'Retirement', label: 'Institutional Retirement' },
              { value: 'Document', label: 'Legacy Document' },
              { value: 'Account', label: 'Authorized Login' },
            ]}
          />
          <Input 
            label="Designation"
            placeholder="e.g. Primary Institutional Custody"
            {...register('name')}
            error={errors.name?.message as string}
          />
          <Input 
            label="Market Valuation (USD)"
            type="number"
            {...register('value', { valueAsNumber: true })}
            placeholder="0.00"
          />
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary0 ml-1">Succession Protocol Instructions</label>
            <textarea 
              className="w-full bg-page border border-base rounded-2xl px-5 py-4 text-obsidian-100 text-sm focus:border-brand-primary/50 transition-all placeholder:text-obsidian-800 leading-relaxed min-h-[140px]"
              rows={4}
              placeholder="Detail the specific distribution mandates for this asset..."
              {...register('notes')}
            ></textarea>
          </div>
          <Button variant="primary" fullWidth type="submit" className="h-14 mt-6 text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-brand-primary/20">
            {editingId ? 'Update Record' : 'Initiate Security Protocol'}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
