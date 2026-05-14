import React from 'react';
import { 
  Check, 
  X, 
  ShieldCheck, 
  Lock, 
  Users, 
  Cpu, 
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { SEO } from '../../components/seo/SEO';

interface ComparisonFeature {
  name: string;
  legacy: boolean | string;
  competitor: boolean | string;
  desc: string;
}

interface ComparisonLayoutProps {
  competitorName: string;
  competitorLogo?: string;
  features: ComparisonFeature[];
  title: string;
  description: string;
}

export default function ComparisonLayout({ 
  competitorName, 
  features, 
  title, 
  description 
}: ComparisonLayoutProps) {
  return (
    <div className="bg-page min-h-screen text-text">
      <SEO title={`${title} | Transfer Legacy`} description={description} />

      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-5xl font-bold tracking-tighter mb-8 leading-[0.85]">
            BUILT FOR <br />
            <span className="gradient-text-premium uppercase italic">BILLIONS.</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-12">
            Why Transfer Legacy is the institutional choice compared to {competitorName}.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-[3rem] border border-base bg-surface/50 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 border-b border-base bg-raised">
            <div className="col-span-6 p-8 border-r border-base flex items-center gap-3">
              <ShieldCheck className="text-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-widest italic">Institutional Features</span>
            </div>
            <div className="col-span-3 p-8 border-r border-base text-center flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold uppercase text-brand-primary tracking-tighter mb-1">THE GOLD STANDARD</span>
              <span className="text-sm font-bold italic tracking-tight">TRANSFER LEGACY</span>
            </div>
            <div className="col-span-3 p-8 text-center flex flex-col items-center justify-center opacity-40">
              <span className="text-[10px] font-bold uppercase text-muted tracking-tighter mb-1">LEGACY ALTERNATIVE</span>
              <span className="text-sm font-bold italic tracking-tight">{competitorName.toUpperCase()}</span>
            </div>
          </div>

          <div className="divide-y divide-base">
            {features.map((feature, i) => (
              <div key={i} className="grid grid-cols-12 group hover:bg-page/50 transition-colors">
                <div className="col-span-6 p-8 border-r border-base">
                  <h4 className="text-sm font-bold text-primary mb-1">{feature.name}</h4>
                  <p className="text-[10px] text-muted leading-relaxed">{feature.desc}</p>
                </div>
                <div className="col-span-3 p-8 border-r border-base flex items-center justify-center bg-brand-primary/5">
                  {typeof feature.legacy === 'boolean' ? (
                    feature.legacy ? <Check className="text-brand-primary" size={24} /> : <X className="text-muted" size={24} />
                  ) : (
                    <span className="text-xs font-bold italic text-brand-primary">{feature.legacy}</span>
                  )}
                </div>
                <div className="col-span-3 p-8 flex items-center justify-center opacity-40">
                   {typeof feature.competitor === 'boolean' ? (
                    feature.competitor ? <Check className="text-muted" size={20} /> : <X className="text-muted" size={20} />
                  ) : (
                    <span className="text-[10px] font-bold text-muted">{feature.competitor}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Lock, title: "ZK-Encryption", desc: "We use zero-knowledge architecture. They often use standard server-side encryption." },
            { icon: Users, title: "Multi-Guardian", desc: "Institutional trust models require multiple validators. We provide the industry's best protocol." },
            { icon: Cpu, title: "Autonomous Release", desc: "No human intervention. Our protocol executes on the blockchain according to your rules." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl border border-base bg-surface">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-6">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 italic">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 border-t border-base text-center px-6">
        <h2 className="text-4xl font-bold italic tracking-tighter mb-8">Ready to upgrade your legacy?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/onboarding">
            <Button size="lg" className="rounded-full px-12 h-14 glow-blue">
              GET STARTED NOW <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
          <Link to="/resources">
            <Button variant="secondary" size="lg" className="rounded-full px-12 h-14">
              VIEW TECHNICAL DOCS
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
