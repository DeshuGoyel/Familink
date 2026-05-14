import React from 'react';
import SEO from '../../../components/seo/SEO';
import { ArrowRight, FileText, Globe2, ShieldCheck, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

const DigitalWillIndia = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is a digital will valid in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Currently, under the Indian Succession Act, 1925, a traditional will must be in writing and physically signed by the testator and two witnesses. While purely electronic wills are not explicitly recognized for traditional assets, digital platforms like Transfer Legacy are essential for securely storing digital assets (like crypto and passwords) and can act in tandem with a physical will to ensure complete estate transfer."
        }
      },
      {
        "@type": "Question",
        "name": "How do I pass on digital assets in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To pass on digital assets in India, you should mention them in your physical will, but never include passwords or seed phrases in the public document. Use a secure zero-knowledge vault like Transfer Legacy to store the credentials, and reference the vault in your legal will."
        }
      },
      {
        "@type": "Question",
        "name": "What happens to my online accounts when I die in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Without a digital legacy plan, your online accounts (social media, emails, financial platforms) become inaccessible. Indian law does not grant automatic access to heirs for digital platforms, meaning families often face permanent lockout unless they have the credentials stored via a service like Transfer Legacy."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pt-24 pb-16">
      <SEO 
        title="Digital Will in India: How to Plan Your Digital Estate (2024)"
        description="Learn how to create a digital will in India. Secure your online accounts, digital assets, and crypto with a legally sound estate plan using Transfer Legacy."
        canonical="https://transferlegacy.com/digital-will-india"
        schema={faqSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full mb-6">
            <Globe2 className="w-5 h-5" />
            <span className="font-semibold tracking-wide uppercase text-sm">India Jurisdiction Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Creating a Digital Will in India: The Complete Guide
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            From social media to cryptocurrency, ensure your digital footprint is securely managed and transferred to your Indian heirs.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full transition duration-300"
          >
            Start Your Digital Estate Plan
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Content Section */}
        <div className="prose prose-invert prose-lg max-w-none">
          
          <h2 className="flex items-center text-3xl font-bold mt-12 mb-6">
            <FileText className="w-8 h-8 mr-3 text-purple-500" />
            Why You Need a Digital Will in India
          </h2>
          <p>
            We live our lives online. We hold bank accounts, mutual funds, cryptocurrency (like Bitcoin on CoinDCX or WazirX), social media profiles, and cloud storage filled with family photos. Yet, the traditional Indian approach to estate planning almost entirely ignores these digital assets.
          </p>
          <p>
            When a person passes away in India without a digital estate plan, their family is locked out. Tech companies based in the US or elsewhere will not easily hand over data to Indian heirs without protracted, expensive legal battles. A "Digital Will" strategy is no longer optional; it is a necessity.
          </p>

          <h2 className="flex items-center text-3xl font-bold mt-12 mb-6">
            <Scale className="w-8 h-8 mr-3 text-purple-500" />
            The Legal Status of Digital Wills in India
          </h2>
          <p>
            It is critical to understand the current legal framework in India regarding wills under the <strong>Indian Succession Act, 1925</strong>.
          </p>
          <ul>
            <li><strong>Physical Signatures are Required:</strong> Currently, a legally valid will in India must be in writing and physically signed by the testator in the presence of two witnesses. Purely electronic or video wills are not granted full legal standing for property transfer.</li>
            <li><strong>Digital Assets are Property:</strong> However, the assets themselves—your crypto, domain names, and digital content—are recognized as property and can be bequeathed.</li>
          </ul>

          <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-500 p-6 rounded-r-xl my-8">
            <h3 className="flex items-center text-xl font-bold text-purple-400 mb-3 mt-0">
              <ShieldCheck className="w-6 h-6 mr-2" />
              The Best Practice Strategy for Indians
            </h3>
            <p className="text-gray-300 mb-0">
              The recommended approach is a hybrid model. Create a traditional, legally compliant physical will that mentions the existence of your digital assets. Then, use a secure platform like <strong>Transfer Legacy</strong> to actually hold the passwords, seed phrases, and specific instructions, referencing this vault in your physical will.
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Danger of Putting Passwords in a Paper Will</h2>
          <p>
            A common mistake is writing down cryptocurrency seed phrases, UPI PINs, or email passwords directly into a physical will. 
          </p>
          <p>
            In India, when a will is executed, it often requires <em>Probate</em> (mandatory in presidency towns like Mumbai, Kolkata, and Chennai). During probate, the will becomes a <strong>public document</strong>. Anyone can access it. If your passwords are in it, your assets can be stolen before your heirs receive them.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">How Transfer Legacy Solves the Problem</h2>
          <p>
            Transfer Legacy is the bridge between traditional Indian succession law and modern digital reality:
          </p>
          <ol>
            <li><strong>Zero-Knowledge Security:</strong> You store all your sensitive digital access information in our encrypted vault. We cannot see your data.</li>
            <li><strong>Automated Distribution:</strong> Upon your passing (verified via our Dead Man's Switch protocol), the information is automatically and securely released to your chosen heirs in India.</li>
            <li><strong>Total Privacy:</strong> Your digital wealth and access credentials completely bypass the public probate process, maintaining your family's privacy and security.</li>
          </ol>

          {/* CTA Section */}
          <div className="bg-gray-800/50 rounded-2xl p-8 mt-12 border border-gray-700 text-center">
            <h3 className="text-2xl font-bold mb-4">Protect Your Digital Footprint Today</h3>
            <p className="text-gray-300 mb-6">
              Don't leave your family dealing with inaccessible accounts and lost crypto. Use Transfer Legacy to securely pass on your digital life.
            </p>
            <Link 
              to="/"
              className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Secure Your Digital Legacy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalWillIndia;
