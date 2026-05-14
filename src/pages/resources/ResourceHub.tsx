import React from 'react';
import { motion } from 'framer-motion';
import { 
  Library, 
  FileText, 
  Video, 
  ArrowRight, 
  Download,
  BookOpen,
  Search,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { SEO } from '../../components/seo/SEO';

const resources = [
  {
    category: 'Guides',
    items: [
      { title: 'The 2026 Crypto Inheritance Report', type: 'PDF', size: '4.2 MB', path: '#' },
      { title: 'Hardening Your Ledger For Heirs', type: 'GUIDE', size: '12 min read', path: '/what-happens-to-crypto-when-you-die' },
      { title: 'Shamir Secret Sharing Explained', type: 'TECHNICAL', size: '8 min read', path: '/seed-phrase-inheritance' }
    ]
  },
  {
    category: 'Legal Documents',
    items: [
      { title: 'Model Letter of Instruction', type: 'DOCX', size: '45 KB', path: '#' },
      { title: 'Digital Asset Power of Attorney', type: 'LEGAL', size: 'Institutional', path: '#' },
      { title: 'Jurisdiction Matrix (US/UK/UAE)', type: 'PDF', size: '1.1 MB', path: '#' }
    ]
  }
];

export default function ResourceHub() {
  return (
    <div className="bg-page min-h-screen text-text">
      <SEO 
        title="Resources & Education Center | Transfer Legacy"
        description="Access institutional-grade guides, legal templates, and technical deep-dives into crypto inheritance and digital estate planning."
      />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-bold tracking-tight mb-8"
          >
            <Library size={16} />
            EDUCATION & TOOLS
          </motion.div>
          <h1 className="text-5xl lg:text-5xl font-bold tracking-tighter mb-8 leading-[0.85]">
            RESOURCE<br />
            <span className="gradient-text-premium">LIBRARY.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-6 items-end justify-between mt-12">
            <p className="text-xl text-muted max-w-xl leading-relaxed">
              Open-source guides and institutional tools to help you navigate the complexity of digital asset succession.
            </p>
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input 
                placeholder="Search resources..." 
                className="w-full bg-surface/50 border border-base rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:ring-1 focus:ring-brand-primary/50 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-24">
          {resources.map((group, i) => (
            <div key={i}>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold italic tracking-tighter">{group.category}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-base to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {group.items.map((item, j) => (
                  <motion.div
                    whileHover={{ y: -5 }}
                    key={j}
                    className="group p-8 rounded-[2rem] border border-base bg-surface hover:border-brand-primary/30 transition-all flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-page border border-base flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                        {item.type === 'PDF' || item.type === 'DOCX' ? <FileText size={20} /> : <BookOpen size={20} />}
                      </div>
                      <span className="text-[10px] font-bold uppercase text-muted tracking-widest">{item.type}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 italic leading-tight group-hover:text-brand-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-8">{item.size}</p>

                    <div className="mt-auto">
                      {item.path.startsWith('/') ? (
                        <Link to={item.path}>
                          <Button variant="secondary" className="w-full justify-between group/btn">
                            READ NOW <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="secondary" className="w-full justify-between group/btn">
                          DOWNLOAD <Download size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative rounded-[3rem] overflow-hidden border border-base bg-black group cursor-pointer aspect-video md:aspect-[21/9]">
            <img 
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832" 
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" 
              alt="Crypto Security"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-full bg-brand-primary/20 backdrop-blur-xl border border-brand-primary/30 flex items-center justify-center text-brand-primary mb-8 group-hover:scale-110 transition-transform">
                <Video size={32} fill="currentColor" />
              </div>
              <p className="text-brand-primary font-bold uppercase tracking-widest text-sm mb-4">Masterclass</p>
              <h2 className="text-4xl lg:text-5xl font-bold italic tracking-tighter text-white mb-6 leading-tight">
                THE 100-YEAR <br />DIGITAL PLAN.
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-8 text-sm md:text-base">
                A 20-minute walkthrough on how to architect a legacy that survives market volatility, legal shifts, and the passage of time.
              </p>
              <Button size="lg" className="rounded-full px-12 h-14">
                WATCH MASTERCLASS <ExternalLink size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
