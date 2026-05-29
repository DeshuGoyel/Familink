import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-page">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-hero-gradient opacity-20" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-base mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">V2 Protocol Live</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display mb-8 text-primary leading-[1.1] tracking-tight">
            Sovereign <br />
            <span className="text-secondary italic font-light tracking-normal">Asset Succession</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            The institutional-grade protocol for digital inheritance. Protect your crypto, identities, and memories with zero-knowledge architecture.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto font-bold tracking-wide">
              Deploy Vault
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold tracking-wide">
              Read Whitepaper
            </Button>
          </div>
          
          <div className="mt-16 pt-8 border-t border-border-base/50 flex flex-col items-center">
            <p className="text-sm font-bold text-muted uppercase tracking-widest mb-6">Securing assets across</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 dark:opacity-40 grayscale">
              <span className="font-display font-bold text-xl tracking-tighter text-primary">Bitcoin</span>
              <span className="font-display font-bold text-xl tracking-tighter text-primary">Ethereum</span>
              <span className="font-display font-bold text-xl tracking-tighter text-primary">Solana</span>
              <span className="font-display font-bold text-xl tracking-tighter text-primary">Cold Storage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
