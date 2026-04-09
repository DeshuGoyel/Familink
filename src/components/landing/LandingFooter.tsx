import { Key, MessageCircle, GitBranch, Globe } from 'lucide-react';

const footerLinks = {
  Product: ['How It Works', 'Security', 'Pricing', 'Roadmap'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  Company: ['About Us', 'Blog', 'Careers', 'Contact'],
};

const socialLinks = [
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: GitBranch, href: '#', label: 'GitHub' },
  { icon: Globe, href: '#', label: 'LinkedIn' },
];

export default function LandingFooter() {
  return (
    <footer className="bg-[#0B0E14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-800 flex items-center justify-center">
                <Key size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Transfer <span className="text-gold">Legacy</span>
              </span>
            </div>
            <p className="text-sm text-[#8B949E] max-w-xs leading-relaxed">
              The zero-knowledge digital inheritance platform. Protect your crypto, accounts,
              and documents for the people you love — with mathematical certainty.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#8B949E] hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
                {group}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-[#8B949E] hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8B949E]">
          <p>© 2026 Transfer Legacy, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>All systems operational</span>
          </div>
          <p>
            Built with <span className="text-red-400">❤️</span> for families worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
