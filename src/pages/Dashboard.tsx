import { useStore } from '../store/useStore';
import Sidebar from '../components/layout/Sidebar';
import { Shield, Users, KeyRound, Plus, Wallet, Bot } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Button from '../components/ui/Button';
import LegacyScoreGauge from '../components/dashboard/LegacyScoreGauge';
import AssetDonutChart from '../components/dashboard/AssetDonutChart';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import AIInsightBanner from '../components/dashboard/AIInsightBanner';
import { Canvas } from '@react-three/fiber';
import VaultScene from '../components/3d/VaultScene';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, assets, guardians, heirs } = useStore();
  const navigate = useNavigate();

  const totalValue = assets.reduce((acc, asset) => acc + (asset.value || 0), 0);
  const activeGuardians = guardians.filter(g => g.status === 'Confirmed').length;

  return (
    <div className="min-h-screen bg-secondary">
      <Sidebar />
      
      <main className="md:pl-64 pt-6 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text">Good morning, {user.name.split(' ')[0]} 👋</h1>
              <p className="text-muted mt-1">Here is the status of your digital legacy today.</p>
            </div>
          </header>

          <AIInsightBanner />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glassmorphism rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(79,92,255,0.12)] transition-all duration-300"
            >
              <h3 className="text-muted font-medium w-full text-left mb-4">Legacy Score</h3>
              <LegacyScoreGauge score={user.score} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <StatCard
                title="Assets Protected"
                value={assets.length}
                icon={<Shield size={20} />}
                trend={{ value: 12, label: 'vs last month', positive: true }}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <StatCard
                title="Active Guardians"
                value={activeGuardians}
                icon={<Users size={20} />}
                trend={{ value: activeGuardians, label: `out of ${guardians.length} total`, positive: true }}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <StatCard
                title="Heirs Registered"
                value={heirs.length}
                icon={<KeyRound size={20} />}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 glassmorphism rounded-2xl p-6 relative overflow-hidden cursor-pointer group hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(79,92,255,0.12)] transition-all duration-300"
              onClick={() => navigate('/assets')}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-text">Your Secure Vault</h3>
                  <p className="text-muted text-sm mt-1">Total value protected: ${totalValue.toLocaleString()}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigate('/assets'); }}>
                    View All
                  </Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); }}>
                    <Plus size={16} className="mr-1" /> Add
                  </Button>
                </div>
              </div>
              
              <div className="h-80 w-full rounded-xl bg-gradient-to-b from-surface/50 to-surface border border-border/50 relative">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                  <VaultScene score={user.score} />
                </Canvas>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                  <span className="px-4 py-1.5 rounded-full bg-surface/80 backdrop-blur border border-border text-xs font-medium text-muted">
                    Interactive 3D Vault
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.6 }}
                className="glassmorphism rounded-2xl p-6 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(79,92,255,0.12)] transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-text mb-4">Asset Distribution</h3>
                <AssetDonutChart />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.7 }}
                className="glassmorphism rounded-2xl p-6 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(79,92,255,0.12)] transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-text">Recent Activity</h3>
                  <button className="text-sm text-primary hover:text-primary/80 transition">View all</button>
                </div>
                <ActivityFeed />
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/assets" className="glassmorphism rounded-xl p-4 flex flex-col items-center justify-center hover:bg-surface transition-all hover:scale-[1.02] group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                <Wallet size={24} />
              </div>
              <span className="font-medium text-text">Add Asset</span>
            </Link>
            <Link to="/guardians" className="glassmorphism rounded-xl p-4 flex flex-col items-center justify-center hover:bg-surface transition-all hover:scale-[1.02] group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                <Users size={24} />
              </div>
              <span className="font-medium text-text">Invite Guardian</span>
            </Link>
            <Link to="/heirs" className="glassmorphism rounded-xl p-4 flex flex-col items-center justify-center hover:bg-surface transition-all hover:scale-[1.02] group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                <KeyRound size={24} />
              </div>
              <span className="font-medium text-text">Add Heir</span>
            </Link>
            <Link to="/ai-planner" className="glassmorphism rounded-xl p-4 flex flex-col items-center justify-center hover:bg-surface transition-all hover:scale-[1.02] group glow-blue">
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                <Bot size={24} />
              </div>
              <span className="font-medium text-text">AI Planner</span>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
