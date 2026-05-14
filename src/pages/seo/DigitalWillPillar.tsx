import { Link } from 'react-router-dom';
import { BookOpen, Shield, ArrowRight, HelpCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { SEO } from '../../components/seo/SEO';

export default function DigitalWillPillar() {
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a digital will?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A digital will is a modern estate planning document that specifically outlines how your digital assets (cryptocurrency, passwords, social media accounts, and digital files) should be handled and transferred to your heirs after your death."
        }
      },
      {
        "@type": "Question",
        "name": "Is a digital will legally binding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on your jurisdiction. In the USA (under RUFADAA) and increasingly in the UK, UAE, and India, digital assets are recognized as property. A digital will, when created alongside a traditional legal will, provides the technical execution to legally transfer these assets."
        }
      },
      {
        "@type": "Question",
        "name": "How to write a digital will?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To write a digital will, you must inventory your digital assets, securely store credentials (like crypto seed phrases) in a zero-knowledge vault like Transfer Legacy, designate heirs, and leave a clear Letter of Instruction."
        }
      }
    ]
  });

  return (
    <div className="bg-secondary text-text min-h-screen font-sans pt-20">
      <SEO 
        title="Digital Will & Testament: The Complete 2026 Guide | Transfer Legacy"
        description="Learn how to write a digital will online. Secure your crypto, passwords, and digital assets with a legally compliant, zero-knowledge digital estate plan."
        schema={faqSchema}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden border-b border-border bg-[#020409]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,92,255,0.1),transparent_50%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
            <BookOpen size={16} />
            <span className="text-sm font-semibold tracking-wide uppercase">Pillar Guide</span>
          </div>
          <h1 className="text-5xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            The Digital Will: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Modern Estate Planning
            </span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Traditional wills were built for houses and bank accounts. The modern world requires a Digital Will. Learn how to secure your crypto, passwords, and online legacy.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="prose prose-invert prose-lg max-w-none">
          <h2>Why You Need a Digital Will and Testament</h2>
          <p>
            In the past, your wealth was held in physical banks, your memories in photo albums, and your business in paper files. Today, your wealth is in Bitcoin, your memories are on iCloud, and your identity is scattered across hundreds of online accounts.
          </p>
          <p>
            A traditional Last Will and Testament is no longer enough. If your estate planner does not understand seed phrases, two-factor authentication, or encrypted vaults, your digital estate is at severe risk of permanent loss.
          </p>

          <h2>Core Components of a Digital Estate Plan</h2>
          <p>
            A robust digital will consists of three critical layers. Transfer Legacy is the only platform that integrates all three:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 my-10 not-prose">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3 text-white">1. The Inventory</h3>
              <p className="text-muted text-sm leading-relaxed">A complete map of your digital life: hardware wallets, exchange accounts, domains, and cloud storage.</p>
            </Card>
            <Card className="p-6 border-primary/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 bg-primary/10 rounded-bl-lg">
                <Shield size={16} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">2. The Vault</h3>
              <p className="text-muted text-sm leading-relaxed">A zero-knowledge encrypted database storing the actual passwords, PINs, and 24-word seed phrases.</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-3 text-white">3. The Execution</h3>
              <p className="text-muted text-sm leading-relaxed">The automated legal mechanism (Dead Man's Switch and Guardian verification) that transfers the vault to your heirs.</p>
            </Card>
          </div>

          <h2>How to Write a Digital Will Online</h2>
          <p>
            Creating a digital will doesn't require thousands of dollars in attorney fees. With modern zero-knowledge platforms, you can establish an unbreakable digital legacy in under 30 minutes.
          </p>
          <ol>
            <li><strong>Catalog Your Assets:</strong> Open Transfer Legacy and create entries for your crypto wallets, email accounts, and password managers.</li>
            <li><strong>Secure the Keys:</strong> Enter your seed phrases and passwords. Transfer Legacy encrypts these locally on your device using military-grade cryptography.</li>
            <li><strong>Appoint Guardians:</strong> Choose trusted friends, family, or your lawyer to act as Guardians. They hold cryptographic fragments of your vault's key but cannot access the vault themselves.</li>
            <li><strong>Assign Heirs:</strong> Specify exactly who receives which assets upon your passing.</li>
            <li><strong>Write a Letter of Instruction:</strong> Leave clear, plain-English instructions for your family so they know what to do without needing a technical background.</li>
          </ol>

          <div className="bg-surface/50 border border-border rounded-xl p-8 my-12 text-center">
            <h3 className="text-2xl font-bold mt-0 mb-4">Don't leave your family locked out.</h3>
            <p className="mb-6">Create your legally compliant Digital Will today.</p>
            <Link to="/onboarding">
              <Button size="lg" className="glow-blue">
                Create Your Digital Will <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </article>

        <section className="mt-20 pt-12 border-t border-border">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {JSON.parse(faqSchema).mainEntity.map((faq: unknown, i: number) => (
              <Card key={i} className="p-6">
                <h3 className="text-lg font-bold text-text mb-2 flex items-start">
                  <HelpCircle className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  {faq.name}
                </h3>
                <p className="text-muted leading-relaxed ml-8">{faq.acceptedAnswer.text}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
