import { Shield } from 'lucide-react';

const footerLinks = {
  Product: ['How It Works', 'Security', 'Pricing', 'Roadmap'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  Company: ['About Us', 'Blog', 'Careers', 'Contact'],
};

export default function LandingFooter() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#07090F', borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Ambient glow top-left */}
      <div
        className="absolute top-0 left-0 w-[400px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(249,115,22,0.06), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Brand */}
          <div className="md:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f9a8d4 0%, #f97316 50%, #c084fc 100%)' }}
              >
                <Shield size={18} className="text-white" strokeWidth={2} />
              </div>
              <span className="font-bold text-[17px] tracking-tight text-white">
                Transfer{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #f9a8d4, #f97316)',
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

            <p className="text-sm text-white/30 max-w-xs leading-relaxed mb-6">
              The zero-knowledge digital inheritance platform. Protect your crypto, accounts, and
              documents for the people you love — with mathematical certainty.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {['𝕏', 'in', 'gh'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white/30 transition-all duration-200 hover:text-white"
                  style={{
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.4)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
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
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-5">
                {group}
              </h4>
              <ul className="space-y-3.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/25 hover:text-white/80 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/20">
          <p>© 2026 Transfer Legacy, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: '#34d399', boxShadow: '0 0 8px rgba(52,211,153,0.8)', animation: 'pulse 2s infinite' }}
            />
            All systems operational
          </div>
          <p>
            Built with <span style={{ color: '#f97316' }}>♥</span> for families worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
