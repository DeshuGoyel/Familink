import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
});

export default function ROICalculator() {
  const [assetValue, setAssetValue] = useState(100000);
  
  const potentialLoss = assetValue * 0.45; // 45% potential loss in legacy systems (legal fees + recovery difficulty)
  const tlSavings = potentialLoss * 0.92; // 92% efficiency improvement

  return (
    <div className="min-h-screen bg-page text-primary pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-6 mb-24">
          <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp size={16} className="text-brand-primary" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">
              Institutional Loss Prevention Tool
            </p>
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-5xl font-display font-bold tracking-tight">
            ROI <span className="italic text-brand-primary">Calculator</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-muted text-xl max-w-3xl mx-auto font-medium">
            Calculate the potential capital preservation and recovery efficiency of your digital estate succession plan.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
           <motion.div {...fadeUp(0.3)}>
              <Card className="p-10 md:p-12 bg-surface/30 border-base/40 rounded-[48px] shadow-2xl">
                 <div className="space-y-10">
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <label className="text-sm font-bold uppercase tracking-widest text-primary0">Total Digital Asset Value (USD)</label>
                          <span className="text-2xl font-display font-bold text-brand-primary">${assetValue.toLocaleString()}</span>
                       </div>
                       <input 
                         type="range" 
                         min="10000" 
                         max="10000000" 
                         step="10000"
                         value={assetValue}
                         onChange={(e) => setAssetValue(parseInt(e.target.value))}
                         className="w-full h-2 bg-page rounded-full appearance-none cursor-pointer accent-brand-primary border border-base"
                       />
                       <div className="flex justify-between text-[10px] font-bold text-obsidian-700 uppercase">
                          <span>$10k</span>
                          <span>$10M</span>
                       </div>
                    </div>

                    <div className="space-y-6 pt-10 border-t border-base">
                       <div className="flex items-center gap-4 text-obsidian-700">
                          <Clock size={18} />
                          <p className="text-sm font-medium">Estimated recovery time without protocol: <span className="text-primary0 font-bold">18-24 months</span></p>
                       </div>
                       <div className="flex items-center gap-4 text-obsidian-700">
                          <ShieldCheck size={18} />
                          <p className="text-sm font-medium">Estimated recovery time with protocol: <span className="text-brand-primary font-bold">90 days</span></p>
                       </div>
                    </div>
                 </div>
              </Card>
           </motion.div>

           <motion.div {...fadeUp(0.4)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <Card className="p-8 bg-brand-primary/5 border-brand-primary/20 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2">Potential Capital Loss</p>
                    <p className="text-4xl font-display font-bold text-primary">${potentialLoss.toLocaleString()}</p>
                    <p className="text-[10px] text-muted mt-2 uppercase font-medium">Traditional Legal/Recovery Fees</p>
                 </Card>
                 <Card className="p-8 bg-trust-500/5 border-trust-500/20 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-trust-500 mb-2">Protocol Savings</p>
                    <p className="text-4xl font-display font-bold text-trust-500">${tlSavings.toLocaleString()}</p>
                    <p className="text-[10px] text-muted mt-2 uppercase font-medium">92% Preservation Efficiency</p>
                 </Card>
              </div>
              
              <div className="p-10 bg-surface/30 border border-base rounded-[40px] space-y-6">
                 <h3 className="text-2xl font-display font-bold">The Math of <span className="text-brand-primary italic">Preservation</span></h3>
                 <p className="text-muted leading-relaxed font-medium">Our ROI model accounts for legal probate costs, asset volatility during recovery delays, and the technical complexity of custodial asset retrieval. By automating the verification layer, Transfer Legacy reduces recovery friction by over 90%.</p>
                 <Button variant="primary" className="w-full h-14 text-[10px] font-bold uppercase tracking-widest">
                    Secure This Preservation <ArrowRight size={16} className="ml-2" />
                 </Button>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
