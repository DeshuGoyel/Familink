import { Link } from 'react-router-dom';
import { KeyRound, Shield, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { SEO } from '../../components/seo/SEO';

export default function PasswordInheritance() {
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to pass passwords to family after death?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most secure way is to use a zero-knowledge digital legacy vault like Transfer Legacy. Unlike writing passwords down or using a standard password manager, it encrypts your passwords and automatically releases them to your heirs only after your death has been verified by trusted guardians."
        }
      },
      {
        "@type": "Question",
        "name": "What happens to my LastPass or 1Password when I die?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most standard password managers do not have robust inheritance features. If your family doesn't know your master password, your accounts may be permanently locked. Transfer Legacy is designed specifically for this scenario."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to put passwords in a digital will?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You should never put plaintext passwords in a legal will, as wills often become public records during probate. Passwords must be kept in an encrypted, zero-knowledge vault that is executed alongside your legal will."
        }
      }
    ]
  });

  return (
    <div className="bg-secondary text-text min-h-screen font-sans pt-20">
      <SEO 
        title="Password Inheritance: How to Pass Passwords to Family After Death | Transfer Legacy"
        description="Learn the most secure way to pass passwords, 2FA codes, and digital accounts to your family after death. Don't rely on standard password managers."
        schema={faqSchema}
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
            <KeyRound size={16} />
            <span className="text-sm font-semibold tracking-wide uppercase">Digital Account Legacy</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            How to Pass Passwords to Family After Death
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Standard password managers are built to protect your accounts while you're alive. They fail when you're gone. Here's how to securely transfer your digital life.
          </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
          <h2>The Problem with Standard Password Managers</h2>
          <p>
            If you use LastPass, 1Password, or Bitwarden, you've taken a great step toward securing your digital life. But what happens to your passwords when you die?
          </p>
          <p>
            Standard password managers are designed with a single point of failure: <strong>The Master Password</strong>. If you pass away unexpectedly and your family doesn't know your master password, they are permanently locked out of your email, bank accounts, and crypto exchanges.
          </p>
          <div className="bg-danger/10 border border-danger/20 rounded-xl p-6 my-8 text-danger-foreground">
            <h4 className="flex items-center gap-2 text-danger mt-0 mb-2"><AlertTriangle /> Do not put passwords in your legal will</h4>
            <p className="mb-0">When a will goes through probate, it becomes a public document. Putting your master password or crypto seed phrases in a traditional will means anyone can access your accounts.</p>
          </div>

          <h2>The Solution: Zero-Knowledge Password Inheritance</h2>
          <p>
            To solve this, you need a system that acts as a secure vault while you are alive, and an automated executor when you pass away. 
            <strong> Transfer Legacy</strong> is built exactly for this purpose.
          </p>
          
          <h3>How Transfer Legacy Works:</h3>
          <ol>
            <li><strong>Zero-Knowledge Encryption:</strong> Your passwords and 2FA codes are encrypted locally on your device. We never see them.</li>
            <li><strong>The Guardian Protocol:</strong> You assign trusted individuals (Guardians) who hold fragments of your vault's decryption key using Shamir's Secret Sharing.</li>
            <li><strong>Automated Handover:</strong> Upon your passing, Guardians verify the event. Only then does the vault unlock, providing your heirs with secure, structured access to your passwords.</li>
          </ol>

          <div className="mt-12 p-8 bg-surface/50 border border-border rounded-2xl text-center">
            <h3 className="text-2xl font-bold mt-0 mb-4">Secure your digital life today.</h3>
            <p className="mb-6">Set up your password inheritance vault in under 15 minutes.</p>
            <Link to="/onboarding">
              <Button size="lg" className="glow-blue">
                Start Your Vault <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </article>

        <section className="mt-20 pt-12 border-t border-border">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {JSON.parse(faqSchema).mainEntity.map((faq: any, i: number) => (
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
