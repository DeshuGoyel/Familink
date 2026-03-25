import { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, Shield, Bell, Palette, AlertTriangle, Activity } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';
import { useTheme } from 'next-themes';

export default function Settings() {
  const { user } = useStore();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Profile');
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const tabs = [
    { name: 'Profile', icon: User },
    { name: 'Security', icon: Shield },
    { name: 'Recovery', icon: Activity },
    { name: 'Notifications', icon: Bell },
    { name: 'Appearance', icon: Palette },
    { name: 'Danger Zone', icon: AlertTriangle },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
  };

  const handleDelete = () => {
    if (deleteConfirm === 'DELETE') {
      toast.error('Account deletion simulation triggered');
      setDeleteConfirm('');
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
<main className="pt-6 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <header>
            <h1 className="text-3xl font-bold text-text">Settings</h1>
            <p className="text-muted mt-1">Manage your account and preferences.</p>
          </header>

          <div className="flex flex-col md:flex-row gap-8">
            <aside className="md:w-64 shrink-0 space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition ${
                    activeTab === tab.name 
                    ? tab.name === 'Danger Zone' ? 'bg-danger/10 text-danger font-medium' : 'bg-primary/20 text-primary font-medium border border-primary/20'
                    : 'text-muted hover:bg-surface hover:text-text'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </aside>

            <div className="flex-1">
              <div className="glassmorphism rounded-2xl p-6 md:p-8 border border-border">
                {activeTab === 'Profile' && (
                  <form onSubmit={handleSave} className="space-y-6">
                    <h2 className="text-xl font-bold text-text mb-6">Profile Information</h2>
                    <div className="flex items-center space-x-6 mb-8">
                      <div className="w-24 h-24 rounded-full bg-surface border-2 border-primary/50 flex items-center justify-center text-3xl font-bold text-primary">
                        {user.name.charAt(0)}
                      </div>
                      <Button variant="secondary" type="button">Upload New Avatar</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="Full Name" defaultValue={user.name} />
                      <Input label="Email Address" defaultValue={user.email} disabled />
                      <Input label="Phone Number" defaultValue="+1 (555) 123-4567" />
                      <Input label="Country" defaultValue="United States" />
                    </div>
                    <div className="pt-4">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                )}

                {activeTab === 'Security' && (
                  <div className="space-y-8">
                    <h2 className="text-xl font-bold text-text mb-6">Security Settings</h2>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-text border-b border-border pb-2">Two-Factor Authentication (2FA)</h3>
                      <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border">
                        <div>
                          <p className="font-medium text-text">Authenticator App</p>
                          <p className="text-sm text-muted">Use an app like Google Authenticator to generate codes.</p>
                        </div>
                        <Button variant="secondary">Enable 2FA</Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-text border-b border-border pb-2">Emergency Contact</h3>
                      <Input label="Emergency Contact Phone" placeholder="+1 (555) 000-0000" />
                      <Button onClick={handleSave}>Update Contact</Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-text border-b border-border pb-2">Active Sessions</h3>
                      {[
                        { device: 'MacBook Pro - Chrome', location: 'New York, USA', current: true },
                        { device: 'iPhone 15 - Safari', location: 'New York, USA', current: false }
                      ].map((s, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface rounded-xl border border-border gap-4">
                          <div>
                            <p className="font-medium text-text flex items-center gap-2">
                              {s.device} 
                              {s.current && <span className="text-[10px] uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded-full">Current</span>}
                            </p>
                            <p className="text-sm text-muted">{s.location}</p>
                          </div>
                          {!s.current && <Button variant="ghost" className="text-danger hover:bg-danger/10">Revoke</Button>}
                        </div>
                      ))}
                      <Button variant="secondary" className="mt-4 text-danger hover:bg-danger/10 hover:text-danger hover:border-danger/30 w-full md:w-auto">
                        Revoke All Other Sessions
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === 'Recovery' && (
                  <div className="space-y-8">
                     <h2 className="text-xl font-bold text-text mb-6">Recovery Triggers</h2>
                     <p className="text-sm text-muted mb-6">Configure how and when your legacy vault is unlocked for your heirs.</p>
                     
                     <div className="space-y-4">
                       <h3 className="text-lg font-medium text-text border-b border-border pb-2">Proof of Life Pulse</h3>
                       <div className="p-4 bg-surface rounded-xl border border-border space-y-4">
                          <p className="text-sm text-text">If you don't check in within this time, recovery is initiated.</p>
                          <select className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-text outline-none focus:border-primary">
                            <option value="7">Every 7 Days</option>
                            <option value="14">Every 14 Days</option>
                            <option value="30">Every 30 Days</option>
                            <option value="90">Every 90 Days</option>
                          </select>
                       </div>
                     </div>

                     <div className="space-y-4">
                       <h3 className="text-lg font-medium text-text border-b border-border pb-2">Death Certificate Upload</h3>
                       <div className="p-6 bg-surface/50 rounded-xl border border-dashed border-border/60 text-center space-y-3">
                           <Shield className="mx-auto text-primary opacity-50 mb-2" size={32}/>
                           <p className="font-medium text-text">Verify Status</p>
                           <p className="text-sm text-muted max-w-sm mx-auto">Upload an official death certificate to bypass the waiting period. Requires manual admin or AI verification.</p>
                           <Button variant="secondary" className="mt-4 text-xs font-medium border-primary/20 text-primary">Upload Certificate (PDF)</Button>
                       </div>
                     </div>
                  </div>
                )}

                {activeTab === 'Notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-text mb-6">Notification Preferences</h2>
                    <div className="space-y-4">
                      {[
                        { title: 'Email Alerts', desc: 'Critical security alerts and recovery initiation.' },
                        { title: 'Guardian Updates', desc: 'When guardians accept, view, or approve requests.' },
                        { title: 'Heir Activity', desc: 'When heirs log in or attempt recovery.' },
                        { title: 'Weekly Report', desc: 'Summary of your vault status and AI recommendations.' }
                      ].map((n, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border">
                          <div>
                            <p className="font-medium text-text">{n.title}</p>
                            <p className="text-sm text-muted">{n.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                            <div className="w-11 h-6 bg-surface border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-muted after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:after:bg-white"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                    <Button onClick={handleSave}>Save Preferences</Button>
                  </div>
                )}

                {activeTab === 'Appearance' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-text mb-6">Appearance</h2>
                    
                    <div>
                      <h3 className="font-medium text-text mb-3">Theme</h3>
                      <div className="flex space-x-4">
                        <button onClick={() => setTheme('dark')} className={`flex-1 py-4 border rounded-xl flex items-center justify-center transition-colors ${theme === 'dark' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surface text-muted hover:border-primary/50'}`}>
                          Dark Mode
                        </button>
                        <button onClick={() => setTheme('light')} className={`flex-1 py-4 border rounded-xl flex items-center justify-center transition-colors ${theme === 'light' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surface text-muted hover:border-primary/50'}`}>
                          Light Mode
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-text mb-3">Accent Color</h3>
                      <div className="flex space-x-4">
                        <button className="w-10 h-10 rounded-full bg-[#4F5CFF] ring-2 ring-offset-2 ring-offset-secondary ring-[#4F5CFF]" />
                        <button className="w-10 h-10 rounded-full bg-[#A855F7] hover:ring-2 hover:ring-offset-2 hover:ring-offset-secondary hover:ring-[#A855F7] transition" />
                        <button className="w-10 h-10 rounded-full bg-[#06B6D4] hover:ring-2 hover:ring-offset-2 hover:ring-offset-secondary hover:ring-[#06B6D4] transition" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-text mb-3">Font Size</h3>
                      <input type="range" min="1" max="3" defaultValue="2" className="w-full accent-primary" />
                      <div className="flex justify-between text-xs text-muted mt-2">
                        <span>Small</span>
                        <span>Medium</span>
                        <span>Large</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Danger Zone' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-danger mb-2">Delete Account</h2>
                      <p className="text-muted text-sm">
                        Permanently delete your LinkKey account and all data. Your vault will be destroyed and cryptographic keys purged. This action cannot be undone.
                      </p>
                    </div>

                    <div className="bg-danger/5 border border-danger/20 rounded-xl p-6">
                      <p className="font-medium text-text mb-4">To confirm deletion, type <span className="font-mono text-danger font-bold">DELETE</span> below:</p>
                      <Input 
                        value={deleteConfirm}
                        onChange={(e) => setDeleteConfirm(e.target.value)}
                        placeholder="DELETE"
                        className="mb-4"
                      />
                      <Button 
                        variant="danger" 
                        disabled={deleteConfirm !== 'DELETE'}
                        onClick={handleDelete}
                      >
                        Permanently Delete Account
                      </Button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
