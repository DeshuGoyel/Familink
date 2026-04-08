import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type Category = 'security' | 'inheritance' | 'technical' | 'pricing';

const categoryColors: Record<Category, string> = {
  security: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  inheritance: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  technical: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  pricing: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};

const categoryBorder: Record<Category, string> = {
  security: 'border-l-indigo-500',
  inheritance: 'border-l-amber-500',
  technical: 'border-l-purple-500',
  pricing: 'border-l-emerald-500',
};

const faqs: { q: string; a: string; category: Category }[] = [
  {
    category: 'security',
    q: "Can Transfer Legacy employees see my vault?",
    a: "Absolutely not. We use a strict zero-knowledge architecture. Your master password never leaves your browser, meaning we physically cannot decrypt your vault items. We store only mathematically scrambled ciphertext — even if our servers were breached, there's nothing useful to steal."
  },
  {
    category: 'security',
    q: "What happens to my data if Transfer Legacy shuts down?",
    a: "Your vault is encrypted before it ever leaves your device. We also provide a downloadable open-source recovery tool. Even if our servers permanently disappear, your family can run the tool offline and reassemble your legacy using guardian keys."
  },
  {
    category: 'inheritance',
    q: "How does the dead man\'s switch actually work?",
    a: "We monitor your check-ins. If you miss your threshold, you receive escalating warnings via email and SMS. Guardians are then asked to contact you physically. Only after all escalation steps fail does your vault enter Transfer Mode — and that's after a customizable delay you set."
  },
  {
    category: 'inheritance',
    q: "What if I'm still alive but temporarily inactive?",
    a: "Multiple fail-safes are in place. Before any transfer begins, you'll get urgent notifications and guardians will be instructed to attempt contact. The trigger period is fully customizable — anywhere from 7 days to 12 months, and you can check in at any time to reset the clock."
  },
  {
    category: 'inheritance',
    q: "How do my guardians receive my assets?",
    a: "Guardians never receive your actual assets. They each receive unique cryptographic shards. When your vault triggers, they combine their shards on our secure portal — guided step by step — to regenerate the decrypt key and access exactly what you designated for them."
  },
  {
    category: 'technical',
    q: "What cryptocurrencies and assets do you support?",
    a: "Because your vault stores encrypted text, you can protect any asset. We provide optimized templates for BTC, ETH, SOL wallets, hardware wallet seed phrases, exchange accounts, social media credentials, and legal documents."
  },
  {
    category: 'technical',
    q: "How is this different from a hardware wallet backup?",
    a: "Hardware wallets protect against hackers — not against life. If your family doesn't know what a wallet is, doesn't have the PIN, or can't locate the seed phrase, your assets are gone regardless. We ensure the right people get access exactly when needed, with zero technical knowledge required."
  },
  {
    category: 'pricing',
    q: "Is Transfer Legacy legal in my country?",
    a: "We provide an encryption and storage protocol, legal to use globally. Inheritance laws around decrypted digital assets vary by jurisdiction. We recommend storing a digital copy of your formal will alongside your assets."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 bg-[#0A0D18]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-5">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F0F6FC] mb-4">
            Real questions from real people.
          </h2>
          <p className="text-[#8B949E] text-lg">No marketing fluff — just honest answers.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className={`bg-[#0D1117] border border-l-4 transition-colors duration-300 rounded-2xl overflow-hidden ${
                  isOpen
                    ? `border-white/10 ${categoryBorder[faq.category]}`
                    : 'border-white/5 border-l-white/10 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-start justify-between p-6 text-left gap-4"
                >
                  <div className="flex items-start gap-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border whitespace-nowrap mt-0.5 ${categoryColors[faq.category]}`}>
                      {faq.category}
                    </span>
                    <span className="text-base font-semibold text-[#F0F6FC] leading-snug">{faq.q}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-[#8B949E] transition-transform duration-300 flex-shrink-0 mt-1 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-[#8B949E] leading-relaxed text-sm ml-[calc(theme(spacing.4)+52px)]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
