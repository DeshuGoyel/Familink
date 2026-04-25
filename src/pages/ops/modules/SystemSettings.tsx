import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Globe, 
  Mail, 
  Upload, 
  Save, 
  RefreshCw, 
  Eye, 
  Image as ImageIcon,
  Settings,
  ShieldAlert,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { opsApi } from '../../../lib/opsApi';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import toast from 'react-hot-toast';
import { cn } from '../../../utils/cn';

type Tab = 'identity' | 'theme' | 'controls';

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState<Tab>('identity');
  const [config, setConfig] = useState<any>({
    brand_name: '',
    logo_url: '',
    support_email: '',
    theme_config: {
      primaryColor: '#6366f1',
      darkMode: true,
      maintenanceMode: false
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await opsApi.get('/ops/branding');
      setConfig(data);
    } catch (err) {
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await opsApi.put('/ops/branding', config);
      toast.success('Configuration updated successfully');
    } catch (err) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-20 text-slate-500">Loading Configuration...</div>;
  }

  const tabs = [
    { id: 'identity', label: 'Site Identity', icon: Globe },
    { id: 'controls', label: 'System Controls', icon: Settings },
    { id: 'theme', label: 'Theme & UI', icon: Palette },
  ];

  return (
    <div className="max-w-5xl space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="text-indigo-500" />
          System Configuration
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage global brand identity, system behaviors, and visual themes</p>
      </div>

      <div className="flex gap-2 p-1.5 bg-slate-900/50 border border-slate-800 rounded-2xl w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium",
                isActive 
                  ? "bg-slate-800 text-white shadow-xl border border-slate-700/50" 
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSave} className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'identity' && (
              <motion.div
                key="identity"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <Card className="bg-slate-900/40 border-slate-800 p-6 space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Brand Identity</h3>
                  <Input
                    label="Business Name"
                    value={config.brand_name}
                    onChange={(e) => setConfig({ ...config, brand_name: e.target.value })}
                    placeholder="Transfer Legacy"
                    className="bg-slate-950 border-slate-800"
                  />
                  <Input
                    label="Support Contact Email"
                    type="email"
                    value={config.support_email}
                    onChange={(e) => setConfig({ ...config, support_email: e.target.value })}
                    placeholder="support@transferlegacy.com"
                    className="bg-slate-950 border-slate-800"
                  />
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-muted">Logo URL</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500/50 placeholder:text-slate-700"
                        value={config.logo_url}
                        onChange={(e) => setConfig({ ...config, logo_url: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                      />
                      <Button variant="default" type="button" className="px-3 border-slate-800 bg-slate-900">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'controls' && (
              <motion.div
                key="controls"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <Card className="bg-slate-900/40 border-slate-800 p-6 space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">System State</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-2xl group hover:border-red-500/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-white">Maintenance Mode</p>
                        <p className="text-xs text-slate-500">Redirect all client traffic to a maintenance page</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConfig({
                        ...config,
                        theme_config: { ...config.theme_config, maintenanceMode: !(config.theme_config?.maintenanceMode || false) }
                      })}
                      className={cn(
                        "w-12 h-6 rounded-full p-1 transition-colors duration-300",
                        config.theme_config?.maintenanceMode ? "bg-red-500" : "bg-slate-800"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 bg-white rounded-full transition-transform duration-300",
                        config.theme_config?.maintenanceMode ? "translate-x-6" : "translate-x-0"
                      )} />
                    </button>
                  </div>

                  <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                    <p className="text-xs text-indigo-400 leading-relaxed italic">
                      More system-level controls (Backup schedules, API rate limits, Session TTLs) will appear here as the infrastructure evolves.
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'theme' && (
              <motion.div
                key="theme"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <Card className="bg-slate-900/40 border-slate-800 p-6 space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Visual Styling</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="p-4 bg-slate-950 border border-indigo-500/30 rounded-2xl text-left space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                        <Monitor className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Interface Type</p>
                        <p className="text-[10px] text-slate-500">Modern Glassmorphism</p>
                      </div>
                    </button>
                    <button type="button" className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-left space-y-4 opacity-50 grayscale">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                        <Moon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Classic Mode</p>
                        <p className="text-[10px] text-slate-500">Coming Soon</p>
                      </div>
                    </button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-800/50">
            <Button variant="default" type="button" onClick={fetchSettings} className="border-slate-800 bg-slate-900">
              Discard
            </Button>
            <Button variant="primary" type="submit" className="px-12" disabled={isSaving}>
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save All Changes
            </Button>
          </div>
        </form>

        <div className="space-y-6 sticky top-8 h-fit">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
            <Eye className="w-4 h-4" /> 
            Identity Preview
          </h3>
          <Card className="bg-slate-950 border-slate-800 p-0 overflow-hidden shadow-2xl">
            <div className="bg-slate-900/50 p-3 border-b border-slate-800 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 bg-slate-800/30 rounded-md h-5 px-extra flex items-center">
                <span className="text-[10px] text-slate-600 truncate ml-2">
                  {(config.brand_name || '').toLowerCase().replace(/\s+/g, '-') || 'app'}.io
                </span>
              </div>
            </div>
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-slate-900 rounded-3xl mx-auto flex items-center justify-center border border-slate-800 shadow-inner">
                {config.logo_url ? (
                  <img src={config.logo_url} alt="Logo" className="max-w-[65%] max-h-[65%] object-contain" />
                ) : (
                  <ImageIcon className="text-slate-700 w-8 h-8" />
                )}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-lg text-white">{config.brand_name || 'Your Brand'}</h4>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Global Identity</p>
              </div>
            </div>
          </Card>
          <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Updating these values will reflect immediately across all public user-facing landing pages, authentication emails, and the main application console.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
