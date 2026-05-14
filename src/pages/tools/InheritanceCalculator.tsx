import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  ShieldAlert, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  ArrowRight,
  Info,
  RefreshCcw,
  ShieldCheck
} from 'lucide-react';
import Button from '../../components/ui/Button';
import SimulationCard from '../../components/ui/SimulationCard';
import { SEO } from '../../components/seo/SEO';

interface Question {
  id: string;
  text: string;
  options: { text: string; score: number; color: string }[];
}

const questions: Question[] = [
  {
    id: 'keys',
    text: 'How do you store your private keys/seed phrases?',
    options: [
      { text: 'Paper in a safe', score: 40, color: 'text-amber-500' },
      { text: 'Digital file (Encrypted)', score: 60, color: 'text-blue-500' },
      { text: 'Digital file (Unencrypted)', score: 10, color: 'text-error' },
      { text: 'Memory only', score: 0, color: 'text-error' },
      { text: 'Shamir Secret Sharing / Vault', score: 100, color: 'text-emerald-500' }
    ]
  },
  {
    id: 'guardians',
    text: 'Do your heirs know how to access your assets if you pass away?',
    options: [
      { text: 'Yes, full access & training', score: 100, color: 'text-emerald-500' },
      { text: 'They know a safe exists', score: 50, color: 'text-amber-500' },
      { text: 'They have no idea', score: 0, color: 'text-error' },
      { text: 'I have a legal will', score: 30, color: 'text-blue-500' }
    ]
  },
  {
    id: 'mfa',
    text: 'What happens to your 2FA devices (YubiKey/Phone) if you pass away?',
    options: [
      { text: 'Backup codes in vault', score: 100, color: 'text-emerald-500' },
      { text: 'Codes are in a physical safe', score: 60, color: 'text-amber-500' },
      { text: 'Heirs dont have the PINs', score: 20, color: 'text-error' },
      { text: 'No backup plan', score: 0, color: 'text-error' }
    ]
  }
];

export default function InheritanceCalculator() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (score: number) => {
    const newScores = { ...scores, [questions[currentQuestion].id]: score };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) / questions.length;

  const getScoreInfo = () => {
    if (totalScore < 30) return { label: 'CRITICAL RISK', color: 'text-error', desc: 'Your assets are at extreme risk of permanent loss.' };
    if (totalScore < 70) return { label: 'MODERATE RISK', color: 'text-amber-500', desc: 'Significant gaps in your digital estate plan.' };
    return { label: 'SECURE LEGACY', color: 'text-emerald-500', desc: 'You have institutional-grade protection in place.' };
  };

  return (
    <div className="bg-page min-h-screen text-text">
      <SEO 
        title="Crypto Inheritance Risk Calculator | Transfer Legacy"
        description="Calculate the risk of your digital assets being permanently lost. Get a personalized Legacy Security Score in 60 seconds."
      />

      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-[2rem] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mx-auto mb-8 shadow-2xl shadow-amber-500/20"
          >
            <Calculator size={32} />
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
            LEGACY SECURITY<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-200">SCORE.</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-12">
            Most crypto users are one accident away from losing everything. Find out your score and close the gaps.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto">
        <SimulationCard
          title="Risk Assessment Tool"
          description="Answer 3 questions to generate your institutional risk profile."
          icon={<TrendingUp />}
        >
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-muted">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <div className="flex gap-1">
                    {questions.map((_, i) => (
                      <div key={i} className={cn("w-6 h-1 rounded-full transition-all", i === currentQuestion ? "bg-amber-500" : "bg-base")} />
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-bold italic tracking-tight">{questions[currentQuestion].text}</h3>

                <div className="grid grid-cols-1 gap-3">
                  {questions[currentQuestion].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt.score)}
                      className="group flex items-center justify-between p-6 rounded-2xl bg-surface border border-base hover:border-amber-500/50 hover:bg-amber-500/5 transition-all text-left"
                    >
                      <span className="font-bold text-sm group-hover:text-amber-500 transition-colors">{opt.text}</span>
                      <ArrowRight size={16} className="text-muted group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="relative inline-block mb-8">
                  <svg className="w-48 h-48">
                    <circle className="text-base" strokeWidth="12" stroke="currentColor" fill="transparent" r="80" cx="96" cy="96" />
                    <motion.circle
                      className={getScoreInfo().color}
                      strokeWidth="12"
                      strokeDasharray={502}
                      initial={{ strokeDashoffset: 502 }}
                      animate={{ strokeDashoffset: 502 - (502 * totalScore) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="80" cx="96" cy="96"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black italic tracking-tighter">{Math.round(totalScore)}</span>
                    <span className="text-[10px] font-black uppercase text-muted tracking-widest">SCORE</span>
                  </div>
                </div>

                <h4 className={cn("text-3xl font-black italic mb-2 tracking-tighter", getScoreInfo().color)}>
                  {getScoreInfo().label}
                </h4>
                <p className="text-muted text-sm max-w-sm mx-auto mb-10 leading-relaxed">
                  {getScoreInfo().desc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="p-5 rounded-2xl bg-surface border border-base">
                    <h5 className="flex items-center gap-2 text-xs font-bold mb-2">
                      <ShieldAlert size={14} className="text-error" /> Top Risk
                    </h5>
                    <p className="text-[11px] text-muted">Lack of fragmented recovery shards makes your keys vulnerable to physical theft or local loss.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface border border-base">
                    <h5 className="flex items-center gap-2 text-xs font-bold mb-2">
                      <ShieldCheck size={14} className="text-emerald-500" /> Action Item
                    </h5>
                    <p className="text-[11px] text-muted">Implement Shamir's Secret Sharing to distribute trust across 3+ designated guardians.</p>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <Button onClick={() => { setIsFinished(false); setCurrentQuestion(0); setScores({}); }} variant="secondary" className="flex-1">
                    <RefreshCcw size={16} className="mr-2" /> RE-CALCULATE
                  </Button>
                  <Button className="flex-1 glow-amber">
                    Start Free Security Audit <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SimulationCard>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-raised rounded-[3rem] border border-base p-12 lg:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 text-muted/5 pointer-events-none">
            <Calculator size={300} strokeWidth={0.5} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-black italic tracking-tighter mb-8 leading-tight">
              STOP THE $189B <br />LEAKAGE.
            </h2>
            <p className="text-lg text-muted mb-10 leading-relaxed">
              Every year, billions in digital assets vanish because of poor inheritance infrastructure. Transfer Legacy is the institutional fix for the single point of failure problem.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Zero-Knowledge Encryption",
                "Self-Custodial Protocol",
                "Legal-Technical Enforcement",
                "Multi-Party Auth"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={12} />
                  </div>
                  <span className="text-sm font-bold text-primary italic">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
