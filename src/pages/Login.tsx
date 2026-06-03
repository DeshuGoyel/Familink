import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Loader2, ArrowRight, Lock, Mail } from 'lucide-react';
import { api } from '../lib/api';
import { initOpaqueLogin, finishOpaqueLogin } from '../lib/opaqueClient';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { useBodyClass } from '../hooks/useBodyClass';
import { useStore } from '../store/useStore';

export default function Login() {
  useBodyClass('allow-cursor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { user } = useStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Resolve email to user_id (unencrypted route)
      const lookupResponse = await api.post<{ data: { user_id: string } }>(
        '/auth/user-id',
        { email },
        { skipAead: true }
      );
      const resolvedUserId = lookupResponse.data.user_id;

      // 2. Initial OPAQUE Login Handshake start
      const { credentialRequest, blindFactor } = await initOpaqueLogin(password);

      // Send start to backend
      const initResponse = await api.post<unknown>('/auth/login/init', {
        user_id: resolvedUserId,
        credential_request: credentialRequest,
      });

      // 3. Complete OPAQUE handshake client-side
      const finishData = await finishOpaqueLogin(
        password,
        blindFactor,
        initResponse.credential_response || initResponse.registration_response
      );

      // Send finish to backend to authenticate session
      const finishResponse = await api.post<unknown>('/auth/login/finish', {
        session_id: initResponse.session_id,
        credential_finalization: finishData.registrationUpload,
      });

      // 4. Persist session token and user ID
      const token = finishResponse.session_token || finishResponse.token;
      if (!token) {
        throw new Error('Authentication did not return a valid session token');
      }
      localStorage.setItem('tl_session_token', token);
      localStorage.setItem('tl_user_id', resolvedUserId);

      const derivedName = email.split('@')[0]
        .split(/[._-]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      localStorage.setItem('tl_user_name', derivedName);
      localStorage.setItem('tl_user_email', email);

      let savedGuardiansList = [];
      try {
        const savedGuardians = localStorage.getItem('tl_guardians');
        if (savedGuardians) savedGuardiansList = JSON.parse(savedGuardians);
      } catch (e) {}

      let savedHeirsList = [];
      try {
        const savedHeirs = localStorage.getItem('tl_heirs');
        if (savedHeirs) savedHeirsList = JSON.parse(savedHeirs);
      } catch (e) {}

      useStore.setState({ 
        isAuthenticated: true,
        assets: [],
        guardians: savedGuardiansList,
        heirs: savedHeirsList,
        user: {
          name: derivedName,
          email: email,
          avatar: null,
          score: 0,
          plan: "Family",
          nextCheckInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          checkInHistory: []
        }
      });
      useStore.getState().calculateScore();

      toast.success('Successfully authenticated!');
      navigate('/dashboard');
    } catch (err: unknown) {
      console.error('Authentication error:', err);
      setError(err.message || 'Invalid credentials or connection error');
      toast.error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020409] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[440px]"
      >
        {/* Brand Area */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-orange-500 stroke-2 fill-none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span className="font-display text-2xl font-bold text-white tracking-wide">
              Transfer Legacy
            </span>
          </Link>
          <p className="text-slate-400 text-sm">Access your zero-knowledge succession vault</p>
        </div>

        <div className="bg-slate-900/30 backdrop-blur-2xl border border-slate-800/80 rounded-[32px] p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-950/50 border-slate-800/80 focus:border-orange-500/50 pl-10"
              />
              <Mail className="absolute left-3.5 bottom-3.5 w-4 h-4 text-slate-500" />
            </div>

            <div className="relative">
              <Input
                label="Master Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-950/50 border-slate-800/80 focus:border-orange-500/50 pl-10"
              />
              <Lock className="absolute left-3.5 bottom-3.5 w-4 h-4 text-slate-500" />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-800 bg-slate-950 text-orange-500 focus:ring-0 focus:ring-offset-0" />
                Remember this device
              </label>
              <Link to="/onboarding" className="text-orange-500 hover:underline">Forgot password?</Link>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              variant="primary"
              className="w-full h-12 rounded-xl text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Unlock Vault</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
            <p className="text-xs text-slate-500">
              New to Transfer Legacy?{' '}
              <Link to="/onboarding" className="text-orange-500 hover:underline font-medium">Create a free vault</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
