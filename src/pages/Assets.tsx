import { useState, useEffect } from 'react';
import { useStore, Asset } from '../store/useStore';
import {
  Wallet, Plus, Edit2, Trash2, Box, Briefcase,
  FileText, Search, Shield, Lock, Key, Check
} from 'lucide-react';
import Badge from '../components/ui/Badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { calculateProjection } from '../utils/mathUtils';
import { cn } from '../utils/cn';

const assetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  value: z.number().optional().or(z.nan()),
  notes: z.string().optional(),
  
  // Crypto
  cryptoWalletType: z.string().optional(),
  cryptoAddress: z.string().optional(),
  cryptoNetwork: z.string().optional(),
  cryptoBackupMethod: z.string().optional(),

  // NFT
  nftCollection: z.string().optional(),
  nftTokenId: z.string().optional(),
  nftContractAddress: z.string().optional(),
  nftNetwork: z.string().optional(),

  // Document
  docType: z.string().optional(),
  docPhysicalLocation: z.string().optional(),
  docCloudUrl: z.string().optional(),
  docAccessKeys: z.string().optional(),

  // Account
  accountService: z.string().optional(),
  accountUsername: z.string().optional(),
  accountPasswordRef: z.string().optional(),
  accountMfaBackup: z.string().optional(),

  // Retirement
  retirementInstitution: z.string().optional(),
  retirementAccountNumber: z.string().optional(),
  retirementAccountType: z.string().optional(),
  retirementBeneficiary: z.string().optional()
});

const typeIconMap: Record<string, React.ElementType> = {
  crypto: Wallet,
  wallet: Wallet,
  nft: Box,
  document: FileText,
  legal: FileText,
  account: Key,
  login: Key,
  retirement: Briefcase,
  bank: Briefcase,
  institutional: Briefcase
};

function getAssetIcon(type?: string): React.ElementType {
  if (!type) return Lock;
  const key = type.toLowerCase();
  for (const k of Object.keys(typeIconMap)) {
    if (key.includes(k)) return typeIconMap[k];
  }
  return Lock;
}

export default function Assets() {
  const { assets, addAsset, updateAsset, deleteAsset, fetchAssets, heirs, guardians } = useStore();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const tabs = ['All', 'Crypto', 'NFTs', 'Documents', 'Accounts', 'Institutional', 'Other'];

  const filteredAssets = assets.filter(a => {
    // 1. Filter by search query
    const matchSearch = (a.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (a.type || '').toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchSearch) return false;

    // 2. Filter by sector tab
    if (activeTab === 'All') return true;
    const type = (a.type || '').toLowerCase();
    if (activeTab === 'Crypto') return type === 'crypto' || type === 'wallet';
    if (activeTab === 'NFTs') return type === 'nft';
    if (activeTab === 'Documents') return type === 'document' || type === 'legal';
    if (activeTab === 'Accounts') return type === 'account' || type === 'login';
    if (activeTab === 'Institutional') return type === 'retirement' || type === 'bank';
    return type !== 'crypto' && type !== 'wallet' && type !== 'nft' && 
           type !== 'document' && type !== 'legal' && type !== 'account' && 
           type !== 'login' && type !== 'retirement' && type !== 'bank';
  });

  // Keep track of the currently selected asset object
  const selectedAsset = assets.find(a => a.id === selectedAssetId) || filteredAssets[0] || null;

  // Sync selected ID if none is set or if the current choice is invalid
  useEffect(() => {
    if (selectedAsset && selectedAsset.id !== selectedAssetId) {
      setSelectedAssetId(selectedAsset.id);
    }
  }, [selectedAsset, selectedAssetId]);

  const getCount = (tab: string) => {
    return assets.filter(a => {
      if (tab === 'All') return true;
      const type = (a.type || '').toLowerCase();
      if (tab === 'Crypto') return type === 'crypto' || type === 'wallet';
      if (tab === 'NFTs') return type === 'nft';
      if (tab === 'Documents') return type === 'document' || type === 'legal';
      if (tab === 'Accounts') return type === 'account' || type === 'login';
      if (tab === 'Institutional') return type === 'retirement' || type === 'bank';
      return type !== 'crypto' && type !== 'wallet' && type !== 'nft' && 
             type !== 'document' && type !== 'legal' && type !== 'account' && 
             type !== 'login' && type !== 'retirement' && type !== 'bank';
    }).length;
  };

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(assetSchema)
  });

  const selectedType = watch('type', 'Crypto');

  const handleSelectAsset = (id: string) => {
    setSelectedAssetId(id);
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setIsEditing(false);
    reset({
      name: '',
      type: 'Crypto',
      value: 0,
      notes: '',
      cryptoWalletType: '',
      cryptoAddress: '',
      cryptoNetwork: '',
      cryptoBackupMethod: '',
      nftCollection: '',
      nftTokenId: '',
      nftContractAddress: '',
      nftNetwork: '',
      docType: '',
      docPhysicalLocation: '',
      docCloudUrl: '',
      docAccessKeys: '',
      accountService: '',
      accountUsername: '',
      accountPasswordRef: '',
      accountMfaBackup: '',
      retirementInstitution: '',
      retirementAccountNumber: '',
      retirementAccountType: '',
      retirementBeneficiary: ''
    });
  };

  const handleStartEdit = (asset: Asset) => {
    setIsEditing(true);
    setIsAdding(false);
    reset({
      name: asset.name || '',
      type: asset.type || 'Crypto',
      value: asset.value || 0,
      notes: asset.instructions || asset.notes || '',
      cryptoWalletType: asset.cryptoWalletType || '',
      cryptoAddress: asset.cryptoAddress || '',
      cryptoNetwork: asset.cryptoNetwork || '',
      cryptoBackupMethod: asset.cryptoBackupMethod || '',
      nftCollection: asset.nftCollection || '',
      nftTokenId: asset.nftTokenId || '',
      nftContractAddress: asset.nftContractAddress || '',
      nftNetwork: asset.nftNetwork || '',
      docType: asset.docType || '',
      docPhysicalLocation: asset.docPhysicalLocation || '',
      docCloudUrl: asset.docCloudUrl || '',
      docAccessKeys: asset.docAccessKeys || '',
      accountService: asset.accountService || '',
      accountUsername: asset.accountUsername || '',
      accountPasswordRef: asset.accountPasswordRef || '',
      accountMfaBackup: asset.accountMfaBackup || '',
      retirementInstitution: asset.retirementInstitution || '',
      retirementAccountNumber: asset.retirementAccountNumber || '',
      retirementAccountType: asset.retirementAccountType || '',
      retirementBeneficiary: asset.retirementBeneficiary || ''
    });
  };

  const handleCancelForm = () => {
    setIsEditing(false);
    setIsAdding(false);
    reset();
  };

  const onSubmit = async (data: z.infer<typeof assetSchema>) => {
    try {
      const notesVal = data.notes || '';
      const baseAsset = {
        name: data.name,
        type: data.type,
        value: Number(data.value) || 0,
        instructions: notesVal,
        notes: notesVal,
      };

      let categorySpecific = {};
      if (data.type === 'Crypto') {
        categorySpecific = {
          cryptoWalletType: data.cryptoWalletType || '',
          cryptoAddress: data.cryptoAddress || '',
          cryptoNetwork: data.cryptoNetwork || '',
          cryptoBackupMethod: data.cryptoBackupMethod || ''
        };
      } else if (data.type === 'NFT') {
        categorySpecific = {
          nftCollection: data.nftCollection || '',
          nftTokenId: data.nftTokenId || '',
          nftContractAddress: data.nftContractAddress || '',
          nftNetwork: data.nftNetwork || ''
        };
      } else if (data.type === 'Document') {
        categorySpecific = {
          docType: data.docType || '',
          docPhysicalLocation: data.docPhysicalLocation || '',
          docCloudUrl: data.docCloudUrl || '',
          docAccessKeys: data.docAccessKeys || ''
        };
      } else if (data.type === 'Account') {
        categorySpecific = {
          accountService: data.accountService || '',
          accountUsername: data.accountUsername || '',
          accountPasswordRef: data.accountPasswordRef || '',
          accountMfaBackup: data.accountMfaBackup || ''
        };
      } else if (data.type === 'Retirement') {
        categorySpecific = {
          retirementInstitution: data.retirementInstitution || '',
          retirementAccountNumber: data.retirementAccountNumber || '',
          retirementAccountType: data.retirementAccountType || '',
          retirementBeneficiary: data.retirementBeneficiary || ''
        };
      }

      const assetPayload = {
        ...baseAsset,
        ...categorySpecific
      };

      if (isEditing && selectedAssetId) {
        await updateAsset(selectedAssetId, assetPayload as Partial<Asset>);
        toast.success('Vault record updated');
      } else if (isAdding) {
        await addAsset({
          ...assetPayload,
          status: 'Protected',
          date: new Date().toISOString().split('T')[0],
          tags: [data.type.toLowerCase()]
        } as Omit<Asset, 'id'>);
        
        toast.success('Asset secured in vault');
      }
      setIsEditing(false);
      setIsAdding(false);
      reset();
      fetchAssets();
    } catch (err) {
      toast.error('Failed to save asset record');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to permanently delete this vault item?')) {
      await deleteAsset(id);
      toast.success('Removed from vault');
      setSelectedAssetId(null);
      fetchAssets();
    }
  };

  const handleAddTemplate = async (templateType: string) => {
    try {
      if (templateType === 'retirement') {
        await addAsset({
          name: 'Capital Trust Retirement',
          type: 'Retirement',
          value: 150000,
          growthRate: 0.07,
          status: 'Protected',
          date: new Date().toISOString().split('T')[0],
          tags: ['retirement', 'institutional', 'long-term'],
          notes: 'Institutional retirement fund. Managed via primary brokerage.'
        } as any);
        toast.success('Institutional template added');
      } else if (templateType === 'crypto') {
        await addAsset({
          name: 'Hardware Ledger (Cold Storage)',
          type: 'Crypto',
          value: 245000,
          growthRate: 0.12,
          status: 'Protected',
          date: new Date().toISOString().split('T')[0],
          tags: ['btc', 'cold'],
          notes: 'Seed phrase stored in safe. Emergency access granted to Sarah.'
        } as any);
        toast.success('Crypto Wallet template added');
      }
      fetchAssets();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-page text-primary flex flex-col lg:flex-row lg:h-[calc(100vh-56px)] lg:overflow-hidden">
      
      {/* ── COLUMN 1: Sectors (Leftmost) ── */}
      <aside className="w-full lg:w-[180px] shrink-0 border-b lg:border-b-0 lg:border-r border-base/50 bg-surface/30 p-3 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto scrollbar-none shrink-0">
        <p className="hidden lg:block px-3 py-2 text-[10px] font-semibold tracking-[0.14em] uppercase text-muted">
          Sectors
        </p>
        {tabs.map(tab => {
          const count = getCount(tab);
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsEditing(false);
                setIsAdding(false);
              }}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-[6px] text-[12px] font-medium transition-all w-auto lg:w-full whitespace-nowrap lg:whitespace-normal shrink-0",
                isActive 
                  ? "bg-brand-primary-dim border border-brand-primary/18 text-brand-primary" 
                  : "hover:bg-surface/40 text-secondary border border-transparent"
              )}
            >
              <span>{tab}</span>
              {count > 0 && (
                <span 
                  className={cn(
                    "hidden lg:inline-block text-[9px] px-1.5 py-0.5 rounded-[4px] font-mono leading-none ml-2 border",
                    isActive 
                      ? "border-brand-primary/25 bg-brand-primary-dim text-brand-primary" 
                      : "border-border-base bg-surface text-muted"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </aside>

      {/* ── COLUMN 2: Vault Item List (Center) ── */}
      <section className="w-full lg:w-[340px] shrink-0 border-b lg:border-b-0 lg:border-r border-base bg-surface/50 flex flex-col h-[380px] lg:h-full shrink-0">
        {/* Search and Action area */}
        <div className="p-4 border-b border-base flex flex-col gap-3 shrink-0">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search vault items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-page border border-border-base rounded-[8px] pl-9 pr-4 py-2 text-[13px] text-primary focus:border-brand-primary/60 placeholder:text-muted/50 outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleStartAdd}
              className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-[6px] text-[12px] font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: 'var(--color-brand-primary)' }}
            >
              <Plus size={14} /> New Record
            </button>
            <div className="relative group">
              <button
                className="h-9 px-3 rounded-[6px] text-[12px] font-medium border border-base hover:bg-surface/55 text-secondary flex items-center justify-center"
              >
                Template
              </button>
              <div className="absolute right-0 top-full mt-1 w-44 bg-surface border border-base rounded-[8px] shadow-2xl p-1.5 hidden group-hover:block z-50">
                <button
                  onClick={() => handleAddTemplate('crypto')}
                  className="w-full text-left px-2.5 py-1.5 rounded-[4px] text-[11px] font-semibold text-secondary hover:text-primary hover:bg-page flex items-center gap-2"
                >
                  <Wallet size={12} className="text-brand-primary" /> Crypto Wallet
                </button>
                <button
                  onClick={() => handleAddTemplate('retirement')}
                  className="w-full text-left px-2.5 py-1.5 rounded-[4px] text-[11px] font-semibold text-secondary hover:text-primary hover:bg-page flex items-center gap-2"
                >
                  <Briefcase size={12} className="text-brand-primary" /> Retirement Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {filteredAssets.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Lock size={20} className="mx-auto mb-2 text-muted" strokeWidth={1.5} />
              <p className="text-[13px] font-medium text-primary">No records found</p>
              <p className="text-[11px] text-muted mt-0.5">Adjust filter or add a new record.</p>
            </div>
          ) : (
            filteredAssets.map(asset => {
              const Icon = getAssetIcon(asset.type);
              const isSelected = selectedAssetId === asset.id;
              return (
                <button
                  key={asset.id}
                  onClick={() => handleSelectAsset(asset.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-left transition-colors relative group",
                    isSelected 
                      ? "bg-brand-primary-dim border border-brand-primary/18" 
                      : "hover:bg-surface border border-transparent"
                  )}
                >
                  {/* Left orange/gold accent bar */}
                  {isSelected && (
                    <span 
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3.5px] h-[22px] rounded-full bg-brand-primary"
                    />
                  )}
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-7 h-7 rounded-[6px] flex items-center justify-center shrink-0 border transition-colors",
                      isSelected
                        ? "border-brand-primary/30 bg-brand-primary-dim"
                        : "border-base bg-surface group-hover:border-base/90"
                    )}
                  >
                    <Icon size={13} style={isSelected ? { color: 'var(--color-brand-primary)' } : { color: 'var(--color-text-secondary)' }} />
                  </div>
                  {/* Title & info */}
                  <div className="flex-grow min-w-0">
                    <p className="text-[13px] font-medium text-primary truncate leading-tight">
                      {asset.name || 'Unnamed Record'}
                    </p>
                    <p className="text-[11px] text-muted truncate leading-tight mt-0.5">
                      {asset.type || 'Asset'}
                    </p>
                  </div>
                  {/* Right side status / value */}
                  <div className="text-right shrink-0">
                    {asset.value && asset.value > 0 ? (
                      <p className="text-[11px] font-semibold text-secondary">
                        ${(asset.value / 1000).toFixed(0)}k
                      </p>
                    ) : null}
                    <Badge variant={asset.status === 'Protected' ? 'success' : 'warning'} className="text-[8px] font-bold tracking-widest px-1.5 py-0 mt-0.5">
                      {asset.status === 'Protected' ? 'Encrypted' : 'Incomplete'}
                    </Badge>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </section>

      {/* ── COLUMN 3: Vault Item Detail Panel / Form Editor (Rightmost) ── */}
      <section className="flex-1 bg-page overflow-y-auto flex flex-col h-full">
        {isAdding || isEditing ? (
          /* ── INLINE FORM EDITOR ── */
          <div className="max-w-[600px] p-6 lg:p-8 space-y-6 bg-page">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-primary mb-1">
                Vault Security Editor
              </p>
              <h2 className="font-display font-light text-[24px] text-primary tracking-tight leading-tight">
                {isAdding ? 'Initiate Succession Protocol' : `Edit: ${selectedAsset?.name}`}
              </h2>
              <p className="text-[12px] text-muted mt-1">
                Archived information is client-side encrypted before sending to the server.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
                  Sector Designation
                </label>
                <select
                  {...register('type')}
                  className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2.5 text-[13px] text-primary focus:border-brand-primary/40 outline-none"
                >
                  <option value="Crypto">Cryptocurrency / Web3 Wallet</option>
                  <option value="NFT">Digital Collectible (NFT)</option>
                  <option value="Document">Legacy Document / Legal</option>
                  <option value="Account">Authorized Login / Password</option>
                  <option value="Retirement">Retirement Fund / Institutional</option>
                  <option value="Other">Other Assets</option>
                </select>
                {errors.type?.message && (
                  <p className="text-red-400 text-[11px]">{errors.type.message as string}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
                  Designation / Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. BTC Cold Vault"
                  {...register('name')}
                  className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2.5 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                />
                {errors.name?.message && (
                  <p className="text-red-400 text-[11px]">{errors.name.message as string}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
                  Market Valuation (USD)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  {...register('value', { valueAsNumber: true })}
                  className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2.5 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                />
              </div>

              {/* Category-Specific Dynamic Fields */}
              {selectedType === 'Crypto' && (
                <div className="space-y-4 p-4 rounded-xl border border-base bg-surface/30">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">Crypto Specific Details</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Wallet Type</label>
                      <select
                        {...register('cryptoWalletType')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none"
                      >
                        <option value="Hardware Wallet">Hardware Wallet (Ledger, Trezor)</option>
                        <option value="Software Wallet">Software Wallet (MetaMask, Trust)</option>
                        <option value="Exchange Account">Exchange Account (Coinbase, Binance)</option>
                        <option value="Other">Other Wallet Type</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Blockchain Network</label>
                      <input
                        type="text"
                        placeholder="e.g. Ethereum, Bitcoin, Solana"
                        {...register('cryptoNetwork')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Public Wallet Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 0x71C... or bc1q..."
                      {...register('cryptoAddress')}
                      className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Seed Phrase / Private Key Backup Location</label>
                    <input
                      type="text"
                      placeholder="e.g. In physical safe, bank vault lockbox"
                      {...register('cryptoBackupMethod')}
                      className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                    />
                  </div>
                </div>
              )}

              {selectedType === 'NFT' && (
                <div className="space-y-4 p-4 rounded-xl border border-base bg-surface/30">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">NFT Specific Details</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Collection Name / ID</label>
                      <input
                        type="text"
                        placeholder="e.g. Bored Ape Yacht Club"
                        {...register('nftCollection')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Blockchain Network</label>
                      <select
                        {...register('nftNetwork')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none"
                      >
                        <option value="Ethereum">Ethereum</option>
                        <option value="Solana">Solana</option>
                        <option value="Polygon">Polygon</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Token ID</label>
                      <input
                        type="text"
                        placeholder="e.g. 4821"
                        {...register('nftTokenId')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Contract Address</label>
                      <input
                        type="text"
                        placeholder="e.g. 0xbc4ca..."
                        {...register('nftContractAddress')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedType === 'Document' && (
                <div className="space-y-4 p-4 rounded-xl border border-base bg-surface/30">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">Document Details</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Document Type</label>
                      <select
                        {...register('docType')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none"
                      >
                        <option value="Last Will & Testament">Last Will & Testament</option>
                        <option value="Trust Agreement">Trust Agreement</option>
                        <option value="Property Deed">Property Deed / Land Document</option>
                        <option value="Life Insurance Policy">Life Insurance Policy</option>
                        <option value="Share Certificate">Share Certificate</option>
                        <option value="Other">Other Legal Document</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Physical Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Master Bedroom safe, cabinet drawer"
                        {...register('docPhysicalLocation')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Digital File URL / Cloud Path (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Google Drive Link or server path"
                      {...register('docCloudUrl')}
                      className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Safe Code / Access Instructions</label>
                    <input
                      type="text"
                      placeholder="e.g. Combo is 10-24-32, key with lawyer"
                      {...register('docAccessKeys')}
                      className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                    />
                  </div>
                </div>
              )}

              {selectedType === 'Account' && (
                <div className="space-y-4 p-4 rounded-xl border border-base bg-surface/30">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">Account Credentials Info</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Service / Platform</label>
                      <input
                        type="text"
                        placeholder="e.g. Google, Apple ID, Facebook"
                        {...register('accountService')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Username / Primary Email</label>
                      <input
                        type="text"
                        placeholder="e.g. user@gmail.com"
                        {...register('accountUsername')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Password Reference</label>
                    <input
                      type="text"
                      placeholder="e.g. Stored in 1Password, or written in paper diary"
                      {...register('accountPasswordRef')}
                      className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">2FA Recovery / Bypass Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Backup codes printed in my office cabinet"
                      {...register('accountMfaBackup')}
                      className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                    />
                  </div>
                </div>
              )}

              {selectedType === 'Retirement' && (
                <div className="space-y-4 p-4 rounded-xl border border-base bg-surface/30">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">Institutional / Retirement Fund Details</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Financial Institution</label>
                      <input
                        type="text"
                        placeholder="e.g. Fidelity, Vanguard, Charles Schwab"
                        {...register('retirementInstitution')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Account Number</label>
                      <input
                        type="text"
                        placeholder="e.g. xxx-xxxx-891"
                        {...register('retirementAccountNumber')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Account Type</label>
                      <select
                        {...register('retirementAccountType')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none"
                      >
                        <option value="401(k)">401(k) / Provident Fund</option>
                        <option value="Traditional IRA">Traditional IRA / Pension</option>
                        <option value="Roth IRA">Roth IRA</option>
                        <option value="Brokerage Account">Brokerage Account</option>
                        <option value="Mutual Fund">Mutual Fund / SIP</option>
                        <option value="Other">Other Account Type</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Beneficiary Named</label>
                      <select
                        {...register('retirementBeneficiary')}
                        className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-2 text-[13px] text-primary focus:border-brand-primary/40 outline-none"
                      >
                        <option value="Spouse">Spouse</option>
                        <option value="Children">Children</option>
                        <option value="Trust / Will">Trust / Will Designated</option>
                        <option value="None / Unspecified">None / Unspecified</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
                  Decryption Mandate & Instructions
                </label>
                <textarea
                  placeholder="Provide precise recovery or key distribution instructions..."
                  rows={5}
                  {...register('notes')}
                  className="w-full bg-surface border border-base rounded-[8px] px-3.5 py-3 text-[13px] text-primary focus:border-brand-primary/40 outline-none placeholder:text-muted/50 leading-relaxed resize-none"
                />
              </div>

              <div className="pt-4 border-t border-base flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-[6px] text-[13px] font-semibold text-white transition-opacity hover:opacity-85"
                  style={{ background: 'var(--color-brand-primary)' }}
                >
                  Secure Information
                </button>
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-6 py-2.5 rounded-[6px] text-[13px] font-semibold border border-base hover:bg-surface text-secondary transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : selectedAsset ? (
          /* ── VAULT DETAIL PANEL ── */
          <div className="flex-1 flex flex-col bg-page">
            {/* Header Actions */}
            <div className="px-6 lg:px-8 py-4 border-b border-base flex items-center justify-between shrink-0 bg-surface/40">
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-muted">
                <Shield size={12} className="text-brand-primary" />
                <span>Zero-Knowledge Locked</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStartEdit(selectedAsset)}
                  className="h-8 px-3 rounded-[6px] text-[12px] font-medium border border-base hover:bg-surface text-secondary flex items-center gap-1.5 transition-colors"
                >
                  <Edit2 size={11} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(selectedAsset.id)}
                  className="h-8 px-3 rounded-[6px] text-[12px] font-medium border border-base hover:border-red-500/25 hover:bg-red-500/10 text-secondary hover:text-red-500 flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 size={11} /> Delete
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 lg:p-8 space-y-8 flex-1 max-w-[700px]">
              {/* Asset Title Block */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-500">
                    {selectedAsset.type} Protocol Record
                  </p>
                </div>
                <h1 className="font-display font-light text-[32px] text-primary tracking-tight leading-none">
                  {selectedAsset.name}
                </h1>
                <p className="text-[11px] mt-2 text-muted">
                  Vault Item ID: <span className="font-mono">{selectedAsset.id}</span> • Secured on {selectedAsset.date || 'unknown'}
                </p>
              </div>

              {/* Valuation pill */}
              <div 
                className="p-5 rounded-[8px] flex items-center justify-between bg-surface border border-base"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Asset Valuation
                  </p>
                  <p className="text-[28px] font-display font-light leading-none mt-1.5 text-primary">
                    ${selectedAsset.value?.toLocaleString() || '0'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                    Protection Scope
                  </p>
                  <span 
                    className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.10em] px-2 py-0.5 rounded-[4px] mt-1.5 bg-success/10 text-success border border-success/20"
                  >
                    <Check size={10} /> Active Shield
                  </span>
                </div>
              </div>

              {/* SECTION: Cryptographic Parameters */}
              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] border-b border-base pb-2 text-muted">
                  Cryptographic Parameters
                </p>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Encryption Level</p>
                    <p className="text-[13px] font-medium text-primary mt-0.5 flex items-center gap-1.5">
                      <Shield size={12} className="text-brand-primary" />
                      {selectedAsset.encryptionLevel || 'Quantum-Resistant'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Zero-Knowledge Status</p>
                    <p className="text-[13px] font-medium text-primary mt-0.5 flex items-center gap-1.5">
                      <Check size={12} style={{ color: '#22C55E' }} /> Key Sealed
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION: Succession Mandate */}
              <div className="space-y-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] border-b border-base pb-2 text-muted">
                  Succession Mandate
                </p>

                {/* Dynamically Render Category-Specific Details in Detail View */}
                {selectedAsset.type === 'Crypto' && (selectedAsset.cryptoWalletType || selectedAsset.cryptoAddress || selectedAsset.cryptoNetwork || selectedAsset.cryptoBackupMethod) && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-surface/30 border border-base rounded-[8px] text-[12px]">
                    {selectedAsset.cryptoWalletType && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Wallet Type</span>
                        <span className="font-semibold text-primary">{selectedAsset.cryptoWalletType}</span>
                      </div>
                    )}
                    {selectedAsset.cryptoNetwork && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Blockchain Network</span>
                        <span className="font-semibold text-primary">{selectedAsset.cryptoNetwork}</span>
                      </div>
                    )}
                    {selectedAsset.cryptoAddress && (
                      <div className="col-span-2">
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Wallet Address</span>
                        <span className="font-mono text-primary break-all">{selectedAsset.cryptoAddress}</span>
                      </div>
                    )}
                    {selectedAsset.cryptoBackupMethod && (
                      <div className="col-span-2">
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Backup Location / Method</span>
                        <span className="font-semibold text-primary">{selectedAsset.cryptoBackupMethod}</span>
                      </div>
                    )}
                  </div>
                )}

                {selectedAsset.type === 'NFT' && (selectedAsset.nftCollection || selectedAsset.nftTokenId || selectedAsset.nftContractAddress || selectedAsset.nftNetwork) && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-surface/30 border border-base rounded-[8px] text-[12px]">
                    {selectedAsset.nftCollection && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Collection Name</span>
                        <span className="font-semibold text-primary">{selectedAsset.nftCollection}</span>
                      </div>
                    )}
                    {selectedAsset.nftNetwork && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Network</span>
                        <span className="font-semibold text-primary">{selectedAsset.nftNetwork}</span>
                      </div>
                    )}
                    {selectedAsset.nftTokenId && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Token ID</span>
                        <span className="font-semibold text-primary">{selectedAsset.nftTokenId}</span>
                      </div>
                    )}
                    {selectedAsset.nftContractAddress && (
                      <div className="col-span-2">
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Contract Address</span>
                        <span className="font-mono text-primary break-all">{selectedAsset.nftContractAddress}</span>
                      </div>
                    )}
                  </div>
                )}

                {selectedAsset.type === 'Document' && (selectedAsset.docType || selectedAsset.docPhysicalLocation || selectedAsset.docCloudUrl || selectedAsset.docAccessKeys) && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-surface/30 border border-base rounded-[8px] text-[12px]">
                    {selectedAsset.docType && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Document Type</span>
                        <span className="font-semibold text-primary">{selectedAsset.docType}</span>
                      </div>
                    )}
                    {selectedAsset.docPhysicalLocation && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Physical Location</span>
                        <span className="font-semibold text-primary">{selectedAsset.docPhysicalLocation}</span>
                      </div>
                    )}
                    {selectedAsset.docCloudUrl && (
                      <div className="col-span-2">
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Digital URL / Cloud Path</span>
                        <a href={selectedAsset.docCloudUrl.startsWith('http') ? selectedAsset.docCloudUrl : undefined} target={selectedAsset.docCloudUrl.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="font-medium text-brand-primary hover:underline break-all">
                          {selectedAsset.docCloudUrl}
                        </a>
                      </div>
                    )}
                    {selectedAsset.docAccessKeys && (
                      <div className="col-span-2">
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Access Keys / Instructions</span>
                        <span className="font-semibold text-primary">{selectedAsset.docAccessKeys}</span>
                      </div>
                    )}
                  </div>
                )}

                {selectedAsset.type === 'Account' && (selectedAsset.accountService || selectedAsset.accountUsername || selectedAsset.accountPasswordRef || selectedAsset.accountMfaBackup) && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-surface/30 border border-base rounded-[8px] text-[12px]">
                    {selectedAsset.accountService && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Service / Platform</span>
                        <span className="font-semibold text-primary">{selectedAsset.accountService}</span>
                      </div>
                    )}
                    {selectedAsset.accountUsername && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Username / Email</span>
                        <span className="font-semibold text-primary">{selectedAsset.accountUsername}</span>
                      </div>
                    )}
                    {selectedAsset.accountPasswordRef && (
                      <div className="col-span-2">
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Password Reference</span>
                        <span className="font-semibold text-primary">{selectedAsset.accountPasswordRef}</span>
                      </div>
                    )}
                    {selectedAsset.accountMfaBackup && (
                      <div className="col-span-2">
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">2FA Recovery Location</span>
                        <span className="font-semibold text-primary">{selectedAsset.accountMfaBackup}</span>
                      </div>
                    )}
                  </div>
                )}

                {selectedAsset.type === 'Retirement' && (selectedAsset.retirementInstitution || selectedAsset.retirementAccountNumber || selectedAsset.retirementAccountType || selectedAsset.retirementBeneficiary) && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-surface/30 border border-base rounded-[8px] text-[12px]">
                    {selectedAsset.retirementInstitution && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Financial Institution</span>
                        <span className="font-semibold text-primary">{selectedAsset.retirementInstitution}</span>
                      </div>
                    )}
                    {selectedAsset.retirementAccountNumber && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Account Number</span>
                        <span className="font-semibold text-primary">{selectedAsset.retirementAccountNumber}</span>
                      </div>
                    )}
                    {selectedAsset.retirementAccountType && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Account Type</span>
                        <span className="font-semibold text-primary">{selectedAsset.retirementAccountType}</span>
                      </div>
                    )}
                    {selectedAsset.retirementBeneficiary && (
                      <div>
                        <span className="text-muted block font-semibold uppercase tracking-wider text-[10px]">Named Beneficiary</span>
                        <span className="font-semibold text-primary">{selectedAsset.retirementBeneficiary}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-surface/50 border border-base rounded-[8px] p-4 space-y-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Decryption & Succession Instructions</p>
                    <p className="text-[13px] text-secondary leading-relaxed mt-1 whitespace-pre-wrap">
                      {selectedAsset.instructions || selectedAsset.notes || 'No succession instructions provided. Click edit to specify instructions.'}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-base flex flex-wrap gap-4 text-[12px] text-secondary">
                    <div>
                      <span className="text-muted">Assigned Heir: </span>
                      <span className="font-semibold text-primary">
                        {heirs.find(h => h.id === selectedAsset.beneficiaryId)?.name || 'Emily Asha (Daughter)'}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted">Guardian Quorum: </span>
                      <span className="font-semibold text-primary">
                        {guardians.filter(g => g.status === 'Confirmed').length >= 2 ? '2-of-3 Confirmed' : '1-of-2 Confirmed'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: Archival Projection */}
              {(selectedAsset.growthRate || selectedAsset.type === 'Retirement' || selectedAsset.type === 'Crypto') && (
                <div className="space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] border-b border-base pb-2 text-muted">
                    Archival Financial Projection
                  </p>
                  <div className="flex items-center justify-between p-4 bg-brand-primary-dim border border-brand-primary/10 rounded-[8px]">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Est. Value (10 Years)</p>
                      <p className="text-[20px] font-display font-light text-primary leading-none mt-1">
                        ${calculateProjection(selectedAsset.value || 0, selectedAsset.growthRate || 0.07, 10).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Archival APY</p>
                      <p className="text-[14px] font-medium text-brand-primary mt-1">
                        +7.0% compounded
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ── EMPTY STATE ── */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-page">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-brand-primary-dim border border-brand-primary/15"
            >
              <Lock size={22} className="text-brand-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-[16px] font-medium text-primary">No Selected Item</h3>
            <p className="text-[12px] text-muted mt-1 max-w-xs leading-normal">
              Select a vault item in the list or secure a new account.
            </p>
            <button
              onClick={handleStartAdd}
              className="mt-5 inline-flex items-center gap-1.5 h-9 px-4 rounded-[6px] text-[12px] font-semibold text-white transition-opacity hover:opacity-85 cursor-pointer"
              style={{ background: 'var(--color-brand-primary)' }}
            >
              <Plus size={14} /> Secure first account
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
