import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Save, RefreshCw, Eye, Image as ImageIcon } from 'lucide-react';
import { opsApi } from '../../../lib/opsApi';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import toast from 'react-hot-toast';

export default function BrandingStudio() {
  const [config, setConfig] = useState<unknown>({
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
    } catch {
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
      toast.success('Theme assets updated');
    } catch {
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
          Visual Branding
        </h1>
        <p className="text-slate-400 text-sm mt-1">Configure your application's visual themes and aesthetic assets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleSave} className="md:col-span-2 space-y-6">
          <Card className="bg-slate-900/40 border-slate-800 p-6 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Theme Assets</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 rounded-2xl flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full" />
                </div>
                <span className="text-xs font-semibold">Primary Color</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 rounded-2xl flex flex-col items-center gap-3 opacity-50 cursor-not-allowed">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold">Secondary Accent</span>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/40 border-slate-800 p-6 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Global Styles</h3>
            <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
              <p className="text-xs text-indigo-400 leading-relaxed italic">
                Aesthetic controls for border radius, blur intensity, and gradient styles will appear here in the next update.
              </p>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={fetchBranding} className="border-slate-800">
              Discard
            </Button>
            <Button variant="primary" type="submit" className="px-10" disabled={isSaving}>
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Theme
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
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mt-1">Theme Preview</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
