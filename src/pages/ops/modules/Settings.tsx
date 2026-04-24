import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Globe, Mail, Save, RefreshCw, Shield, Bell, Phone, MapPin } from 'lucide-react';
import { opsApi } from '../../../lib/opsApi';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import toast from 'react-hot-toast';

export default function GlobalSettings() {
  const [settings, setSettings] = useState<any>({
    brand_name: '',
    support_email: '',
    support_phone: '',
    support_address: '',
    registration_enabled: true,
    maintenance_mode: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const data = await opsApi.get('/ops/branding'); 
      setSettings(data);
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
      await opsApi.put('/ops/branding', settings);
      toast.success('Settings updated');
    } catch (err) {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-20 text-slate-500 text-sm tracking-widest uppercase animate-pulse">Initializing System Config...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="text-indigo-500" />
          Global Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage critical system-wide configurations and contact info</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-900/40 border-slate-800 p-6 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Regional & Identity
            </h3>
            
            <Input
              label="Public Brand Name"
              value={settings.brand_name || ''}
              onChange={(e) => setSettings({ ...settings, brand_name: e.target.value })}
              className="bg-slate-950 border-slate-800"
            />

            <div className="space-y-4 pt-2">
              <div className="relative">
                <Mail className="absolute left-3 top-[38px] w-4 h-4 text-slate-500" />
                <Input
                  label="Support Email"
                  type="email"
                  value={settings.support_email || ''}
                  onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
                  className="bg-slate-950 border-slate-800 pl-10"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-[38px] w-4 h-4 text-slate-500" />
                <Input
                  label="Support Phone"
                  type="text"
                  value={settings.support_phone || ''}
                  onChange={(e) => setSettings({ ...settings, support_phone: e.target.value })}
                  className="bg-slate-950 border-slate-800 pl-10"
                  placeholder="+1 (234) 567-890"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 ml-1 mb-1">
                   <MapPin className="w-3 h-3" /> Support Address
                </label>
                <textarea
                  className="w-full h-24 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                  value={settings.support_address || ''}
                  onChange={(e) => setSettings({ ...settings, support_address: e.target.value })}
                  placeholder="Enter office address..."
                />
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/40 border-slate-800 p-6 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Shield className="w-4 h-4" /> System Control
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800">
                <div>
                  <p className="text-sm font-medium text-white">Public Registration</p>
                  <p className="text-[10px] text-slate-500">Allow new users to create accounts</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.registration_enabled ?? true}
                  onChange={(e) => setSettings({ ...settings, registration_enabled: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-800 bg-slate-900 text-indigo-500 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800">
                <div>
                  <p className="text-sm font-medium text-white">Maintenance Mode</p>
                  <p className="text-[10px] text-slate-500">Restrict access to all public services</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.maintenance_mode ?? false}
                  onChange={(e) => setSettings({ ...settings, maintenance_mode: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-800 bg-slate-900 text-red-500 focus:ring-red-500/20"
                />
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-indigo-500/5 border-indigo-500/20 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Direct Deployment</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Changes made here are applied immediately to all system contacts and service flags. Ensure all details are verified before saving.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="default" type="button" onClick={fetchSettings} className="border-slate-800">
            Discard
          </Button>
          <Button variant="primary" type="submit" className="px-10" disabled={isSaving}>
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Save All Settings
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
