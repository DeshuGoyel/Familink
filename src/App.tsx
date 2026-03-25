import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Guardians from './pages/Guardians';
import Heirs from './pages/Heirs';
import AIPlanner from './pages/AIPlanner';
import TrustCenter from './pages/TrustCenter';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';
import CheckInCenter from './pages/CheckInCenter';
import MemoryCapsules from './pages/MemoryCapsules';
import DigitalObituary from './pages/DigitalObituary';
import IdentityPassport from './pages/IdentityPassport';
import DeveloperPortal from './pages/DeveloperPortal';
import ParticleBackground from './components/3d/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import NotificationDrawer from './components/layout/NotificationDrawer';
import Sidebar from './components/layout/Sidebar';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';
import { ThemeProvider } from 'next-themes';

function App() {
  const { isNotificationOpen, isSidebarCollapsed } = useStore();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <BrowserRouter>
      <CustomCursor />
      <ParticleBackground />
      <div className="relative z-10 min-h-screen flex flex-col pt-16 transition-all duration-300">
        <Navbar />
        <Sidebar />
        <main className={`flex-grow transition-all duration-300 ${isSidebarCollapsed ? "md:pl-20" : "md:pl-64"}`}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/guardians" element={<Guardians />} />
            <Route path="/heirs" element={<Heirs />} />
            <Route path="/ai-planner" element={<AIPlanner />} />
            <Route path="/trust" element={<TrustCenter />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/checkin" element={<CheckInCenter />} />
            <Route path="/capsules" element={<MemoryCapsules />} />
            <Route path="/obituary" element={<DigitalObituary />} />
            <Route path="/passport" element={<IdentityPassport />} />
            <Route path="/developer" element={<DeveloperPortal />} />
          </Routes>
        </main>
        <Footer />
        {isNotificationOpen && <NotificationDrawer />}
      </div>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#111827',
          color: '#F9FAFB',
          border: '1px solid #1F2937'
        }
      }}/>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
