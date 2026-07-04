import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useCheckinStore } from '../store/useCheckinStore';
import { User, Shield, Bell, Palette, AlertTriangle, Activity, ChevronRight, HardDrive, Fingerprint, Globe, ShieldAlert } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import toast from 'react-hot-toast';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
});

export default function Settings() {
  const { user } = useStore();
  const { checkinSettings, updateSettings } = useCheckinStore();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Profile');
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(localStorage.getItem('tl_user_phone') || "+1 (555) 123-4567");
  const [jurisdiction, setJurisdiction] = useState(user.jurisdiction || "Global / Sovereign");

  const tabs = [
    { name: 'Profile', icon: User, desc: 'Personal Identity' },
    { name: 'Security', icon: Shield, desc: 'Access & Auth' },
    { name: 'Recovery', icon: Activity, desc: 'Protocol Logic' },
    { name: 'Notifications', icon: Bell, desc: 'Signal Preferences' },
    { name: 'Appearance', icon: Palette, desc: 'Visual Interface' },
    { name: 'Danger Zone', icon: AlertTriangle, desc: 'Decommissioning' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('tl_user_name', name);
    localStorage.setItem('tl_user_email', email);
    localStorage.setItem('tl_user_phone', phone);
    useStore.setState({
      user: {
        ...user,
        name,
        email,
        jurisdiction
      }
    });
    toast.success('Configuration synchronized successfully');
  };

  const handleDelete = () => {
    if (deleteConfirm === 'DELETE') {
      toast.error('Account decommissioning sequence initiated');
      setDeleteConfirm('');
    }
  };

  return (
    <div className="min-h-screen bg-page text-primary selection:bg-brand-primary/30 pt-6">
      <main className="px-4 sm:px-6 lg:px-8 pb-28 md:pb-12 max-w-7xl mx-auto space-y-12">
        
        {/* ── Page Header ── */}
        <motion.header {...fadeUp(0)} className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-base shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
              System Configuration & Preferences
            </p>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-display font-bold text-primary tracking-tight leading-none">
            Vault <span className="italic text-muted">Settings</span>
          </h1>
          <p className="text-muted text-sm font-medium max-w-2xl">
            Fine-tune your institutional legacy infrastructure, security parameters, and automated verification protocols.
          </p>
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* ── Sidebar Navigation ── */}
          <motion.aside {...fadeUp(0.1)} className="lg:w-80 shrink-0 space-y-3">
            {tabs.map((tab, _i) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center justify-between w-full px-6 py-5 rounded-[24px] transition-all duration-500 group relative overflow-hidden ${
                  activeTab === tab.name 
                  ? tab.name === 'Danger Zone' 
                    ? 'bg-red-500/10 text-red-500 border border-red-500/30 shadow-2xl shadow-red-500/5' 
                    : 'bg-brand-primary/10 text-brand-primary border border-brand-primary/30 shadow-2xl shadow-brand-primary/5'
                  : 'text-secondary hover:bg-surface/60 hover:text-primary border border-transparent'
                }`}
              >
                <div className="flex items-center gap-5 relative z-10">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    activeTab === tab.name 
                      ? tab.name === 'Danger Zone' ? 'bg-red-500 text-white' : 'bg-brand-primary text-white' 
                      : 'bg-page border border-base text-secondary group-hover:border-base'
                  }`}>
                    <tab.icon size={18} />
                  </div>
                  <div className="text-left">
                    <span className="text-[11px] font-bold tracking-[0.1em] uppercase block">{tab.name}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-60 transition-opacity ${activeTab === tab.name ? 'opacity-60' : ''}`}>{tab.desc}</span>
                  </div>
                </div>
                {activeTab === tab.name && (
                  <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-1/2 bg-current rounded-full" />
                )}
                {activeTab === tab.name && <ChevronRight size={16} className="relative z-10 opacity-50" />}
              </button>
            ))}
            
            <div className="mt-12 p-8 rounded-[32px] bg-surface/40 border border-base/60 space-y-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 transform group-hover:scale-110 transition-transform">
                  <Shield size={100} className="text-brand-primary" />
               </div>
               <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">Institutional Health</p>
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <span className="text-xs font-bold text-muted">Vault Security Score</span>
                     <span className="text-sm font-display font-bold text-trust-500">94/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-page rounded-full overflow-hidden border border-base">
                     <div className="h-full w-[94%] bg-trust-500 rounded-full" />
                  </div>
               </div>
               <button className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-2 hover:text-brand-primary transition-colors">
                  Run Security Audit <ChevronRight size={14}/>
               </button>
            </div>
          </motion.aside>

          {/* ── Content Area ── */}
          <motion.div {...fadeUp(0.2)} className="flex-1">
            <Card className="p-10 lg:p-16 bg-surface/40 border border-base/60 rounded-[40px] min-h-[750px] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-base/20 to-transparent" />
              
              <AnimatePresence mode="wait">
                {activeTab === 'Profile' && (
                  <motion.form 
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSave} 
                    className="space-y-12"
                  >
                    <div className="space-y-4">
                      <h2 className="text-3xl font-display font-bold text-primary tracking-tight">Identity Profile</h2>
                      <p className="text-sm text-secondary font-medium italic">Your primary institutional identity recognized across all succession protocols.</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-10">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-[40px] bg-page border border-base flex items-center justify-center text-5xl font-display font-bold text-brand-primary group-hover:border-brand-primary/50 transition-all duration-700 shadow-2xl relative overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                           <span className="relative z-10">{name ? name.charAt(0) : ''}</span>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-brand-primary text-page flex items-center justify-center border-4 border-base shadow-xl cursor-pointer hover:scale-110 transition-transform">
                           <Activity size={18} />
                        </div>
                      </div>
                      <div className="space-y-4 text-center sm:text-left">
                         <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Avatar Allocation</p>
                         <div className="flex gap-4">
                           <Button variant="secondary" type="button" className="h-11 px-8 text-[10px] font-bold uppercase tracking-widest border-base">Update Matrix</Button>
                           <Button variant="ghost" type="button" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-muted">Purge Image</Button>
                         </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <Input label="Full Identity Name" value={name} onChange={e => setName(e.target.value)} className="h-14 rounded-2xl" />
                      <Input label="Protocol Email Address" value={email} onChange={e => setEmail(e.target.value)} className="h-14 rounded-2xl" />
                      <Input label="Secure Communication Line" value={phone} onChange={e => setPhone(e.target.value)} className="h-14 rounded-2xl" />
                      <Input label="Institutional Jurisdiction" value={jurisdiction} onChange={e => setJurisdiction(e.target.value)} className="h-14 rounded-2xl" />
                    </div>
                    
                    <div className="pt-8 border-t border-base/60 flex justify-end">
                      <Button type="submit" variant="primary" className="h-14 px-12 text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-brand-primary/10">Synchronize Identity</Button>
                    </div>
                  </motion.form>
                )}

                {activeTab === 'Security' && (
                  <motion.div 
                    key="security"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="space-y-4">
                      <h2 className="text-3xl font-display font-bold text-primary tracking-tight">Access Infrastructure</h2>
                      <p className="text-sm text-secondary font-medium italic">Cryptographic authentication layers and hardware authorization protocols.</p>
                    </div>
                    
                    <div className="space-y-8">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary flex items-center gap-3">
                         <Shield size={14} className="text-brand-primary"/> Multi-Factor Authentication
                      </h3>
                      <div className="p-8 bg-page/60 rounded-[32px] border border-base group hover:border-brand-primary/20 transition-all flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex gap-6 items-center">
                          <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20 shadow-inner">
                             <Fingerprint size={32} />
                          </div>
                          <div>
                            <p className="text-xl font-display font-bold text-primary tracking-tight">Authenticator Synthesis</p>
                            <p className="text-xs text-secondary font-medium mt-1 leading-relaxed">Hardware-grade verification required for all vault decrypts.</p>
                          </div>
                        </div>
                        <Button variant="secondary" className="h-12 px-8 text-[10px] font-bold uppercase tracking-widest border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10">Enable MFA Handshake</Button>
                      </div>
                    </div>

                    <div className="space-y-8 pt-4">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary flex items-center gap-3">
                         <Globe size={14} className="text-brand-primary"/> Active Protocol Handshakes
                      </h3>
                      <div className="space-y-4">
                        {[
                          { device: 'Institutional Workstation - Brave', location: 'New York, USA', current: true },
                          { device: 'Encrypted Mobile - Safari', location: 'Geneva, Switzerland', current: false }
                        ].map((s, i) => (
                          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-page/40 rounded-[24px] border border-base/60 gap-6 group hover:bg-page/60 transition-all">
                            <div className="flex items-center gap-6">
                               <div className="w-12 h-12 rounded-xl bg-surface border border-base flex items-center justify-center text-secondary group-hover:text-brand-primary transition-colors shadow-inner">
                                  <HardDrive size={20} />
                               </div>
                               <div>
                                <p className="font-display font-bold text-primary text-lg flex items-center gap-4 tracking-tight">
                                  {s.device} 
                                  {s.current && <span className="text-[9px] font-bold uppercase tracking-[0.2em] bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-3 py-1 rounded-full">Primary Node</span>}
                                </p>
                                <p className="text-[10px] font-bold text-secondary mt-1 uppercase tracking-widest">{s.location} · Active now</p>
                              </div>
                            </div>
                            {!s.current && <button className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest px-4 py-2 bg-red-500/10 rounded-xl border border-red-500/20">Revoke Token</button>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Recovery' && (
                  <motion.div 
                    key="recovery"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="space-y-4">
                      <h2 className="text-3xl font-display font-bold text-primary tracking-tight">Verification Protocols</h2>
                      <p className="text-sm text-secondary font-medium italic">Logical parameters for automated succession and vault release.</p>
                    </div>
                     
                    <div className="space-y-8">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary flex items-center gap-3">
                         <Activity size={14} className="text-brand-primary"/> Pulse Frequency
                      </h3>
                      <div className="p-10 bg-page/60 rounded-[40px] border border-base space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                           <Activity size={160} className="text-brand-primary" />
                        </div>
                        <p className="text-sm text-muted font-medium leading-relaxed italic max-w-lg">The system initiates a recovery sequence if an institutional handshake is not detected within the following duration:</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {['7 Days', '14 Days', '30 Days', '90 Days'].map((d) => {
                             const daysVal = d.split(' ')[0];
                             const freq = checkinSettings.frequency;
                             const isActive = 
                               freq === daysVal ||
                               (daysVal === '7' && freq === 'weekly') ||
                               (daysVal === '14' && freq === 'biweekly') ||
                               (daysVal === '30' && freq === 'monthly');

                             return (
                               <button 
                                 key={d} 
                                 onClick={() => {
                                   let val = daysVal;
                                   if (daysVal === '7') val = 'weekly';
                                   if (daysVal === '14') val = 'biweekly';
                                   if (daysVal === '30') val = 'monthly';
                                   updateSettings({ frequency: val });
                                 }}
                                 className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all ${isActive ? 'bg-brand-primary/10 border-brand-primary text-primary shadow-xl' : 'bg-surface border-base text-secondary hover:border-base'}`}
                               >
                                  <span className="text-xl font-display font-bold">{daysVal}</span>
                                  <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Days</span>
                               </button>
                             );
                           })}
                        </div>
                        <div className="mt-4 p-5 bg-surface rounded-2xl border border-base max-w-xs space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary block mb-1">Custom Interval (Days)</label>
                           <Input 
                             type="number" 
                             min="1" 
                             placeholder="Enter custom days..." 
                             value={!['weekly', 'biweekly', 'monthly', '7', '14', '30', '90'].includes(checkinSettings.frequency) ? checkinSettings.frequency : ''}
                             onChange={(e) => {
                               const val = e.target.value;
                               if (val) {
                                 updateSettings({ frequency: val });
                               }
                             }}
                             className="bg-slate-950/50 border-slate-800 text-white"
                           />
                        </div>
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest text-center mt-6">Recommended: 30-Day Protocol Cycle</p>
                      </div>
                    </div>

                    <div className="space-y-8 pt-4">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary flex items-center gap-3">
                         <ShieldAlert size={14} className="text-brand-primary"/> Override Authority
                      </h3>
                      <div className="p-12 bg-page/40 rounded-[40px] border border-dashed border-base text-center space-y-8 group hover:border-brand-primary/20 transition-all relative">
                          <div className="w-20 h-20 rounded-[28px] bg-brand-primary/5 border border-brand-primary/20 flex items-center justify-center mx-auto text-brand-primary group-hover:scale-110 transition-transform duration-700 shadow-inner">
                             <Shield size={36}/>
                          </div>
                          <div className="space-y-3">
                            <p className="text-2xl font-display font-bold text-primary tracking-tight">Legal Mandate Override</p>
                            <p className="text-sm text-secondary max-w-md mx-auto font-medium italic leading-relaxed">Submit verified legal documentation to bypass wait periods. Our institutional compliance engine audits submissions in real-time.</p>
                          </div>
                          <Button variant="secondary" className="h-14 px-12 text-[10px] font-bold uppercase tracking-widest border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 shadow-2xl">Submit Archival PDF</Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Appearance' && (
                  <motion.div 
                    key="appearance"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="space-y-4">
                      <h2 className="text-3xl font-display font-bold text-primary tracking-tight">Visual Foundation</h2>
                      <p className="text-sm text-secondary font-medium italic">Customize the aesthetic presentation of your legacy protocols.</p>
                    </div>
                    
                    <div className="space-y-8">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Interface Basis</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <button onClick={() => setTheme('dark')} className={`group flex flex-col items-center gap-6 p-10 rounded-[32px] border-2 transition-all duration-700 relative overflow-hidden ${theme === 'dark' ? 'bg-brand-primary/5 border-brand-primary shadow-2xl shadow-brand-primary/10' : 'bg-page border-base hover:border-base'}`}>
                          {theme === 'dark' && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(79,92,255,0.8)]" />}
                          <div className="w-full aspect-video bg-surface rounded-2xl border border-base shadow-2xl relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent" />
                          </div>
                          <span className="text-lg font-display font-bold text-primary">Institutional Dark</span>
                        </button>
                        <button onClick={() => setTheme('light')} className={`group flex flex-col items-center gap-6 p-10 rounded-[32px] border-2 transition-all duration-700 relative overflow-hidden ${theme === 'light' ? 'bg-brand-primary/5 border-brand-primary shadow-2xl shadow-brand-primary/10' : 'bg-page border-base hover:border-base'}`}>
                          {theme === 'light' && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(79,92,255,0.8)]" />}
                          <div className="w-full aspect-video bg-white rounded-2xl border border-gray-200 shadow-2xl" />
                          <span className="text-lg font-display font-bold text-primary">Institutional Light</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-8 pt-4">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Protocol Accent</h3>
                      <div className="flex gap-8">
                        {['#4F5CFF', '#D4AF37', '#06B6D4', '#10B981'].map((c, i) => (
                          <button key={c} className={`w-16 h-16 rounded-[20px] transition-all duration-500 border-4 border-base shadow-2xl ${i === 0 ? 'scale-110 ring-4 ring-brand-primary/20 ring-offset-8 ring-offset-base' : 'opacity-40 hover:opacity-100 hover:scale-105'}`} style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Danger Zone' && (
                  <motion.div 
                    key="danger"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="space-y-4">
                      <h2 className="text-3xl font-display font-bold text-red-500 tracking-tight">Vault Termination</h2>
                      <p className="text-sm text-red-500/60 font-medium italic">Critical sequence to permanently decommission your succession infrastructure.</p>
                    </div>

                    <div className="p-10 bg-red-500/5 border border-red-500/20 rounded-[40px] space-y-10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-10 opacity-5">
                         <AlertTriangle size={180} className="text-red-500" />
                      </div>
                      <p className="text-sm text-red-500/80 font-medium leading-loose italic relative z-10">
                        Warning: This protocol is final. Termination will result in the immediate and irreversible destruction of all vault archives, cryptographic key fragments, and beneficiary mandates. Transfer Legacy cannot recover purged data.
                      </p>
                      
                      <div className="space-y-8 relative z-10">
                        <div className="space-y-4">
                          <label className="text-[10px] font-bold text-red-500/60 uppercase tracking-[0.2em] ml-1">Authorize Termination Sequence</label>
                          <p className="text-xs text-secondary font-medium italic">Input <span className="font-mono text-red-500 font-bold bg-red-500/10 px-3 py-1 rounded-lg">DELETE</span> to unlock authorization button.</p>
                          <Input 
                            value={deleteConfirm}
                            onChange={(e) => setDeleteConfirm(e.target.value)}
                            placeholder="PROTOCOL_TERMINATION_CODE"
                            className="h-16 rounded-2xl border-red-500/20 focus:border-red-500/60 placeholder:text-red-900/20 bg-page/40 text-lg font-mono tracking-widest"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          disabled={deleteConfirm !== 'DELETE'}
                          onClick={handleDelete}
                          className="w-full h-16 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border-red-500/20 font-bold uppercase tracking-[0.2em] disabled:opacity-30 transition-all duration-500 shadow-xl shadow-red-500/5"
                        >
                          Decommission Vault Protocol
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </Card>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
