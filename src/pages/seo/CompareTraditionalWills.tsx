import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/seo/SEO';
import { ArrowRight, Shield, Globe2, BookOpen, AlertTriangle, FileCheck, Landmark, Scale, Gavel, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const CompareTraditionalWills = () => {
  return (
    <div className="min-h-screen bg-page text-primary pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] pointer-events-none" />

      <SEO 
        title="Transfer Legacy vs. Traditional Wills: The Truth About Digital Succession"
        description="Why traditional wills fail for crypto and digital assets. Compare Transfer Legacy's Sovereign Protocol with paper-based inheritance systems."
        canonical="https://transferlegacy.com/transfer-legacy-vs-traditional-wills"
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-4 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(79,92,255,0.1)]"
          >
            <Scale className="w-4 h-4" />
            <span className="font-bold tracking-[0.2em] uppercase text-[10px]">Comparative Analysis</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-[0.95] tracking-tight text-primary">
            Sovereign Protocol vs <br /><span className="italic text-brand-primary">Traditional Wills</span>
          </h1>
          
          <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Paper documents are powerless against encrypted blockchains. See why traditional estate planning fails the digital stress test.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" className="px-10 h-14 text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-brand-primary/20">
              Upgrade Your Estate <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-24">
          
          {/* Main Comparison Table */}
          <section className="bg-surface/30 backdrop-blur-md border border-base/60 rounded-[40px] overflow-hidden">
            <div className="p-8 border-b border-base/60 bg-surface/50">
              <h2 className="text-2xl font-display font-bold text-primary">The Capabilities Gap</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted border-b border-base/40">
                    <th className="p-6">Feature</th>
                    <th className="p-6 bg-brand-primary/5 text-brand-primary">Transfer Legacy</th>
                    <th className="p-6">Traditional Will</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { f: "Crypto Recovery (Seed Phrases)", tl: true, tr: false },
                    { f: "Zero-Knowledge Encryption", tl: true, tr: false },
                    { f: "Automated Life Pulse Monitoring", tl: true, tr: false },
                    { f: "Instant Heir Notification", tl: true, tr: false },
                    { f: "Global Jurisdiction Awareness", tl: true, tr: "Limited" },
                    { f: "Probate Bypass (Technical)", tl: true, tr: false },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-base/40">
                      <td className="p-6 font-medium text-secondary">{row.f}</td>
                      <td className="p-6 bg-brand-primary/5">
                        {row.tl === true ? <CheckCircle2 className="text-emerald-400" size={18} /> : <span className="text-[10px] font-bold">{row.tl}</span>}
                      </td>
                      <td className="p-6">
                        {row.tr === true ? <CheckCircle2 className="text-secondary" size={18} /> : row.tr === false ? <XCircle className="text-muted" size={18} /> : <span className="text-[10px] font-bold uppercase">{row.tr}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Objection 1: "I already have a lawyer" */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                <Gavel size={24} />
              </div>
              <h3 className="text-3xl font-display font-bold text-primary leading-tight">"My lawyer has everything in my will."</h3>
              <p className="text-secondary leading-relaxed font-medium">
                A lawyer can prove <span className="italic">who</span> owns the asset, but they cannot prove <span className="italic">how</span> to access it. If your private keys are in a paper will, they are insecure. If they aren't, your family has a legal right to a vault they cannot unlock.
              </p>
              <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                <p className="text-sm font-bold text-emerald-400">Transfer Legacy provides the technical "key" that makes the legal "right" functional.</p>
              </div>
            </div>
            <div className="bg-surface/30 backdrop-blur-md border border-base/60 rounded-[32px] p-8 aspect-square flex flex-col justify-center items-center text-center">
               <AlertTriangle size={64} className="text-brand-gold mb-6 opacity-50" />
               <h4 className="text-xl font-display font-bold text-primary mb-4">The "Probate Trap"</h4>
               <p className="text-sm text-muted">Traditional probate takes 12-24 months. During this time, crypto volatility can wipe out 90% of your family's value while the keys are stuck in court.</p>
            </div>
          </div>

          {/* Objection 2: "Security" */}
          <div className="bg-obsidian-950/50 border border-brand-primary/20 rounded-[40px] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full" />
            <h3 className="text-3xl font-display font-bold text-primary mb-8">Is digital storage safe?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h4 className="text-brand-primary font-bold uppercase tracking-widest text-[10px]">Zero-Knowledge</h4>
                <p className="text-sm text-secondary font-medium">We never see your data. It's encrypted on your device before it ever reaches our servers.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-brand-primary font-bold uppercase tracking-widest text-[10px]">Institutional Grade</h4>
                <p className="text-sm text-secondary font-medium">AES-256-GCM encryption, the same standard used by global banks and intelligence agencies.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-brand-primary font-bold uppercase tracking-widest text-[10px]">Redundant Quorum</h4>
                <p className="text-sm text-secondary font-medium">Your assets are only released if multiple trusted guardians or our automated pulse-check triggers.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-4xl font-display font-bold mb-8">Ready to <span className="text-brand-primary italic">initialize</span>?</h2>
            <Button variant="primary" size="lg" className="px-16 h-16 text-[12px] font-bold uppercase tracking-widest shadow-2xl shadow-brand-primary/30">
              Get Started Free
            </Button>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">No credit card required for basic setup</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareTraditionalWills;
