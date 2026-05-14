import React from 'react';
import SEO from '../../components/seo/SEO';
import { ArrowRight, Bitcoin, Shield, Lock, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const PassBitcoinToFamily = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I safely leave my Bitcoin to my family?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The safest way is to use a secure, zero-knowledge vault like Transfer Legacy. You encrypt your 12 or 24-word seed phrase in the vault and set up a Dead Man's Switch. If something happens to you, the system automatically releases the encrypted instructions to your family, ensuring they get the Bitcoin without you having to expose the keys during your lifetime."
        }
      },
      {
        "@type": "Question",
        "name": "Can I put my Bitcoin seed phrase in my will?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, this is highly dangerous. A will eventually becomes a public document during the probate process. Anyone who reads the will can see your seed phrase and steal your Bitcoin. You should mention your Bitcoin in your will, but store the actual seed phrase in Transfer Legacy."
        }
      },
      {
        "@type": "Question",
        "name": "What happens to Bitcoin if the owner dies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If the owner dies without sharing their private keys or seed phrase, the Bitcoin remains on the blockchain forever but becomes permanently inaccessible. It is estimated that millions of Bitcoins are lost this way."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pt-24 pb-16">
      <SEO 
        title="How to Pass Bitcoin to Your Family: The Ultimate Guide (2024)"
        description="Learn the safest way to pass Bitcoin to your family. Avoid probate risks, lost seed phrases, and secure your digital wealth with Transfer Legacy."
        canonical="https://transferlegacy.com/how-to-pass-bitcoin-to-family"
        schema={faqSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full mb-6">
            <Bitcoin className="w-5 h-5" />
            <span className="font-semibold tracking-wide uppercase text-sm">Bitcoin Legacy Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            How to Pass Bitcoin to Your Family
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            The Bitcoin network doesn't have a customer service department. If you don't secure your succession plan, your family gets nothing.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-full transition duration-300"
          >
            Protect Your Bitcoin Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Content Section */}
        <div className="prose prose-invert prose-lg max-w-none">
          
          <h2 className="flex items-center text-3xl font-bold mt-12 mb-6">
            <Shield className="w-8 h-8 mr-3 text-orange-500" />
            The $100 Billion Problem
          </h2>
          <p>
            It is estimated that over 20% of all Bitcoin mined—worth hundreds of billions of dollars—is permanently lost. A significant portion of this loss is due to individuals passing away without a secure method of transferring their private keys or seed phrases to their heirs.
          </p>
          <p>
            Bitcoin was designed to be decentralized and censorship-resistant. This makes it the hardest money on earth, but it also means there is no "forgot password" button.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">Why Traditional Estate Planning Fails Bitcoin</h2>
          <p>
            You might think your lawyer can handle this. They usually can't. Here is why the standard approaches fail:
          </p>
          <ul>
            <li><strong>Writing it in a Will:</strong> In most jurisdictions, a will becomes a public document during probate. Writing your 12-word seed phrase on a public document guarantees your Bitcoin will be stolen.</li>
            <li><strong>Telling a Spouse:</strong> Giving the seed phrase directly to a non-technical spouse often results in lost paper, accidental exposure, or phishing attacks.</li>
            <li><strong>Bank Safe Deposit Box:</strong> If the bank catches fire, gets robbed, or authorities seize the box, your family loses the Bitcoin. Furthermore, accessing a safe deposit box after death requires a court order, which can take months.</li>
          </ul>

          <div className="bg-gradient-to-r from-orange-500/10 to-transparent border-l-4 border-orange-500 p-6 rounded-r-xl my-8">
            <h3 className="flex items-center text-xl font-bold text-orange-400 mb-3 mt-0">
              <Lock className="w-6 h-6 mr-2" />
              The Only Secure Way: The Dead Man's Switch
            </h3>
            <p className="text-gray-300 mb-0">
              You must maintain absolute control of your keys while you are alive, but ensure they are automatically and securely delivered to your family the moment you are gone. This requires an automated protocol, not a piece of paper.
            </p>
          </div>

          <h2 className="flex items-center text-3xl font-bold mt-12 mb-6">
            <Activity className="w-8 h-8 mr-3 text-orange-500" />
            How Transfer Legacy Solves Bitcoin Inheritance
          </h2>
          <p>
            Transfer Legacy provides a trustless, zero-knowledge vault specifically designed for passing down Bitcoin and other digital assets.
          </p>
          <ol>
            <li><strong>You Encrypt Your Data:</strong> You enter your seed phrase, hardware wallet PINs, and step-by-step recovery instructions. This data is encrypted locally on your device before it ever reaches our servers. Transfer Legacy cannot read it.</li>
            <li><strong>The Pulse Check:</strong> Our system acts as a Dead Man's Switch. It periodically checks in with you (via email, SMS, or app notification).</li>
            <li><strong>Automated Release:</strong> If you fail to respond to a series of escalating alerts over a pre-defined period (or if your "Guardian" confirms your passing), the encrypted vault is securely unlocked and the instructions are sent directly to your designated family members.</li>
          </ol>

          {/* CTA Section */}
          <div className="bg-gray-800/50 rounded-2xl p-8 mt-12 border border-gray-700 text-center">
            <h3 className="text-2xl font-bold mb-4">Don't Take Your Bitcoin to the Grave</h3>
            <p className="text-gray-300 mb-6">
              Set up your zero-knowledge Bitcoin inheritance plan today and ensure your family benefits from your foresight.
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

export default PassBitcoinToFamily;
