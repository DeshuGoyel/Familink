import React from 'react';
import LandingPage from './pages/LandingPage';
import MainWebsite from './pages/MainWebsite';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

// Show landing page until May 15 2026, then switch to full app automatically
const SHOW_LANDING = new Date() < new Date('2026-05-15T00:00:00Z');

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
  if (SHOW_LANDING) {
    return (
      <ErrorBoundary>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <React.Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
            <LandingPage />
          </React.Suspense>
          <Toaster position="top-right" toastOptions={{
            style: {
              background: '#0D1117',
              color: '#F0F6FC',
              border: '1px solid rgba(79,92,255,0.2)',
            },
          }} />
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  return <MainWebsite />;
}
