import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, PlayCircle } from 'lucide-react';
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

const heirSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relation: z.string().min(1, 'Relationship is required'),
  email: z.string().email('Invalid email address'),
  notes: z.string().optional()
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
    toast.success(`Heir ${data.name} added successfully 👨‍👩‍👧`);
    setIsModalOpen(false);
    reset();
  };

  const totalValue = assets.reduce((acc, a) => acc + (a.value || 0), 0);

  return (
    <div className="min-h-screen bg-secondary">
<main className="pt-6 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-text">Heir Recovery Manager</h1>
              <p className="text-muted mt-1">{heirs.length} heirs registered · ${Math.round(totalValue/1000)}K protected</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="glow-blue border-primary">
              <Plus size={18} className="mr-2" /> Add Heir
            </Button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {heirs.map((heir, i) => (
              <motion.div
                key={heir.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glassmorphism p-6 rounded-2xl hover:border-primary/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-xl font-bold text-text group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      {heir.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text">{heir.name}</h3>
                      <p className="text-sm text-muted">{heir.relation} · {heir.email}</p>
                    </div>
                  </div>
                  <Badge variant={heir.status === 'In Recovery' ? 'warning' : 'default'}>{heir.status}</Badge>
                </div>

                {heir.status === 'In Recovery' ? (
                  <div className="bg-surface/50 rounded-xl p-4 border border-border">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-text font-medium">Recovery Progress</span>
                      <span className="text-muted">{heir.progress}%</span>
                    </div>
                    <ProgressBar value={heir.progress} color="bg-yellow-500" />
                    <Button variant="secondary" fullWidth className="mt-4" onClick={() => setActiveWizardHeir(heir.name)}>
                      View Recovery Steps
                    </Button>
                  </div>
                ) : (
                  <div className="bg-surface/50 rounded-xl p-4 border border-border flex flex-col items-center justify-center min-h-[120px]">
                    <Button variant="ghost" className="text-primary hover:bg-primary/10" onClick={() => setActiveWizardHeir(heir.name)}>
                      <PlayCircle size={20} className="mr-2" /> Start Recovery Simulation
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Heir">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Heir Name" {...register('name')} error={errors.name?.message as string} />
          <Input label="Relationship" placeholder="e.g. Daughter, Spouse" {...register('relation')} error={errors.relation?.message as string} />
          <Input label="Email Address" type="email" {...register('email')} error={errors.email?.message as string} />
          
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-muted">Internal Notes</label>
            <textarea 
              className="w-full bg-surface/80 border border-border rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary/50"
              rows={2}
              {...register('notes')}
            ></textarea>
          </div>
          <Button fullWidth type="submit" className="mt-4">Register Heir</Button>
        </form>
      </Modal>

      {activeWizardHeir && <RecoveryWizard heirName={activeWizardHeir} onClose={() => setActiveWizardHeir(null)} />}
    </div>
  );
}
