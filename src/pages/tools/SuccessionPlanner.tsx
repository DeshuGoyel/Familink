import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Shield, Users, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
});

export default function SuccessionPlanner() {
  const steps = [
    { title: "Inventory", desc: "Audit and catalog all digital and physical legacy assets.", icon: <Calendar size={20} /> },
    { title: "Network", desc: "Select and verify your decentralized guardian network.", icon: <Users size={20} /> },
    { title: "Encryption", desc: "Fragment and secure your vault shards on-chain.", icon: <Shield size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-page text-primary pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-6 mb-24">
          <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={16} className="text-brand-gold" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Generational Planning Engine
            </p>
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-5xl font-display font-bold tracking-tight">
            Succession <span className="italic text-brand-primary">Planner</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-muted text-xl max-w-3xl mx-auto font-medium">
            Architect your 100-year legacy with our guided planning protocol. Comprehensive, secure, and institutional.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           {steps.map((step, i) => (
             <motion.div key={i} {...fadeUp(0.3 + i * 0.1)}>
                <Card className="p-10 bg-surface/30 border-base/40 hover:border-brand-primary/30 transition-all h-full">
                   <div className="w-12 h-12 rounded-2xl bg-page border border-base flex items-center justify-center mb-8 text-brand-primary">
                      {step.icon}
                   </div>
                   <h3 className="text-2xl font-display font-bold mb-4">{step.title}</h3>
                   <p className="text-primary0 leading-relaxed font-medium">
                      {step.desc}
                   </p>
                </Card>
             </motion.div>
           ))}
        </div>

        <motion.div {...fadeUp(0.6)} className="p-12 md:p-20 bg-brand-primary/5 border border-brand-primary/20 rounded-[64px] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-aurora opacity-10 pointer-events-none" />
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8">
                 <h2 className="text-4xl font-display font-bold">Start Your <span className="text-brand-primary italic">Protocol</span> Today</h2>
                 <p className="text-muted font-medium leading-relaxed">Most digital estates are lost within 48 hours of an event. Our planner ensures that your assets are recovered, verified, and distributed according to your exact specifications.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Instant Vault Generation", "Guardian Onboarding", "Asset Notarization", "Compliance Audit"].map((point, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-bold text-primary0">
                         <CheckCircle2 size={18} className="text-brand-primary" /> {point}
                      </div>
                    ))}
                 </div>
                 <Button variant="primary" className="h-16 px-16 text-[11px] font-bold uppercase tracking-widest shadow-2xl shadow-brand-primary/30">
                    Launch Interactive Planner <ArrowRight size={16} className="ml-2" />
                 </Button>
              </div>
              <div className="relative aspect-square">
                 <Card className="absolute inset-0 bg-page/40 backdrop-blur-3xl border-base flex items-center justify-center rounded-[48px]">
                    <Calendar size={180} className="text-brand-primary/5" />
                    <div className="text-center space-y-4">
                       <p className="text-5xl font-display font-bold text-brand-primary">Step 1</p>
                       <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-obsidian-700">Protocol Initialization</p>
                    </div>
                 </Card>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
