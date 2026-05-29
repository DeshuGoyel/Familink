import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import { BookOpen, Globe2, ShieldCheck, Scale, Calculator, ArrowRight, Zap, Target, Scroll, FileText, Database, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const ResourcesHub = () => {
  const resourceCategories = [
    {
      title: "Core Estate Planning",
      icon: <BookOpen className="w-6 h-6 text-brand-primary" />,
      color: "border-base/40 bg-surface/30",
      links: [
        { name: "The Ultimate Crypto Inheritance Guide", path: "/crypto-inheritance" },
        { name: "How to Create a Digital Will", path: "/digital-will" },
        { name: "What Happens to Crypto When You Die?", path: "/what-happens-to-crypto-when-you-die" },
        { name: "Secure Document Storage for Families", path: "/store-important-documents-for-family" }
      ]
    },
    {
      title: "Technical Protocols",
      icon: <ShieldCheck className="w-6 h-6 text-brand-gold" />,
      color: "border-base/40 bg-surface/30",
      links: [
        { name: "Seed Phrase Inheritance Strategy", path: "/seed-phrase-inheritance" },
        { name: "Private Key Inheritance", path: "/private-key-inheritance" },
        { name: "How to Pass Bitcoin to Family", path: "/how-to-pass-bitcoin-to-family" },
        { name: "Transferring Crypto Wallets After Death", path: "/transfer-crypto-wallet-to-family" },
        { name: "Password Inheritance Guide", path: "/password-inheritance" }
      ]
    },
    {
      title: "Global Jurisdictions",
      icon: <Globe2 className="w-6 h-6 text-emerald-400" />,
      color: "border-base/40 bg-surface/30",
      links: [
        { name: "Crypto Inheritance in India", path: "/crypto-inheritance-india" },
        { name: "Digital Wills in India", path: "/digital-will-india" },
        { name: "Bitcoin Estate Planning in the USA", path: "/crypto-inheritance-usa" },
        { name: "Digital Asset Laws (RUFADAA) USA", path: "/digital-asset-inheritance-usa" },
        { name: "Crypto Inheritance in the UK", path: "/crypto-inheritance-uk" },
        { name: "DIFC Digital Assets Law (UAE)", path: "/crypto-inheritance-uae" }
      ]
    },
    {
      title: "Institutional Research",
      icon: <Database className="w-6 h-6 text-blue-400" />,
      color: "border-base/40 bg-surface/30",
      links: [
        { name: "Sovereign Succession Whitepaper", path: "/whitepaper" },
        { name: "Zero-Knowledge Security Audit", path: "/security" },
        { name: "Legal Language Templates", path: "/legal-templates" },
        { name: "Protocol Technical Specifications", path: "/technical-specs" }
      ]
    }
  ];

  const tools = [
    { name: "Inheritance Calculator", desc: "Project future taxes & growth.", path: "/features/inheritance-calculator", icon: <Calculator className="text-brand-primary" /> },
    { name: "Succession Planner", desc: "Get a custom readiness score.", path: "/tools/planner", icon: <Target className="text-brand-gold" /> },
    { name: "Risk Assessment", desc: "Quantify loss probability.", path: "/tools/crypto-risk-calculator", icon: <Zap className="text-red-400" /> }
  ];

  return (
    <div className="min-h-screen bg-page text-primary pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] pointer-events-none" />

      <SEO 
        title="Institutional Knowledge Hub | Transfer Legacy"
        description="Explore our comprehensive library of guides on cryptocurrency inheritance, digital wills, seed phrase security, and global digital asset laws."
        canonical="https://transferlegacy.com/resources"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-4 py-2 rounded-full mb-8"
          >
            <Code className="w-4 h-4" />
            <span className="font-bold tracking-[0.2em] uppercase text-[10px]">Sovereign Knowledge Hub</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[0.95] tracking-tight text-primary">
            Master Your <span className="italic text-brand-primary">Digital Heritage</span>
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            The institutional library for digital wealth preservation, automated succession protocols, and global asset compliance.
          </p>
        </div>

        {/* Interactive Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
           {tools.map((tool, i) => (
             <Link key={i} to={tool.path} className="group">
                <Card className="p-8 bg-surface/30 border-base/60 hover:border-brand-primary/30 transition-all h-full flex flex-col items-center text-center">
                   <div className="w-12 h-12 bg-page border border-base rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {tool.icon}
                   </div>
                   <h3 className="text-xl font-display font-bold mb-2">{tool.name}</h3>
                   <p className="text-[12px] text-muted font-medium mb-6">{tool.desc}</p>
                   <div className="mt-auto flex items-center text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                      Launch Tool <ArrowRight size={12} className="ml-2" />
                   </div>
                </Card>
             </Link>
           ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {resourceCategories.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3 }}
              className={`border backdrop-blur-md rounded-[32px] p-10 ${category.color} hover:bg-surface/50 transition-all duration-300 group`}
            >
              <div className="flex items-center mb-8">
                <div className="bg-page/50 p-3 rounded-xl border border-base/40 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-display font-bold ml-4 text-primary tracking-tight">{category.title}</h2>
              </div>
              <ul className="space-y-5">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path}
                      className="text-secondary hover:text-brand-primary flex items-center group/link transition-all duration-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-base/20 flex items-center justify-center mr-3 group-hover/link:bg-brand-primary/20 transition-colors">
                        <ArrowRight className="w-3 h-3 text-muted group-hover/link:text-brand-primary transition-colors" />
                      </div>
                      <span className="text-[13px] font-semibold tracking-tight">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Institutional Comparison CTA */}
        <div className="p-12 md:p-16 bg-obsidian-950/80 border border-brand-primary/30 rounded-[48px] relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-aurora opacity-10 pointer-events-none" />
            <div className="relative z-10 space-y-8">
               <div className="flex items-center justify-center gap-2 mb-4">
                  <Scale size={20} className="text-purple-400" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">Institutional Benchmarking</p>
               </div>
               <h3 className="text-4xl font-display font-bold">Compare <span className="text-brand-primary italic">Transfer Legacy</span> Protocols</h3>
               <p className="text-secondary font-medium max-w-2xl mx-auto">See how our zero-knowledge automated handoff system outperforms traditional legal probate and manual storage-only solutions.</p>
               <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/transfer-legacy-vs-dglegacy">
                     <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest">vs. DGLegacy</Button>
                  </Link>
                  <Link to="/transfer-legacy-vs-inheriti">
                     <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest">vs. Inheriti</Button>
                  </Link>
                  <Link to="/transfer-legacy-vs-traditional-wills">
                     <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest">vs. Traditional Wills</Button>
                  </Link>
               </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ResourcesHub;
