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
import CryptoInheritance from '../pages/CryptoInheritance';
import CryptoDeathGuide from '../pages/CryptoDeathGuide';
import PasswordInheritance from '../pages/seo/PasswordInheritance';
import DocumentStorage from '../pages/seo/DocumentStorage';
import DigitalWillPillar from '../pages/seo/DigitalWillPillar';
import CompareDGLegacy from '../pages/seo/CompareDGLegacy';
import CompareInheriti from '../pages/seo/CompareInheriti';
import CryptoCalculator from '../pages/tools/CryptoCalculator';
import CryptoInheritanceIndia from '../pages/seo/regions/CryptoInheritanceIndia';
import DigitalWillIndia from '../pages/seo/regions/DigitalWillIndia';
import CryptoInheritanceUSA from '../pages/seo/regions/CryptoInheritanceUSA';
import DigitalAssetLawUSA from '../pages/seo/regions/DigitalAssetLawUSA';
import CryptoInheritanceUAE from '../pages/seo/regions/CryptoInheritanceUAE';
import CryptoInheritanceUK from '../pages/seo/regions/CryptoInheritanceUK';
import PassBitcoinToFamily from '../pages/seo/PassBitcoinToFamily';
import TransferCryptoWallet from '../pages/seo/TransferCryptoWallet';
import SeedPhraseInheritance from '../pages/seo/SeedPhraseInheritance';
import PrivateKeyInheritance from '../pages/seo/PrivateKeyInheritance';
import ResourcesHub from '../pages/seo/ResourcesHub';
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
      <Route path="/crypto-inheritance" element={<CryptoInheritance />} />
      <Route path="/what-happens-to-crypto-when-you-die" element={<CryptoDeathGuide />} />
      <Route path="/password-inheritance" element={<PasswordInheritance />} />
      <Route path="/store-important-documents-for-family" element={<DocumentStorage />} />
      <Route path="/digital-will" element={<DigitalWillPillar />} />
      <Route path="/transfer-legacy-vs-dglegacy" element={<CompareDGLegacy />} />
      <Route path="/transfer-legacy-vs-inheriti" element={<CompareInheriti />} />
      <Route path="/crypto-inheritance-calculator" element={<CryptoCalculator />} />
      <Route path="/crypto-inheritance-india" element={<CryptoInheritanceIndia />} />
      <Route path="/digital-will-india" element={<DigitalWillIndia />} />
      <Route path="/crypto-inheritance-usa" element={<CryptoInheritanceUSA />} />
      <Route path="/digital-asset-inheritance-usa" element={<DigitalAssetLawUSA />} />
      <Route path="/crypto-inheritance-uae" element={<CryptoInheritanceUAE />} />
      <Route path="/crypto-inheritance-uk" element={<CryptoInheritanceUK />} />
      <Route path="/how-to-pass-bitcoin-to-family" element={<PassBitcoinToFamily />} />
      <Route path="/transfer-crypto-wallet-to-family" element={<TransferCryptoWallet />} />
      <Route path="/seed-phrase-inheritance" element={<SeedPhraseInheritance />} />
      <Route path="/private-key-inheritance" element={<PrivateKeyInheritance />} />
      <Route path="/resources" element={<ResourcesHub />} />
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
