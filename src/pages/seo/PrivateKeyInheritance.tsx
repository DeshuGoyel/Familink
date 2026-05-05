import React from 'react';
import SEO from '../../components/seo/SEO';
import { ArrowRight, Lock, Key, ShieldCheck, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivateKeyInheritance = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you pass down a private key?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The only secure way to pass down a private key is to use a decentralized, encrypted vault with a Dead Man's Switch, like Transfer Legacy. This ensures the key remains secret while you are alive, but is automatically transferred to your heirs if you pass away."
        }
      },
      {
        "@type": "Question",
        "name": "Can a crypto exchange recover my private key?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. If you hold crypto in a self-custody wallet (where you control the private key), no exchange, company, or government can recover it for you or your family if the key is lost."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to email my private key to my family?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely not. Standard email is not end-to-end encrypted. Hackers routinely scan email accounts for strings of characters that look like private keys. If you email it, you risk having your wallet drained immediately."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pt-24 pb-16">
      <SEO 
        title="Private Key Inheritance: Securely Passing Crypto to Family"
        description="Don't let your crypto die with you. Learn how to securely pass down your Bitcoin and crypto private keys to your family using a zero-knowledge vault."
        canonical="https://transferlegacy.com/private-key-inheritance"
        schema={faqSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full mb-6">
            <Lock className="w-5 h-5" />
            <span className="font-semibold tracking-wide uppercase text-sm">Advanced Security Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Private Key Inheritance
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Not your keys, not your coins. But if your family doesn't get your keys, those coins are gone forever.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full transition duration-300"
          >
            Secure Your Private Keys Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Content Section */}
        <div className="prose prose-invert prose-lg max-w-none">
          
          <h2 className="flex items-center text-3xl font-bold mt-12 mb-6">
            <Key className="w-8 h-8 mr-3 text-indigo-500" />
            Understanding the Private Key
          </h2>
          <p>
            In cryptocurrency, a private key is a highly complex alphanumeric string that grants the holder absolute control over the funds associated with it on the blockchain. Unlike a password to a bank account, a private key <strong>is</strong> the money. 
          </p>
          <p>
            Because of this absolute power, planning for the inheritance of private keys requires an entirely different security paradigm than traditional estate planning.
          </p>

          <div className="bg-indigo-900/30 border-l-4 border-indigo-500 p-6 rounded-r-xl my-8">
            <h3 className="flex items-center text-xl font-bold text-indigo-400 mb-3 mt-0">
              The Fundamental Dilemma
            </h3>
            <p className="text-gray-300 mb-0">
              You must ensure your family gets the key when you die, but you must simultaneously ensure that <strong>no one else</strong> (including your family, hackers, or lawyers) can access the key while you are alive.
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Why Physical Methods Are Flawed</h2>
          <p>
            Engraving private keys on steel plates or writing them on paper and hiding them in a safe deposit box is common, but deeply flawed for inheritance:
          </p>
          <ul>
            <li><strong>Single Point of Failure:</strong> If the house burns down, or the bank is compromised, the key is gone.</li>
            <li><strong>Probate Delays:</strong> A safe deposit box gets sealed upon your death. Your heirs will need a court order to open it, which takes months. By the time they get the key, the crypto market could have crashed.</li>
            <li><strong>Zero Context:</strong> A non-technical spouse finding a metal plate with random letters has no idea what to do with it, making them highly susceptible to scammers who offer to "help."</li>
          </ul>

          <h2 className="flex items-center text-3xl font-bold mt-12 mb-6">
            <Database className="w-8 h-8 mr-3 text-indigo-500" />
            The Digital Vault Strategy
          </h2>
          <p>
            Transfer Legacy solves the fundamental dilemma using a <strong>Zero-Knowledge Dead Man's Switch</strong>.
          </p>
          <ol>
            <li><strong>Absolute Secrecy During Life:</strong> You input your private keys into Transfer Legacy. The data is encrypted on your device. We store the ciphertext. Even if Transfer Legacy were hacked, the attacker would only get meaningless scrambled data.</li>
            <li><strong>Automated Verification:</strong> The system monitors your well-being. If you do not respond to a sequence of check-ins over a period you define, the system assumes you have passed away.</li>
            <li><strong>Secure Delivery with Instructions:</strong> The system automatically releases the decryption keys to your pre-assigned heirs. Crucially, you can attach video messages or plain-text guides explaining exactly how to sweep the private key into a new wallet, ensuring they don't get scammed.</li>
          </ol>

          {/* CTA Section */}
          <div className="bg-gray-800/50 rounded-2xl p-8 mt-12 border border-gray-700 text-center">
            <h3 className="text-2xl font-bold mb-4">Don't Take Your Wealth to the Grave</h3>
            <p className="text-gray-300 mb-6">
              Ensure your private keys are seamlessly and securely transferred to the people who matter most.
            </p>
            <Link 
              to="/"
              className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Encrypt Your Private Keys
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateKeyInheritance;
