import React from 'react';
import ComparisonLayout from './ComparisonLayout';

const features = [
  { 
    name: 'Zero-Knowledge Privacy', 
    legacy: true, 
    competitor: true, 
    desc: 'Both platforms offer high privacy, but Transfer Legacy focuses on the heir UX and automated legal releasing.' 
  },
  { 
    name: 'Automated Dead Mans Switch', 
    legacy: 'Institutional Grade', 
    competitor: 'Manual/Email', 
    desc: 'Our check-in system is cross-platform and more reliable for long-term dormancy detection.' 
  },
  { 
    name: 'Integrated Document Vault', 
    legacy: true, 
    competitor: 'Basic', 
    desc: 'Full ZK-support for high-resolution legal deeds and sensitive family documents.' 
  },
  { 
    name: 'Cost Efficiency', 
    legacy: 'Pay Once/Tiered', 
    competitor: 'Subscription', 
    desc: 'Designed for a 100-year plan without the risk of subscription lapse locking out your heirs.' 
  },
  { 
    name: 'Smart Contract Automation', 
    legacy: true, 
    competitor: 'Limited', 
    desc: 'Direct interaction with major DeFi protocols for automated asset reallocation.' 
  }
];

export default function CompareInheriti() {
  return (
    <ComparisonLayout 
      competitorName="Inheriti"
      features={features}
      title="Transfer Legacy vs. Inheriti | Institutional Comparison"
      description="Compare Transfer Legacy and Inheriti. Why our automated legal releasing and ZK-vault architecture is the premium choice for families."
    />
  );
}
