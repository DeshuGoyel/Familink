import React from 'react';
import SEO from '../../components/seo/SEO';
import { BookOpen, Globe2, ShieldCheck, Scale, Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResourcesHub = () => {
  const resourceCategories = [
    {
      title: "Core Estate Planning",
      icon: <BookOpen className="w-6 h-6 text-blue-400" />,
      color: "bg-blue-500/10 border-blue-500/20",
      links: [
        { name: "The Ultimate Crypto Inheritance Guide", path: "/crypto-inheritance" },
        { name: "How to Create a Digital Will", path: "/digital-will" },
        { name: "What Happens to Crypto When You Die?", path: "/what-happens-to-crypto-when-you-die" },
        { name: "Secure Document Storage for Families", path: "/store-important-documents-for-family" }
      ]
    },
    {
      title: "Technical Inheritance Guides",
      icon: <ShieldCheck className="w-6 h-6 text-yellow-400" />,
      color: "bg-yellow-500/10 border-yellow-500/20",
      links: [
        { name: "Seed Phrase Inheritance Strategy", path: "/seed-phrase-inheritance" },
        { name: "Private Key Inheritance", path: "/private-key-inheritance" },
        { name: "How to Pass Bitcoin to Family", path: "/how-to-pass-bitcoin-to-family" },
        { name: "Transferring Crypto Wallets After Death", path: "/transfer-crypto-wallet-to-family" },
        { name: "Password Inheritance Guide", path: "/password-inheritance" }
      ]
    },
    {
      title: "Global Jurisdictions",
      icon: <Globe2 className="w-6 h-6 text-emerald-400" />,
      color: "bg-emerald-500/10 border-emerald-500/20",
      links: [
        { name: "Crypto Inheritance in India", path: "/crypto-inheritance-india" },
        { name: "Digital Wills in India", path: "/digital-will-india" },
        { name: "Bitcoin Estate Planning in the USA", path: "/crypto-inheritance-usa" },
        { name: "Digital Asset Laws (RUFADAA) USA", path: "/digital-asset-inheritance-usa" },
        { name: "Crypto Inheritance in the UK", path: "/crypto-inheritance-uk" },
        { name: "DIFC Digital Assets Law (UAE)", path: "/crypto-inheritance-uae" }
      ]
    },
    {
      title: "Comparisons & Tools",
      icon: <Scale className="w-6 h-6 text-purple-400" />,
      color: "bg-purple-500/10 border-purple-500/20",
      links: [
        { name: "Transfer Legacy vs. DGLegacy", path: "/transfer-legacy-vs-dglegacy" },
        { name: "Transfer Legacy vs. Inheriti", path: "/transfer-legacy-vs-inheriti" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pt-24 pb-16">
      <SEO 
        title="Digital Estate Planning Resources & Guides | Transfer Legacy"
        description="Explore our comprehensive library of guides on cryptocurrency inheritance, digital wills, seed phrase security, and global digital asset laws."
        canonical="https://transferlegacy.com/resources"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Resource Hub
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about securing your digital legacy, from global laws to technical execution.
          </p>
        </div>

        {/* Featured Tool */}
        <div className="mb-16">
          <Link 
            to="/crypto-inheritance-calculator"
            className="block bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-colors group"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="bg-blue-500/20 p-4 rounded-xl mr-6">
                  <Calculator className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    Crypto Inheritance Risk Calculator
                  </h2>
                  <p className="text-gray-400">
                    Find out the statistical risk of your family losing access to your portfolio.
                  </p>
                </div>
              </div>
              <div className="flex items-center text-blue-400 font-semibold">
                Try the Calculator <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resourceCategories.map((category, index) => (
            <div key={index} className={`border rounded-2xl p-8 ${category.color}`}>
              <div className="flex items-center mb-6">
                {category.icon}
                <h2 className="text-2xl font-bold ml-3">{category.title}</h2>
              </div>
              <ul className="space-y-4">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path}
                      className="text-gray-300 hover:text-white flex items-center group transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 text-gray-600 group-hover:text-blue-400 transition-colors" />
                      <span className="group-hover:underline">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ResourcesHub;
