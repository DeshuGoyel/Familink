import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, PlayCircle, UserCheck, Activity, Users, Shield, Heart, GraduationCap, Gavel, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import ProgressBar from '../components/ui/ProgressBar';
import { useForm as useRHForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import RecoveryWizard from '../components/RecoveryWizard';
import Card from '../components/ui/Card';

const heirSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relation: z.string().min(1, 'Relationship is required'),
  email: z.string().email('Invalid email address'),
  notes: z.string().optional()
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
});

export default function Heirs() {
  const { heirs, addHeir, assets } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeWizardHeir, setActiveWizardHeir] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useRHForm({
    resolver: zodResolver(heirSchema)
  });

  const onSubmit = (data: any) => {
    addHeir(data);
    toast.success(`Succession rights registered for ${data.name}`);
    setIsModalOpen(false);
    reset();
  };

  const totalValue = assets.reduce((acc, a) => acc + (a.value || 0), 0);

  return (
    <div className="min-h-screen bg-page text-primary selection:bg-brand-primary/30 pt-20">
      <main className="px-4 sm:px-6 lg:px-8 pb-28 md:pb-12 max-w-7xl mx-auto space-y-12">
        
        {/* ── Page Header ── */}
        <motion.header {...fadeUp(0)} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-trust-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-trust-500">
                Succession Allocation Protocol
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary tracking-tight leading-none">
              Heir <span className="italic text-trust-500">Recovery</span>
            </h1>
            <p className="text-muted text-sm font-medium max-w-xl">
              Manage your designated beneficiaries and simulate institutional-grade asset recovery protocols for {heirs.length} registered heirs.
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} variant="primary" className="h-12 px-8 text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-trust-500/10">
            <Plus size={18} className="mr-2" /> Add Beneficiary
          </Button>
        </motion.header>

        {/* ── Stats Summary Hub ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: 'Network Status', val: 'Protocols Active', icon: UserCheck, color: 'text-trust-500', bg: 'bg-trust-500/10', border: 'border-trust-500/20' },
             { label: 'Readiness Index', val: '99.9% Reliable', icon: Activity, color: 'text-brand-primary', bg: 'bg-brand-primary/10', border: 'border-brand-primary/20' },
             { label: 'Succession Coverage', val: 'Full Allocation', icon: Users, color: 'text-brand-gold', bg: 'bg-brand-gold/10', border: 'border-brand-gold/20' }
           ].map((stat, i) => (
             <motion.div key={i} {...fadeUp(0.05 * (i + 1))}>
               <Card className="bg-surface/40 border border-base p-8 flex items-center gap-6 group hover:border-base transition-all">
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center border ${stat.border} shadow-inner group-hover:scale-105 transition-transform duration-500`}>
                     <stat.icon size={26} className={stat.color} />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary0 mb-1.5">{stat.label}</p>
                     <p className="text-lg font-display font-bold text-primary">{stat.val}</p>
                  </div>
               </Card>
             </motion.div>
           ))}
        </div>

        {/* ── Heirs Inventory ── */}
        <div className="space-y-8">
          <motion.div {...fadeUp(0.2)} className="flex items-center justify-between">
             <h3 className="text-xl font-display font-bold text-primary">Active Beneficiary Protocols</h3>
             <div className="flex items-center gap-4 text-[9px] font-bold text-obsidian-600 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Shield size={12}/> Verified Identity</span>
                <span className="w-1 h-1 rounded-full bg-surface/80" />
                <span className="flex items-center gap-1.5"><Heart size={12}/> Primary Heir</span>
             </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {heirs.map((heir, i) => (
              <motion.div key={heir.id} {...fadeUp(0.25 + i * 0.1)}>
                <Card className="p-10 group hover:border-brand-primary/30 transition-all bg-surface/40 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                     <Users size={120} className="text-brand-primary" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 rounded-[32px] bg-page border border-base flex items-center justify-center text-3xl font-display font-bold text-secondary group-hover:bg-brand-primary/10 group-hover:text-brand-primary group-hover:border-brand-primary/40 transition-all duration-500 shadow-inner">
                        {heir.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-bold text-primary tracking-tight group-hover:text-vault-50 transition-colors">{heir.name}</h3>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary0 mt-1.5">{heir.relation} · {heir.email}</p>
                      </div>
                    </div>
                    <Badge variant={heir.status === 'In Recovery' ? 'warning' : 'default'} className="px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                      {heir.status === 'In Recovery' ? 'Protocol Initiated' : 'Record Secured'}
                    </Badge>
                  </div>

                  {heir.status === 'In Recovery' ? (
                    <div className="bg-page/80 rounded-[32px] p-8 border border-base shadow-2xl relative overflow-hidden group/recovery">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Archival Transfer Progress</span>
                        <span className="text-lg font-display font-bold text-brand-primary">{heir.progress}%</span>
                      </div>
                      <ProgressBar value={heir.progress} color="bg-brand-primary" className="h-2.5 rounded-full" />
                      <Button variant="secondary" fullWidth className="mt-8 h-12 text-[10px] font-bold uppercase tracking-widest border-base bg-surface" onClick={() => setActiveWizardHeir(heir.name)}>
                        Audit Recovery Execution
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-page/30 rounded-[32px] p-10 border border-dashed border-base flex flex-col items-center justify-center min-h-[160px] group-hover:border-brand-primary/30 transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Button variant="ghost" className="relative z-10 text-brand-primary hover:bg-brand-primary/10 h-14 px-10 text-[10px] font-bold uppercase tracking-[0.25em] border border-transparent hover:border-brand-primary/20" onClick={() => setActiveWizardHeir(heir.name)}>
                        <PlayCircle size={20} className="mr-3" /> Simulate Recovery Handover
                      </Button>
                    </div>
                  )}
                  
                  <div className="mt-10 pt-8 border-t border-base/60 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                     <div className="flex gap-4">
                        <GraduationCap size={18} className="text-obsidian-600" />
                        <Gavel size={18} className="text-obsidian-600" />
                     </div>
                     <button className="text-[10px] font-bold text-obsidian-600 uppercase tracking-widest flex items-center gap-2 hover:text-muted transition-colors">
                        Protocol Logs <ChevronRight size={14}/>
                     </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </main>

      {/* ── Beneficiary Registration Modal ── */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); reset(); }} title="Register Institutional Heir">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pt-4">
          <Input label="Institutional Legal Name" placeholder="Full Name (As per identification)" {...register('name')} error={errors.name?.message as string} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Succession Relation" placeholder="e.g. Primary Heir, Trustee" {...register('relation')} error={errors.relation?.message as string} />
            <Input label="Digital Handshake (Email)" type="email" placeholder="email@protocol.com" {...register('email')} error={errors.email?.message as string} />
          </div>
          
          <div className="flex flex-col space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary0 ml-1">Succession Mandate & Context</label>
            <textarea 
              className="w-full bg-page border border-base rounded-2xl px-6 py-5 text-obsidian-100 text-sm focus:outline-none focus:border-trust-500/50 transition-all placeholder:text-obsidian-800 leading-relaxed min-h-[140px]"
              rows={4}
              placeholder="Provide specific mandates or private context for this beneficiary's protocol..."
              {...register('notes')}
            ></textarea>
          </div>
          <Button variant="primary" fullWidth type="submit" className="h-14 mt-6 text-[11px] font-bold uppercase tracking-[0.2em] bg-trust-500 hover:bg-trust-400 shadow-xl shadow-trust-500/20">
             Authorize Beneficiary Protocol
          </Button>
        </form>
      </Modal>

      {activeWizardHeir && <RecoveryWizard heirName={activeWizardHeir} onClose={() => setActiveWizardHeir(null)} />}
    </div>
  );
}
