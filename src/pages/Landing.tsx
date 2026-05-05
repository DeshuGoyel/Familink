import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ChevronDown, Lock, Users, Bot, KeyRound, CheckCircle2, ShieldCheck, Fingerprint, Database, HelpCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import LandingVaultObject from '../components/3d/LandingVaultObject';
import LegacyTransferObject from '../components/3d/LegacyTransferObject';
import { SEO } from '../components/seo/SEO';

export default function Landing() {
  const words = "Your Digital Legacy, Protected Forever.".split(" ");

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What happens to crypto when you die?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you haven't set up a crypto inheritance plan, your crypto is permanently lost. Over $189 billion in Bitcoin and digital assets have already been lost. Transfer Legacy ensures your seed phrases and wallets are securely transferred to your family without exposing them to third parties."
        }
      },
      {
        "@type": "Question",
        "name": "How does seed phrase inheritance work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Using zero-knowledge encryption and Shamir's Secret Sharing, your seed phrase is fragmented and stored securely. Your designated guardians must combine their fragments after a verified event to release the seed phrase to your heirs."
        }
      },
      {
        "@type": "Question",
        "name": "Is Transfer Legacy a digital will?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it functions as a highly secure, encrypted digital will for your cryptocurrency, passwords, secret keys, and important documents. It complements traditional estate planning by handling the digital assets lawyers cannot securely hold."
        }
      },
      {
        "@type": "Question",
        "name": "Can Transfer Legacy access my private keys?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Transfer Legacy uses absolute zero-knowledge architecture. All encryption happens locally on your device. We never see your passwords, documents, or crypto private keys."
        }
      },
      {
        "@type": "Question",
        "name": "How can I store important documents for my family after death?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can upload property papers, legal documents, and personal letters into your encrypted vault. Once the 'dead man's switch' or guardian protocol is triggered, your heirs receive step-by-step access to everything you left behind."
        }
      }
    ]
  });

  return (
    <div className="bg-secondary text-text min-h-screen font-sans">
      <SEO 
        title="Crypto Inheritance & Digital Legacy Vault | Transfer Legacy"
        description="Solve the $189B problem. Securely transfer Bitcoin, crypto, seed phrases, passwords, and documents to your family. The zero-knowledge digital estate planning vault."
        schema={faqSchema}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(79,92,255,0.2),transparent_34%),radial-gradient(circle_at_18%_70%,rgba(34,197,94,0.12),transparent_28%)]" />

        <div className="relative z-10 grid min-h-screen items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 xl:px-20">
        <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="block text-2xl md:text-3xl font-semibold text-primary mb-4">The #1 Crypto Estate Planning Platform</span>
            {words.map((word, i) => (
              <span
                key={i}
                className="inline-block mr-3"
              >
                {word === "Legacy," || word === "Protected" ? (
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>
          <p
            className="text-lg md:text-xl text-muted max-w-2xl mb-10"
          >
            Transfer Legacy uses AI and zero-knowledge cryptography to secure your Bitcoin, wallets, passwords, and digital assets for the people you love. Transfer ends. Legacy begins.
          </p>
          
          <div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/onboarding">
              <Button size="lg" className="w-full sm:w-auto text-lg py-4 px-8 group">
                Create Your Digital Will
                <Shield className="ml-2 inline group-hover:scale-110 transition-transform" size={20} />
              </Button>
            </Link>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto text-lg py-4 px-8 border border-border">
              See How It Works
            </Button>
          </div>
        </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" }}
            className="relative z-10 mx-auto h-[360px] w-full max-w-[560px] sm:h-[440px] lg:h-[620px] lg:max-w-none"
          >
            <div className="absolute inset-8 rounded-full bg-primary/10 blur-3xl" />
            <Canvas dpr={[1, 1.3]} camera={{ position: [0, 0, 8.8], fov: 38 }}>
              <ambientLight intensity={0.55} />
              <LandingVaultObject />
              <Environment preset="city" />
            </Canvas>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 animate-bounce text-muted w-full flex justify-center"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-24 relative overflow-hidden bg-surface/50 border-y border-border">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4F5CFF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text">Don't let your family become a statistic.</h2>
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glassmorphism p-6 rounded-2xl border-l-4 border-l-danger">
                <h3 className="text-2xl font-bold text-text mb-2">$189 Billion</h3>
                <p className="text-muted">in Bitcoin and crypto is permanently lost because owners died without a seed phrase inheritance plan.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glassmorphism p-6 rounded-2xl border-l-4 border-l-yellow-500">
                <h3 className="text-2xl font-bold text-text mb-2">Passwords Vanish</h3>
                <p className="text-muted">Standard password managers have no secure, automated inheritance feature for when you pass away.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="glassmorphism p-6 rounded-2xl border-l-4 border-l-purple-500">
                <h3 className="text-xl font-bold text-text mb-2">Families Locked Out</h3>
                <p className="text-muted">Without your secret keys and clear instructions, your digital life and assets vanish into the blockchain.</p>
              </motion.div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative mx-auto max-w-lg overflow-hidden rounded-[2rem] border border-border bg-[#0B1020] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(239,68,68,0.18),transparent_32%),radial-gradient(circle_at_20%_90%,rgba(79,92,255,0.16),transparent_28%)]" />
              <div className="relative rounded-3xl border border-white/10 bg-black/30 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300/80">Recovery risk</p>
                    <p className="mt-2 text-3xl font-bold text-white">$189B+</p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-300 ring-1 ring-red-400/30">
                    <Lock size={30} />
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    ['Seed phrase missing', 'Critical'],
                    ['No guardian assigned', 'High'],
                    ['Heirs cannot recover wallet', 'High'],
                  ].map(([label, status]) => (
                    <div key={label} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
                      <span className="text-sm font-medium text-white/80">{label}</span>
                      <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">{status}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-100">
                  Without a digital asset inheritance plan, access disappears permanently.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Vault. Guard. Inherit.</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">Three simple steps to build your digital legacy vault.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-[120px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 z-0"></div>
          
          {[
            { step: 1, title: 'Create Vault', icon: Lock, desc: 'Add your crypto wallets, seed phrases, passwords, and important documents into your zero-knowledge vault.' },
            { step: 2, title: 'Assign Guardians', icon: Users, desc: 'Designate trusted individuals as guardians to verify your passing via our dead man\'s switch protocol.' },
            { step: 3, title: 'Heirs Recover', icon: KeyRound, desc: 'When triggered, AI legally and privately guides your heirs step-by-step to recover your digital assets.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10"
            >
              <Card hoverEffect className="h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-surface border border-primary/50 flex items-center justify-center text-primary mb-6 glow-blue relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                    {item.step}
                  </span>
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-text mb-3">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The Only Vault Built For Everything You Own Digitally</h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">Zero-knowledge. Zero lawyers. Zero confusion for your family.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Zero-Knowledge Privacy', icon: Fingerprint, desc: 'Not even Transfer Legacy can see your private keys or passwords. We mathematically cannot access your vault.' },
              { title: 'Multi-Guardian Recovery', icon: ShieldCheck, desc: 'Shamir\'s Secret Sharing ensures distributed trust for your crypto estate planning.' },
              { title: 'Family-Friendly Heirs', icon: Users, desc: 'AI guides non-technical heirs step by step, shielding them from the complexity of Web3 and wallets.' },
              { title: 'Pass On Everything', icon: Database, desc: 'Protect Bitcoin, DeFi positions, NFTs, 2FA codes, Exchange accounts, and your Last Wishes.' },
              { title: 'Legal Compliance', icon: CheckCircle2, desc: 'Built for compliance across India, USA (RUFADAA), UAE (DIFC), and UK.' },
              { title: 'AI Legacy Planner', icon: Bot, desc: 'Our AI proactively identifies risks in your password and document inheritance plan.' }
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card hoverEffect className="group">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <f.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2">{f.title}</h3>
                  <p className="text-muted">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted">Everything you need to know about protecting your digital legacy.</p>
        </div>
        
        <div className="space-y-6">
          {[
            { q: "What happens to crypto when you die?", a: "If you haven't set up a crypto inheritance plan, your crypto is permanently lost. Over $189 billion in Bitcoin and digital assets have already been lost. Transfer Legacy ensures your seed phrases and wallets are securely transferred to your family without exposing them to third parties." },
            { q: "How does seed phrase inheritance work?", a: "Using zero-knowledge encryption and Shamir's Secret Sharing, your seed phrase is fragmented and stored securely. Your designated guardians must combine their fragments after a verified event to release the seed phrase to your heirs." },
            { q: "Is Transfer Legacy a digital will?", a: "Yes, it functions as a highly secure, encrypted digital will for your cryptocurrency, passwords, secret keys, and important documents. It complements traditional estate planning by handling the digital assets lawyers cannot securely hold." },
            { q: "Can Transfer Legacy access my private keys?", a: "No. Transfer Legacy uses absolute zero-knowledge architecture. All encryption happens locally on your device. We never see your passwords, documents, or crypto private keys." },
            { q: "How can I store important documents for my family after death?", a: "You can upload property papers, legal documents, and personal letters into your encrypted vault. Once the dead man's switch or guardian protocol is triggered, your heirs receive step-by-step access to everything you left behind." }
          ].map((faq, i) => (
            <Card key={i} className="p-6">
              <h3 className="text-xl font-bold text-text mb-3 flex items-start">
                <HelpCircle className="text-primary mr-3 mt-1 flex-shrink-0" size={24} />
                {faq.q}
              </h3>
              <p className="text-muted leading-relaxed ml-9">{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative overflow-hidden bg-[#0A0B1A] py-24 lg:py-32 border-t border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_45%,rgba(34,197,94,0.14),transparent_32%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-5xl md:text-6xl font-bold text-text mb-6">Set it up in 15 minutes. Protect a lifetime of wealth.</h2>
            <p className="text-2xl text-muted mb-10">Create your zero-knowledge digital legacy vault today.</p>
            <Link to="/onboarding">
              <Button size="lg" className="inline-flex items-center justify-center gap-3 text-xl py-6 px-12 glow-blue rounded-full">
                Protect My Legacy <ChevronDown className="h-6 w-6 -rotate-90" />
              </Button>
            </Link>
          </div>

          <div className="pointer-events-none hidden h-[420px] lg:block">
            <Canvas dpr={[1, 1.35]} camera={{ position: [0, 0, 6.8], fov: 40 }}>
               <ambientLight intensity={0.5} />
               <LegacyTransferObject />
               <Environment preset="city" />
            </Canvas>
          </div>
        </div>
      </section>
    </div>
  );
}
