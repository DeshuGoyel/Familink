import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import LandingNavbar from '../components/layout/LandingNavbar';
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
import LegacyAnalytics from '../pages/LegacyAnalytics';
import ParticleBackground from '../components/3d/ParticleBackground';
import NotificationDrawer from '../components/layout/NotificationDrawer';
import Sidebar from '../components/layout/Sidebar';
import { Toaster } from 'react-hot-toast';
import { useStore } from '../store/useStore';
import { useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

// Feature Pages
import VaultSecurity from './features/VaultSecurity';
import AssetTracking from './features/AssetTracking';
import InheritanceLogic from './features/InheritanceLogic';
import ZeroKnowledge from './features/ZeroKnowledge';
import GuardianNetwork from './features/GuardianNetwork';
import LegacyHealth from './features/LegacyHealth';

// Resource Pages
import ResourceGuides from './resources/ResourceGuides';
import FAQPage from './resources/FAQPage';
import BlogPage from './resources/BlogPage';
import Whitepaper from './resources/Whitepaper';

// Tool Pages
import PlatformComparison from './tools/PlatformComparison';
import ROICalculator from './tools/ROICalculator';
import SuccessionPlanner from './tools/SuccessionPlanner';
import InheritanceCalculator from './tools/InheritanceCalculator';

// Legacy Feature Pages
import DigitalWill from './features/DigitalWill';
import SeedPhraseSecurity from './features/SeedPhraseSecurity';
import Reports from './Reports';

// Legal Pages
import TermsOfService from './legal/TermsOfService';
import PrivacyProtocol from './legal/PrivacyProtocol';
import SecurityArchitecture from './legal/SecurityArchitecture';
import GlobalCompliance from './legal/GlobalCompliance';

// SEO & Resource Pages
import ResourcesHub from './seo/ResourcesHub';
import CryptoInheritanceGuide from './seo/CryptoInheritanceGuide';
import DigitalWillPillar from './seo/DigitalWillPillar';
import WhatHappensToCrypto from './seo/WhatHappensToCrypto';
import DocumentStorage from './seo/DocumentStorage';
import SeedPhraseInheritance from './seo/SeedPhraseInheritance';
import PrivateKeyInheritance from './seo/PrivateKeyInheritance';
import PassBitcoinToFamily from './seo/PassBitcoinToFamily';
import TransferCryptoWallet from './seo/TransferCryptoWallet';
import PasswordInheritance from './seo/PasswordInheritance';
import CompareDGLegacy from './seo/CompareDGLegacy';
import CompareInheriti from './seo/CompareInheriti';
import CompareTraditionalWills from './seo/CompareTraditionalWills';
import WhitepaperSEO from './seo/Whitepaper';
import LegalTemplates from './seo/LegalTemplates';
import CryptoCalculator from './tools/CryptoCalculator';

// Regional SEO
import CryptoInheritanceIndia from './seo/regions/CryptoInheritanceIndia';
import DigitalWillIndia from './seo/regions/DigitalWillIndia';
import CryptoInheritanceUSA from './seo/regions/CryptoInheritanceUSA';
import DigitalAssetLawUSA from './seo/regions/DigitalAssetLawUSA';
import CryptoInheritanceUK from './seo/regions/CryptoInheritanceUK';
import CryptoInheritanceUAE from './seo/regions/CryptoInheritanceUAE';

function AppLayout() {
  const { isSidebarCollapsed, isNotificationOpen } = useStore();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  // Shared offset class for Sidebar parity
  const offsetClass = !isLanding
    ? isSidebarCollapsed
      ? 'lg:pl-20' // 80px (matches w-20)
      : 'lg:pl-64' // 256px (matches w-64)
    : '';

  return (
    <div className="relative z-10 min-h-screen flex flex-col pt-16 transition-all duration-300">
      {isLanding ? <LandingNavbar /> : <Navbar />}
      {!isLanding && <Sidebar />}

      {/* Page content — offset for sidebar */}
      <main className={cn("flex-grow transition-all duration-300", offsetClass)}>
        <Routes>
          <Route path="/"            element={<Landing />} />
          <Route path="/dashboard"   element={<Dashboard />} />
          <Route path="/analytics"   element={<LegacyAnalytics />} />
          <Route path="/assets"      element={<Assets />} />
          <Route path="/allocations" element={<Allocations />} />
          <Route path="/guardians"   element={<Guardians />} />
          <Route path="/heirs"       element={<Heirs />} />
          <Route path="/ai-planner"  element={<AIPlanner />} />
          <Route path="/trust"       element={<TrustCenter />} />
          <Route path="/settings"    element={<Settings />} />
          <Route path="/onboarding"  element={<Onboarding />} />
          <Route path="/checkin"     element={<CheckInCenter />} />
          <Route path="/check-in"    element={<CheckInCenter />} />
          <Route path="/capsules"    element={<MemoryCapsules />} />
          <Route path="/obituary"    element={<DigitalObituary />} />
          <Route path="/passport"    element={<IdentityPassport />} />
          <Route path="/identity"    element={<IdentityPassport />} />
          <Route path="/developer"   element={<DeveloperPortal />} />
          <Route path="/activity"    element={<LegacyAnalytics />} />

          {/* New Functional Feature Routes */}
          <Route path="/features/vault-security"          element={<VaultSecurity />} />
          <Route path="/features/asset-tracking"          element={<AssetTracking />} />
          <Route path="/features/inheritance-logic"       element={<InheritanceLogic />} />
          <Route path="/features/zero-knowledge"          element={<ZeroKnowledge />} />
          <Route path="/features/guardian-network"        element={<GuardianNetwork />} />
          <Route path="/features/legacy-health"           element={<LegacyHealth />} />
          
          <Route path="/resources/guides"                 element={<ResourceGuides />} />
          <Route path="/resources/faq"                    element={<FAQPage />} />
          <Route path="/resources/blog"                   element={<BlogPage />} />
          <Route path="/resources/whitepaper"             element={<Whitepaper />} />
          <Route path="/whitepaper"                       element={<WhitepaperSEO />} />
          <Route path="/legal-templates"                  element={<LegalTemplates />} />

          <Route path="/tools/compare"                    element={<PlatformComparison />} />
          <Route path="/tools/roi-calculator"             element={<ROICalculator />} />
          <Route path="/tools/planner"                    element={<SuccessionPlanner />} />
          <Route path="/tools/crypto-risk-calculator"     element={<CryptoCalculator />} />

          <Route path="/legal/privacy"                    element={<PrivacyProtocol />} />
          <Route path="/legal/terms"                      element={<TermsOfService />} />
          <Route path="/legal/security-architecture"       element={<SecurityArchitecture />} />
          <Route path="/legal/compliance"                 element={<GlobalCompliance />} />

          {/* SEO & Knowledge Hub Routes */}
          <Route path="/resources"                                element={<ResourcesHub />} />
          <Route path="/crypto-inheritance"                       element={<CryptoInheritanceGuide />} />
          <Route path="/digital-will"                             element={<DigitalWillPillar />} />
          <Route path="/what-happens-to-crypto-when-you-die"      element={<WhatHappensToCrypto />} />
          <Route path="/store-important-documents-for-family"     element={<DocumentStorage />} />
          <Route path="/seed-phrase-inheritance"                  element={<SeedPhraseInheritance />} />
          <Route path="/private-key-inheritance"                  element={<PrivateKeyInheritance />} />
          <Route path="/how-to-pass-bitcoin-to-family"            element={<PassBitcoinToFamily />} />
          <Route path="/transfer-crypto-wallet-to-family"         element={<TransferCryptoWallet />} />
          <Route path="/password-inheritance"                     element={<PasswordInheritance />} />
          
          {/* Comparison Routes */}
          <Route path="/transfer-legacy-vs-dglegacy"              element={<CompareDGLegacy />} />
          <Route path="/transfer-legacy-vs-inheriti"              element={<CompareInheriti />} />
          <Route path="/transfer-legacy-vs-traditional-wills"     element={<CompareTraditionalWills />} />

          {/* Regional Compliance & Law Routes */}
          <Route path="/crypto-inheritance-india"                 element={<CryptoInheritanceIndia />} />
          <Route path="/digital-will-india"                       element={<DigitalWillIndia />} />
          <Route path="/crypto-inheritance-usa"                   element={<CryptoInheritanceUSA />} />
          <Route path="/digital-asset-inheritance-usa"            element={<DigitalAssetLawUSA />} />
          <Route path="/crypto-inheritance-uk"                    element={<CryptoInheritanceUK />} />
          <Route path="/crypto-inheritance-uae"                   element={<CryptoInheritanceUAE />} />

          {/* Legacy Features & Tools */}
          <Route path="/features/digital-wills"           element={<DigitalWill />} />
          <Route path="/features/seed-phrase"             element={<SeedPhraseSecurity />} />
          <Route path="/features/inheritance-calculator"  element={<InheritanceCalculator />} />
          <Route path="/reports"                          element={<Reports />} />
          
          <Route path="*"            element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer — also offset to prevent Sidebar overlap */}
      <div className={cn("transition-all duration-300", offsetClass)}>
        <Footer />
      </div>

      {isNotificationOpen && <NotificationDrawer />}
    </div>
  );
}

export default function MainWebsite() {
  return (
    <>
      {/* Institutional Obsidian Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-page">
        <div className="absolute inset-0 bg-aurora opacity-60" />
        <div 
          className="absolute inset-0 bg-dot-matrix opacity-30"
          style={{ backgroundSize: '32px 32px' }}
        />
      </div>

      <ParticleBackground />
      <AppLayout />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--color-bg-surface)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-base)',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: 'var(--shadow-lg)',
            backdropFilter: 'blur(12px)',
          },
        }}
      />
    </>
  );
}
