import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {

    const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] tracking-tight";

    const variants = {
      primary: "bg-brand-primary text-white shadow-brand hover:brightness-105 border border-white/10 shadow-[0_4px_12px_rgba(249,115,22,0.25)]",
      secondary: "bg-surface text-primary border border-base hover:border-brand-primary/30 hover:bg-surface/80",
      ghost: "bg-transparent text-secondary hover:text-primary hover:bg-surface/50",
      danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
      gold: "bg-brand-gold text-obsidian-950 shadow-lg hover:brightness-105 border border-white/20",
    };

    const sizes = {
      sm: "text-[11px] px-3.5 py-1.5 uppercase tracking-wider",
      md: "text-[13px] px-5 py-2.5",
      lg: "text-base px-8 py-3.5",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
