import React from 'react';
import SEO from '../../../components/seo/SEO';
import { ArrowRight, Globe2, Landmark, ShieldCheck, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const CryptoInheritanceUK = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is cryptocurrency recognized as property in the UK?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, following the UK Law Commission's recommendations, digital assets and cryptocurrency are increasingly recognized as a distinct third category of personal property, making them fully capable of being inherited under English and Welsh law."
        }
      },
      {
        "@type": "Question",
        "name": "How is inherited crypto taxed by HMRC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In the UK, cryptocurrency forms part of your estate for Inheritance Tax (IHT) purposes. If your total estate exceeds the nil-rate band, IHT may be due. Additionally, when the beneficiary eventually sells the crypto, they may be liable for Capital Gains Tax (CGT) based on the value increase from the date of inheritance."
        }
      },
      {
        "@type": "Question",
        "name": "Can I leave my Bitcoin to someone in my UK will?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can and should mention digital assets in your UK will. However, for security reasons, you must never write your private keys or seed phrases into the will document itself. Use a secure digital vault like Transfer Legacy to store the access credentials."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pt-24 pb-16">
      <SEO 
        title="Digital Asset Inheritance UK: Crypto Estate Planning Guide"
        description="Navigate cryptocurrency and digital asset inheritance in the UK. Understand HMRC tax rules, UK Law Commission property rights, and how to secure your Bitcoin."
        canonical="https://transferlegacy.com/crypto-inheritance-uk"
        schema={faqSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full mb-6">
            <Globe2 className="w-5 h-5" />
            <span className="font-semibold tracking-wide uppercase text-sm">United Kingdom Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Digital Asset Inheritance in the UK
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            A complete guide to passing on cryptocurrency, NFTs, and digital accounts under English and Welsh law. Protect your assets from HMRC complications and permanent loss.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition duration-300"
          >
            Secure Your UK Digital Estate
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Content Section */}
        <div className="prose prose-invert prose-lg max-w-none">
          
          <h2 className="flex items-center text-3xl font-bold mt-12 mb-6">
            <Landmark className="w-8 h-8 mr-3 text-red-500" />
            The Evolving Legal Status of Crypto in the UK
          </h2>
          <p>
            For years, the legal status of digital assets under English common law was ambiguous. Traditional property law recognized only two categories: "things in possession" (physical objects) and "things in action" (legal rights, like debts). Cryptocurrency didn't neatly fit either.
          </p>
          <p>
            However, following a landmark review by the <strong>UK Law Commission</strong>, digital assets are now widely recognized as a "third category" of personal property. This cements the legal reality that your Bitcoin, Ethereum, and digital accounts form a tangible part of your estate and can be legally transferred to your beneficiaries upon your death.
          </p>

          <h2 className="flex items-center text-3xl font-bold mt-12 mb-6">
            <Scale className="w-8 h-8 mr-3 text-red-500" />
            HMRC and Inheritance Tax (IHT) on Crypto
          </h2>
          <p>
            Because cryptocurrency is recognized as property, HMRC treats it identically to other assets when it comes to estate taxation.
          </p>
          <ul>
            <li><strong>Inheritance Tax (IHT):</strong> The value of your cryptocurrency at the time of your death will be added to your total estate. If your estate exceeds the standard nil-rate band (currently £325,000), the excess may be subject to a 40% inheritance tax.</li>
            <li><strong>Location of Assets:</strong> HMRC generally considers the location of the crypto to be the residency of the beneficial owner. If you are a UK resident, your global crypto holdings are subject to UK IHT.</li>
            <li><strong>Capital Gains Tax (CGT):</strong> Your beneficiaries acquire the crypto at its market value on the date of your death. If they later sell it for a profit, they will owe CGT on the gain from that inherited value.</li>
          </ul>

          <div className="bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500 p-6 rounded-r-xl my-8">
            <h3 className="flex items-center text-xl font-bold text-red-400 mb-3 mt-0">
              <ShieldCheck className="w-6 h-6 mr-2" />
              The Danger of HMRC Probate
            </h3>
            <p className="text-gray-300 mb-0">
              If your family knows you had crypto, the executor must report its value to HMRC. If they cannot actually access the wallet because they lack the seed phrase, the estate could owe a 40% tax bill on funds they cannot touch or sell to cover the tax. This is a financial disaster for beneficiaries.
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">How to Bequeath Crypto in the UK</h2>
          <p>
            Updating your UK will to include digital assets is the first step, but how you handle the execution is critical.
          </p>
          <p>
            <strong>The Wrong Way:</strong> Writing your 24-word Ledger seed phrase into your paper will. In the UK, once a Grant of Probate is issued, a will becomes a public document. Anyone can order a copy online for £1.50 and drain your wallet.
          </p>
          <p>
            <strong>The Right Way:</strong> Use <strong>Transfer Legacy</strong>.
          </p>

          <h2 className="flex items-center text-3xl font-bold mt-12 mb-6">
            <Cpu className="w-8 h-8 mr-3 text-red-500" />
            The Transfer Legacy Solution for UK Residents
          </h2>
          <p>
            Transfer Legacy provides the essential technical layer to complement your legal UK will.
          </p>
          <ol>
            <li><strong>Zero-Knowledge Storage:</strong> You encrypt your seed phrases, passwords, and exchange instructions in our vault. We have no access to the data.</li>
            <li><strong>Legal Reference:</strong> In your physical will, you simply state that your digital assets are managed via Transfer Legacy, keeping the sensitive credentials entirely private and out of public probate records.</li>
            <li><strong>Automated Execution:</strong> Our Dead Man's Switch protocol detects your passing and securely transmits the decrypted credentials directly to your chosen beneficiaries or executor, ensuring they have the access they need to settle the estate and pay any HMRC obligations.</li>
          </ol>

          {/* CTA Section */}
          <div className="bg-gray-800/50 rounded-2xl p-8 mt-12 border border-gray-700 text-center">
            <h3 className="text-2xl font-bold mb-4">Don't Let HMRC Complicate Your Crypto Legacy</h3>
            <p className="text-gray-300 mb-6">
              Ensure your digital assets are securely transferred and your beneficiaries have full access to manage their tax liabilities.
            </p>
            <Link 
              to="/"
              className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Start Your Digital Estate Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoInheritanceUK;
