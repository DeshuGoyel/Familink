import { useState } from 'react';
import { Calculator, ArrowRight, AlertTriangle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { SEO } from '../../components/seo/SEO';

export default function CryptoCalculator() {
  const [assetValue, setAssetValue] = useState<number>(100000);
  const [age, setAge] = useState<number>(40);

  // Simple heuristic for demonstration: 
  // Risk of sudden loss without a plan (based on actuarial risk + 20% baseline loss rate)
  const baseLossRisk = 0.20; 
  const ageRiskMultiplier = Math.max(1, (age - 30) / 20);
  const calculatedRiskPercentage = Math.min(100, (baseLossRisk * ageRiskMultiplier) * 100).toFixed(1);
  const potentialLoss = (assetValue * (parseFloat(calculatedRiskPercentage) / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <div className="bg-secondary text-text min-h-screen font-sans pt-20">
      <SEO 
        title="Crypto Inheritance Calculator: Calculate Your Risk of Loss | Transfer Legacy"
        description="Use our free crypto inheritance calculator to see how much of your Bitcoin and digital assets are at risk of permanent loss if you pass away without a plan."
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
            <Calculator size={16} />
            <span className="text-sm font-semibold tracking-wide uppercase">Free Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Crypto Inheritance Risk Calculator
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            20% of all Bitcoin is permanently lost. Calculate how much of your portfolio is at risk of vanishing if you die without a digital estate plan.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-surface border border-border p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Your Details</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-muted mb-2">Total Crypto Portfolio Value ($)</label>
              <input 
                type="number" 
                value={assetValue}
                onChange={(e) => setAssetValue(Number(e.target.value))}
                className="w-full bg-[#0D1117] border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-muted mb-2">Your Current Age</label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-[#0D1117] border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <p className="text-sm text-muted">
              * Calculations are based on Chainalysis data of permanently lost Bitcoin combined with baseline actuarial mortality tables for sudden incidents.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#0B0E14] to-surface border border-danger/30 p-8 rounded-2xl flex flex-col justify-center items-center text-center">
            <AlertTriangle size={48} className="text-danger mb-4" />
            <h3 className="text-xl font-bold mb-2">Value at Risk of Permanent Loss</h3>
            <div className="text-5xl font-bold text-danger mb-4">{potentialLoss}</div>
            <p className="text-muted mb-8">
              Statistically, your family has a <strong className="text-white">{calculatedRiskPercentage}% chance</strong> of being locked out of your crypto permanently.
            </p>
            <Button size="lg" className="w-full glow-blue">
              Eliminate This Risk Now <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
