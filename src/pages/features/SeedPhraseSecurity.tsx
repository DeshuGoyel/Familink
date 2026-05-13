import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  KeyRound, 
  ShieldAlert, 
  Divide, 
  Cpu, 
  Lock, 
  Unlock,
  Layers,
  ArrowRight,
  Database
} from 'lucide-react';
import Button from '../../components/ui/Button';
import SimulationCard from '../../components/ui/SimulationCard';
import { SEO } from '../../components/seo/SEO';

export default function SeedPhraseSecurity() {
  const [phrase, setPhrase] = useState("");
  const [isSplitting, setIsSplitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const simulateSplit = () => {
    if (!phrase) return;
    setIsSplitting(true);
    setTimeout(() => {
      setIsSplitting(false);
      setIsComplete(true);
    }, 2500);
  };

  const reset = () => {
    setPhrase("");
    setIsComplete(false);
  };

  return (
    <div className="bg-page min-h-screen text-text">
      <SEO 
        title="Seed Phrase Security & Recovery | Transfer Legacy"
        description="Secure your 24-word recovery phrases with institutional-grade Shamir's Secret Sharing. Zero-knowledge inheritance for hardware wallets."
      />

      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-[2rem] bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mx-auto mb-8 shadow-2xl shadow-brand-primary/20"
          >
            <KeyRound size={32} />
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
            SEED PHRASE<br />
            <span className="gold-gradient">INFRASTRUCTURE.</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-12">
            The single point of failure in crypto is the piece of paper in your safe. We replace it with distributed, institutional-grade redundancy.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 max-w-5xl mx-auto">
        <SimulationCard
          title="The ZK-Split Simulator"
          description="Experience how our protocol fragments your recovery phrase into zero-knowledge shards."
          icon={<Divide />}
        >
          <div className="space-y-10">
            {!isComplete ? (
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted block mb-3">Input Sample Seed (e.g. 12 words)</label>
                  <textarea 
                    value={phrase}
                    onChange={(e) => setPhrase(e.target.value)}
                    placeholder="abandon ability able about above absent absorb abstract absurd abuse..."
                    className="w-full bg-surface/50 border border-base rounded-2xl p-6 text-sm font-mono focus:ring-1 focus:ring-brand-primary/50 outline-none transition-all h-32"
                  />
                </div>

                <Button 
                  onClick={simulateSplit} 
                  disabled={!phrase || isSplitting}
                  className="w-full h-16 text-lg font-black italic tracking-tight"
                >
                  {isSplitting ? "CRYPTOGRAPHIC FRAGMENTATION..." : "INITIATE SHARDING PROTOCOL"}
                </Button>

                {isSplitting && (
                  <div className="flex justify-center gap-4 py-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          y: [0, -10, 0],
                          opacity: [0.3, 1, 0.3],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5, 
                          delay: i * 0.2 
                        }}
                        className="w-12 h-12 rounded-xl bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-brand-primary"
                      >
                        <Layers size={18} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Guardian A (Spouse)', hash: 'f2a1...98e4' },
                    { label: 'Guardian B (Bank Vault)', hash: '3d5c...12b9' },
                    { label: 'Guardian C (Attorney)', hash: 'a7e0...44f2' }
                  ].map((shard, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 relative overflow-hidden group hover:border-brand-primary/30 transition-all">
                      <div className="absolute -right-2 -bottom-2 text-brand-primary/5 group-hover:scale-110 transition-transform">
                        <Database size={60} />
                      </div>
                      <p className="text-[10px] font-black uppercase text-brand-primary mb-2">{shard.label}</p>
                      <p className="text-xs font-mono text-muted truncate">SHARD_ID: {shard.hash}</p>
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-500">
                        <Lock size={10} /> ENCRYPTED
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-raised p-6 rounded-2xl border border-base">
                  <h5 className="flex items-center gap-2 text-sm font-bold mb-3">
                    <ShieldAlert size={16} className="text-brand-primary" />
                    How it works
                  </h5>
                  <p className="text-xs text-muted leading-relaxed">
                    We use <strong>Shamir's Secret Sharing (SSS)</strong> to split your encrypted key into 3 shards. Any 2 shards are required to reconstruct the original data. No single guardian can access your data, and Transfer Legacy never sees your original phrase.
                  </p>
                </div>

                <Button variant="secondary" onClick={reset} className="w-full">
                  RESET SIMULATOR
                </Button>
              </motion.div>
            )}
          </div>
        </SimulationCard>
      </section>

      <section className="py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black italic tracking-tighter mb-6 leading-tight">
                THE DEATH OF THE <br />"PIECE OF PAPER".
              </h2>
              <div className="space-y-6">
                {[
                  { title: "No Single Point of Failure", desc: "Even if your house burns down or a guardian loses their shard, your legacy survives." },
                  { title: "Zero-Trust Architecture", desc: "We don't trust ourselves with your keys. We trust the math." },
                  { title: "Instant Heir Recovery", desc: "No legal red tape. Once conditions are met, the protocol executes." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                      <ArrowRight size={12} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                      <p className="text-sm text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] rounded-full" />
              <div className="relative p-8 rounded-[3rem] border border-base bg-surface backdrop-blur-3xl shadow-2xl shadow-black/50">
                <div className="space-y-4">
                  <div className="h-12 w-full bg-page rounded-xl border border-base flex items-center px-4 justify-between">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-primary" />
                      <div className="w-2 h-2 rounded-full bg-muted/20" />
                      <div className="w-2 h-2 rounded-full bg-muted/20" />
                    </div>
                    <span className="text-[10px] font-mono text-muted uppercase">Shard Reconstruction...</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-8 bg-page/50 rounded-lg border border-base animate-pulse" />
                    ))}
                  </div>
                  <div className="pt-4 flex justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                      <Cpu size={24} className="animate-spin-slow" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
