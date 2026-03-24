import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      success: "bg-accent/10 text-accent border border-accent/20",
      warning: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
      error: "bg-danger/10 text-danger border border-danger/20",
      info: "bg-primary/10 text-primary border border-primary/20",
      default: "bg-surface text-muted border border-border",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
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
