import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
  variant?: 'default' | 'glass' | 'outline';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = true, variant = 'default', children, ...props }, ref) => {
    
    const variants = {
      default: "bg-surface border border-base shadow-sm",
      glass: "bg-surface/30 backdrop-blur-3xl border border-white/[0.05] shadow-lg",
      outline: "bg-transparent border border-base",
    };

    return (
      <motion.div
        ref={ref}
        whileHover={hoverEffect ? { y: -2, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } : {}}
        className={cn(
          "rounded-2xl p-6 transition-all duration-300 relative overflow-hidden",
          variants[variant],
          hoverEffect && "hover:border-brand-primary/30 hover:shadow-xl",
          className
        )}
        {...props}
      >
        {/* Subtle inner highlight for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
export default Card;
