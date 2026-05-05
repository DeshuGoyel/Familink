import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { SEO } from '../../components/seo/SEO';

export default function CompareInheriti() {
  return (
    <div className="bg-secondary text-text min-h-screen font-sans pt-20">
      <SEO 
        title="Transfer Legacy vs Inheriti: Crypto Inheritance Platforms 2026"
        description="Looking for an Inheriti alternative? Compare Transfer Legacy and Inheriti for crypto inheritance, seed phrase backups, and digital estate planning."
      />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Transfer Legacy vs. Inheriti
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Comparing the top crypto inheritance solutions. See why users choose Transfer Legacy's seamless software over Inheriti's hardware-dependent process.
          </p>
        </header>

        <section className="mb-20">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-surface/30 rounded-2xl overflow-hidden">
              <thead>
                <tr className="border-b border-border bg-surface/80">
                  <th className="p-6 text-lg font-semibold">Feature</th>
                  <th className="p-6 text-lg font-bold text-primary">Transfer Legacy</th>
                  <th className="p-6 text-lg font-semibold text-muted">Inheriti</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="p-6 font-medium">Hardware Requirement</td>
                  <td className="p-6"><CheckCircle2 className="text-primary inline mr-2"/> 100% Software. No physical keys to lose.</td>
                  <td className="p-6 text-muted"><XCircle className="text-danger inline mr-2"/> Requires SafeKey hardware devices.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-6 font-medium">Heir Experience</td>
                  <td className="p-6"><CheckCircle2 className="text-primary inline mr-2"/> AI-Guided, plain English recovery.</td>
                  <td className="p-6 text-muted"><XCircle className="text-danger inline mr-2"/> Highly technical, requires blockchain knowledge.</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-6 font-medium">Legal Integration</td>
                  <td className="p-6"><CheckCircle2 className="text-primary inline mr-2"/> Built for global legal compliance (RUFADAA, DIFC).</td>
                  <td className="p-6 text-muted"><XCircle className="text-danger inline mr-2"/> Purely decentralized smart contracts.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="prose prose-invert prose-lg max-w-3xl mx-auto text-center">
          <h2>Why Choose Transfer Legacy?</h2>
          <p>
            Inheriti is a powerful tool for ultra-technical users who want to manage physical SafeKeys. However, <strong>crypto inheritance is about your heirs, not you</strong>. If your heirs are not crypto-native, handing them fragmented physical keys and smart contract instructions is a recipe for disaster.
          </p>
          <p>
            Transfer Legacy provides the same zero-knowledge cryptographic security (Shamir's Secret Sharing) entirely in software, with an AI guide that holds your family's hand through the recovery process.
          </p>
          <div className="mt-12 p-8 bg-surface border border-border rounded-2xl">
            <h3 className="text-2xl font-bold mt-0 mb-4">Secure your legacy the smart way.</h3>
            <Link to="/onboarding">
              <Button size="lg" className="glow-blue">
                Create Your Vault <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
