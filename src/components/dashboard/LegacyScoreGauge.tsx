import { motion } from 'framer-motion';

export default function LegacyScoreGauge({ score }: { score: number }) {
  const isSecure = score >= 80;
  const isWarning = score < 80 && score >= 50;
  
  const color = isSecure ? '#22C55E' : isWarning ? '#F59E0B' : '#EF4444';
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="64"
          cy="64"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-surface"
        />
        <motion.circle
          cx="64"
          cy="64"
          r="40"
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-text">{score}</span>
        <span className="text-[10px] text-muted uppercase tracking-wider">Score</span>
      </div>
    </div>
  );
}
