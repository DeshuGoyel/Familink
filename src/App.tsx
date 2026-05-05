import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import CustomCursor from './components/CustomCursor';

// Lazy load components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const MainWebsite = lazy(() => import('./pages/MainWebsite'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const OpsPortal = lazy(() => import('./pages/ops/OpsPortal'));
const OpsLogin = lazy(() => import('./pages/ops/Login'));

interface AppConfig {
  waitlist_enabled: boolean;
  maintenance_mode: boolean;
  brand_name: string;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#220000', color: '#ffaaaa', height: '100vh', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h1>Something went wrong rendering the app.</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.toString()}</pre>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainEntrance() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        // Default to the production API if env var is missing
        const API_URL = import.meta.env.VITE_API_URL || 'https://waitlist-api.transferlegacy.com/v1';
        console.log('Fetching app config from:', API_URL);
        
        const res = await fetch(`${API_URL}/app/branding`);
        if (res.ok) {
          const json = await res.json();
          // Log the response to debug 'on/off' detection
          console.log('App Config Received:', json);
          
          const data = json.data || json;
          setConfig(data);
        } else {
          console.warn('Config fetch failed with status:', res.status);
        }
      } catch (err) {
        console.error('Failed to fetch app config:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center text-indigo-500">Initializing...</div>;
  }

  // Force landing page if config fetch failed, if maintenance is on, or if waitlist is enabled
  if (!config || config.maintenance_mode || config.waitlist_enabled) {
    return <LandingPage />;
  }

  return <MainWebsite />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-[#0B0E14] flex items-center justify-center text-indigo-500">Loading...</div>}>
            <Routes>
              {/* Operations Portal Routes - Higher priority, bypassing gate */}
              <Route path="/ops/login" element={<OpsLogin />} />
              <Route path="/ops/*" element={<OpsPortal />} />
              
              {/* Public Routes */}
              <Route path="/waitlist" element={<LandingPage />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Main Entrance / Landing Gate */}
              <Route path="*" element={<MainEntrance />} />
            </Routes>
          </Suspense>
          <CustomCursor />
          <Toaster position="top-right" toastOptions={{
            style: {
              background: '#0D1117',
              color: '#F0F6FC',
              border: '1px solid rgba(79,92,255,0.2)',
            },
          }} />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
