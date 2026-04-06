import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "What happens to my data if Transfer Legacy shuts down?",
    a: "Your vault is encrypted before it ever leaves your device. Additionally, we provide an open-source local recovery tool you can download right now. Even if our servers permanently disappear, your family can still run the recovery tool offline and perfectly reassemble your legacy using their guardian keys."
  },
  {
    q: "Can Transfer Legacy employees see my vault?",
    a: "Absolutely not. We use a strict zero-knowledge architecture. Your master password never leaves your browser, meaning we physically cannot decrypt your vault items. We store only mathematically scrambled ciphertext."
  },
  {
    q: "How does the dead man's switch actually work?",
    a: "We monitor your activity through check-ins, app usage, and optional integrations (like your calendar or social activity). If you miss your check-in thresholds and don't respond to warning prompts, your vault enters 'Transfer Mode' automatically."
  },
  {
    q: "What cryptocurrencies and assets do you support?",
    a: "Because your vault stores encrypted text, you can secure absolutely any asset. We provide optimized templates for BTC, ETH, and SOL wallets, comprehensive seed phrase backups, passwords to centralized exchanges, and legal legacy documents."
  },
  {
    q: "What if I'm still alive but temporarily inactive?",
    a: "We have fail-safes. Before your vault initiates any transfer, you will receive multiple urgent notifications via email and SMS. Your guardians will also be instructed to attempt physical contact with you. The trigger period is entirely customizable, up to 12 months."
  },
  {
    q: "How do my guardians receive my assets?",
    a: "Guardians never receive your exact assets directly. Instead, they receive unique cryptographic 'shards'. When your vault triggers, they come together on our portal and combine their shards to recreate your decrypt key, guided by our automated process."
  },
  {
    q: "Is Transfer Legacy legal in my country?",
    a: "We provide an encryption protocol and storage mechanism, which is legal to use globally. However, inheritance laws surrounding your decrypted digital assets vary by jurisdiction. We recommend storing a digital copy of your formal will alongside your assets."
  },
  {
    q: "How is this different from a hardware wallet backup?",
    a: "Hardware wallets protect against hackers, but they don't protect against life. If you lose your metal phrase plate, or your family doesn't know the PIN or even what a wallet is, your crypto is permanently lost. We ensure the right people get access exactly when needed, with zero technical expertise."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 bg-[#0D1117]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F0F6FC] mb-5">
            Everything You Need to Know
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`bg-[#020409] border transition-colors duration-300 rounded-2xl overflow-hidden ${
                  isOpen ? 'border-indigo-500/40' : 'border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-bold text-[#F0F6FC] pr-8">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-[#8B949E] transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-[#8B949E] leading-relaxed text-base">
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
