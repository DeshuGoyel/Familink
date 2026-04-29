import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import Assets from '../pages/Assets';
import Allocations from '../pages/Allocations';
import Guardians from '../pages/Guardians';
import Heirs from '../pages/Heirs';
import AIPlanner from '../pages/AIPlanner';
import TrustCenter from '../pages/TrustCenter';
import Settings from '../pages/Settings';
import Onboarding from '../pages/Onboarding';
import CheckInCenter from '../pages/CheckInCenter';
import MemoryCapsules from '../pages/MemoryCapsules';
import DigitalObituary from '../pages/DigitalObituary';
import IdentityPassport from '../pages/IdentityPassport';
import DeveloperPortal from '../pages/DeveloperPortal';
import ParticleBackground from '../components/3d/ParticleBackground';
import NotificationDrawer from '../components/layout/NotificationDrawer';
import Sidebar from '../components/layout/Sidebar';
import { useStore } from '../store/useStore';

function AppLayout() {
  const { isNotificationOpen } = useStore();
  const isLanding = window.location.pathname === '/';
  const routes = (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/assets" element={<Assets />} />
      <Route path="/allocations" element={<Allocations />} />
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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  return (
    <div className={`relative z-10 min-h-screen ${isLanding ? '' : 'pt-16'}`}>
      {!isLanding && <Navbar />}
      {isLanding ? (
        <>
          <main className="min-w-0">{routes}</main>
          <Footer />
        </>
      ) : (
        <div className="min-h-[calc(100vh-4rem)] md:flex">
          <Sidebar />
          <div className="min-w-0 flex-1">
            <main>{routes}</main>
            <Footer />
          </div>
        </div>
      )}
      {isNotificationOpen && <NotificationDrawer />}
    </div>
  );
}

export default function MainWebsite() {
  return (
    <>
      <ParticleBackground />
      <AppLayout />
    </>
  );
}
