import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { usePassportStore, IdentityPassport } from '../store/usePassportStore';
import { useStore } from '../store/useStore';
import Button from '../components/ui/Button';
import { ShieldCheck, Share2, Download, Edit3, X, QrCode, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';
import * as THREE from 'three';

// Minimal 3D Card
function Passport3DCard({ isFlipped }: { isFlipped: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      const targetRotation = isFlipped ? Math.PI : 0;
      // Smooth interpolation
      meshRef.current.rotation.y += (targetRotation - meshRef.current.rotation.y) * 0.1;
    }
  });
  
  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#4F5CFF" />
      
      <mesh ref={meshRef}>
        <boxGeometry args={[3.2, 2, 0.05]} />
        <meshStandardMaterial color="#1a1b26" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function IdentityPassportPage() {
  const { passport, updatePassport, generateQRData, generateSummary } = usePassportStore();
  const { assets, guardians, heirs } = useStore();
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const [editForm, setEditForm] = useState<IdentityPassport>(passport);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = () => {
    updatePassport(editForm);
    generateQRData();
    setIsEditModalOpen(false);
  };

  const simulateAiSummary = () => {
    setIsGenerating(true);
    const totalValue = assets.reduce((acc, a) => acc + (a.value || 0), 0);
    const newSummary = `This user has ${assets.length} protected digital assets worth approximately $${totalValue.toLocaleString()}, ${guardians.filter(g=>g.status==='confirmed').length} confirmed guardians, and ${heirs.length} designated heirs.`;
    
    setTimeout(() => {
      generateSummary(newSummary);
      setEditForm(prev => ({ ...prev, vaultSummary: newSummary }));
      setIsGenerating(false);
    }, 1500);
  };

  const calculateAge = (dob: string) => {
    if (!dob) return '';
    const diff = Date.now() - new Date(dob).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <header className="flex flex-col items-center justify-center text-center pt-4">
        <h1 className="text-3xl font-bold text-text flex items-center gap-3 mb-2">
          Your Digital Identity Passport
        </h1>
        <p className="text-muted max-w-lg">
          Everything anyone needs in an emergency. Shareable. Verifiable. Yours.
        </p>
      </header>

      {/* 3D Scene representing the card */}
      <div 
        className="h-64 w-full cursor-pointer relative" 
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <Canvas camera={{ position: [0, 0, 4] }}>
          <Passport3DCard isFlipped={isFlipped} />
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-muted/50 font-mono tracking-widest mt-48">
          HOVER TO FLIP
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
        
        {/* The 2D Passport Card UI */}
        <div className="w-full md:w-[450px] aspect-[1.586/1] rounded-2xl p-[2px] bg-gradient-to-br from-primary/50 via-surface to-indigo-500/30 shadow-[0_20px_50px_rgba(79,92,255,0.15)] relative">
          <div className="w-full h-full bg-[#0d0e15] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
            
            {/* Watermark */}
            <ShieldCheck size={200} className="absolute -right-10 -bottom-10 text-primary/5 opacity-50 pointer-events-none" />

            <div className="flex justify-between items-start border-b border-border/50 pb-3 mb-4">
              <div>
                <h3 className="text-primary font-bold tracking-widest text-sm mb-1 uppercase">LinkKey Digital Passport</h3>
                <p className="text-[10px] text-muted font-mono">ID: {passport.fullName.toUpperCase().replace(/\s/g, '')}-{calculateAge(passport.dateOfBirth)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center">
                <ShieldCheck className="text-primary" size={24} />
              </div>
            </div>

            <div className="flex gap-4 flex-1">
              <div className="space-y-3 flex-1">
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-wider mb-0.5">Full Name</p>
                  <p className="text-sm font-semibold text-text">{passport.fullName}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-wider mb-0.5">Date of Birth</p>
                    <p className="text-sm font-medium text-text">{passport.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-wider mb-0.5">Country</p>
                    <p className="text-sm font-medium text-text">{passport.country}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-wider mb-0.5">Blood</p>
                    <p className="text-sm font-bold text-red-400">{passport.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-wider mb-0.5">Vault Status</p>
                    <p className="text-sm font-medium text-emerald-400 flex items-center gap-1">ACTIVE</p>
                  </div>
                </div>
              </div>
              
              <div className="w-24 flex flex-col items-end gap-3 shrink-0">
                <div className="p-1 bg-white rounded-lg">
                  <QRCodeSVG value={passport.qrCodeData || 'linkkey'} size={88} />
                </div>
                <div className="w-full">
                  <p className="text-[8px] text-muted text-right font-mono truncate">{passport.qrCodeData}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/50">
              <p className="text-[10px] text-muted uppercase tracking-wider mb-0.5">Emergency Contact</p>
              <p className="text-xs font-medium text-text">
                {passport.emergencyContact.name} ({passport.emergencyContact.relation}) • {passport.emergencyContact.phone}
              </p>
            </div>
            
          </div>
        </div>

        {/* Actions & Info panel */}
        <div className="w-full md:w-80 space-y-4">
          <div className="glassmorphism rounded-2xl p-5 border-primary/20">
             <h4 className="text-sm font-semibold text-text mb-2">Vault Summary</h4>
             <p className="text-xs text-muted leading-relaxed mb-4">
               {passport.vaultSummary}
             </p>
             <button onClick={simulateAiSummary} disabled={isGenerating} className="text-xs text-primary hover:text-primary-light flex items-center gap-1 transition-colors">
               <Sparkles size={12}/> {isGenerating ? 'Updating...' : 'Regenerate Summary'}
             </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <Button variant="secondary" className="w-full flex-col h-auto py-4 gap-2" onClick={() => setIsEditModalOpen(true)}>
               <Edit3 size={20}/>
               <span className="text-xs">Edit Details</span>
             </Button>
             <Button variant="primary" className="w-full flex-col h-auto py-4 gap-2 border-none shadow-[0_0_15px_rgba(79,92,255,0.3)] bg-primary/20 hover:bg-primary" onClick={() => setIsShareModalOpen(true)}>
               <Share2 size={20}/>
               <span className="text-xs font-bold text-white">Share</span>
             </Button>
          </div>

          <Button variant="secondary" className="w-full gap-2 text-muted border-border/50">
             <Download size={16}/> Download PDF
          </Button>
        </div>

      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-border/50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-text">Edit Passport Details</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-muted hover:text-text"><X size={20}/></button>
              </div>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs text-muted block mb-1">Full Name</label>
                    <input type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text" value={editForm.fullName} onChange={(e) => setEditForm({...editForm, fullName: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs text-muted block mb-1">Date of Birth</label>
                    <input type="date" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text" value={editForm.dateOfBirth} onChange={(e) => setEditForm({...editForm, dateOfBirth: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs text-muted block mb-1">Blood Group</label>
                    <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text outline-none" value={editForm.bloodGroup} onChange={(e) => setEditForm({...editForm, bloodGroup: e.target.value})}>
                      {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-muted block mb-1">Country</label>
                    <input type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text" value={editForm.country} onChange={(e) => setEditForm({...editForm, country: e.target.value})} />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h4 className="text-sm font-semibold text-text mb-3">Emergency Contact</h4>
                  <div className="space-y-3">
                    <input type="text" placeholder="Name" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text" value={editForm.emergencyContact.name} onChange={(e) => setEditForm({...editForm, emergencyContact: {...editForm.emergencyContact, name: e.target.value}})} />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="Phone" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text" value={editForm.emergencyContact.phone} onChange={(e) => setEditForm({...editForm, emergencyContact: {...editForm.emergencyContact, phone: e.target.value}})} />
                      <input type="text" placeholder="Relation" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text" value={editForm.emergencyContact.relation} onChange={(e) => setEditForm({...editForm, emergencyContact: {...editForm.emergencyContact, relation: e.target.value}})} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h4 className="text-sm font-semibold text-text mb-3">Sharing Preferences</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'shareableWithFamily', label: 'Share with Family' },
                      { id: 'shareableWithAttorney', label: 'Share with Estate Attorney' },
                      { id: 'shareableWithAdvisor', label: 'Share with Financial Advisor' },
                    ].map(pref => (
                      <label key={pref.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-background cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary bg-background border-border" 
                          checked={editForm[pref.id as keyof IdentityPassport] as boolean} 
                          onChange={(e) => setEditForm({...editForm, [pref.id]: e.target.checked})} 
                        />
                        <span className="text-sm text-text">{pref.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
              <div className="p-4 border-t border-border/50 bg-background flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-sm bg-surface border border-border rounded-2xl p-6 text-center">
               <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/30">
                 <QrCode size={32} />
               </div>
               <h3 className="text-xl font-bold text-text mb-2">Share Passport</h3>
               <p className="text-sm text-muted mb-6">Scan QR to access public verified data.</p>
               
               <div className="bg-white p-4 rounded-xl inline-block mb-6 shadow-xl">
                 <QRCodeSVG value={passport.qrCodeData} size={150} />
               </div>
               
               <div className="w-full bg-background rounded-lg p-3 text-xs text-muted font-mono flex items-center justify-between border border-border/50 mb-6">
                 <span className="truncate flex-1 text-left select-all">{passport.qrCodeData}</span>
               </div>
               
               <div className="space-y-3">
                 <Button variant="primary" className="w-full" onClick={() => {
                   // Mock email send
                   setIsShareModalOpen(false);
                 }}>Send via Email</Button>
                 <Button variant="secondary" className="w-full text-muted border-none" onClick={() => setIsShareModalOpen(false)}>Close</Button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
