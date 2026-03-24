import { Link } from 'react-router-dom';
import { Shield, Globe, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold text-text">LinkKey</span>
            </Link>
            <p className="text-muted text-sm mb-4">
              Zero-knowledge cryptography to secure your digital assets for the people you love.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted hover:text-primary transition"><Globe size={20} /></a>
              <a href="#" className="text-muted hover:text-primary transition"><Mail size={20} /></a>
              <a href="#" className="text-muted hover:text-primary transition"><MessageSquare size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-text font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/assets" className="hover:text-primary transition">Vault</Link></li>
              <li><Link to="/guardians" className="hover:text-primary transition">Guardians</Link></li>
              <li><Link to="/ai-planner" className="hover:text-primary transition">AI Planner</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-text font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-primary transition">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition">Blog</a></li>
              <li><Link to="/trust" className="hover:text-primary transition">Trust Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-text font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm">
            © 2026 LinkKey Global. Zero-knowledge. Zero compromise.
          </p>
        </div>
      </div>
    </footer>
  );
}
