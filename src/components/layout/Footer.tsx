import { Globe, Mail, MessageSquare, Shield, Lock, Fingerprint } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';

export default function Footer() {
  return (
    <footer className="bg-surface/30 backdrop-blur-xl border-t border-base pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-2">
            <Logo className="mb-8" size={32} showTagline={true} />
            <p className="text-muted/80 text-sm leading-relaxed mb-8 max-w-sm font-medium tracking-tight">
              Transfer Legacy is the global standard for sovereign digital asset succession. We provide institutional-grade infrastructure to secure your crypto, identities, and memories for generations to come.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted/40 hover:text-brand-primary transition-all duration-300 transform hover:scale-110" aria-label="Visit our Global Website"><Globe size={20} /></a>
              <a href="#" className="text-muted/40 hover:text-brand-primary transition-all duration-300 transform hover:scale-110" aria-label="Social Link"><MessageSquare size={20} /></a>
              <a href="#" className="text-muted/40 hover:text-brand-primary transition-all duration-300 transform hover:scale-110" aria-label="Email Link"><Mail size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8">The Protocol</h3>
            <ul className="space-y-4 text-sm text-muted font-medium">
              <li><Link to="/features/zero-knowledge" className="hover:text-brand-primary transition-colors">Zero-Knowledge Vault</Link></li>
              <li><Link to="/features/guardian-network" className="hover:text-brand-primary transition-colors">Guardian Network</Link></li>
              <li><Link to="/features/inheritance-logic" className="hover:text-brand-primary transition-colors">Smart Succession</Link></li>
              <li><Link to="/features/vault-security" className="hover:text-brand-primary transition-colors">Encryption Standards</Link></li>
              <li><Link to="/features/asset-tracking" className="hover:text-brand-primary transition-colors">Asset Mapping</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8">Trust Center</h3>
            <ul className="space-y-4 text-sm text-muted font-medium">
              <li><Link to="/resources/whitepaper" className="hover:text-brand-primary transition-colors">Security Whitepaper</Link></li>
              <li><Link to="/legal/compliance" className="hover:text-brand-primary transition-colors">Global Compliance</Link></li>
              <li><Link to="/legal/security-architecture" className="hover:text-brand-primary transition-colors">Sovereign Architecture</Link></li>
              <li><Link to="/resources/faq" className="hover:text-brand-primary transition-colors">Protocol FAQ</Link></li>
              <li><Link to="/resources/guides" className="hover:text-brand-primary transition-colors">Developer Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8">Support</h3>
            <ul className="space-y-4 text-sm text-muted font-medium">
              <li><Link to="/onboarding" className="hover:text-brand-primary transition-colors">Start Protocol</Link></li>
              <li><Link to="/tools/compare" className="hover:text-brand-primary transition-colors">Compare Platforms</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-brand-primary transition-colors">Privacy Commitment</Link></li>
              <li><Link to="/legal/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link></li>
              <li><a href="mailto:support@transferlegacy.global" className="flex items-center gap-2 hover:text-brand-primary transition-colors"><Mail size={14} /> Institutional Desk</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-border-base/50 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-6 opacity-30 grayscale grayscale-100">
               <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest"><Shield size={12} /> ISO 27001</div>
               <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest"><Lock size={12} /> ZK-Standard</div>
               <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest"><Fingerprint size={12} /> SOC2 Type II</div>
            </div>
            <p className="text-muted/40 text-[11px] font-bold uppercase tracking-[0.15em]">
              © 2026 TRANSFER LEGACY GLOBAL. ALL PROTOCOLS ENCRYPTED.
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-success"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted/60">System Status: Nominal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
