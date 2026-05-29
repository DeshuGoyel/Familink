import React from 'react';
import { Link } from 'react-router-dom';

export default function FinalCTASection() {
  return (
    <section className="py-32 px-6 md:px-16 bg-blueprint-bg relative z-10">
      <div className="max-w-5xl mx-auto bg-blueprint-or/5 border border-blueprint-or/20 rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md bg-blueprint-or/20 blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-white">
            Every family deserves to inherit<br/>the <em className="italic text-blueprint-muted">digital life</em> their loved one built.
          </h2>
          <p className="font-sans text-lg md:text-xl text-blueprint-muted2 mb-12 max-w-2xl mx-auto leading-relaxed">
            Set up in 10 minutes. Protected forever. Your family gets everything when they need it most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/onboarding" className="bg-blueprint-or text-white px-8 py-4 rounded-lg font-sans text-base font-medium transition-all relative overflow-hidden hover:bg-blueprint-or2 hover:-translate-y-px shadow-[0_8px_24px_rgba(249,115,22,0.35)]">
              Start for free
            </Link>
            <Link to="/contact" className="bg-transparent border border-white/10 text-white px-8 py-4 rounded-lg font-sans text-base font-medium transition-all hover:bg-white/5 hover:border-white/20">
              Schedule a demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
