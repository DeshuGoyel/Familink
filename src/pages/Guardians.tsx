import { useState } from 'react';
import { useStore } from '../store/useStore';
import Sidebar from '../components/layout/Sidebar';
import { UserPlus, Trash2, Mail, Info } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { useForm as useRHForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import GuardianNetwork3D from '../components/3d/GuardianNetwork3D';

const guardianSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().optional()
});

export default function Guardians() {
  const { guardians, addGuardian, removeGuardian } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [template, setTemplate] = useState('Formal');

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useRHForm({
    resolver: zodResolver(guardianSchema)
  });

  const templates = {
    Formal: "I am adding you as a guardian to my LinkKey Vault to secure my digital legacy.",
    Personal: "Hey! I'm setting up my digital inheritance and chosen you to be one of my trusted guardians.",
    Brief: "Please accept this invitation to be my digital guardian on LinkKey."
  };

  const handleTemplateSelect = (t: string) => {
    setTemplate(t);
    setValue('message', templates[t as keyof typeof templates]);
  };

  const onSubmit = (data: any) => {
    addGuardian({ name: data.name, email: data.email });
    toast.success(`Invite sent to ${data.name} 🔑`);
    setIsModalOpen(false);
    reset();
  };

  const confirmed = guardians.filter(g => g.status === 'Confirmed').length;
  const pending = guardians.filter(g => g.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-secondary">
      <Sidebar />
      <main className="md:pl-64 pt-6 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-text">Guardian Network</h1>
              <p className="text-muted mt-1">{confirmed} active guardians · {pending} pending</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="glow-blue">
              <UserPlus size={18} className="mr-2" /> Invite Guardian
            </Button>
          </header>

          <div className="h-80 w-full rounded-2xl bg-surface border border-border overflow-hidden relative">
            <Canvas camera={{ position: [0, 4, 10], fov: 45 }}>
              <GuardianNetwork3D guardians={guardians} />
            </Canvas>
          </div>

          {confirmed < 3 && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start space-x-3 text-yellow-500">
              <Info size={20} className="mt-0.5 shrink-0" />
              <p className="text-sm">
                You need at least 3 confirmed guardians for full vault recovery using Shamir's Secret Sharing. Add {3 - confirmed} more to reach full protection.
              </p>
            </div>
          )}

          <div className="space-y-4 mt-8">
            {guardians.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glassmorphism p-4 rounded-xl flex items-center justify-between hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                    ${g.status === 'Confirmed' ? 'bg-primary/20 text-primary' : 'bg-surface border border-border text-muted'}
                  `}>
                    {g.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">{g.name}</h3>
                    <p className="text-sm text-muted">{g.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Badge variant={g.status === 'Confirmed' ? 'success' : 'warning'}>{g.status}</Badge>
                  <div className="flex space-x-2">
                    {g.status === 'Pending' && (
                      <button 
                        onClick={() => toast.success('Invite resent')}
                        className="p-2 text-muted hover:text-primary transition bg-surface rounded-md"
                        title="Resend Invite"
                      >
                        <Mail size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => { removeGuardian(g.id); toast.success('Guardian removed'); }}
                      className="p-2 text-muted hover:text-danger transition bg-surface rounded-md"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Invite Guardian">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Guardian Name" {...register('name')} error={errors.name?.message as string} />
          <Input label="Email Address" type="email" {...register('email')} error={errors.email?.message as string} />
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Message Template</label>
            <div className="flex space-x-2">
              {['Formal', 'Personal', 'Brief'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTemplateSelect(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    template === t ? 'bg-primary text-white' : 'bg-surface text-muted border border-border'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <textarea
              {...register('message')}
              className="w-full mt-2 bg-surface/80 border border-border rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary/50"
              rows={3}
            />
          </div>
          
          <Button fullWidth type="submit" className="mt-4">Send Invite</Button>
        </form>
      </Modal>
    </div>
  );
}
