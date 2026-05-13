import { useEffect } from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingFooter from '../components/landing/LandingFooter';
import Hero from '../components/sections/Hero';
import SocialProof from '../components/sections/SocialProof';
import Problem from '../components/sections/Problem';
import HowItWorks from '../components/sections/HowItWorks';
import Features from '../components/sections/Features';
import Security from '../components/sections/Security';
import Founders from '../components/sections/Founders';
import Pricing from '../components/sections/Pricing';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import FinalCTA from '../components/sections/FinalCTA';

export default function LandingPage() {
  // Restore normal cursor for landing page
  useEffect(() => {
    document.body.classList.add('landing-page');
    return () => document.body.classList.remove('landing-page');
  }, []);

  return (
    <div className="bg-page text-primary min-h-screen font-sans selection:bg-brand-primary/30 overflow-x-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none bg-aurora opacity-40" />
      <LandingNavbar />

      <main>
        {/* ... */}
        <Hero />
        <SocialProof />
        <Problem />
        <HowItWorks />
        <Features />
        
        {/* 6. Security — points + legacy score gauge */}
        <Security />

        {/* 7. Founders — Deshu and Vikas */}
        <Founders />

        {/* 8. Pricing — monthly/yearly toggle + 3 tiers */}
        <Pricing />

        {/* 8. Testimonials — infinite scroll carousel */}
        <Testimonials />

        {/* 9. FAQ — spring accordion */}
        <FAQ />

        {/* 10. Final CTA — big headline + waitlist form repeat */}
        <FinalCTA />
      </main>

      <LandingFooter />
    </div>
  );
}
