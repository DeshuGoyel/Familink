import React from 'react';

export default function StatsStrip() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-[10%] py-16 bg-blueprint-bg2 border-y border-white/5 gap-8 md:gap-0 relative z-10">
      <div className="text-center">
        <div className="font-mono text-4xl font-medium text-white mb-2 tracking-tight">$<span className="text-blueprint-or">140</span>B</div>
        <div className="text-sm text-blueprint-muted uppercase tracking-[2px]">Digital wealth permanently lost</div>
      </div>
      <div className="text-center">
        <div className="font-mono text-4xl font-medium text-white mb-2 tracking-tight"><span className="text-blueprint-or">4.9</span>B</div>
        <div className="text-sm text-blueprint-muted uppercase tracking-[2px]">People with no digital estate plan</div>
      </div>
      <div className="text-center">
        <div className="font-mono text-4xl font-medium text-white mb-2 tracking-tight"><span className="text-blueprint-or">0</span></div>
        <div className="text-sm text-blueprint-muted uppercase tracking-[2px]">Dominant solutions exist</div>
      </div>
      <div className="text-center">
        <div className="font-mono text-4xl font-medium text-white mb-2 tracking-tight"><span className="text-blueprint-or">10</span>m</div>
        <div className="text-sm text-blueprint-muted uppercase tracking-[2px]">For your family to access everything</div>
      </div>
    </section>
  );
}
