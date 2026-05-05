import React from 'react';
import SEO from '../../components/seo/SEO';
import { ArrowRight, Key, Shield, AlertTriangle, FileLock2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SeedPhraseInheritance = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I safely store a seed phrase for inheritance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The safest method is using a zero-knowledge encrypted vault like Transfer Legacy. Storing seed phrases on paper in a safe deposit box is vulnerable to fire, theft, and probate delays. Transfer Legacy encrypts the phrase and uses a Dead Man's Switch to release it only upon your verified passing."
        }
      },
      {
        "@type": "Question",
        "name": "Should I split my seed phrase among family members?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Splitting a seed phrase (e.g., giving 12 words to one person and 12 to another) is a dangerous DIY method known as Shamir's Secret Sharing. If one person loses their piece, the entire wallet is unrecoverable. It's better to use an automated, secure platform."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if my family loses my seed phrase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If your family loses your 12 or 24-word seed phrase, and you have passed away, the cryptocurrency in that wallet is permanently lost. There is no customer support, bank, or government agency that can retrieve it."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pt-24 pb-16">
      <SEO 
        title="Seed Phrase Inheritance: How to Securely Pass on Crypto (2024)"
        description="Learn the only secure way to pass down your 12 or 24-word seed phrase to your heirs without risking theft or permanent loss. Secure your legacy today."
        canonical="https://transferlegacy.com/seed-phrase-inheritance"
        schema={faqSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full mb-6">
            <Key className="w-5 h-5" />
            <span className="font-semibold tracking-wide uppercase text-sm">Security Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Seed Phrase Inheritance Strategy
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Your seed phrase is the master key to your entire crypto wealth. If you don't secure its transfer, your family inherits nothing.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-full transition duration-300"
          >
            Encrypt Your Seed Phrase Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Content Section */}
        <div className="prose prose-invert prose-lg max-w-none">
          
          <h2 className="flex items-center text-3xl font-bold mt-12 mb-6">
            <Shield className="w-8 h-8 mr-3 text-yellow-500" />
            The Master Key to Your Wealth
          </h2>
          <p>
            Whether you use a Ledger, Trezor, MetaMask, or Trust Wallet, your 12 or 24-word seed phrase (or recovery phrase) is the ultimate master key to your funds. The physical hardware wallet can be destroyed, but as long as someone has the seed phrase, they have the crypto.
          </p>
          <p>
            This ultimate power is exactly why seed phrase inheritance is the most critical and dangerous part of estate planning.
          </p>

          <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-500 p-6 rounded-r-xl my-8">
            <h3 className="flex items-center text-xl font-bold text-yellow-500 mb-3 mt-0">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Why Paper Backup Fails
            </h3>
            <p className="text-gray-300 mb-0">
              Writing your seed phrase on a piece of paper and hiding it in a book or a safe is a recipe for disaster. Family members routinely throw away "useless" paper when clearing estates. If they don't know what it is, it goes in the trash.
            </p>
          </div>

          <h2 className="flex items-center text-3xl font-bold mt-12 mb-6">
            <FileLock2 className="w-8 h-8 mr-3 text-yellow-500" />
            The Risks of DIY Methods
          </h2>
          <p>
            Crypto investors often try to create their own inheritance protocols. These almost always end poorly:
          </p>
          <ul>
            <li><strong>Splitting the Phrase:</strong> Giving half the words to your spouse and half to your brother. If one loses their half, the money is gone.</li>
            <li><strong>The Lawyer's Safe:</strong> Giving the phrase to a lawyer introduces massive counterparty risk. The lawyer's office could be burglarized, or a rogue employee could empty the wallet.</li>
            <li><strong>Putting it in a Will:</strong> <strong>Never do this.</strong> Wills become public documents. Anyone can read your will and steal your crypto.</li>
          </ul>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Transfer Legacy Protocol</h2>
          <p>
            Transfer Legacy is engineered specifically to solve the seed phrase dilemma using military-grade encryption and an automated Dead Man's Switch.
          </p>
          <ol>
            <li><strong>Zero-Knowledge Encryption:</strong> You input your seed phrase into your Transfer Legacy vault. It is immediately encrypted using a key derived from your master password. Transfer Legacy servers only store the encrypted ciphertext. We cannot read your seed phrase.</li>
            <li><strong>The Dead Man's Switch:</strong> The system pings you periodically (via email/SMS). As long as you are alive and respond, the vault stays locked.</li>
            <li><strong>Secure Release:</strong> If you pass away and fail to respond to the escalating alerts, the system decrypts and routes the seed phrase directly to the email addresses of the heirs you designated, along with your plain-English instructions on how to use it.</li>
          </ol>

          {/* CTA Section */}
          <div className="bg-gray-800/50 rounded-2xl p-8 mt-12 border border-gray-700 text-center">
            <h3 className="text-2xl font-bold mb-4">Don't Trust Paper with Your Wealth</h3>
            <p className="text-gray-300 mb-6">
              Ensure your seed phrase is securely and automatically delivered to your heirs. Protect your legacy today.
            </p>
            <Link 
              to="/"
              className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Start Your Transfer Legacy Vault
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedPhraseInheritance;
