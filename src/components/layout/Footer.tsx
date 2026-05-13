import { Globe, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';

export default function Footer() {
  return (
    <footer className="bg-surface/30 backdrop-blur-xl border-t border-base py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Logo className="mb-6" size={28} showTagline={true} />
            <p className="text-muted/70 text-[13px] leading-relaxed mb-6 font-medium tracking-tight">
              Institutional-grade digital asset succession infrastructure. Zero-knowledge security for a 100-year plan.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-muted/40 hover:text-brand-primary transition-all duration-300" aria-label="Visit our Global Website"><Globe size={18} /></a>
              <a href="#" className="text-muted/40 hover:text-brand-primary transition-all duration-300" aria-label="Send us an Email"><Mail size={18} /></a>
              <a href="#" className="text-muted/40 hover:text-brand-primary transition-all duration-300" aria-label="Chat with Support"><MessageSquare size={18} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-text font-semibold mb-4">Protocol Features</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/features/digital-wills" className="hover:text-primary transition">Digital Wills</Link></li>
              <li><Link to="/features/inheritance-calculator" className="hover:text-primary transition">Inheritance Calculator</Link></li>
              <li><Link to="/features/seed-phrase" className="hover:text-primary transition">Seed Phrase Security</Link></li>
              <li><Link to="/features/vault-security" className="hover:text-primary transition">Vault Protection</Link></li>
              <li><Link to="/features/asset-tracking" className="hover:text-primary transition">Institutional Tracking</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-text font-semibold mb-4">Knowledge Base</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/resources/guides" className="hover:text-primary transition">Protocol Guides</Link></li>
              <li><Link to="/resources/faq" className="hover:text-primary transition">System FAQ</Link></li>
              <li><Link to="/resources/blog" className="hover:text-primary transition">Legacy Insights</Link></li>
              <li><Link to="/resources/whitepaper" className="hover:text-primary transition">Security Whitepaper</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-text font-semibold mb-4">Compare & Legal</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/compare/inheriti" className="hover:text-primary transition">vs. Inheriti</Link></li>
              <li><Link to="/compare/casa" className="hover:text-primary transition">vs. Casa</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-primary transition">Privacy Commitment</Link></li>
              <li><Link to="/legal/security" className="hover:text-primary transition">Security Architecture</Link></li>
              <li><Link to="/legal/compliance" className="hover:text-primary transition">Global Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-base flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted/50 text-[11px] font-bold uppercase tracking-[0.1em]">
            © 2026 Transfer Legacy Global. High-Fidelity Digital Succession.
          </p>
        </div>
      </div>
    </footer>
  );
}
