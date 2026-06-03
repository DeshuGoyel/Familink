import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Lock, Globe, Server, Code, ArrowRight, Download, Eye } from 'lucide-react';
import SEO from '../../components/seo/SEO';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
});

export default function Whitepaper() {
  const sections = [
    {
      title: "I. The Digital Inheritance Gap",
      content: "Traditional estate planning relies on physical identity and state-granted authority. In a decentralized world, assets are controlled by private keys. Without a technical bridge, over $200B in Bitcoin is already permanently unrecoverable."
    },
    {
      title: "II. Zero-Knowledge Proof-of-Life (ZK-PoL)",
      content: "Our protocol utilizes a non-custodial 'Dead Man's Switch' verified through zero-knowledge proofs. No private data is ever decrypted on our servers. The vault only unlocks upon a cryptographically verified failure to check-in."
    },
    {
      title: "III. Multi-Jurisdictional Handoff",
      content: "Asset release logic is customized per jurisdiction (India, USA, UK, UAE) to ensure that the beneficiary receiving the key is legally aligned with local succession laws, minimizing probate friction."
    }
  ];

  return (
    <div className="min-h-screen bg-page text-primary pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none" />
      
      <SEO 
        title="Institutional Whitepaper: Sovereign Succession | Transfer Legacy"
        description="Read our technical whitepaper on decentralized digital inheritance, zero-knowledge security protocols, and global asset compliance."
        canonical="https://transferlegacy.com/whitepaper"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
           <div className="text-left">
              <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-4">
                <FileText size={16} className="text-brand-primary" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">Technical Publication v2.1</p>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-4">
                Sovereign <span className="italic text-brand-primary">Succession</span>
              </h1>
              <p className="text-secondary text-xl font-medium max-w-xl">
                The technical architecture of the world's first automated digital inheritance protocol.
              </p>
           </div>
           <div className="flex gap-4">
              <Button variant="ghost" className="h-14 px-8 text-[10px] font-bold uppercase tracking-widest">
                 <Download size={14} className="mr-2" /> PDF Version
              </Button>
              <Button variant="primary" className="h-14 px-8 text-[10px] font-bold uppercase tracking-widest bg-brand-primary text-obsidian-950">
                 <Eye size={14} className="mr-2" /> Read Online
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 space-y-16">
              {sections.map((section, i) => (
                <motion.section key={i} {...fadeUp(0.2 + i * 0.1)} className="space-y-6">
                   <h2 className="text-2xl font-display font-bold text-primary border-l-4 border-brand-primary pl-6">{section.title}</h2>
                   <p className="text-secondary leading-relaxed text-lg font-medium">
                      {section.content}
                   </p>
                </motion.section>
              ))}

              <motion.div {...fadeUp(0.6)} className="p-10 bg-surface/30 backdrop-blur-md border border-base/60 rounded-[40px] border-dashed">
                 <div className="flex items-center gap-3 mb-6">
                    <Code size={20} className="text-brand-gold" />
                    <h3 className="text-xl font-display font-bold">Protocol Logic Sample (Simplified)</h3>
                 </div>
                 <pre className="bg-obsidian-950/80 p-6 rounded-2xl font-mono text-sm text-brand-primary overflow-x-auto">
{`protocol SuccessionVault {
  if (proof_of_life.failed() && cooldown.expired()) {
    shard_a.release(guardian_verified_identity);
    shard_b.release(beneficiary_escrow);
    emit LegacyTransferred(vault_id, timestamp);
  }
}`}
                 </pre>
              </motion.div>
           </div>

           <div className="lg:col-span-4 space-y-8">
              <Card className="p-8 bg-surface/30 border-base/60 rounded-3xl sticky top-24">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-6">Whitepaper Contents</h4>
                 <ul className="space-y-4">
                    {["Executive Summary", "The Problem", "Security Architecture", "Jurisdictional Logic", "Compliance & Privacy", "Roadmap 2025"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-secondary hover:text-brand-primary cursor-pointer transition-colors">
                         <div className="w-1 h-1 bg-brand-primary rounded-full" /> {item}
                      </li>
                    ))}
                 </ul>
                 <div className="mt-10 pt-8 border-t border-base/40">
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">Security Partners</p>
                    <div className="flex flex-wrap gap-4 grayscale opacity-50">
                       <Shield className="w-6 h-6" />
                       <Lock className="w-6 h-6" />
                       <Globe className="w-6 h-6" />
                       <Server className="w-6 h-6" />
                    </div>
                 </div>
              </Card>
           </div>
        </div>

        {/* Institutional CTA */}
        <div className="mt-32 p-16 bg-brand-primary/5 border border-brand-primary/20 rounded-[64px] text-center">
            <h3 className="text-4xl font-display font-bold mb-8">Ready to <span className="text-brand-primary italic">Secure</span> Your Legacy?</h3>
            <p className="text-secondary font-medium max-w-2xl mx-auto mb-12">Join 10,000+ early adopters who have secured over $400M in digital assets through the Transfer Legacy protocol.</p>
            <Button variant="primary" className="h-16 px-16 rounded-2xl text-[11px] font-bold uppercase tracking-widest bg-brand-primary text-obsidian-950 shadow-2xl shadow-brand-primary/20">
               Initialize My Sovereign Vault <ArrowRight size={16} className="ml-2" />
            </Button>
        </div>
      </div>
    </div>
  );
}
