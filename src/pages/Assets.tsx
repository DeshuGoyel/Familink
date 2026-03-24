import { useState } from 'react';
import { useStore } from '../store/useStore';
import Sidebar from '../components/layout/Sidebar';
import { Wallet, Plus, Edit2, Trash2, Box } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { useForm as useRHForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const assetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  value: z.number().optional().or(z.nan()),
  notes: z.string().optional()
});

export default function Assets() {
  const { assets, addAsset, deleteAsset } = useStore();
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const tabs = ['All', 'Crypto', 'NFTs', 'Documents', 'Account', 'Other'];
  
  const filteredAssets = activeTab === 'All' 
    ? assets 
    : assets.filter(a => a.type === activeTab || (activeTab === 'NFTs' && a.type === 'NFT') || (activeTab === 'Crypto' && (a.type === 'Crypto' || a.type === 'Wallet')));

  const totalValue = assets.reduce((acc, a) => acc + (a.value || 0), 0);

  const { register, handleSubmit, reset, formState: { errors } } = useRHForm({
    resolver: zodResolver(assetSchema)
  });

  const onSubmit = (data: any) => {
    addAsset({
      ...data,
      status: 'Protected',
      date: new Date().toISOString().split('T')[0],
      tags: [data.type.toLowerCase()]
    });
    toast.success('Asset added successfully');
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Sidebar />
      
      <main className="md:pl-64 pt-6 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-8 relative">
          
          <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-50 hidden md:block">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="#4F5CFF" wireframe />
                </mesh>
              </Float>
              <ambientLight intensity={0.5} />
            </Canvas>
          </div>

          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text">Asset Vault</h1>
              <p className="text-muted mt-1">{assets.length} assets protected · ${totalValue.toLocaleString()} estimated value</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="glow-blue">
              <Plus size={18} className="mr-2" /> Add Asset
            </Button>
          </header>

          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  activeTab === tab 
                  ? 'bg-primary/20 text-primary border border-primary/50' 
                  : 'bg-surface text-muted border border-border hover:bg-surface/80'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset, i) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glassmorphism rounded-2xl p-6 relative group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(79,92,255,0.12)] hover:border-primary/40"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-surface rounded-xl border border-border group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                      {asset.type === 'Crypto' ? <Wallet size={20} className="text-orange-500" /> :
                       asset.type === 'NFT' ? <Box size={20} className="text-pink-500" /> :
                       <Wallet size={20} className="text-blue-500" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text truncate max-w-[150px]">{asset.name}</h3>
                      <p className="text-xs text-muted">{asset.type}</p>
                    </div>
                  </div>
                  <Badge variant={asset.status === 'Protected' ? 'success' : 'warning'}>
                    {asset.status}
                  </Badge>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-text">${asset.value?.toLocaleString() || '0'}</p>
                    <p className="text-[10px] text-muted">Updated {asset.date}</p>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-surface hover:bg-surface/80 rounded-md text-muted transition"><Edit2 size={16} /></button>
                    <button onClick={() => { deleteAsset(asset.id); toast.success('Deleted asset'); }} className="p-2 bg-danger/10 hover:bg-danger/20 rounded-md text-danger transition"><Trash2 size={16} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredAssets.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted">No assets found for {activeTab}.</p>
            </div>
          )}
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Asset">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select 
            label="Asset Type"
            {...register('type')}
            error={errors.type?.message as string}
            options={[
              { value: '', label: 'Select Type' },
              { value: 'Crypto', label: 'Crypto Wallet' },
              { value: 'NFT', label: 'NFT Collection' },
              { value: 'Document', label: 'Legal Document' },
              { value: 'Account', label: 'Online Account' },
            ]}
          />
          <Input 
            label="Asset Name"
            placeholder="e.g. Main BTC Wallet"
            {...register('name')}
            error={errors.name?.message as string}
          />
          <Input 
            label="Estimated Value (USD)"
            type="number"
            {...register('value', { valueAsNumber: true })}
            placeholder="0"
          />
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-muted">Notes for Heirs</label>
            <textarea 
              className="w-full bg-surface/80 border border-border rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary/50"
              rows={3}
              placeholder="What should your heirs know?"
              {...register('notes')}
            ></textarea>
          </div>
          <Button fullWidth type="submit" className="mt-4">Save to Vault</Button>
        </form>
      </Modal>
    </div>
  );
}
