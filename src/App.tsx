import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

// Lazy load components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const MainWebsite = lazy(() => import('./pages/MainWebsite'));
const OpsPortal = lazy(() => import('./pages/ops/OpsPortal'));
const OpsLogin = lazy(() => import('./pages/ops/Login'));

// Show landing page until May 15 2026, then switch to full app automatically
const SHOW_LANDING_GATED = new Date() < new Date('2026-05-15T00:00:00Z');

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: {children: React.ReactNode}) {
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

              {/* Main Entrance / Landing Gate */}
              <Route 
                path="*" 
                element={
                  SHOW_LANDING_GATED ? (
                    <LandingPage />
                  ) : (
                    <MainWebsite />
                  )
                } 
              />
            </Routes>
          </Suspense>
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
