import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  color?: string;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, color = 'bg-primary', ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div 
        ref={ref}
        className={cn("w-full h-2 bg-surface rounded-full overflow-hidden", className)}
        {...props}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    );
  }
);
ProgressBar.displayName = 'ProgressBar';
export default ProgressBar;
