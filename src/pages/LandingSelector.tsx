import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Landing from './Landing';
import LandingPage from './LandingPage';

export default function LandingSelector() {
  const [branding, setBranding] = useState({
    waitlist_enabled: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBranding() {
      try {
        const res = await api.get<any>('/app/branding', { skipAead: true });
        const data = res.data ? res.data : res;
        if (data && typeof data.waitlist_enabled === 'boolean') {
          setBranding(data);
        }
      } catch (err) {
        console.warn('Failed to load branding in LandingSelector, using defaults:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBranding();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-page">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
      </div>
    );
  }

  if (branding.waitlist_enabled) {
    return <LandingPage />;
  } else {
    return <Landing />;
  }
}
