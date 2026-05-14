import { Link } from 'react-router-dom';
import { FileText, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { SEO } from '../../components/seo/SEO';

export default function DocumentStorage() {
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to store important documents for family?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Important documents like wills, property deeds, and financial statements should be stored in a highly secure, encrypted digital safe deposit box like Transfer Legacy. This ensures they are protected from physical damage (fire/flood) and automatically delivered to your heirs when needed."
        }
      },
      {
        "@type": "Question",
        "name": "Is Google Drive safe for storing legal documents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google Drive is convenient but not designed for estate planning. If you pass away, your family may not be able to access your Google account, and your documents could be lost. A dedicated zero-knowledge vault is required for inheritance."
        }
      },
      {
        "@type": "Question",
        "name": "What is a digital safe deposit box?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A digital safe deposit box is an encrypted online storage system. The best platforms, like Transfer Legacy, use zero-knowledge encryption so even the company hosting the box cannot read your files, and include mechanisms to pass the contents to heirs."
        }
      }
    ]
  });

  return (
    <div className="bg-secondary text-text min-h-screen font-sans pt-20">
      <SEO 
        title="Digital Safe Deposit Box: Store Important Documents for Family | Transfer Legacy"
        description="The ultimate guide to storing important documents, wills, and files for your family. Secure your digital legacy with a zero-knowledge encrypted vault."
        schema={faqSchema}
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
            <FileText size={16} />
            <span className="text-sm font-semibold tracking-wide uppercase">Document Inheritance</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            How to Store Important Documents for Your Family
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Filing cabinets burn. Physical safe deposit boxes get lost in probate. Here is how to build an unbreakable digital safe deposit box for your heirs.
          </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>The Danger of Physical Document Storage</h2>
          <p>
            For generations, families have stored their most critical documents—wills, life insurance policies, property deeds, and birth certificates—in physical safe deposit boxes or home filing cabinets. 
          </p>
          <p>
            This approach is fundamentally flawed in the modern era:
          </p>
          <ul>
            <li><strong>Physical Destruction:</strong> Fires, floods, and natural disasters can wipe out a lifetime of records.</li>
            <li><strong>Access Delays:</strong> When you pass away, banks immediately freeze safe deposit boxes until probate is complete, locking your family out of the exact documents they need to start the process.</li>
            <li><strong>The "Where Is It?" Problem:</strong> Often, heirs simply don't know where the documents are kept.</li>
          </ul>

          <h2>Why Dropbox and Google Drive Aren't the Answer</h2>
          <p>
            Storing documents in standard cloud storage is better than paper, but introduces new risks:
          </p>
          <ol>
            <li><strong>No Inheritance Mechanism:</strong> If your family doesn't have your Google password and 2FA device, they cannot access your Drive.</li>
            <li><strong>Privacy Risks:</strong> Standard cloud providers scan your documents. They are not zero-knowledge encrypted.</li>
          </ol>

          <h2>The Digital Safe Deposit Box</h2>
          <p>
            The ultimate solution is a <strong>Zero-Knowledge Digital Vault</strong> like Transfer Legacy. It combines the security of a bank vault with the accessibility of the cloud, engineered specifically for estate planning.
          </p>
          
          <div className="bg-surface border border-border rounded-xl p-6 my-8">
            <h3 className="mt-0">What to store in your Transfer Legacy Vault:</h3>
            <ul className="mb-0">
              <li><CheckCircle2 className="inline text-primary mr-2" size={18}/> Scans of your Last Will and Testament</li>
              <li><CheckCircle2 className="inline text-primary mr-2" size={18}/> Life insurance policy details</li>
              <li><CheckCircle2 className="inline text-primary mr-2" size={18}/> Property deeds and titles</li>
              <li><CheckCircle2 className="inline text-primary mr-2" size={18}/> A Letter of Instruction to your heirs</li>
              <li><CheckCircle2 className="inline text-primary mr-2" size={18}/> Tax returns and financial statements</li>
            </ul>
          </div>

          <p>
            With Transfer Legacy, your documents are encrypted on your device. Only you, and your designated heirs (upon verification of your passing), can decrypt them.
          </p>

          <div className="mt-12 p-8 bg-gradient-to-r from-surface to-surface/50 border border-primary/20 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mt-0 mb-4">Build your digital safe today.</h3>
            <p className="mb-6">Upload your critical documents to a zero-knowledge vault.</p>
            <Link to="/onboarding">
              <Button size="lg" className="glow-blue">
                Create Your Vault <ArrowRight className="ml-2" size={20} />
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
