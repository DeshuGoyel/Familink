import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingFooter() {
  return (
    <footer className="bg-blueprint-bg2 border-t border-white/5 pt-20 pb-8 px-6 md:px-16 mt-32 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-16">
        <div className="max-w-xs">
          <div className="w-8 h-8 bg-blueprint-or/10 border border-blueprint-or/30 rounded-lg flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-blueprint-or stroke-2 fill-none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div className="font-display text-lg font-semibold text-white tracking-wide mb-4">
            Transfer Legacy
          </div>
          <p className="text-sm text-blueprint-muted2 leading-relaxed">
            The zero-knowledge digital inheritance protocol. Protect your crypto, identities, and memories with mathematical certainty.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-16">
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-6">Product</h4>
            <a href="#how" className="block text-sm text-blueprint-muted2 hover:text-white transition-colors mb-4">How It Works</a>
            <a href="#features" className="block text-sm text-blueprint-muted2 hover:text-white transition-colors mb-4">Security</a>
            <a href="#pricing" className="block text-sm text-blueprint-muted2 hover:text-white transition-colors mb-4">Pricing</a>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-6">Legal</h4>
            <Link to="/legal/privacy" className="block text-sm text-blueprint-muted2 hover:text-white transition-colors mb-4">Privacy Policy</Link>
            <Link to="/legal/terms" className="block text-sm text-blueprint-muted2 hover:text-white transition-colors mb-4">Terms of Service</Link>
            <a href="#" className="block text-sm text-blueprint-muted2 hover:text-white transition-colors mb-4">Cookie Policy</a>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-6">Company</h4>
            <a href="#" className="block text-sm text-blueprint-muted2 hover:text-white transition-colors mb-4">About Us</a>
            <Link to="/resources/blog" className="block text-sm text-blueprint-muted2 hover:text-white transition-colors mb-4">Blog</Link>
            <a href="#" className="block text-sm text-blueprint-muted2 hover:text-white transition-colors mb-4">Contact</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blueprint-muted">
        <p>© {new Date().getFullYear()} Transfer Legacy, Inc. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
          All systems operational
        </div>
        <p>Built with <span className="text-blueprint-or">♥</span> for families worldwide.</p>
      </div>
    </footer>
  );
}
