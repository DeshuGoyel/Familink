import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type Category = 'security' | 'inheritance' | 'technical' | 'pricing';

const categoryStyle: Record<Category, { fg: string; bg: string; border: string; barColor: string }> = {
  security:    { fg: '#818cf8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.2)', barColor: '#818cf8' },
  inheritance: { fg: '#fb923c', bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.2)',  barColor: '#fb923c' },
  technical:   { fg: '#c084fc', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.2)', barColor: '#c084fc' },
  pricing:     { fg: '#34d399', bg: 'rgba(52,211,153,0.08)',  border: 'rgba(52,211,153,0.2)',  barColor: '#34d399' },
};

const faqs: { q: string; a: string; category: Category }[] = [
  { category: 'security', q: 'Can Transfer Legacy employees see my vault?',
    a: "Absolutely not. We use a strict zero-knowledge architecture. Your master password never leaves your browser, meaning we physically cannot decrypt your vault items. We store only mathematically scrambled ciphertext — even if our servers were breached, there's nothing useful to steal." },
  { category: 'security', q: 'What happens to my data if Transfer Legacy shuts down?',
    a: "Your vault is encrypted before it ever leaves your device. We also provide a downloadable open-source recovery tool. Even if our servers permanently disappear, your family can run the tool offline and reassemble your legacy using guardian keys." },
  { category: 'inheritance', q: "How does the dead man's switch actually work?",
    a: "We monitor your check-ins. If you miss your threshold, you receive escalating warnings via email and SMS. Guardians are then asked to contact you physically. Only after all escalation steps fail does your vault enter Transfer Mode — and that's after a customizable delay you set." },
  { category: 'inheritance', q: "What if I'm still alive but temporarily inactive?",
    a: "Multiple fail-safes are in place. Before any transfer begins, you'll get urgent notifications and guardians will be instructed to attempt contact. The trigger period is fully customizable — anywhere from 7 days to 12 months, and you can check in at any time to reset the clock." },
  { category: 'inheritance', q: 'How do my guardians receive my assets?',
    a: "Guardians never receive your actual assets. They each receive unique cryptographic shards. When your vault triggers, they combine their shards on our secure portal — guided step by step — to regenerate the decrypt key and access exactly what you designated for them." },
  { category: 'technical', q: 'What cryptocurrencies and assets do you support?',
    a: "Because your vault stores encrypted text, you can protect any asset. We provide optimized templates for BTC, ETH, SOL wallets, hardware wallet seed phrases, exchange accounts, social media credentials, and legal documents." },
  { category: 'technical', q: 'How is this different from a hardware wallet backup?',
    a: "Hardware wallets protect against hackers — not against life. If your family doesn't know what a wallet is, doesn't have the PIN, or can't locate the seed phrase, your assets are gone regardless. We ensure the right people get access exactly when needed, with zero technical knowledge required." },
  { category: 'pricing', q: 'Is Transfer Legacy legal in my country?',
    a: "We provide an encryption and storage protocol, legal to use globally. Inheritance laws around decrypted digital assets vary by jurisdiction. We recommend storing a digital copy of your formal will alongside your assets." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 overflow-hidden" style={{ background: '#090B14' }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.4), transparent)' }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p
            className="text-xs font-bold tracking-[0.22em] uppercase mb-5"
            style={{
              background: 'linear-gradient(135deg, #c084fc, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Real questions from real people.
          </h2>
          <p className="text-white/40 text-lg">No marketing fluff — just honest answers.</p>
        </motion.div>

        <div className="space-y-2.5">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const style = categoryStyle[faq.category];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="rounded-2xl border overflow-hidden transition-all duration-300"
                style={{
                  background: '#131722',
                  borderColor: isOpen ? style.border : 'rgba(255,255,255,0.06)',
                  borderLeftWidth: '3px',
                  borderLeftColor: isOpen ? style.barColor : 'rgba(255,255,255,0.06)',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-start justify-between p-6 text-left gap-4"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border whitespace-nowrap mt-0.5 flex-shrink-0"
                      style={{ color: style.fg, background: style.bg, borderColor: style.border }}
                    >
                      {faq.category}
                    </span>
                    <span className="text-[15px] font-semibold text-white leading-snug">{faq.q}</span>
                  </div>
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 mt-0.5"
                    style={isOpen ? { background: style.bg, border: `1px solid ${style.border}` } : { background: 'rgba(255,255,255,0.04)' }}
                  >
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      style={{ color: isOpen ? style.fg : 'rgba(255,255,255,0.3)' }}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                    >
                      <div className="px-6 pb-6 text-sm text-white/40 leading-relaxed" style={{ paddingLeft: 'calc(1.5rem + 56px)' }}>
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
