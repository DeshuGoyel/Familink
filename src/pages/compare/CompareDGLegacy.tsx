import React from 'react';
import ComparisonLayout from './ComparisonLayout';

const features = [
  { 
    name: 'Zero-Knowledge Encryption', 
    legacy: true, 
    competitor: false, 
    desc: 'Local encryption where keys never leave your device. Competitors often store keys on their servers.' 
  },
  { 
    name: 'Multi-Guardian Verification', 
    legacy: 'Threshold 3/5', 
    competitor: 'Single Person', 
    desc: 'Requires multiple trusted parties to unlock. Prevents single point of failure and coercion.' 
  },
  { 
    name: 'Shamir Secret Sharing (SSS)', 
    legacy: true, 
    competitor: false, 
    desc: 'Mathematical splitting of recovery phrases. Industry standard for institutional security.' 
  },
  { 
    name: 'AI Heir Guidance', 
    legacy: true, 
    competitor: 'Email Only', 
    desc: 'Smart walkthroughs that teach heirs how to recover assets safely without technical knowledge.' 
  },
  { 
    name: '100-Year Proof', 
    legacy: true, 
    competitor: false, 
    desc: 'Architecture designed for long-term storage (IPFS/Filecoin) rather than standard cloud DBs.' 
  }
];

export default function CompareDGLegacy() {
  return (
    <ComparisonLayout 
      competitorName="DGLegacy"
      features={features}
      title="Transfer Legacy vs. DGLegacy | Institutional Comparison"
      description="Compare Transfer Legacy and DGLegacy. Discover why institutional crypto holders choose zero-knowledge architecture over standard storage."
    />
  );
}
