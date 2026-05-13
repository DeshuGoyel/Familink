import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  FileLock2, 
  Search, 
  Download,
  Eye,
  Trash2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Plus
} from 'lucide-react';
import Button from '../../components/ui/Button';
import SimulationCard from '../../components/ui/SimulationCard';
import { SEO } from '../../components/seo/SEO';

interface Doc {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
}

export default function DocumentStorage() {
  const [docs, setDocs] = useState<Doc[]>([
    { id: '1', name: 'Estate_Planning_Deed.pdf', type: 'PDF', size: '2.4 MB', date: 'Oct 24, 2025' },
    { id: '2', name: 'Family_House_Deed.jpg', type: 'IMG', size: '4.1 MB', date: 'Nov 12, 2025' }
  ]);
  const [isUploading, setIsUploading] = useState(false);

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newDoc = {
        id: Date.now().toString(),
        name: 'New_Secure_Asset.pdf',
        type: 'PDF',
        size: '1.2 MB',
        date: new Date().toLocaleDateString()
      };
      setDocs([newDoc, ...docs]);
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="bg-page min-h-screen text-text">
      <SEO 
        title="Secure Document Storage for Families | Transfer Legacy"
        description="Store sensitive family documents, deeds, and legal papers in an institutional-grade zero-knowledge vault. 100-year storage reliability."
      />

      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-bold tracking-tight mb-8"
          >
            <FileLock2 size={16} />
            IMMUTABLE ARCHIVE
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
            THE FAMILY<br />
            <span className="gradient-text-premium">IRON VAULT.</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-12">
            Store critical deeds, certificates, and legal contracts with the same security we use for cryptographic private keys.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 max-w-5xl mx-auto">
        <SimulationCard
          title="Secure Archive UI"
          description="A demonstration of our zero-knowledge document management interface."
          icon={<FileText />}
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input 
                  placeholder="Search archives..." 
                  className="w-full bg-raised border border-base rounded-xl py-2 pl-12 pr-4 text-xs font-bold focus:ring-1 focus:ring-brand-primary/50 outline-none transition-all"
                />
              </div>
              <Button onClick={simulateUpload} disabled={isUploading} className="w-full sm:w-auto h-10 px-6 text-[11px] font-bold tracking-widest">
                {isUploading ? "ENCRYPTING & SYNCING..." : <><Plus size={16} className="mr-2" /> UPLOAD TO VAULT</>}
              </Button>
            </div>

            <div className="border border-base rounded-2xl overflow-hidden bg-surface/30">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-raised border-b border-base">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-muted tracking-widest">Document Name</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-muted tracking-widest">Modified</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-muted tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-base">
                    {docs.map((doc) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={doc.id} 
                        className="group hover:bg-page/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-raised border border-base flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                              <FileText size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-primary">{doc.name}</p>
                              <p className="text-[10px] text-muted">{doc.size}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-[10px] text-muted font-medium">
                            <Clock size={12} />
                            {doc.date}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-muted hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all"><Eye size={14} /></button>
                            <button className="p-2 text-muted hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all"><Download size={14} /></button>
                            <button className="p-2 text-muted hover:text-error hover:bg-error/10 rounded-lg transition-all"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 py-4 px-6 bg-raised border border-base rounded-2xl">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">Verified Immutability</span>
              </div>
            </div>
          </div>
        </SimulationCard>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Military Grade", desc: "AES-256 bits zero-knowledge encryption at the file level." },
            { icon: Clock, title: "100-Year Life", desc: "Stored on IPFS and Filecoin for permanent decentralized redundancy." },
            { icon: FileLock2, title: "Inheritable Access", desc: "Automatically release access to heirs when conditions are met." },
            { icon: Eye, title: "Private Preview", desc: "View documents in-browser without ever decrypting to local storage." }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-3xl border border-base bg-surface hover:border-brand-primary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                <item.icon size={20} />
              </div>
              <h4 className="font-bold text-lg mb-2 italic">{item.title}</h4>
              <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
