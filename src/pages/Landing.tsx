import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, Bot, KeyRound, CheckCircle2, Fingerprint, Globe as GlobeIcon, ArrowRight, Database, ShieldCheck } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Hero from '../components/sections/Hero';
import { SEO } from '../components/seo/SEO';

const Globe = lazy(() => import('../components/3d/Globe'));
const Problem = lazy(() => import('../components/sections/Problem'));
const Testimonials = lazy(() => import('../components/sections/Testimonials'));
const FinalCTA = lazy(() => import('../components/sections/FinalCTA'));

export default function Landing() {
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is digital asset succession?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Digital asset succession is the process of ensuring your digital wealth, identities, and memories are legally and securely transferred to your chosen heirs after you pass away. Transfer Legacy automates this process using zero-knowledge infrastructure."
        }
      },
      {
        "@type": "Question",
        "name": "How does seed phrase inheritance work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Using zero-knowledge encryption and Shamir's Secret Sharing, your seed phrase is fragmented and stored securely. Your designated guardians combine their fragments after a verified event to release the access to your heirs."
        }
      },
      {
        "@type": "Question",
        "name": "Can Transfer Legacy access my vault?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Transfer Legacy uses a 100% zero-knowledge architecture. All encryption happens locally on your device before it ever reaches our servers. We mathematically cannot access your passwords, documents, or private keys."
        }
      }
    ]
  });

  return (
    <div className="bg-page text-primary min-h-screen font-sans selection:bg-brand-primary/20">
      <SEO
        title="Transfer Legacy | Institutional Digital Asset Succession"
        description="A sovereign infrastructure for your digital world. Securely transfer Bitcoin, crypto, passwords, and digital businesses to your heirs with institutional-grade security."
        schema={faqSchema}
      />

      {/* Hero Section */}
      <Hero />

      {/* Institutional Trust Marquee */}
      <section className="py-12 border-y border-border-base bg-surface/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-8">Aligned with global security standards</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 dark:opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {/* Mock Institutional Logos */}
            <div className="flex items-center gap-2 font-display text-xl font-bold tracking-tighter text-primary">
               <ShieldCheck className="text-brand-primary" size={24} /> ISO/IEC 27001
            </div>
            <div className="flex items-center gap-2 font-display text-xl font-bold tracking-tighter text-primary">
               <Lock className="text-brand-gold" size={24} /> RUFADAA COMPLIANT
            </div>
            <div className="flex items-center gap-2 font-display text-xl font-bold tracking-tighter text-primary">
               <Fingerprint className="text-purple-500" size={24} /> SOC2 TYPE II
            </div>
            <div className="flex items-center gap-2 font-display text-xl font-bold tracking-tighter text-primary">
               <Database className="text-emerald-500" size={24} /> GDPR SOVEREIGN
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-96 bg-surface animate-pulse" />}>
        <Problem />
      </Suspense>

      {/* The Protocol Section — Bento Grid */}
      <section className="py-32 relative bg-surface overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-primary">Architected for <br /><span className="gold-gradient italic">Permanence.</span></h2>
            <p className="text-secondary text-xl max-w-2xl mx-auto font-medium">A multi-layered protocol designed to survive platform shutdowns, device loss, and time itself.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Item 1 - Large */}
            <div className="md:col-span-2 row-span-2 p-12 rounded-[32px] bg-page border border-border-base relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] dark:opacity-[0.07] group-hover:opacity-[0.1] transition-opacity">
                <Database size={240} className="text-brand-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-8">
                  <Fingerprint size={28} />
                </div>
                <h3 className="text-4xl font-bold tracking-tight mb-6 text-primary">Absolute Zero-Knowledge.</h3>
                <p className="text-secondary text-xl leading-relaxed max-w-lg mb-8">
                  Your vault is encrypted locally using AES-256-GCM. We never see your data, your keys, or your password. It is mathematically impossible for us to access your legacy.
                </p>
                <div className="flex gap-3">
                   <span className="px-4 py-1.5 rounded-full bg-surface border border-border-base text-[10px] font-bold uppercase tracking-widest text-muted">End-to-End</span>
                   <span className="px-4 py-1.5 rounded-full bg-surface border border-border-base text-[10px] font-bold uppercase tracking-widest text-muted">Shamir's Shared</span>
                </div>
              </div>
            </div>

            {/* Bento Item 2 */}
            <div className="p-8 rounded-[32px] bg-page border border-border-base flex flex-col justify-between hover:bg-surface transition-colors shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4 text-primary">Shamir Protocol</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Fragment your master access key among multiple guardians. No single person—not even a malicious actor—can release your vault without a quorum.
                </p>
              </div>
            </div>

            {/* Bento Item 3 */}
            <div className="p-8 rounded-[32px] bg-page border border-border-base flex flex-col justify-between hover:bg-surface transition-colors shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6">
                   <Bot size={24} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-4 text-primary">AI Estate Advisor</h3>
                <p className="text-secondary text-sm leading-relaxed">
                  A sovereign AI agent monitors your check-in health and provides your heirs with a step-by-step recovery roadmap when the protocol is triggered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Execution Protocol — How it Works */}
      <section id="how-it-works" className="py-32 bg-page relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(249,115,22,0.03),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-5xl font-bold tracking-tighter mb-6 text-primary">
              In <span className="gold-gradient italic">15 Minutes.</span>
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto font-medium">
              The world's most advanced succession journey. Three steps to secure your digital legacy for generations to come.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'SECURE YOUR VAULT',
                desc: 'Connect your identities, private keys, and critical documents. Everything is encrypted locally via zero-knowledge proof before reaching our infrastructure.',
              },
              {
                step: '02',
                title: 'ASSIGN GUARDIANS',
                desc: 'Designate trusted individuals or professional institutions as guardians. They never see your data—they only verify the release of the "Dead Man Switch".',
              },
              {
                step: '03',
                title: 'PEACE OF MIND',
                desc: 'If a succession event is verified, Transfer Legacy automatically reconstructs your keys and releases access to your designated heirs.',
              }
            ].map((item, i) => (
              <div key={i} className="group relative p-12 border border-border-base rounded-3xl hover:bg-surface transition-all duration-500 overflow-hidden">
                <div className="text-[120px] font-black font-digits text-primary/[0.02] absolute -bottom-8 -right-8 group-hover:text-brand-gold/[0.05] transition-all duration-700 pointer-events-none select-none group-hover:-translate-x-4 group-hover:-translate-y-4">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold tracking-tight mb-6 text-primary group-hover:text-brand-gold transition-colors">{item.title}</h3>
                  <p className="text-secondary leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Comparison Section */}
      <section className="py-32 bg-page relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-matrix opacity-30" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="max-w-7xl mx-auto px-6 relative">
           <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-primary">Legacy Comparison</h2>
              <p className="text-secondary font-medium">Why the world's elite choose Transfer Legacy over traditional methods.</p>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-border-base">
                       <th className="py-8 px-6 text-sm font-bold uppercase tracking-widest text-muted">Feature</th>
                       <th className="py-8 px-6 text-sm font-bold uppercase tracking-widest text-muted">Traditional Will</th>
                       <th className="py-8 px-6 text-sm font-bold uppercase tracking-widest text-brand-primary">Transfer Legacy</th>
                    </tr>
                 </thead>
                 <tbody className="text-secondary">
                    {[
                       { f: 'Private Key Succession', t: 'None / Paper Only', p: 'Automated ZK-Reconstruction' },
                       { f: 'Zero-Knowledge Security', t: 'None (Attorney reads it)', p: 'Military-Grade Encryption' },
                       { f: 'Verification Delay', t: 'Months (Probate)', p: 'Instant (Protocol Trigger)' },
                       { f: 'Platform Support', t: 'Manual Recovery', p: '200+ Global Integrations' }
                    ].map((row, i) => (
                       <tr key={i} className="border-b border-divider hover:bg-surface transition-colors">
                          <td className="py-8 px-6 font-bold text-primary">{row.f}</td>
                          <td className="py-8 px-6 text-rose-500 font-medium">{row.t}</td>
                          <td className="py-8 px-6 text-emerald-600 dark:text-emerald-400 font-bold">{row.p}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </section>

      {/* Signature Features */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-display mb-6 text-primary">Designed for <span className="gold-gradient italic">generations.</span></h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto font-medium">Institutional infrastructure for the individual family office. Zero-knowledge. Absolute assurance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { title: 'Zero-Knowledge Privacy', icon: Fingerprint, desc: 'We mathematically cannot access your vault. All encryption happens locally on your device.', span: 'col-span-1 md:col-span-4 lg:col-span-4' },
              { title: 'Multi-Guardian Trust', icon: ShieldCheck, desc: 'Distribute trust among multiple people. No single point of failure.', span: 'col-span-1 md:col-span-2 lg:col-span-2' },
              { title: 'AI Estate Guide', icon: Bot, desc: 'Our AI guides non-technical heirs step-by-step through the recovery of your digital world.', span: 'col-span-1 md:col-span-2 lg:col-span-2' },
              { title: 'Pass On Everything', icon: Database, desc: 'From seed phrases to social media handles and domain names. One vault for your entire digital existence.', span: 'col-span-1 md:col-span-4 lg:col-span-4' },
              { title: 'Global Compliance', icon: Lock, desc: 'Built to align with RUFADAA (USA), DIFC (UAE), and digital succession laws in India and UK.', span: 'col-span-1 md:col-span-2 lg:col-span-3' },
              { title: 'Vault-Grade Security', icon: KeyRound, desc: 'Military-grade encryption meets fintech-tier infrastructure. Built for perpetual resilience.', span: 'col-span-1 md:col-span-2 lg:col-span-3' }
            ].map((feature, i) => (
              <Card key={i} className={`group p-10 border-border-base hover:border-brand-primary/30 transition-all duration-500 bg-page hover:bg-surface shadow-sm ${feature.span}`}>
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary tracking-tight">{feature.title}</h3>
                <p className="text-secondary leading-relaxed font-medium">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-96 bg-surface animate-pulse" />}>
        <Testimonials />
      </Suspense>

      {/* FAQ Section */}
      <section className="py-32 bg-page">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Common Protocols</h2>
            <p className="text-secondary font-medium">Frequently asked questions about sovereign succession.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: 'Is Transfer Legacy a custodial service?', a: 'No. Transfer Legacy is a non-custodial protocol. We never hold your private keys or passwords in a readable format. Everything is encrypted locally on your device using zero-knowledge architecture.' },
              { q: 'What happens if I lose my device?', a: 'The protocol uses a decentralized recovery mechanism. Your encrypted vault shards are distributed among your chosen guardians. You can reconstruct your vault using their collective verification.' },
              { q: 'How does the protocol detect death or incapacitation?', a: 'We use a configurable "Proof of Life" heartbeat. If you fail to acknowledge multiple encrypted signals over a predefined period, the protocol triggers the legacy succession flow.' },
              { q: 'Is this legally binding?', a: 'Transfer Legacy is built to integrate with legal frameworks like RUFADAA. While the protocol handles the technical succession of digital assets, we recommend linking your vault metadata to your traditional legal will for full estate compliance.' }
            ].map((item, i) => (
              <Card key={i} className="p-8 border-border-base bg-surface hover:bg-white/50 dark:hover:bg-white/[0.02] transition-all shadow-sm">
                <h3 className="text-lg font-bold text-primary mb-4">{item.q}</h3>
                <p className="text-secondary leading-relaxed font-medium">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-96 bg-surface animate-pulse" />}>
        <FinalCTA />
      </Suspense>
    </div>
  );
}
