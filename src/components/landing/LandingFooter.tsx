import { Link } from 'react-router-dom';
import ThemeToggle from '../layout/ThemeToggle';

export default function LandingFooter() {
  return (
    <footer className="relative overflow-hidden bg-page border-t border-border-base select-none">
      <div className="max-w-[1100px] mx-auto px-6 py-16 relative z-10">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-12 border-b border-border-base">
          
          {/* Col 1: Brand & Security Badges */}
          <div className="md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div
                className="w-7 h-7 rounded-full relative flex items-center justify-center"
                style={{
                  background: 'conic-gradient(from 220deg, var(--color-brand-primary), var(--color-brand-primary-hover), var(--color-brand-gold), var(--color-brand-primary))'
                }}
              >
                <div className="w-[11px] h-[11px] rounded-full bg-page transition-colors duration-400" />
              </div>
              <span className="font-display font-medium text-[1.18rem] text-primary transition-opacity group-hover:opacity-75">
                Transfer Legacy
              </span>
            </Link>
            
            <p className="text-[13px] text-secondary leading-relaxed font-light max-w-xs">
              Client-side encrypted estate planning vault. Math-based digital inheritance for bank accounts, files, and crypto.
            </p>

            {/* Security Badges */}
            <div className="flex flex-wrap gap-3 items-center opacity-30 text-[10px] font-bold uppercase tracking-widest text-secondary">
              <span className="border border-border-base rounded-[4px] px-2 py-1 bg-surface">SOC 2 Type II</span>
              <span className="border border-border-base rounded-[4px] px-2 py-1 bg-surface">GDPR</span>
              <span className="border border-border-base rounded-[4px] px-2 py-1 bg-surface">ISO 27001</span>
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="text-primary font-semibold text-[12px] uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3 text-[13px] font-light">
              <li>
                <a href="#how" className="text-secondary hover:text-primary transition-colors">How it works</a>
              </li>
              <li>
                <a href="#security" className="text-secondary hover:text-primary transition-colors">Security</a>
              </li>
              <li>
                <a href="#pricing" className="text-secondary hover:text-primary transition-colors">Pricing</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div>
            <h4 className="text-primary font-semibold text-[12px] uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3 text-[13px] font-light">
              <li>
                <Link to="/legal/privacy" className="text-secondary hover:text-primary transition-colors">Privacy Protocol</Link>
              </li>
              <li>
                <Link to="/legal/terms" className="text-secondary hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/legal/security-architecture" className="text-secondary hover:text-primary transition-colors">Security Spec</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h4 className="text-primary font-semibold text-[12px] uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3 text-[13px] font-light">
              <li>
                <Link to="/resources/blog" className="text-secondary hover:text-primary transition-colors">Journal</Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <span className="text-secondary/40">Careers — hiring</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-[12px] text-secondary/50">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Transfer Legacy, Inc.</p>
            <span className="text-secondary/20">•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span>All networks operational</span>
            </div>
          </div>

          {/* Theme Toggle & Accent */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-secondary/20">•</span>
            <p className="font-light">Built with restraint for the sovereign.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
