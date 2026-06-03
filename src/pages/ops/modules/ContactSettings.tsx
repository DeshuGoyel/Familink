import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Globe, Save, Plus, Trash2, MessageSquare, Clock } from 'lucide-react';
import { opsApi } from '../../../lib/opsApi';
import toast from 'react-hot-toast';

interface ContactConfig {
  office_address: string;
  map_embed_url: string;
  emails: { label: string; email: string }[];
  phones: { label: string; number: string }[];
  social_links: Record<string, string>;
  working_hours: { days: string; hours: string }[];
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function ContactSettings() {
  const [config, setConfig] = useState<ContactConfig | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'messages'>('config');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [configData, messagesData] = await Promise.all([
        opsApi.get<ContactConfig>('/ops/contact'),
        opsApi.get<ContactMessage[]>('/ops/contact/messages')
      ]);
      setConfig(configData);
      setMessages(messagesData);
    } catch {
      toast.error('Failed to load contact settings');
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try {
      await opsApi.put('/ops/contact', config);
      toast.success('Contact settings updated');
    } catch {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const addEmail = () => setConfig(prev => prev ? ({ ...prev, emails: [...prev.emails, { label: '', email: '' }] }) : null);
  const removeEmail = (index: number) => setConfig(prev => prev ? ({ ...prev, emails: prev.emails.filter((_, _i) => i !== index) }) : null);
  
  const addPhone = () => setConfig(prev => prev ? ({ ...prev, phones: [...prev.phones, { label: '', number: '' }] }) : null);
  const removePhone = (index: number) => setConfig(prev => prev ? ({ ...prev, phones: prev.phones.filter((_, _i) => i !== index) }) : null);

  const addWorkingHour = () => setConfig(prev => prev ? ({ ...prev, working_hours: [...prev.working_hours, { days: '', hours: '' }] }) : null);
  const removeWorkingHour = (index: number) => setConfig(prev => prev ? ({ ...prev, working_hours: prev.working_hours.filter((_, i) => i !== index) }) : null);

  if (loading) return <div className="p-8 text-slate-400">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Contact Management</h1>
          <p className="text-slate-400">Configure your professional contact presence and manage inquiries.</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-900 rounded-lg">
          <button 
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 rounded-md transition-all ${activeTab === 'config' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Configuration
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${activeTab === 'messages' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Messages
            {messages.filter(m => !m.is_read).length > 0 && (
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {activeTab === 'config' ? (
        <div className="space-y-8">
          {/* Office & Map */}
          <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-indigo-400" />
              Office & Location
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Office Address</label>
                <textarea 
                  value={config?.office_address || ''}
                  onChange={e => setConfig(prev => prev ? ({ ...prev, office_address: e.target.value }) : null)}
                  className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl focus:border-indigo-500 outline-none transition-all resize-none"
                  placeholder="Enter full address..."
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Google Maps Embed URL</label>
                <input 
                  type="text"
                  value={config?.map_embed_url || ''}
                  onChange={e => setConfig(prev => prev ? ({ ...prev, map_embed_url: e.target.value }) : null)}
                  className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl focus:border-indigo-500 outline-none transition-all"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
              </div>
            </div>
          </section>

          {/* Emails & Phones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Mail size={20} className="text-blue-400" />
                  Email Addresses
                </h2>
                <button onClick={addEmail} className="p-2 hover:bg-white/5 rounded-lg text-indigo-400 transition-colors">
                  <Plus size={20} />
                </button>
              </div>
              <div className="space-y-4">
                {config?.emails.map((email, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      placeholder="Label (e.g. Sales)"
                      value={email.label}
                      onChange={e => {
                        const newEmails = [...config.emails];
                        newEmails[idx].label = e.target.value;
                        setConfig({ ...config, emails: newEmails });
                      }}
                      className="w-1/3 px-4 py-2 bg-slate-800 border border-white/10 rounded-lg outline-none"
                    />
                    <input 
                      placeholder="Email"
                      value={email.email}
                      onChange={e => {
                        const newEmails = [...config.emails];
                        newEmails[idx].email = e.target.value;
                        setConfig({ ...config, emails: newEmails });
                      }}
                      className="flex-1 px-4 py-2 bg-slate-800 border border-white/10 rounded-lg outline-none"
                    />
                    <button onClick={() => removeEmail(idx)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Phone size={20} className="text-emerald-400" />
                  Phone Numbers
                </h2>
                <button onClick={addPhone} className="p-2 hover:bg-white/5 rounded-lg text-indigo-400 transition-colors">
                  <Plus size={20} />
                </button>
              </div>
              <div className="space-y-4">
                {config?.phones.map((phone, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      placeholder="Label"
                      value={phone.label}
                      onChange={e => {
                        const newPhones = [...config.phones];
                        newPhones[idx].label = e.target.value;
                        setConfig({ ...config, phones: newPhones });
                      }}
                      className="w-1/3 px-4 py-2 bg-slate-800 border border-white/10 rounded-lg outline-none"
                    />
                    <input 
                      placeholder="Number"
                      value={phone.number}
                      onChange={e => {
                        const newPhones = [...config.phones];
                        newPhones[idx].number = e.target.value;
                        setConfig({ ...config, phones: newPhones });
                      }}
                      className="flex-1 px-4 py-2 bg-slate-800 border border-white/10 rounded-lg outline-none"
                    />
                    <button onClick={() => removePhone(idx)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Social Links & Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Globe size={20} className="text-purple-400" />
                Social Media
              </h2>
              <div className="space-y-4">
                {['LinkedIn', 'Twitter', 'Facebook', 'Instagram'].map(platform => (
                  <div key={platform} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-slate-400">{platform}</span>
                    <input 
                      type="text"
                      placeholder="URL..."
                      value={config?.social_links[platform] || ''}
                      onChange={e => {
                        const newLinks = { ...config?.social_links, [platform]: e.target.value };
                        setConfig(prev => prev ? ({ ...prev, social_links: newLinks }) : null);
                      }}
                      className="flex-1 px-4 py-2 bg-slate-800 border border-white/10 rounded-lg outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Clock size={20} className="text-orange-400" />
                  Working Hours
                </h2>
                <button onClick={addWorkingHour} className="p-2 hover:bg-white/5 rounded-lg text-indigo-400 transition-colors">
                  <Plus size={20} />
                </button>
              </div>
              <div className="space-y-4">
                {config?.working_hours.map((w, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      placeholder="Days"
                      value={w.days}
                      onChange={e => {
                        const newHours = [...config.working_hours];
                        newHours[idx].days = e.target.value;
                        setConfig({ ...config, working_hours: newHours });
                      }}
                      className="w-1/2 px-4 py-2 bg-slate-800 border border-white/10 rounded-lg outline-none"
                    />
                    <input 
                      placeholder="Hours"
                      value={w.hours}
                      onChange={e => {
                        const newHours = [...config.working_hours];
                        newHours[idx].hours = e.target.value;
                        setConfig({ ...config, working_hours: newHours });
                      }}
                      className="flex-1 px-4 py-2 bg-slate-800 border border-white/10 rounded-lg outline-none"
                    />
                    <button onClick={() => removeWorkingHour(idx)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 px-8 py-3 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-lg shadow-indigo-500/20"
            >
              {saving ? 'Saving...' : (
                <>
                  <Save size={20} />
                  Save Configuration
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-dashed border-white/10">
              <MessageSquare size={48} className="mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400 font-medium">No messages yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {messages.map(msg => (
                <div key={msg.id} className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl relative group transition-all hover:border-indigo-500/30">
                  {!msg.is_read && (
                    <div className="absolute top-6 right-6 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{msg.subject || 'No Subject'}</h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-slate-200">{msg.name}</span>
                        <span className="text-slate-600">•</span>
                        <a href={`mailto:${msg.email}`} className="text-indigo-400 hover:underline">{msg.email}</a>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500">{new Date(msg.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <p className="text-slate-400 leading-relaxed bg-slate-800/50 p-4 rounded-xl">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
