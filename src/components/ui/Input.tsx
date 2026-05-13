import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col space-y-2">
        {label && <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted/80 ml-1">{label}</label>}
        <input
          ref={ref}
          className={cn(
            "w-full bg-surface/50 border border-base rounded-xl px-4 py-3 text-primary focus:border-brand-primary/40 focus:ring-4 focus:ring-brand-primary/5 transition-all placeholder-muted/40 text-[14px] tracking-tight shadow-inner",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
export default Input;
