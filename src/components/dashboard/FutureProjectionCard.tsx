import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Link } from 'react-router-dom';

export default function FutureProjectionCard() {
  const { assets } = useStore();
  
  const totalValue = assets.reduce((acc, asset) => acc + (asset.value || 0), 0);
  // Simple assumed growth rate: 8% per year over 10 years
  const projectedValue = totalValue * Math.pow(1.08, 10);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(79,92,255,0.12)] transition-all duration-300"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <TrendingUp size={100} />
      </div>
      
      <h3 className="text-lg font-semibold text-text flex items-center gap-2 mb-1 relative z-10">
        "Future You" Projection
      </h3>
      <p className="text-muted text-sm mb-6 relative z-10">
        Estimated vault value by 2035
      </p>

      <div className="mb-6 relative z-10">
        <div className="text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
          ${projectedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
        <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
          <TrendingUp size={12} /> Assumes 8% annual growth
        </div>
      </div>

      <Link 
        to="/heirs"
        className="inline-flex items-center gap-2 text-sm text-primary hover:text-white transition-colors relative z-10"
      >
        Have you planned who receives it? <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}
