import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, CheckCircle, Clock, Bell, History, Settings, Fingerprint, Mail } from 'lucide-react';
import { useCheckinStore } from '../store/useCheckinStore';
import { Canvas } from '@react-three/fiber';
import { CheckInHeart } from '../components/checkin/CheckInHeart';
import Button from '../components/ui/Button';

export default function CheckInCenter() {
  const { checkins, checkinSettings, completeCheckin, updateSettings, simulateMissedCheckin } = useCheckinStore();
  const [showSettings, setShowSettings] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const isAlertMode = checkinSettings.status !== 'active';
  const misses = checkinSettings.currentStreak === 0 ? checkinSettings.totalMissed : 0; // Quick mock derivation

  // Update countdown timer
  useEffect(() => {
    const updateTime = () => {
      const last = checkinSettings.lastCheckinAt ? new Date(checkinSettings.lastCheckinAt) : new Date(Date.now() - 86400000);
      let nextDue = new Date(last);
      if (checkinSettings.frequency === 'weekly') nextDue.setDate(nextDue.getDate() + 7);
      if (checkinSettings.frequency === 'biweekly') nextDue.setDate(nextDue.getDate() + 14);
      if (checkinSettings.frequency === 'monthly') nextDue.setMonth(nextDue.getMonth() + 1);

      const diff = nextDue.getTime() - Date.now();
      if (diff <= 0) {
        setTimeRemaining('Overdue');
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        setTimeRemaining(`${d}d ${h}h ${m}m`);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [checkinSettings]);

  const handleCheckIn = () => {
    completeCheckin('tap');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            Proof of Life
            <span className={`px-3 py-1 text-xs rounded-full font-medium flex items-center gap-1 border ${
              isAlertMode ? 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)] animate-pulse' : 
              'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
            }`}>
              {isAlertMode ? <ShieldAlert size={14}/> : <Shield size={14}/>}
              {isAlertMode ? 'ALERT MODE' : 'ACTIVE'}
            </span>
          </h1>
          <p className="text-muted mt-2">Your vault stays active as long as you do.</p>
        </div>
      </header>

      {/* 3D Scene */}
      <div className="h-48 w-full rounded-2xl bg-gradient-to-b from-surface/50 to-surface border border-border/50 relative overflow-hidden flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <CheckInHeart isAlert={isAlertMode} />
        </Canvas>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17,24,39,0.8)_100%)]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Status Card */}
        <div className="md:col-span-2 glassmorphism rounded-2xl p-6 relative">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-surface/50 rounded-xl border border-border/50">
              <p className="text-sm text-muted mb-1 flex items-center gap-1"><History size={14}/> Last Check-In</p>
              <p className="text-lg font-medium text-text">
                {checkinSettings.lastCheckinAt ? new Date(checkinSettings.lastCheckinAt).toLocaleDateString() : 'Never'}
              </p>
            </div>
            <div className="p-4 bg-surface/50 rounded-xl border border-border/50">
              <p className="text-sm text-muted mb-1 flex items-center gap-1"><Clock size={14}/> Next Due</p>
              <p className={`text-lg font-medium ${timeRemaining === 'Overdue' ? 'text-red-500' : 'text-text'}`}>
                {timeRemaining}
              </p>
            </div>
            <div className="p-4 bg-surface/50 rounded-xl border border-border/50">
              <p className="text-sm text-muted mb-1">Misses</p>
              <p className="text-lg font-medium text-text flex items-center gap-2">
                {misses} 
                {misses > 0 && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
              </p>
            </div>
            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
              <p className="text-sm text-amber-500/80 mb-1">Streak</p>
              <p className="text-lg font-medium text-amber-500">
                {checkinSettings.currentStreak} days
              </p>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence>
              {showConfetti && (
                <motion.div 
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                >
                  <CheckCircle className="text-emerald-500 w-32 h-32" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckIn}
              className="w-full py-6 rounded-xl relative overflow-hidden group bg-primary/20 hover:bg-primary border border-primary/50 shadow-[0_0_20px_rgba(79,92,255,0.2)] transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative z-10 flex items-center justify-center gap-2 text-xl font-bold text-white">
                <CheckCircle size={28} /> I'm Here
              </span>
            </motion.button>
          </div>
        </div>

        {/* Settings & Sim Pannel */}
        <div className="space-y-6">
          <div className="glassmorphism rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-text flex items-center gap-2"><Settings size={18}/> Settings</h3>
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="text-primary hover:text-primary-light"
              >
                {showSettings ? 'Hide' : 'Edit'}
              </button>
            </div>

            {showSettings ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted mb-2 block">Frequency</label>
                  <div className="flex gap-2">
                    {['weekly', 'biweekly', 'monthly'].map(f => (
                      <button 
                        key={f}
                        onClick={() => updateSettings({ frequency: f as any })}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          checkinSettings.frequency === f ? 'bg-primary/20 text-primary border-primary' : 'bg-surface text-muted border-border hover:bg-surface-light'
                        }`}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted block mb-1">Alert Guardians After: {checkinSettings.alertGuardiansAfterMisses} miss</label>
                  <input type="range" min="1" max="3" value={checkinSettings.alertGuardiansAfterMisses} 
                    onChange={(e) => updateSettings({ alertGuardiansAfterMisses: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm text-muted">
                <p>Checked <strong className="text-text capitalize">{checkinSettings.frequency}</strong>.</p>
                <p>Alerts sent after <strong className="text-text">{checkinSettings.alertGuardiansAfterMisses}</strong> miss.</p>
                <p>Recovery after <strong className="text-text">{checkinSettings.consecutiveMissesAllowed}</strong> misses.</p>
              </div>
            )}
          </div>

          <div className="glassmorphism rounded-2xl p-6 border-red-500/20">
            <h3 className="font-semibold text-text mb-4 text-sm flex items-center gap-2"><Bell size={16}/> Developer Tools</h3>
            <Button variant="secondary" className="w-full text-red-500 border-red-500/30 hover:bg-red-500/10" onClick={() => simulateMissedCheckin()}>
              Simulate Missed Check-In
            </Button>
          </div>
        </div>
      </div>

      {/* History Timeline */}
      <div className="glassmorphism rounded-2xl p-6">
        <h3 className="font-semibold text-text mb-6 flex items-center gap-2"><History size={18}/> Check-In History</h3>
        <div className="space-y-4">
          {checkins.slice(0, 10).map((checkin) => (
            <div key={checkin.id} className="flex items-center justify-between p-3 rounded-xl bg-surface/30 border border-border/50">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  checkin.status === 'responded' ? 'bg-emerald-500/10 text-emerald-500' :
                  checkin.status === 'missed' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {checkin.method === 'tap' ? <Fingerprint size={16}/> : <Mail size={16}/>}
                </div>
                <div>
                  <p className="text-sm font-medium text-text capitalize">{checkin.status}</p>
                  <p className="text-xs text-muted">{new Date(checkin.scheduledFor).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <span className={`text-xs px-2 py-1 rounded-full bg-surface-light border ${
                   checkin.status === 'responded' ? 'border-emerald-500/20 text-emerald-400' : 'border-red-500/20 text-red-400'
                }`}>
                  {checkin.method}
                </span>
              </div>
            </div>
          ))}
          {checkins.length === 0 && (
            <p className="text-center text-muted py-8 text-sm">No history recorded yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}
