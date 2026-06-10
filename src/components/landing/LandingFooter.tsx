import { Link } from 'react-router-dom';

const footerLinks = {
  Product: ['How It Works', 'Security', 'Pricing', 'Roadmap'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  Company: ['About Us', 'Blog', 'Careers', 'Contact'],
};

export default function LandingFooter() {
  return (
    <footer
      className="relative overflow-hidden bg-page border-t border-base"
    >
      {/* Ambient glow top-left */}
      <div
        className="absolute top-0 left-0 w-[400px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(249,115,22,0.06), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-12 border-b border-base"
        >
          {/* Brand */}
          <div className="md:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 overflow-hidden flex items-center justify-center">
                <img src="/logo-dark.png" alt="Transfer Legacy" className="w-full h-full object-contain dark:block hidden" />
                <img src="/logo-light.png" alt="Transfer Legacy" className="w-full h-full object-contain dark:hidden block" />
              </div>
              <span className="font-bold text-[17px] tracking-tight text-primary">
                Transfer{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, var(--color-gradient-pink), var(--color-brand-primary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 900,
                  }}
                >
                  Legacy
                </span>
              </span>
            </div>

            <p className="text-sm text-secondary max-w-xs leading-relaxed mb-6 font-sans">
              The zero-knowledge digital inheritance platform. Protect your crypto, accounts, and
              documents for the people you love — with mathematical certainty.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {['𝕏', 'in', 'gh'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-secondary transition-all duration-200 hover:text-primary"
                  style={{
                    border: '1px solid var(--color-border)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-brand-primary)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-primary font-black text-xs uppercase tracking-widest mb-5">
                {group}
              </h4>
              <ul className="space-y-3.5">
                {items.map((item) => (
                  <li key={item}>
                    {item === 'Privacy Policy' ? (
                      <Link to="/legal/privacy" className="text-sm text-secondary hover:text-primary transition-colors duration-200">Privacy Policy</Link>
                    ) : item === 'Terms of Service' ? (
                      <Link to="/legal/terms" className="text-sm text-secondary hover:text-primary transition-colors duration-200">Terms of Service</Link>
                    ) : item === 'Blog' ? (
                      <Link to="/resources/blog" className="text-sm text-secondary hover:text-primary transition-colors duration-200 font-sans">Blog</Link>
                    ) : item === 'Contact' ? (
                      <Link to="/contact" className="text-sm text-secondary hover:text-primary transition-colors duration-200 font-sans">Contact</Link>
                    ) : (
                      <a
                        href={item === 'How It Works' ? '#how' : item === 'Security' ? '#features' : item === 'Pricing' ? '#pricing' : '#'}
                        className="text-sm text-secondary hover:text-primary transition-colors duration-200 font-sans"
                      >
                        {item}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} Transfer Legacy, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: '#34d399', boxShadow: '0 0 8px rgba(52,211,153,0.8)', animation: 'pulse 2s infinite' }}
            />
            All systems operational
          </div>
          <p>
            Built with <span style={{ color: 'var(--color-brand-primary)' }}>♥</span> for families worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
