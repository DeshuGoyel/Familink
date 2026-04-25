import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Mail, Upload, Save, RefreshCw, Eye, Image as ImageIcon } from 'lucide-react';
import { opsApi } from '../../../lib/opsApi';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import toast from 'react-hot-toast';

export default function BrandingStudio() {
  const [config, setConfig] = useState<any>({
    brand_name: '',
    logo_url: '',
    support_email: '',
    theme_config: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchBranding();
  }, []);

  const fetchBranding = async () => {
    try {
      const data = await opsApi.get('/ops/branding');
      setConfig(data);
    } catch (err) {
      toast.error('Failed to load branding');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await opsApi.put('/ops/branding', config);
      toast.success('Branding updated successfully');
    } catch (err) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-20 text-slate-500">Loading Configuration...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Palette className="text-indigo-500" />
          Branding Studio
        </h1>
        <p className="text-slate-400 text-sm mt-1">Configure your application's visual identity and global settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleSave} className="md:col-span-2 space-y-6">
          <Card className="bg-slate-900/40 border-slate-800 p-6 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Identity</h3>
            
            <Input
              label="Application Name"
              value={config.brand_name}
              onChange={(e) => setConfig({ ...config, brand_name: e.target.value })}
              placeholder="Transfer Legacy"
              className="bg-slate-950 border-slate-800"
            />

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted">Brand Logo URL</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500/50"
                  value={config.logo_url}
                  onChange={(e) => setConfig({ ...config, logo_url: e.target.value })}
                  placeholder="https://..."
                />
                <Button variant="default" type="button" className="px-3 border-slate-800">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Input
              label="Support Email"
              type="email"
              value={config.support_email}
              onChange={(e) => setConfig({ ...config, support_email: e.target.value })}
              placeholder="support@transferlegacy.com"
              className="bg-slate-950 border-slate-800"
            />
          </Card>

          <Card className="bg-slate-900/40 border-slate-800 p-6 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Theme Assets</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full" />
                </div>
                <span className="text-xs font-semibold">Primary Color</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center gap-3 opacity-50 cursor-not-allowed">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold">Custom Theme</span>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="default" type="button" onClick={fetchBranding} className="border-slate-800">
              Reset Changes
            </Button>
            <Button variant="primary" type="submit" className="px-10" disabled={isSaving}>
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Branding
            </Button>
          </div>
        </form>

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <Eye className="w-4 h-4" /> 
            Live Preview
          </h3>
          <Card className="bg-slate-950 border-slate-800 p-0 overflow-hidden shadow-2xl">
            <div className="bg-slate-900/50 p-3 border-b border-slate-800 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 bg-slate-800/50 rounded-md h-5 px-2 flex items-center">
                <Globe className="w-3 h-3 text-slate-600 mr-2" />
                <span className="text-[10px] text-slate-500 truncate">{config.brand_name.toLowerCase().replace(' ', '-')}.io</span>
              </div>
            </div>
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl mx-auto flex items-center justify-center border border-slate-800">
                {config.logo_url ? (
                  <img src={config.logo_url} alt="Logo" className="max-w-[70%] max-h-[70%] object-contain" />
                ) : (
                  <ImageIcon className="text-slate-700" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-white">{config.brand_name || 'Your Brand'}</h4>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mt-1">Dashboard</p>
              </div>
              <div className="space-y-2 mt-4">
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-2/3" />
                </div>
                <div className="h-2 w-1/2 bg-slate-900 rounded-full mx-auto" />
              </div>
            </div>
          </Card>
          <p className="text-[10px] text-slate-600 leading-relaxed text-center px-4">
            * This preview simulates how the branding items will appear in the main client application navbar and dashboard.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
