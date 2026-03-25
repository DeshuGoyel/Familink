import { CheckCircle2, Shield, Lock, EyeOff } from 'lucide-react';
import Card from '../components/ui/Card';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export default function TrustCenter() {
  return (
    <div className="min-h-screen bg-secondary">
<main className="pt-6 px-4 sm:px-6 lg:px-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text">Trust & Compliance</h1>
              <p className="text-muted mt-1">Zero-knowledge by design. Verified by experts.</p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="flex flex-col items-center justify-center p-8 text-center border-primary/30 glow-blue">
              <h3 className="text-2xl font-bold text-text mb-2">99.98%</h3>
              <div className="flex items-center text-sm text-muted">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse mr-2"></span>
                Uptime (90 days)
              </div>
            </Card>
            <Card className="flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-2xl font-bold text-text mb-2">0</h3>
              <p className="text-sm text-muted">Security Incidents</p>
            </Card>
            <Card className="flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-2xl font-bold text-text mb-2">256-bit</h3>
              <p className="text-sm text-muted">AES-GCM Encryption</p>
            </Card>
            <Card className="flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-2xl font-bold text-text mb-2">Zero</h3>
              <p className="text-sm text-muted">Knowledge Design</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="glassmorphism p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-text mb-6">Compliance Standards</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'SOC 2 Type II', desc: 'Audited & Certified' },
                    { name: 'GDPR', desc: 'Fully Compliant' },
                    { name: 'ISO 27001', desc: 'Secure by Design' },
                    { name: 'CCSS', desc: 'Crypto Security Standard' },
                    { name: 'CCPA', desc: 'California Privacy Rights' },
                    { name: 'DPDP Act India', desc: 'Ready & Compliant' }
                  ].map((cert, i) => (
                    <div key={i} className="flex items-start space-x-4 p-4 rounded-xl border border-border bg-surface/50 hover:bg-surface transition">
                      <CheckCircle2 size={24} className="text-accent shrink-0" />
                      <div>
                        <h4 className="font-semibold text-text">{cert.name}</h4>
                        <p className="text-sm text-muted">{cert.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="glassmorphism p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-text mb-6">Recent Audits</h3>
                <div className="space-y-4">
                  {[
                    { date: 'Q1 2026', type: 'Penetration Test', status: 'Passed', author: 'Trail of Bits' },
                    { date: 'Q4 2025', type: 'SOC 2 Audit', status: 'Certified', author: 'Ernst & Young' },
                    { date: 'Q3 2025', type: 'GDPR Review', status: 'Compliant', author: 'Data Protection EU' },
                  ].map((audit, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface hover:bg-surface/80 transition cursor-default">
                      <div>
                        <h4 className="font-medium text-text">{audit.type}</h4>
                        <p className="text-sm text-muted">{audit.date} · {audit.author}</p>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-accent/10 border border-accent/20 text-accent">{audit.status}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="h-64 rounded-2xl bg-surface border border-border overflow-hidden relative">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <mesh rotation={[Math.PI/4, Math.PI/4, 0]}>
                      <boxGeometry args={[2, 2, 2]} />
                      <meshStandardMaterial color="#4F5CFF" wireframe />
                      <pointLight color="#22C55E" intensity={2} />
                    </mesh>
                  </Float>
                </Canvas>
                <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
                  <Shield size={24} className="text-primary" />
                  <Lock size={24} className="text-primary" />
                </div>
              </div>

              <Card>
                <h3 className="text-lg font-bold text-text mb-4">Architecture</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3 text-sm">
                    <EyeOff size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-muted">We use AES-256-GCM client-side encryption. We cannot read your vault.</span>
                  </li>
                  <li className="flex items-start space-x-3 text-sm">
                    <Shield size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-muted">Keys are split using Shamir's Secret Sharing algorithm.</span>
                  </li>
                  <li className="flex items-start space-x-3 text-sm">
                    <Lock size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-muted">Data resides in redundant highly-secure nodes.</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
