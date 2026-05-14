import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { SEO } from '../../components/seo/SEO';

export default function CompareDGLegacy() {
  return (
    <div className="bg-secondary text-text min-h-screen font-sans pt-20">
      <SEO 
        title="Transfer Legacy vs DGLegacy: Best Digital Legacy Platform 2026"
        description="Comparing Transfer Legacy and DGLegacy. See why zero-knowledge encryption and Shamir's Secret Sharing makes Transfer Legacy the best alternative."
      />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Transfer Legacy vs. DGLegacy
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Looking for a DGLegacy alternative? Discover why top crypto holders and privacy advocates choose Transfer Legacy for their digital estate planning.
          </p>
        </header>

        <section className="mb-20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-surface/30 rounded-2xl overflow-hidden">
              <thead>
                <tr className="border-b border-border bg-surface/80">
                  <th className="p-6 text-lg font-semibold">Feature</th>
                  <th className="p-6 text-lg font-bold text-primary">Transfer Legacy</th>
                  <th className="p-6 text-lg font-semibold text-muted">DGLegacy</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="p-6 font-medium">True Zero-Knowledge Encryption</td>
                  <td className="p-6"><CheckCircle2 className="text-primary inline mr-2"/> Client-side encryption. We never see your keys.</td>
                  <td className="p-6 text-muted"><XCircle className="text-danger inline mr-2"/> Standard encryption.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-6 font-medium">Guardian Protocol (Shamir's Secret Sharing)</td>
                  <td className="p-6"><CheckCircle2 className="text-primary inline mr-2"/> Yes, multi-party verification.</td>
                  <td className="p-6 text-muted"><XCircle className="text-danger inline mr-2"/> No.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-6 font-medium">AI-Guided Heir Recovery</td>
                  <td className="p-6"><CheckCircle2 className="text-primary inline mr-2"/> Yes, for non-technical heirs.</td>
                  <td className="p-6 text-muted"><XCircle className="text-danger inline mr-2"/> No.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-6 font-medium">Built for Crypto Native (Web3)</td>
                  <td className="p-6"><CheckCircle2 className="text-primary inline mr-2"/> Native support for Seed Phrases & Wallets.</td>
                  <td className="p-6 text-muted"><XCircle className="text-danger inline mr-2"/> Primarily generic asset tracking.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="prose prose-invert prose-lg max-w-3xl mx-auto text-center">
          <h2>Why Choose Transfer Legacy?</h2>
          <p>
            DGLegacy is a traditional asset tracking tool. Transfer Legacy is a <strong>cryptographic inheritance protocol</strong>. If you hold Bitcoin, Ethereum, or self-custody digital assets, you cannot rely on platforms that don't enforce mathematically absolute zero-knowledge security. 
          </p>
          <div className="mt-12 p-8 bg-surface border border-border rounded-2xl">
            <h3 className="text-2xl font-bold mt-0 mb-4">Make the switch today.</h3>
            <Link to="/onboarding">
              <Button size="lg" className="glow-blue">
                Start Your Secure Vault <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
