import { useStore } from '../store/useStore';
import { 
  FileText, Download, ShieldCheck, AlertCircle, 
  BarChart3, Clock, Lock, ChevronRight 
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
});

export default function Reports() {
  const { user, assets, guardians, heirs } = useStore();

  const confirmedGuardians = guardians.filter(g => g.status === 'Confirmed').length;
  const assetInstructions = assets.filter(a => a.instructions).length;
  const assetBeneficiaries = assets.filter(a => a.beneficiaryId).length;

  const sections = [
    {
      title: "Protocol Integrity",
      score: user.score,
      status: user.score > 80 ? "Optimal" : "Optimisation Required",
      color: user.score > 80 ? "text-emerald-400" : "text-brand-primary",
      details: [
        { label: "Confirmed Guardians", value: `${confirmedGuardians} / ${guardians.length}`, status: confirmedGuardians >= 2 ? "Pass" : "Warning" },
        { label: "Succession Quorum", value: confirmedGuardians >= 2 ? "2-of-3 Met" : "Incomplete", status: confirmedGuardians >= 2 ? "Pass" : "Fail" },
        { label: "Heir Validation", value: heirs.length > 0 ? "Verified" : "Missing", status: heirs.length > 0 ? "Pass" : "Fail" }
      ]
    },
    {
      title: "Asset Distribution",
      score: Math.round((assetInstructions / assets.length) * 100),
      status: assetInstructions === assets.length ? "Complete" : "Incomplete",
      color: assetInstructions === assets.length ? "text-emerald-400" : "text-amber-400",
      details: [
        { label: "Instruction Coverage", value: `${assetInstructions} / ${assets.length}`, status: assetInstructions === assets.length ? "Pass" : "Warning" },
        { label: "Beneficiary Mapping", value: `${assetBeneficiaries} / ${assets.length}`, status: assetBeneficiaries === assets.length ? "Pass" : "Warning" },
        { label: "Encryption Hardening", value: "Standard/Quantum", status: "Pass" }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-8 bg-page pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <motion.header {...fadeUp(0)} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-base pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={16} className="text-brand-primary" />
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary">Audit & Compliance</p>
            </div>
            <h1 className="text-4xl font-display font-bold text-primary tracking-tight">
              Institutional <span className="gold-gradient italic">Audit Report</span>
            </h1>
            <p className="text-secondary text-sm mt-2 font-medium">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
          </div>

          <Button variant="primary" className="gap-2">
            <Download size={18} />
            Export PDF Audit
          </Button>
        </motion.header>

        {/* Summary Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card {...fadeUp(0.1)} variant="glass" className="p-6 flex flex-col items-center text-center">
             <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                <BarChart3 size={24} />
             </div>
             <p className="text-3xl font-digits font-bold text-primary mb-1">{user.score}%</p>
             <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Succession Confidence</p>
          </Card>

          <Card {...fadeUp(0.15)} variant="glass" className="p-6 flex flex-col items-center text-center">
             <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck size={24} />
             </div>
             <p className="text-3xl font-digits font-bold text-primary mb-1">{assets.length}</p>
             <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Protected Assets</p>
          </Card>

          <Card {...fadeUp(0.2)} variant="glass" className="p-6 flex flex-col items-center text-center">
             <div className="w-12 h-12 rounded-xl bg-trust-500/10 flex items-center justify-center text-trust-500 mb-4">
                <Lock size={24} />
             </div>
             <p className="text-3xl font-digits font-bold text-primary mb-1">{confirmedGuardians}</p>
             <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Active Guardians</p>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <motion.div key={idx} {...fadeUp(0.3 + idx * 0.1)}>
              <Card variant="default" className="overflow-hidden p-0 border-base">
                <div className="bg-surface/30 px-8 py-5 border-b border-base flex justify-between items-center">
                   <h3 className="text-lg font-bold text-primary">{section.title}</h3>
                   <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold ${section.color}`}>{section.status}</span>
                      <div className="w-24 h-1.5 bg-surface rounded-full overflow-hidden">
                        <div className={`h-full bg-current transition-all ${section.color}`} style={{ width: `${section.score}%` }} />
                      </div>
                   </div>
                </div>
                <div className="p-0">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-base/50">
                          <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Control Point</th>
                          <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Current Value</th>
                          <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-base/30">
                        {section.details.map((detail, dIdx) => (
                          <tr key={dIdx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-8 py-5 text-sm font-medium text-primary">{detail.label}</td>
                            <td className="px-8 py-5 text-sm font-digits text-secondary">{detail.value}</td>
                            <td className="px-8 py-5 text-right">
                               <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                 detail.status === 'Pass' ? 'bg-emerald-500/10 text-emerald-400' : 
                                 detail.status === 'Warning' ? 'bg-amber-500/10 text-amber-400' : 
                                 'bg-red-500/10 text-red-400'
                               }`}>
                                 {detail.status === 'Fail' && <AlertCircle size={12} />}
                                 {detail.status}
                               </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Call */}
        <motion.div {...fadeUp(0.6)}>
           <Card variant="outline" className="p-8 border-brand-primary/20 bg-brand-primary/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-left">
                 <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-obsidian-950">
                    <BarChart3 size={24} />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold text-primary">Need professional review?</h4>
                    <p className="text-sm text-secondary">Share this report with your estate lawyer for institutional validation.</p>
                 </div>
              </div>
              <Button variant="secondary" className="gap-2">
                 Share with Professional <ChevronRight size={16} />
              </Button>
           </Card>
        </motion.div>

      </div>
    </div>
  );
}
