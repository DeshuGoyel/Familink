import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ChevronRight, Lock, Users, Bot, KeyRound, CheckCircle2, ShieldCheck, Fingerprint, Database, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Hero from '../components/sections/Hero';
import { SEO } from '../components/seo/SEO';

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
        description="A 100-year plan for your digital world. Securely transfer Bitcoin, crypto, passwords, and digital businesses to your heirs with institutional-grade security."
        schema={faqSchema}
      />

      {/* Hero Section */}
      <Hero />

      {/* Execution Protocol — How it Works (Ditto Same) */}
      <section id="how-it-works" className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(212,175,55,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              In <span className="gold-gradient italic">15 Minutes.</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium">
              The world's most advanced succession journey. Three steps to secure your digital legacy for the next century.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-1 px-4">
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
              <div key={i} className="group relative p-12 border-l border-white/5 hover:bg-white/[0.02] transition-all duration-500">
                <div className="text-8xl font-black text-white/[0.03] absolute top-8 left-8 group-hover:text-brand-gold/10 transition-colors">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black tracking-tight mb-6 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                  <p className="text-white/40 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display mb-8">Your digital life is permanent. Your access is not.</h2>
              <div className="space-y-6">
                <Card variant="glass" className="border-l-2 border-l-rose-500/50">
                  <h3 className="text-xl font-bold text-primary mb-2">$189 Billion Lost</h3>
                  <p className="text-secondary">Bitcoin and digital wealth have vanished forever because owners died without a secure inheritance protocol.</p>
                </Card>
                <Card variant="glass" className="border-l-2 border-l-brand-primary/50">
                  <h3 className="text-xl font-bold text-primary mb-2">Locked Out Heirs</h3>
                  <p className="text-secondary">Traditional wills cannot securely hold private keys or passwords. Families are left with legal papers but no actual access.</p>
                </Card>
                <Card variant="glass" className="border-l-2 border-l-purple-500/50">
                  <h3 className="text-xl font-bold text-primary mb-2">Platform Dependency</h3>
                  <p className="text-secondary">Social media and cloud providers make it nearly impossible for family members to recover memories and digital business assets.</p>
                </Card>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-brand-primary/10 rounded-3xl blur-[80px] -z-10" />
              <Card variant="default" className="p-8 border-base bg-surface/80 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Transfer Legacy Solution</h4>
                    <p className="text-xs text-brand-primary uppercase tracking-widest font-bold">Active Protocol</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    "Zero-Knowledge Vault",
                    "Shamir's Secret Sharing",
                    "AI Legacy Guardian",
                    "Global Legal Wrapper"
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3 p-4 rounded-lg bg-page/50 border border-base">
                      <div className="w-5 h-5 rounded-full bg-trust-500/20 flex items-center justify-center text-trust-500">
                        <CheckCircle2 size={14} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Features */}
      <section className="py-32 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display mb-6">Designed for a <span className="gradient-text-premium italic">lifetime.</span></h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">Institutional infrastructure for the individual. Zero-knowledge. Zero confusion.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Zero-Knowledge Privacy', icon: Fingerprint, desc: 'We mathematically cannot access your vault. All encryption happens locally on your device.' },
              { title: 'Multi-Guardian Trust', icon: ShieldCheck, desc: 'Distribute trust among multiple people or institutions. No single point of failure.' },
              { title: 'AI Estate Guide', icon: Bot, desc: 'Our AI guides non-technical heirs step-by-step through the recovery of your digital world.' },
              { title: 'Pass On Everything', icon: Database, desc: 'From seed phrases to social media handles and domain names. One vault for your entire digital existence.' },
              { title: 'Global Compliance', icon: Lock, desc: 'Built to align with RUFADAA (USA), DIFC (UAE), and digital succession laws in India and UK.' },
              { title: 'Vault-Grade Security', icon: KeyRound, desc: 'Military-grade encryption meets fintech-tier infrastructure. Built to last 100 years.' }
            ].map((feature, i) => (
              <Card key={i} className="group border-base hover:border-brand-primary/30">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden bg-page">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-16 rounded-[40px] bg-surface border border-base relative overflow-hidden shadow-2xl"
          >
            {/* Decorative glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-gold/5 rounded-full blur-[100px]" />

            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-8">Secure your digital future today.</h2>
            <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto">It takes 15 minutes to set up a 100-year plan. Don't leave your legacy to chance.</p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/onboarding">
                <Button size="lg" variant="primary" className="px-12 h-16 text-xl">
                  Start My Vault
                </Button>
              </Link>
              <Button size="lg" variant="secondary" className="px-12 h-16 text-xl">
                Contact Institutional Sales
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-secondary text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2"><Shield size={14} /> ISO 27001 Certified</span>
              <span className="flex items-center gap-2"><Lock size={14} /> Zero-Knowledge</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-12 border-t border-base/50 text-primary0 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-surface/80" />
            <span className="font-bold tracking-tighter text-muted">TRANSFER LEGACY © 2026</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Security Audit</a>
          </div>
          <div>
            Classification: Founding Brand Kit | v1.0
          </div>
        </div>
      </footer>
    </div>
  );
}
