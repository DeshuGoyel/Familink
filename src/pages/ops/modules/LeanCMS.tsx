import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Save, 
  RefreshCw, 
  ExternalLink,
  Layout,
  Type,
  HelpCircle,
  AlertCircle,
  Users,
  Plus,
  Trash2,
  Image as ImageIcon,
  User
} from 'lucide-react';
import { opsApi } from '../../../lib/opsApi';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import toast from 'react-hot-toast';
import { cn } from '../../../utils/cn';

const DEFAULT_SLUGS = ['hero', 'faqs', 'features', 'team'];

const DEFAULT_STRUCTURES: Record<string, any> = {
  hero: { title: 'Welcome to Transfer Legacy', subtitle: 'Secure your digital legacy today.' },
  faqs: { items: [{ q: 'Example Question?', a: 'Example Answer.' }] },
  features: { items: [{ title: 'Secure Vault', description: 'End-to-end encrypted storage.' }] },
  team: { items: [{ name: 'John Doe', role: 'Founder', bio: 'Passionate about digital legacy.', imageUrl: '' }] }
};

export default function LeanCMS() {
  const [selectedSlug, setSelectedSlug] = useState<string>(DEFAULT_SLUGS[0]);
  const [formData, setFormData] = useState<any>({});
  const [currentVersion, setCurrentVersion] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContent();
  }, [selectedSlug]);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const data = await opsApi.get<any>(`/app/content/${selectedSlug}`);
      setFormData(data.body || DEFAULT_STRUCTURES[selectedSlug] || {});
      setCurrentVersion(data.version || 1);
    } catch (err) {
      // If content doesn't exist, initialize with default structure
      setFormData(DEFAULT_STRUCTURES[selectedSlug] || {});
      setCurrentVersion(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Use the new /ops/content endpoint which is unencrypted
      await opsApi.put('/ops/content', {
        slug: selectedSlug,
        body: formData,
        version: currentVersion
      });
      toast.success(`${selectedSlug.toUpperCase()} changes published!`);
      // After save, the backend might increment version or keep it. 
      // The ON CONFLICT DO UPDATE SET version = EXCLUDED.version means it stays what we sent.
    } catch (err: any) {
      toast.error(err.message || 'Failed to publish changes');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const filteredSlugs = DEFAULT_SLUGS.filter(s => s.includes(searchQuery.toLowerCase()));

  const renderEditor = () => {
    switch (selectedSlug) {
      case 'hero':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Main Title</label>
              <input 
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                value={formData.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Enter hero title..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Subtitle / Slogan</label>
              <textarea 
                className="w-full h-32 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-all resize-none leading-relaxed"
                value={formData.subtitle || ''}
                onChange={(e) => updateField('subtitle', e.target.value)}
                placeholder="Enter hero subtitle..."
              />
            </div>
          </div>
        );

      case 'faqs':
        const faqItems = formData.items || [];
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">FAQ Items</label>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 py-1"
                onClick={() => updateField('items', [...faqItems, { q: 'New Question', a: 'New Answer' }])}
              >
                <Plus className="w-4 h-4 mr-1" /> Add FAQ
              </Button>
            </div>
            <div className="space-y-4">
              {faqItems.map((item: any, idx: number) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl relative group">
                  <div className="space-y-3 pr-10">
                    <input 
                      type="text"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-semibold"
                      value={item.q || ''}
                      onChange={(e) => {
                        const newItems = [...faqItems];
                        newItems[idx].q = e.target.value;
                        updateField('items', newItems);
                      }}
                      placeholder="Question"
                    />
                    <textarea 
                      className="w-full h-20 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-400"
                      value={item.a || ''}
                      onChange={(e) => {
                        const newItems = [...faqItems];
                        newItems[idx].a = e.target.value;
                        updateField('items', newItems);
                      }}
                      placeholder="Answer"
                    />
                  </div>
                  <button 
                    onClick={() => updateField('items', faqItems.filter((_: any, i: number) => i !== idx))}
                    className="absolute top-4 right-4 p-2 text-slate-700 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'features':
        const featItems = formData.items || [];
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Site Features</label>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 py-1"
                onClick={() => updateField('items', [...featItems, { title: 'New Feature', description: 'Description' }])}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Feature
              </Button>
            </div>
            <div className="space-y-4">
              {featItems.map((item: any, idx: number) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex gap-4">
                  <div className="flex-1 space-y-3">
                    <input 
                      type="text"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-bold"
                      value={item.title || ''}
                      onChange={(e) => {
                        const newItems = [...featItems];
                        newItems[idx].title = e.target.value;
                        updateField('items', newItems);
                      }}
                      placeholder="Feature Title"
                    />
                    <textarea 
                      className="w-full h-16 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400 mt-2"
                      value={item.description || ''}
                      onChange={(e) => {
                        const newItems = [...featItems];
                        newItems[idx].description = e.target.value;
                        updateField('items', newItems);
                      }}
                      placeholder="Feature Description"
                    />
                  </div>
                  <button 
                    onClick={() => updateField('items', featItems.filter((_: any, i: number) => i !== idx))}
                    className="p-2 text-slate-700 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'team':
        const teamItems = formData.items || [];
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Team Members</label>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 py-1"
                onClick={() => updateField('items', [...teamItems, { name: 'Full Name', role: 'Job Title', bio: 'Short bio...', imageUrl: '' }])}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Member
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {teamItems.map((member: any, idx: number) => (
                <Card key={idx} className="bg-slate-950 border-slate-800 p-6 flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 overflow-hidden relative group">
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-slate-700" />
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                       <input 
                         type="text" 
                         className="w-full bg-slate-800/80 border border-slate-700 rounded text-[10px] text-white px-1 outline-none"
                         placeholder="URL..."
                         value={member.imageUrl || ''}
                         onChange={(e) => {
                            const newItems = [...teamItems];
                            newItems[idx].imageUrl = e.target.value;
                            updateField('items', newItems);
                         }}
                       />
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 uppercase ml-1">Name</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-bold"
                        value={member.name || ''}
                        onChange={(e) => {
                          const newItems = [...teamItems];
                          newItems[idx].name = e.target.value;
                          updateField('items', newItems);
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 uppercase ml-1">Role</label>
                      <input 
                        type="text"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-indigo-400"
                        value={member.role || ''}
                        onChange={(e) => {
                          const newItems = [...teamItems];
                          newItems[idx].role = e.target.value;
                          updateField('items', newItems);
                        }}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 uppercase ml-1">Biography</label>
                      <textarea 
                        className="w-full h-20 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400 resize-none"
                        value={member.bio || ''}
                        onChange={(e) => {
                          const newItems = [...teamItems];
                          newItems[idx].bio = e.target.value;
                          updateField('items', newItems);
                        }}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => updateField('items', teamItems.filter((_: any, i: number) => i !== idx))}
                    className="p-2 text-slate-700 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="text-indigo-500 shadow-glow shadow-indigo-500/20" />
            Lean CMS
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage landing page content via visual forms</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20" 
            onClick={fetchContent}
            disabled={isLoading}
          >
            <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
            Reload
          </Button>
          <Button 
            variant="primary" 
            className="px-8 shadow-xl shadow-indigo-500/10" 
            onClick={handleSave} 
            disabled={isSaving || isLoading}
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Publish Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <Card className="bg-slate-900/40 border-slate-800 p-4 h-fit space-y-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <div className="space-y-1">
              {filteredSlugs.map(slug => (
                <button
                  key={slug}
                  onClick={() => setSelectedSlug(slug)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-[13px] font-bold transition-all flex items-center gap-3",
                    selectedSlug === slug 
                      ? "bg-indigo-500/10 text-indigo-400 border-l-4 border-l-indigo-500" 
                      : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-300"
                  )}
                >
                  {slug === 'hero' && <Layout className="w-4 h-4" />}
                  {slug === 'faqs' && <HelpCircle className="w-4 h-4" />}
                  {slug === 'features' && <Type className="w-4 h-4" />}
                  {slug === 'team' && <Users className="w-4 h-4" />}
                  <span className="capitalize">{slug} Section</span>
                </button>
              ))}
           </div>
        </Card>

        {/* Form Editor */}
        <div className="lg:col-span-3">
          <Card className="bg-slate-900/20 border-slate-800 p-8 min-h-[600px] border-2 backdrop-blur-sm relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
             
             {isLoading ? (
               <div className="flex flex-col items-center justify-center py-40 space-y-4">
                  <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest animate-pulse">Syncing Schema...</p>
               </div>
             ) : (
               <>
                 <div className="mb-8 border-b border-slate-800 pb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white capitalize">{selectedSlug} Content</h2>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Version {currentVersion} • Active Component</p>
                    </div>
                 </div>
                 {renderEditor()}
               </>
             )}
          </Card>
        </div>
      </div>
    </div>
  );
}
