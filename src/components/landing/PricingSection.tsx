import React from 'react';

export default function PricingSection() {
  return (
    <section id="pricing" className="py-32 px-6 md:px-16 bg-blueprint-bg relative z-10">
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block border border-blueprint-or/30 text-blueprint-or px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Simple pricing</div>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-6">One plan for your entire family.</h2>
          <p className="font-sans text-lg text-blueprint-muted2">No per-user fees. No hidden costs. Just secure legacy planning.</p>
        </div>
        
        <div className="max-w-md mx-auto bg-blueprint-bg3 border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-blueprint-or/30 transition-colors">
          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blueprint-or/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-blueprint-or/30 transition-colors"></div>
          
          <div className="mb-8 relative z-10">
            <h3 className="font-display text-2xl text-white font-medium mb-2">Founding Member</h3>
            <div className="flex items-baseline gap-2 text-white">
              <span className="text-4xl font-bold">$149</span>
              <span className="text-blueprint-muted2 font-medium">/year</span>
            </div>
            <p className="text-sm text-blueprint-or font-medium mt-2">★ Price locked forever</p>
          </div>
          
          <ul className="space-y-4 mb-8 relative z-10">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 text-emerald-500">✓</div>
              <span className="text-sm text-blueprint-muted2 font-medium">Unlimited digital assets</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 text-emerald-500">✓</div>
              <span className="text-sm text-blueprint-muted2 font-medium">Up to 5 Guardians</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 text-emerald-500">✓</div>
              <span className="text-sm text-blueprint-muted2 font-medium">Automated Proof of Life</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 text-emerald-500">✓</div>
              <span className="text-sm text-blueprint-muted2 font-medium">Heir Transfer Guide</span>
            </li>
          </ul>
          
          <button className="w-full bg-white text-blueprint-bg px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors relative z-10">
            Start 30-day free trial
          </button>
          <p className="text-center text-xs text-blueprint-muted2 mt-4 font-medium relative z-10">
            Cancel anytime. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
