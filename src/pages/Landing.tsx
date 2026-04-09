import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ChevronDown, Lock, Users, Bot, KeyRound, CheckCircle2, ShieldCheck, Fingerprint, Database } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Canvas } from '@react-three/fiber';
import VaultScene from '../components/3d/VaultScene';
import BrokenKey from '../components/3d/BrokenKey';
import RisingKey from '../components/3d/RisingKey';

export default function Landing() {
  const words = "Your Digital Legacy, Protected Forever.".split(" ");

  return (
    <div className="bg-secondary text-text min-h-screen font-sans -mt-16">
      
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <VaultScene />
          </Canvas>
        </div>
        
        <div className="z-10 text-center max-w-4xl px-4 flex flex-col items-center mt-[-10vh]">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                className="inline-block mr-3"
              >
                {word === "Legacy," || word === "Protected" ? (
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-xl text-muted max-w-2xl mb-10"
          >
            Transfer Legacy uses AI and zero-knowledge cryptography to secure your crypto, NFTs, and digital assets for the people you love.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/onboarding">
              <Button size="lg" className="w-full sm:w-auto text-lg py-4 px-8 group">
                Start Free — No Card Needed
                <Shield className="ml-2 inline group-hover:scale-110 transition-transform" size={20} />
              </Button>
            </Link>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto text-lg py-4 px-8 border border-border">
              Watch 90s Demo
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 animate-bounce text-muted"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-24 relative overflow-hidden bg-surface/50 border-y border-border">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4F5CFF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text">Billions Lost. <br/><span className="text-danger glow-danger">Every Year.</span></h2>
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glassmorphism p-6 rounded-2xl border-l-4 border-l-danger">
                <h3 className="text-2xl font-bold text-text mb-2">$140B+</h3>
                <p className="text-muted">in crypto permanently lost due to forgotten keys and sudden deaths.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glassmorphism p-6 rounded-2xl border-l-4 border-l-yellow-500">
                <h3 className="text-2xl font-bold text-text mb-2">73%</h3>
                <p className="text-muted">of holders have no digital inheritance plan whatsoever.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="glassmorphism p-6 rounded-2xl border-l-4 border-l-purple-500">
                <h3 className="text-xl font-bold text-text mb-2">Families Locked Out</h3>
                <p className="text-muted">No key, no recovery. Your legacy vanishes into the blockchain in an instant.</p>
              </motion.div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[500px] w-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <BrokenKey />
            </Canvas>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Vault. Guard. Inherit.</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">Three simple steps to ensure your digital wealth outlives you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-[120px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 z-0"></div>
          
          {[
            { step: 1, title: 'Create Vault', icon: Lock, desc: 'Add your crypto wallets, NFTs, accounts, and documents into your encrypted vault.' },
            { step: 2, title: 'Assign Guardians', icon: Users, desc: 'Designate trusted people who each hold a fragment — no single point of failure.' },
            { step: 3, title: 'Heirs Recover', icon: KeyRound, desc: 'When triggered, AI guides your heirs step by step in plain language.' }
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Enterprise Grade Security</h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">Built for the paranoid. Designed for the family.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Zero-Knowledge Privacy', icon: Fingerprint, desc: 'Not even Transfer Legacy can see your keys or data. We mathematically cannot access your vault.' },
              { title: 'Multi-Guardian Recovery', icon: ShieldCheck, desc: 'Shamir\'s Secret Sharing ensures distributed trust. No single person can access your assets alone.' },
              { title: 'Family-Friendly Heirs', icon: Users, desc: 'AI guides non-technical heirs step by step, shielding them from blockchain complexity.' },
              { title: 'Multi-Asset Support', icon: Database, desc: 'Protect Crypto, NFTs, Seed Phrases, Email accounts, Socials, and Legal Documents.' },
              { title: 'Legal Compliance', icon: CheckCircle2, desc: 'SOC 2 Type II, GDPR, CCPA, and ISO 27001 ready platform architecture.' },
              { title: 'AI Legacy Planner', icon: Bot, desc: 'Gemini-powered gap analysis proactively identifies risks in your inheritance plan.' }
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

      {/* Pricing */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">Invest in peace of mind today. Secure generations tomorrow.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <Card className="h-full">
            <h3 className="text-2xl font-bold text-text mb-2">Personal</h3>
            <div className="text-4xl font-bold mb-6 text-text">$19<span className="text-lg text-muted font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-muted">
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-2" size={18}/> Up to 10 assets</li>
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-2" size={18}/> 3 Guardians max</li>
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-2" size={18}/> 1 Heir</li>
            </ul>
            <Button variant="secondary" fullWidth>Get Started</Button>
          </Card>
          
          <Card className="h-[105%] border-primary glow-blue relative z-10 bg-surface/90">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold text-text mb-2">Family</h3>
            <div className="text-4xl font-bold mb-6 text-text">$49<span className="text-lg text-muted font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-muted">
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-2" size={18}/> Unlimited assets</li>
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-2" size={18}/> 10 Guardians max</li>
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-2" size={18}/> 5 Heirs</li>
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-2" size={18}/> AI Pro Planner</li>
            </ul>
            <Button variant="primary" fullWidth>Start Free Trial</Button>
          </Card>
          
          <Card className="h-full">
            <h3 className="text-2xl font-bold text-text mb-2">Advisor</h3>
            <div className="text-4xl font-bold mb-6 text-text">$149<span className="text-lg text-muted font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-muted">
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-2" size={18}/> Unlimited everything</li>
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-2" size={18}/> White-label options</li>
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-2" size={18}/> Multi-client portal</li>
              <li className="flex items-center"><CheckCircle2 className="text-primary mr-2" size={18}/> Dedicated support</li>
            </ul>
            <Button variant="secondary" fullWidth>Contact Sales</Button>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-y border-border bg-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted">
          <div className="flex justify-center space-x-6 lg:space-x-16 opacity-50 flex-wrap gap-y-4">
             <div className="text-2xl font-bold tracking-widest uppercase">SOC 2 Type II</div>
             <div className="text-2xl font-bold tracking-widest uppercase">GDPR</div>
             <div className="text-2xl font-bold tracking-widest uppercase">ISO 27001</div>
             <div className="text-2xl font-bold tracking-widest uppercase">CCSS</div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-32 overflow-hidden bg-[#0A0B1A]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
             <RisingKey />
          </Canvas>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-text mb-6">Don't Let Your Legacy Disappear.</h2>
          <p className="text-2xl text-muted mb-10">Set up your vault in 5 minutes. Free forever.</p>
          <Link to="/onboarding">
            <Button size="lg" className="text-xl py-6 px-12 glow-blue rounded-full">
              Protect My Legacy <ChevronDown className="inline ml-2 -rotate-90" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
