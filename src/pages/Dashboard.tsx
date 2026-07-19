import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, Plus, Trash2, CheckCircle2, AlertCircle, ChevronRight
} from 'lucide-react';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

// Mapped types
const TYPES = [
  { k: 'Crypto', label: 'Crypto', icon: '🪙', color: '#B3402E' },
  { k: 'NFT', label: 'NFT', icon: '🎨', color: '#B08D3E' },
  { k: 'Document', label: 'Document', icon: '📄', color: '#7C6BA8' },
  { k: 'Account', label: 'Account', icon: '🔑', color: '#4A7FB5' },
  { k: 'Retirement', label: 'Retirement', icon: '🏦', color: '#1C6B4A' },
  { k: 'Other', label: 'Other', icon: '📦', color: '#3B3D34' },
];

const filterDefs = [{ k: 'all', label: 'All' }, ...TYPES];

function fmtINR(n: number) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + 'Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L';
  if (n >= 1000) return '₹' + (n / 1000).toFixed(0) + 'K';
  return '₹' + n;
}

function typeInfo(k?: string) {
  const key = (k || '').toLowerCase();
  return TYPES.find(t => key.includes(t.k.toLowerCase())) || TYPES[0];
}

export default function Dashboard() {
  const { 
    user, 
    assets, 
    guardians, 
    fetchAssets, 
    addAsset, 
    deleteAsset, 
    addGuardian, 
    removeGuardian, 
    performCheckIn,
    activity
  } = useStore();
  
  const navigate = useNavigate();

  // State variables
  const [activeFilter, setActiveFilter] = useState('all');
  const [newGName, setNewGName] = useState('');
  const [newGRel, setNewGRel] = useState('');
  const [newGEmail, setNewGEmail] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAssetType, setNewAssetType] = useState('Crypto');
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetValue, setNewAssetValue] = useState('');

  // Category specific states for quick add
  const [cryptoWalletType, setCryptoWalletType] = useState('Hardware Wallet');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [cryptoNetwork, setCryptoNetwork] = useState('');

  const [nftCollection, setNftCollection] = useState('');
  const [nftTokenId, setNftTokenId] = useState('');
  const [nftContract, setNftContract] = useState('');

  const [docType, setDocType] = useState('Will / Trust');
  const [docLocation, setDocLocation] = useState('');
  const [docCredentials, setDocCredentials] = useState('');

  const [accountService, setAccountService] = useState('');
  const [accountUsername, setAccountUsername] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [accountMfaBackup, setAccountMfaBackup] = useState('');

  const [retirementInstitution, setRetirementInstitution] = useState('');
  const [retirementAccountNumber, setRetirementAccountNumber] = useState('');
  const [retirementAccountType, setRetirementAccountType] = useState('401k');
  const [retirementBeneficiary, setRetirementBeneficiary] = useState('');

  const [otherNotes, setOtherNotes] = useState('');
  
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'item' | 'guardian';
    id: string;
    name: string;
  }>({ isOpen: false, type: 'item', id: '', name: '' });

  useEffect(() => { 
    fetchAssets(); 
  }, [fetchAssets]);

  // Derived state
  const firstName = user.name ? user.name.split(' ')[0] : 'User';
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  const greeting = `${getGreeting()}, ${firstName}`;

  const totalValue = assets.reduce((sum, item) => sum + (item.value || 0), 0);
  const instructionsCount = assets.filter(a => a.instructions && a.instructions.trim().length > 0).length;

  // Compute Legacy Score like the mockup
  const score = (() => {
    const vaultScore = Math.min(40, assets.length * 5);
    const guardScore = Math.min(30, guardians.length * 8);
    const instrScore = Math.min(20, instructionsCount * 4);
    const ciScore = 10; // active check-in is assumed configured
    return Math.min(100, vaultScore + guardScore + instrScore + ciScore);
  })();

  // Calculate check-in days
  const checkinInterval = 30;
  const checkinDays = (() => {
    if (!user.nextCheckInDate) return 2;
    const next = new Date(user.nextCheckInDate).getTime();
    const now = Date.now();
    const diffMs = next - now;
    const diffDays = Math.ceil(diffMs / (24 * 60 * 60 * 1000));
    return Math.max(0, checkinInterval - diffDays);
  })();

  // Handlers
  const handleCheckIn = async () => {
    try {
      await performCheckIn('Web Dashboard');
      toast.success('Successfully checked in! Liveness status updated.');
    } catch (err) {
      toast.error('Check-in failed. Please try again.');
    }
  };

  const handleAddGuardian = () => {
    if (!newGName.trim()) {
      toast.error('Please enter a guardian name');
      return;
    }
    if (!newGEmail.trim() || !newGEmail.includes('@')) {
      toast.error('Please enter a valid email for the guardian');
      return;
    }
    addGuardian({ name: newGName, relationship: newGRel, email: newGEmail });
    setNewGName('');
    setNewGRel('');
    setNewGEmail('');
    toast.success('Guardian invite sent successfully!');
  };

  const handleAddAsset = async () => {
    if (!newAssetName.trim()) {
      toast.error('Please enter an account name');
      return;
    }
    const val = newAssetValue.trim() ? Number(newAssetValue) : 0;

    // Map details to fields
    let categoryDetails = {};
    if (newAssetType === 'Crypto') {
      categoryDetails = {
        cryptoWalletType,
        cryptoAddress,
        cryptoNetwork
      };
    } else if (newAssetType === 'NFT') {
      categoryDetails = {
        nftCollection,
        nftTokenId,
        nftContract
      };
    } else if (newAssetType === 'Document') {
      categoryDetails = {
        docType,
        docLocation,
        docCredentials
      };
    } else if (newAssetType === 'Account') {
      categoryDetails = {
        accountService,
        accountUsername,
        accountPassword,
        accountMfaBackup
      };
    } else if (newAssetType === 'Retirement') {
      categoryDetails = {
        retirementInstitution,
        retirementAccountNumber,
        retirementAccountType,
        retirementBeneficiary
      };
    } else if (newAssetType === 'Other') {
      categoryDetails = {
        notes: otherNotes
      };
    }

    try {
      await addAsset({
        name: newAssetName,
        type: newAssetType,
        value: val,
        status: 'Protected',
        date: new Date().toISOString().split('T')[0],
        ...categoryDetails
      } as any);
      setIsAddModalOpen(false);
      setNewAssetName('');
      setNewAssetValue('');
      
      // Reset all custom states
      setCryptoWalletType('Hardware Wallet');
      setCryptoAddress('');
      setCryptoNetwork('');
      setNftCollection('');
      setNftTokenId('');
      setNftContract('');
      setDocType('Will / Trust');
      setDocLocation('');
      setDocCredentials('');
      setAccountService('');
      setAccountUsername('');
      setAccountPassword('');
      setAccountMfaBackup('');
      setRetirementInstitution('');
      setRetirementAccountNumber('');
      setRetirementAccountType('401k');
      setRetirementBeneficiary('');
      setOtherNotes('');
      
      toast.success('Account secured in vault');
    } catch (err) {
      toast.error('Failed to add account');
    }
  };

  const triggerRemoveItem = (id: string, name: string) => {
    setConfirmModal({ isOpen: true, type: 'item', id, name });
  };

  const triggerRemoveGuardian = (id: string, name: string) => {
    setConfirmModal({ isOpen: true, type: 'guardian', id, name });
  };

  const handleConfirmRemove = async () => {
    const { id, type } = confirmModal;
    try {
      if (type === 'item') {
        await deleteAsset(id);
        toast.success('Account removed from vault.');
      } else {
        await removeGuardian(id);
        toast.success('Guardian removed.');
      }
    } catch (err) {
      toast.error('Removal failed.');
    } finally {
      setConfirmModal({ isOpen: false, type: 'item', id: '', name: '' });
    }
  };

  const filteredAssets = activeFilter === 'all' 
    ? assets 
    : assets.filter(item => (item.type || '').toLowerCase().includes(activeFilter.toLowerCase()));

  const feedItems = activity.length > 0 ? activity.slice(0, 5) : [
    { id: '1', message: 'Checked in from Web Dashboard', time: '2 days ago' },
    { id: '2', message: `Added HDFC Bank to vault`, time: '5 days ago' },
    { id: '3', message: 'Priya accepted guardian invite', time: '12 days ago' }
  ];

  return (
    <div className="min-h-screen bg-page pt-6">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 pb-20 space-y-6">
        
        {/* ── Page Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 pb-2 gap-4">
          <div>
            <h1 className="font-display text-[26px] leading-tight text-primary font-medium serif">
              {greeting}
            </h1>
            <p className="text-[13px] text-secondary mt-1">
              Everything here updates live as you protect more of your digital life.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-[9px] text-[13px] font-semibold text-white transition-all bg-brand-primary hover:bg-brand-primary-hover shadow-md cursor-pointer"
            >
              <Plus size={14} /> Add account
            </button>
          </div>
        </div>

        {/* ── Hero Band ── */}
        <div className="relative overflow-hidden rounded-[18px] p-8 md:p-10 bg-gradient-to-br from-[#0D0F0A] to-[#1C6B4A]/70 text-[#F5F4EC]">
          <div className="absolute top-[-140px] right-[-80px] w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(75,174,130,0.35)_0%,transparent_70%)] pointer-events-none" />
          <h1 className="font-display font-light text-[24px] md:text-[30px] leading-tight max-w-[560px] relative z-10 serif">
            Everything you've built — passed on <span className="font-script text-[1.15em] text-[#8FD9B4] font-semibold inline-block -rotate-[2deg] px-1">automatically</span>.
          </h1>
          <p className="font-light text-[13px] md:text-[14px] leading-relaxed text-[#B9BDAC] mt-3 max-w-[480px] relative z-10">
            Your vault is encrypted on your own device. Your guardians hold the key. Your family will never be locked out of what you leave behind.
          </p>
        </div>

        {/* ── Row 1: Legacy Score & Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6">
          
          {/* Legacy Score Panel */}
          <div className="p-6 rounded-[16px] bg-surface border border-base shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="ring-wrap relative w-[172px] h-[172px] flex-shrink-0">
              <svg width="172" height="172" viewBox="0 0 172 172" className="-rotate-90">
                <circle cx="86" cy="86" r="74" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14"/>
                <circle
                  cx="86"
                  cy="86"
                  r="74"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={465}
                  strokeDashoffset={465 - (score / 100) * 465}
                  style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.16,1,.3,1)' }}
                />
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-brand-primary)"/>
                    <stop offset="100%" stopColor="var(--color-brand-gold)"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-[42px] leading-none text-primary font-medium">{score}</span>
                <span className="text-[10px] uppercase tracking-widest text-secondary mt-1">Legacy Score</span>
              </div>
            </div>
            <div className="flex-grow space-y-2 text-center md:text-left">
              <h3 className="font-display text-[19px] leading-tight text-primary serif">
                Your family is <span className="font-script text-[1.15em] text-[#8FD9B4] font-semibold inline-block -rotate-[2deg] px-1">mostly</span> protected.
              </h3>
              <p className="text-[13px] text-secondary leading-relaxed font-light">
                {score >= 90
                  ? "This is about as protected as it gets. Keep it current as things change."
                  : score >= 70
                  ? "Strong coverage. A couple more guardians or instructions would round this out."
                  : score >= 40
                  ? "A solid start — add more accounts and at least 2 guardians to raise this further."
                  : "Your family isn't protected yet. Start by adding your most important account."}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
                <span className={cn("text-[11px] px-3 py-1 rounded-full border text-secondary flex items-center gap-1", assets.length > 0 ? "bg-brand-primary-dim text-brand-primary border-transparent" : "border-base")}>
                  {assets.length > 0 ? '✓' : '○'} {assets.length} account{assets.length === 1 ? '' : 's'} protected
                </span>
                <span className={cn("text-[11px] px-3 py-1 rounded-full border text-secondary flex items-center gap-1", guardians.length >= 2 ? "bg-brand-primary-dim text-brand-primary border-transparent" : "border-base")}>
                  {guardians.length >= 2 ? '✓' : '○'} {guardians.length} guardian{guardians.length === 1 ? '' : 's'}
                </span>
                <span className={cn("text-[11px] px-3 py-1 rounded-full border text-secondary flex items-center gap-1", instructionsCount > 0 ? "bg-brand-primary-dim text-brand-primary border-transparent" : "border-base")}>
                  {instructionsCount > 0 ? '✓' : '○'} {instructionsCount} instruction{instructionsCount === 1 ? '' : 's'}
                </span>
                <span className={cn("text-[11px] px-3 py-1 rounded-full border text-secondary flex items-center gap-1", 'bg-brand-primary-dim text-brand-primary border-transparent')}>
                  ✓ Check-in active
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Vault items stat */}
            <div 
              onClick={() => setIsAddModalOpen(true)}
              className="p-5 rounded-[14px] bg-surface border border-base flex flex-col gap-2 relative overflow-hidden shadow-sm hover:-translate-y-0.5 transition-transform cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-brand-primary-dim text-[16px] flex items-center justify-center">🏦</span>
                <span className="text-[10px] font-bold text-brand-primary group-hover:underline">Add +</span>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-secondary">Vault items</span>
              <span className="font-display text-[26px] leading-none text-primary font-medium serif">{assets.length}</span>
              <span className="text-[11px] text-brand-primary font-semibold">of 8 tracked types</span>
            </div>

            {/* Guardians stat */}
            <div className="p-5 rounded-[14px] bg-surface border border-base flex flex-col gap-2 relative overflow-hidden shadow-sm hover:-translate-y-0.5 transition-transform">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-[16px] flex items-center justify-center">🤝</span>
                <svg className="stroke-[#4A7FB5] fill-none opacity-50 shrink-0" width="56" height="24" viewBox="0 0 56 24">
                  <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M0,20 L14,17 L28,12 L42,8 L56,4"/>
                </svg>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-secondary">Guardians</span>
              <span className="font-display text-[26px] leading-none text-primary font-medium serif">{guardians.length}</span>
              <span className="text-[11px] text-brand-primary font-semibold">{guardians.length >= 2 ? 'Threshold met' : 'Add at least 2'}</span>
            </div>

            {/* Value stat */}
            <div className="p-5 rounded-[14px] bg-surface border border-base flex flex-col gap-2 relative overflow-hidden shadow-sm hover:-translate-y-0.5 transition-transform">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-brand-gold/10 text-[16px] flex items-center justify-center">💰</span>
                <svg className="stroke-brand-gold fill-none opacity-50 shrink-0" width="56" height="24" viewBox="0 0 56 24">
                  <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M0,16 L10,17 L20,10 L28,11 L38,5 L46,6 L56,1"/>
                </svg>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-secondary">Protected value</span>
              <span className="font-display text-[26px] leading-none text-primary font-medium serif">{fmtINR(totalValue)}</span>
              <span className="text-[11px] text-brand-primary font-semibold">across all accounts</span>
            </div>

            {/* Instructions stat */}
            <div className="p-5 rounded-[14px] bg-surface border border-base flex flex-col gap-2 relative overflow-hidden shadow-sm hover:-translate-y-0.5 transition-transform">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-brand-primary-dim text-[16px] flex items-center justify-center">📝</span>
                <svg className="stroke-brand-primary fill-none opacity-50 shrink-0" width="56" height="24" viewBox="0 0 56 24">
                  <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M0,19 L14,16 L28,13 L42,7 L56,6"/>
                </svg>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-secondary">Instructions</span>
              <span className="font-display text-[26px] leading-none text-primary font-medium serif">{instructionsCount}</span>
              <span className="text-[11px] text-brand-primary font-semibold">written for your family</span>
            </div>
          </div>
        </div>

        {/* ── Row 2: Protection Journey ── */}
        <div className="p-6 rounded-[16px] bg-surface border border-base shadow-sm">
          <h2 className="text-[14px] font-semibold text-primary mb-5">Your protection journey</h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative gap-6 md:gap-0">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute left-[12.5%] right-[12.5%] top-[19px] h-[2px] bg-base z-0">
              <div 
                className="h-full bg-brand-primary transition-all duration-500" 
                style={{ 
                  width: `${(Math.max(0, [
                    assets.length > 0, 
                    guardians.length >= 2, 
                    instructionsCount > 0, 
                    true
                  ].filter(Boolean).length - 1) / 3) * 100}%` 
                }}
              />
            </div>
            
            {[
              { name: 'Vault started', sub: `${assets.length} account${assets.length === 1 ? '' : 's'}`, done: assets.length > 0, icon: '🏦' },
              { name: 'Guardians added', sub: `${guardians.length} of 2 min`, done: guardians.length >= 2, icon: '👥' },
              { name: 'Instructions written', sub: `${instructionsCount} saved`, done: instructionsCount > 0, icon: '📄' },
              { name: 'Check-in active', sub: '30-day interval', done: true, icon: '⏱️' }
            ].map((step, idx) => {
              const isDone = step.done;
              const isNow = !isDone && (idx === 0 || (idx > 0 && [
                assets.length > 0,
                guardians.length >= 2,
                instructionsCount > 0,
              ].slice(0, idx).every(Boolean)));

              return (
                <div key={step.name} className="flex md:flex-col items-center md:text-center relative z-10 flex-1 w-full gap-4 md:gap-0">
                  <div className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center text-[15px] transition-all duration-300 md:mb-2.5",
                    isDone 
                      ? "bg-brand-primary border-brand-primary text-white" 
                      : isNow 
                        ? "border-brand-primary bg-surface shadow-[0_0_0_5px_var(--color-brand-primary-dim)] text-primary" 
                        : "border-base bg-base text-secondary"
                  )}>
                    {isDone ? '✓' : step.icon}
                  </div>
                  <div className="flex flex-col items-start md:items-center">
                    <span className={cn("text-[12px] font-semibold", isDone ? "text-brand-primary" : "text-primary")}>{step.name}</span>
                    <span className="text-[10px] text-secondary mt-0.5">{step.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Row 3: Security Center ── */}
        <div className="p-6 rounded-[16px] bg-surface border border-base shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-base pb-3">
            <div>
              <h2 
                onClick={() => navigate('/security-center')}
                className="text-[14px] font-semibold text-primary hover:text-brand-primary transition-colors cursor-pointer flex items-center gap-1.5"
              >
                Security Center <ChevronRight size={14} className="text-muted" />
              </h2>
              <p className="text-[11px] text-secondary mt-0.5">A full sweep of how well your vault is actually protected</p>
            </div>
            <div className="text-right">
              <div className="font-display text-[20px] leading-tight text-primary font-medium serif">
                {([
                  assets.length > 0,
                  guardians.length >= 2,
                  true, // check-in active
                  instructionsCount > 0,
                  true, // 2fa enabled
                  false, // emergency fallback
                  true, // last audit
                ].filter(Boolean).length)}/7
              </div>
              <p className="text-[10px] text-secondary mt-0.5">passing checks</p>
            </div>
          </div>

          <div className="divide-y divide-base">
            {[
              { good: true, title: 'Vault encryption', sub: 'AES-256, encrypted on your device — we never see the plaintext', badge: 'Active' },
              { good: guardians.length >= 2, title: 'Guardian threshold', sub: guardians.length >= 2 ? 'No single person can unlock your vault alone' : 'Fewer than 2 guardians — one person could hold total access', badge: guardians.length >= 2 ? 'Met' : 'Needs attention', action: guardians.length >= 2 ? null : 'Add guardian', onAction: () => document.getElementById('gName')?.focus() },
              { good: true, title: 'Check-in switch', sub: 'Active — 30-day interval, escalates gently', badge: 'Active' },
              { good: instructionsCount > 0, title: 'Family instructions', sub: instructionsCount > 0 ? `${instructionsCount} written in plain language` : 'No instructions written yet — guardians will be guessing', badge: instructionsCount > 0 ? `${instructionsCount} written` : 'None', action: instructionsCount > 0 ? null : 'Write one', onAction: () => navigate('/trust') },
              { good: true, title: 'Two-factor authentication', sub: 'Required for every login to your account', badge: 'Enabled' },
              { good: false, title: 'Emergency fallback contact', sub: "Used only if every guardian becomes unreachable — you haven't set one", badge: 'Not set', action: 'Set up', onAction: () => toast.success('Opening emergency contact setup...') },
              { good: true, title: 'Last security audit', sub: 'Full architecture review — 2 days ago', badge: 'Passed' },
            ].map((check, idx) => (
              <div key={idx} className="flex items-center gap-3.5 py-3 first:pt-0 last:pb-0">
                <div className={cn(
                  "w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 border",
                  check.good 
                    ? "bg-brand-primary-dim text-brand-primary border-transparent" 
                    : "bg-brand-gold/10 text-brand-gold border-transparent"
                )}>
                  {check.good ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                </div>
                <div className="flex-grow min-w-0">
                  <span className="text-[13px] font-semibold text-primary block">{check.title}</span>
                  <span className="text-[11px] text-secondary mt-0.5 block truncate sm:whitespace-normal">{check.sub}</span>
                </div>
                {check.action ? (
                  <button onClick={check.onAction} className="text-[11px] font-bold text-brand-primary shrink-0 hover:underline">
                    {check.action} →
                  </button>
                ) : (
                  <span className={cn(
                    "text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0",
                    check.good 
                      ? "bg-brand-primary-dim text-brand-primary" 
                      : "bg-brand-gold/10 text-brand-gold"
                  )}>
                    {check.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Row 4: Asset Breakdown & Guardians ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Asset Breakdown */}
          <div className="p-6 rounded-[16px] bg-surface border border-base shadow-sm space-y-4">
            <h2 className="text-[14px] font-semibold text-primary">Asset breakdown</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-[150px] h-[150px] shrink-0">
                <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
                  <circle cx="75" cy="75" r="62" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16"/>
                  {(() => {
                    const totals: Record<string, number> = {};
                    assets.forEach(i => {
                      const type = i.type || 'other';
                      totals[type] = (totals[type] || 0) + Math.max(i.value || 0, 50000);
                    });
                    const sum = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
                    const circ = 2 * Math.PI * 62;
                    let currentOffset = 0;

                    return Object.entries(totals).map(([type, val]) => {
                      const info = typeInfo(type);
                      const frac = val / sum;
                      const dash = frac * circ;
                      const offset = currentOffset;
                      currentOffset += dash;

                      return (
                        <circle
                          key={type}
                          cx="75"
                          cy="75"
                          r="62"
                          fill="none"
                          stroke={info.color}
                          strokeWidth="16"
                          strokeDasharray={`${dash} ${circ - dash}`}
                          strokeDashoffset={-offset}
                          style={{ transition: 'stroke-dasharray .6s cubic-bezier(.16,1,.3,1)' }}
                        />
                      );
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-[19px] leading-none text-primary font-semibold">{fmtINR(totalValue)}</span>
                  <span className="text-[9px] uppercase tracking-widest text-secondary mt-1">Total</span>
                </div>
              </div>

              <div className="flex-1 w-full space-y-2">
                {(() => {
                  const totals: Record<string, number> = {};
                  assets.forEach(i => {
                    const type = i.type || 'other';
                    totals[type] = (totals[type] || 0) + (i.value || 0);
                  });
                  if (Object.keys(totals).length === 0) {
                    return <div className="text-[12px] text-secondary font-light">Add accounts to see the breakdown</div>;
                  }
                  return Object.entries(totals)
                    .sort((a, b) => b[1] - a[1])
                    .map(([type, val]) => {
                      const info = typeInfo(type);
                      return (
                        <div key={type} className="flex items-center justify-between text-[12px]">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-[3px]" style={{ backgroundColor: info.color }} />
                            <span className="text-secondary font-medium">{info.label}</span>
                          </div>
                          <span className="text-primary font-semibold">{fmtINR(val)}</span>
                        </div>
                      );
                    });
                })()}
              </div>
            </div>
          </div>

          {/* Guardians Panel */}
          <div className="p-6 rounded-[16px] bg-surface border border-base shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h2 className="text-[14px] font-semibold text-primary">
                  Guardians {guardians.length > 0 && <span className="text-[11px] text-secondary font-medium ml-1">· any {Math.max(2, Math.ceil(guardians.length * 0.66))} of {guardians.length} unlock</span>}
                </h2>
              </div>

              <div className="divide-y divide-base max-h-[170px] overflow-y-auto pr-1">
                {guardians.length === 0 ? (
                  <div className="text-[12px] text-secondary py-3 font-light">
                    No guardians yet — add at least 2 so your vault can never be unlocked by just one person.
                  </div>
                ) : (
                  guardians.map((g, idx) => (
                    <div key={g.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                      <div 
                        className="w-[34px] h-[34px] rounded-full text-white text-[12px] font-bold flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `hsl(${(idx * 137) % 360}, 50%, 45%)` }}
                      >
                        {g.name ? g.name[0].toUpperCase() : 'G'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[13px] font-semibold text-primary block truncate">{g.name}</span>
                        <span className="text-[11px] text-secondary mt-0.5 block truncate">{g.relationship || 'Guardian'} · fragment {idx + 1} of {guardians.length}</span>
                      </div>
                      <button 
                        onClick={() => triggerRemoveGuardian(g.id, g.name || '')}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-secondary hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <input
                  id="gName"
                  type="text"
                  placeholder="Name"
                  value={newGName}
                  onChange={(e) => setNewGName(e.target.value)}
                  className="w-full h-[38px] px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary focus:shadow-[0_0_0_3px_var(--color-brand-primary-dim)] transition-all"
                  maxLength={20}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newGEmail}
                  onChange={(e) => setNewGEmail(e.target.value)}
                  className="w-full h-[38px] px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary focus:shadow-[0_0_0_3px_var(--color-brand-primary-dim)] transition-all"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Relationship"
                    value={newGRel}
                    onChange={(e) => setNewGRel(e.target.value)}
                    className="flex-grow h-[38px] px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary focus:shadow-[0_0_0_3px_var(--color-brand-primary-dim)] transition-all"
                    maxLength={16}
                  />
                  <button
                    onClick={handleAddGuardian}
                    className="h-[38px] px-4 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-white text-[12px] font-semibold shrink-0 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="text-[11px] leading-relaxed p-2.5 rounded-lg font-medium bg-brand-primary-dim text-brand-primary">
                {guardians.length >= 2 
                  ? `🔐 Any ${Math.max(2, Math.ceil(guardians.length * 0.66))} of ${guardians.length} guardians can unlock your vault together — no one alone.` 
                  : '⚠️ With fewer than 2 guardians, one person could hold total access. Add one more.'}
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 5: Check-in Switch & Recent Activity ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-6">
          
          {/* Check-in Switch */}
          <div className="p-6 rounded-[16px] bg-surface border border-base shadow-sm space-y-4">
            <h2 className="text-[14px] font-semibold text-primary">Check-in switch</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-[13px] font-semibold text-brand-primary">
                Checked in {checkinDays === 0 ? 'today' : checkinDays === 1 ? '1 day ago' : `${checkinDays} days ago`}
              </span>
            </div>
            
            <div className="flex relative py-2 mb-2">
              <div className="absolute left-[12.5%] right-[12.5%] top-[12px] h-[2px] bg-base z-0">
                <div 
                  className="h-full bg-brand-primary transition-all duration-300"
                  style={{ width: checkinDays <= 1 ? '100%' : checkinDays < 7 ? '66%' : checkinDays < 15 ? '33%' : '0%' }}
                />
              </div>
              
              {[
                { label: 'Active', idx: 0 },
                { label: 'Remind', idx: 1 },
                { label: 'Alert', idx: 2 },
                { label: 'Release', idx: 3 }
              ].map((node) => {
                const isDone = (node.idx === 0) || 
                               (node.idx === 1 && checkinDays < 15) || 
                               (node.idx === 2 && checkinDays < 7) || 
                               (node.idx === 3 && checkinDays <= 1);
                const isNow = !isDone && (
                  (node.idx === 1 && checkinDays >= 15) ||
                  (node.idx === 2 && checkinDays >= 7 && checkinDays < 15) ||
                  (node.idx === 3 && checkinDays < 7)
                );

                return (
                  <div key={node.label} className="flex-1 flex flex-col items-center relative z-10">
                    <div className={cn(
                      "w-3 h-3 rounded-full mb-2.5 transition-all duration-300",
                      isDone 
                        ? "bg-brand-primary" 
                        : isNow 
                          ? "bg-brand-primary shadow-[0_0_0_4px_var(--color-brand-primary-dim)]" 
                          : "bg-base"
                    )} />
                    <span className={cn("text-[9px] font-bold uppercase tracking-wider", isDone ? "text-brand-primary" : "text-secondary")}>
                      {node.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="h-1.5 bg-base rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-brand-primary rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (checkinDays / checkinInterval) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-secondary font-medium">
              <span>{checkinDays} of {checkinInterval} days</span>
              <span>Next reminder: day {checkinInterval}</span>
            </div>

            <button
              onClick={handleCheckIn}
              className="w-full flex items-center justify-center h-10 border border-base hover:border-brand-primary/40 hover:text-brand-primary rounded-lg text-[12px] font-semibold text-primary transition-all cursor-pointer bg-surface mt-4"
            >
              Check in now
            </button>
          </div>

          {/* Recent Activity */}
          <div className="p-6 rounded-[16px] bg-surface border border-base shadow-sm space-y-4">
            <h2 className="text-[14px] font-semibold text-primary">Recent activity</h2>
            <div className="divide-y divide-base max-h-[240px] overflow-y-auto pr-1">
              {feedItems.length === 0 ? (
                <div className="text-[12px] text-secondary py-4 font-light">
                  No recent activity logs found.
                </div>
              ) : (
                feedItems.map((a) => (
                  <div key={a.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-[5px]" />
                    <div className="flex-grow min-w-0">
                      <span className="text-[12px] font-medium text-primary block">{a.message}</span>
                      <span className="text-[10px] text-secondary mt-0.5 block">{a.time || 'recently'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ── Row 6: Protected Accounts Table ── */}
        <div className="p-6 rounded-[16px] bg-surface border border-base shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-base pb-3">
            <h2 className="text-[14px] font-semibold text-primary">Protected accounts</h2>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="text-[11px] font-bold text-brand-primary hover:underline cursor-pointer flex items-center gap-1"
            >
              + Add account
            </button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1.5 -mx-1 px-1 scrollbar-none">
            {filterDefs.map((f) => (
              <button
                key={f.k}
                onClick={() => setActiveFilter(f.k)}
                className={cn(
                  "text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer",
                  activeFilter === f.k
                    ? "bg-brand-primary border-brand-primary text-white"
                    : "border-base text-secondary hover:border-brand-primary/40 hover:text-brand-primary"
                )}
              >
                {f.icon ? `${f.icon} ` : ''}{f.label}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {filteredAssets.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-base rounded-2xl bg-base/10">
                <Lock size={28} className="mx-auto text-secondary/30 mb-3" />
                <p className="text-[12px] text-secondary font-light">
                  {assets.length === 0 ? 'Your vault is empty. Add your first account.' : 'No accounts found in this category.'}
                </p>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-3.5 inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-white text-[12px] font-semibold cursor-pointer"
                >
                  + Add account
                </button>
              </div>
            ) : (
              filteredAssets.map((item) => {
                const info = typeInfo(item.type);
                return (
                  <div key={item.id} className="group flex items-center gap-3.5 p-3 rounded-xl hover:bg-base/30 transition-all border border-transparent hover:border-base">
                    <div className="w-9 h-9 rounded-[10px] bg-base flex items-center justify-center text-[18px] shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-grow min-w-0">
                      <span className="text-[13px] font-semibold text-primary block truncate">{item.name}</span>
                      <span className="text-[11px] text-secondary mt-0.5 block truncate">
                        {info.label}{item.value ? ` · ${fmtINR(item.value)}` : ''}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-primary-dim text-brand-primary border border-transparent uppercase tracking-wider shrink-0">
                      Secured
                    </span>
                    <button
                      onClick={() => triggerRemoveItem(item.id, item.name || '')}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-secondary hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* ── Add Account Modal ── */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-surface border border-base rounded-[18px] w-full max-w-[460px] p-6 shadow-xl z-10"
            >
              <div className="flex justify-between items-start mb-5">
                <h3 className="font-display text-[20px] font-medium text-primary serif">Add to your vault</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-base text-secondary hover:text-primary transition-colors">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-2">Account type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TYPES.map((t) => (
                      <button
                        key={t.k}
                        onClick={() => {
                          setNewAssetType(t.k);
                        }}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-[10px] border transition-all text-center gap-1.5 cursor-pointer",
                          newAssetType === t.k
                            ? "border-brand-primary bg-brand-primary-dim text-brand-primary font-semibold"
                            : "border-base hover:border-brand-primary/30 text-secondary hover:text-primary"
                        )}
                      >
                        <span className="text-[18px]">{t.icon}</span>
                        <span className="text-[10px] tracking-tight">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-2">Account name</label>
                  <input
                    type="text"
                    placeholder={
                      newAssetType === 'Crypto' ? 'e.g. Ledger Cold Wallet' :
                      newAssetType === 'NFT' ? 'e.g. Bored Ape #402' :
                      newAssetType === 'Document' ? 'e.g. Will and Trust deed' :
                      newAssetType === 'Account' ? 'e.g. Personal Gmail' :
                      newAssetType === 'Retirement' ? 'e.g. Fidelity 401(k)' :
                      'e.g. Antique painting'
                    }
                    value={newAssetName}
                    onChange={(e) => setNewAssetName(e.target.value)}
                    className="w-full h-10 px-3 border border-base rounded-lg bg-base text-primary text-[13px] outline-none focus:border-brand-primary focus:shadow-[0_0_0_3px_var(--color-brand-primary-dim)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-2">Value (₹, optional)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newAssetValue}
                    onChange={(e) => setNewAssetValue(e.target.value)}
                    className="w-full h-10 px-3 border border-base rounded-lg bg-base text-primary text-[13px] outline-none focus:border-brand-primary focus:shadow-[0_0_0_3px_var(--color-brand-primary-dim)] transition-all"
                  />
                </div>

                {/* Dynamic Category fields for Quick Add */}
                {newAssetType === 'Crypto' && (
                  <div className="space-y-2 p-3.5 rounded-lg border border-base bg-base/20">
                    <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Wallet Type</label>
                        <select
                          value={cryptoWalletType}
                          onChange={(e) => setCryptoWalletType(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary"
                        >
                          <option value="Hardware Wallet">Hardware Wallet</option>
                          <option value="Software Wallet">Software Wallet</option>
                          <option value="Exchange Account">Exchange Account</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Network</label>
                        <input
                          type="text"
                          placeholder="e.g. Ethereum, Bitcoin"
                          value={cryptoNetwork}
                          onChange={(e) => setCryptoNetwork(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>
                    <div className="animate-fadeIn">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Wallet Address</label>
                      <input
                        type="text"
                        placeholder="e.g. 0x..."
                        value={cryptoAddress}
                        onChange={(e) => setCryptoAddress(e.target.value)}
                        className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>
                )}

                {newAssetType === 'NFT' && (
                  <div className="space-y-2 p-3.5 rounded-lg border border-base bg-base/20">
                    <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Collection Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Bored Ape"
                          value={nftCollection}
                          onChange={(e) => setNftCollection(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Token ID</label>
                        <input
                          type="text"
                          placeholder="e.g. #402"
                          value={nftTokenId}
                          onChange={(e) => setNftTokenId(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>
                    <div className="animate-fadeIn">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Contract Address</label>
                      <input
                        type="text"
                        placeholder="e.g. 0x..."
                        value={nftContract}
                        onChange={(e) => setNftContract(e.target.value)}
                        className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>
                )}

                {newAssetType === 'Document' && (
                  <div className="space-y-2 p-3.5 rounded-lg border border-base bg-base/20">
                    <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Document Type</label>
                        <select
                          value={docType}
                          onChange={(e) => setDocType(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary"
                        >
                          <option value="Will / Trust">Will / Trust</option>
                          <option value="Property Deed">Property Deed</option>
                          <option value="Power of Attorney">Power of Attorney</option>
                          <option value="Insurance Policy">Insurance Policy</option>
                          <option value="Other Legal Document">Other Legal Document</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">File Location</label>
                        <input
                          type="text"
                          placeholder="e.g. Safe Box 2"
                          value={docLocation}
                          onChange={(e) => setDocLocation(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>
                    <div className="animate-fadeIn">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Access Instructions / Keys</label>
                      <input
                        type="text"
                        placeholder="e.g. Code 48-12-99"
                        value={docCredentials}
                        onChange={(e) => setDocCredentials(e.target.value)}
                        className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>
                )}

                {newAssetType === 'Account' && (
                  <div className="space-y-2 p-3.5 rounded-lg border border-base bg-base/20">
                    <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Provider / Service</label>
                        <input
                          type="text"
                          placeholder="e.g. Google, AWS"
                          value={accountService}
                          onChange={(e) => setAccountService(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Username / Email</label>
                        <input
                          type="text"
                          placeholder="e.g. admin@firm.com"
                          value={accountUsername}
                          onChange={(e) => setAccountUsername(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={accountPassword}
                          onChange={(e) => setAccountPassword(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">MFA Backup Keys</label>
                        <input
                          type="text"
                          placeholder="e.g. backup-128"
                          value={accountMfaBackup}
                          onChange={(e) => setAccountMfaBackup(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {newAssetType === 'Retirement' && (
                  <div className="space-y-2 p-3.5 rounded-lg border border-base bg-base/20">
                    <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Institution</label>
                        <input
                          type="text"
                          placeholder="e.g. Fidelity"
                          value={retirementInstitution}
                          onChange={(e) => setRetirementInstitution(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Account Number</label>
                        <input
                          type="text"
                          placeholder="e.g. 19-389-281"
                          value={retirementAccountNumber}
                          onChange={(e) => setRetirementAccountNumber(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Account Type</label>
                        <input
                          type="text"
                          placeholder="e.g. 401(k), IRA"
                          value={retirementAccountType}
                          onChange={(e) => setRetirementAccountType(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Designated Beneficiary</label>
                        <input
                          type="text"
                          placeholder="e.g. Spouse"
                          value={retirementBeneficiary}
                          onChange={(e) => setRetirementBeneficiary(e.target.value)}
                          className="w-full h-9 px-3 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {newAssetType === 'Other' && (
                  <div className="space-y-2 p-3.5 rounded-lg border border-base bg-base/20 animate-fadeIn">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">Notes / Instructions</label>
                      <textarea
                        placeholder="Provide details..."
                        value={otherNotes}
                        onChange={(e) => setOtherNotes(e.target.value)}
                        className="w-full h-16 p-2.5 border border-base rounded-lg bg-base text-primary text-[12px] outline-none focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAddAsset}
                  className="w-full h-10 mt-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-[13px] font-semibold rounded-lg flex items-center justify-center transition-all cursor-pointer"
                >
                  Protect this account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Confirm Delete Modal ── */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmModal({ isOpen: false, type: 'item', id: '', name: '' })}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-surface border border-base rounded-[18px] w-full max-w-[360px] p-6 shadow-xl z-10 text-center"
            >
              <h3 className="font-display text-[18px] font-medium text-primary serif">Remove this?</h3>
              <p className="text-[13px] text-secondary mt-2 mb-6">
                Are you sure you want to remove <strong className="text-primary">{confirmModal.name}</strong>? This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmModal({ isOpen: false, type: 'item', id: '', name: '' })}
                  className="flex-1 h-10 border border-base hover:border-brand-primary/40 hover:text-brand-primary text-secondary hover:text-primary rounded-lg text-[13px] font-semibold transition-all cursor-pointer bg-surface"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRemove}
                  className="flex-1 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[13px] font-semibold transition-all cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
