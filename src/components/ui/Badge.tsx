import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      success: "bg-brand-success/10 text-brand-success border border-brand-success/20",
      warning: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
      error: "bg-red-500/10 text-red-500 border border-red-500/20",
      info: "bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
      default: "bg-surface/50 text-secondary border border-base shadow-sm",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em]",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';
export default Badge;
