import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, Download, ShieldCheck, Globe, Gavel, FileCheck } from 'lucide-react';
import SEO from '../../components/seo/SEO';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
});

export default function LegalTemplates() {
  const templates = [
    {
      title: "Digital Asset Codicil",
      jurisdiction: "USA / Common Law",
      desc: "A formal amendment to an existing will explicitly mentioning your Transfer Legacy vault and guardian protocols.",
      complexity: "Standard"
    },
    {
      title: "Letter of Instructions",
      jurisdiction: "Global / Multi-Region",
      desc: "A detailed guide for your beneficiaries on how to access the dead man's switch and verify their identity.",
      complexity: "Crucial"
    },
    {
      title: "Hindu Succession Addendum",
      jurisdiction: "India",
      desc: "Specialized language for Indian citizens to ensure digital wealth is categorized under self-acquired property.",
      complexity: "Technical"
    },
    {
      title: "DIFC Non-Muslim Will Template",
      jurisdiction: "UAE",
      desc: "Drafting language required for DIFC-registered wills to protect crypto assets from Sharia-based distribution.",
      complexity: "Advanced"
    }
  ];

  return (
    <div className="min-h-screen bg-page text-primary pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none" />
      
      <SEO 
        title="Legal Templates & Codicils | Transfer Legacy"
        description="Download free legal templates to integrate your digital assets into your traditional estate plan across global jurisdictions."
        canonical="https://transferlegacy.com/legal-templates"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-2 mb-4">
            <Scale size={16} className="text-brand-primary" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">Legal Framework Library</p>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
            Succession <span className="italic text-brand-primary">Templates</span>
          </h1>
          <p className="text-secondary text-xl font-medium max-w-2xl mx-auto">
            Professional legal language to bridge the gap between traditional estate law and digital sovereignty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
           {templates.map((template, i) => (
             <motion.div key={i} {...fadeUp(0.1 * i + 0.2)}>
                <Card className="p-10 bg-surface/30 border-base/60 hover:border-brand-primary/30 transition-all group h-full flex flex-col">
                   <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 bg-page border border-base rounded-2xl flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                         <FileText size={24} />
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">{template.jurisdiction}</span>
                         <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                           template.complexity === 'Crucial' ? 'bg-red-400/10 text-red-400' : 'bg-brand-primary/10 text-brand-primary'
                         }`}>{template.complexity}</span>
                      </div>
                   </div>
                   <h3 className="text-2xl font-display font-bold mb-4">{template.title}</h3>
                   <p className="text-secondary font-medium leading-relaxed mb-10 flex-grow">
                      {template.desc}
                   </p>
                   <div className="flex gap-4">
                      <Button variant="ghost" className="flex-1 h-12 text-[10px] font-bold uppercase tracking-widest border-base/40">
                         <Download size={14} className="mr-2" /> Download .Docx
                      </Button>
                      <Button variant="primary" className="flex-1 h-12 text-[10px] font-bold uppercase tracking-widest bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary hover:text-obsidian-950">
                         Preview
                      </Button>
                   </div>
                </Card>
             </motion.div>
           ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-10 bg-brand-gold/5 border border-brand-gold/20 rounded-[40px] flex flex-col md:flex-row gap-8 items-center">
           <div className="w-16 h-16 bg-brand-gold/10 rounded-3xl flex items-center justify-center text-brand-gold shrink-0">
              <Gavel size={32} />
           </div>
           <div>
              <h4 className="text-xl font-display font-bold text-brand-gold mb-2">Legal Professional Notice</h4>
              <p className="text-[12px] font-medium text-brand-gold leading-relaxed opacity-80">
                 These templates are provided for informational purposes only and do not constitute legal advice. While developed in consultation with estate professionals, we strongly recommend having any final codicil or letter of instruction reviewed by a qualified attorney in your specific jurisdiction.
              </p>
           </div>
        </div>

        {/* Support Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
           {[
             { title: "Verified Identity", desc: "Templates include KYC/AML language requirements.", icon: <FileCheck size={24} /> },
             { title: "Global Compatibility", desc: "Language mapped to US, UK, India, and EU frameworks.", icon: <Globe size={24} /> },
             { title: "Vault Integration", desc: "Custom merge tags for your encrypted vault ID.", icon: <ShieldCheck size={24} /> }
           ].map((feature, i) => (
             <div key={i} className="space-y-4">
                <div className="w-14 h-14 bg-surface/50 border border-base/40 rounded-full flex items-center justify-center mx-auto text-brand-primary mb-6">
                   {feature.icon}
                </div>
                <h4 className="text-xl font-display font-bold">{feature.title}</h4>
                <p className="text-sm text-secondary font-medium leading-relaxed">{feature.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
