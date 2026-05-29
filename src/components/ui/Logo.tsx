import React from 'react';
import { useStore } from '../../store/useStore';

interface LogoProps {
  className?: string;
  size?: number;
}

export const LogoMark: React.FC<LogoProps> = ({ className = '', size = 32 }) => {
  const theme = useStore(state => state.theme);
  
  // Use the new high-fidelity logo images
  const logoSrc = theme === 'dark' ? '/logo-dark.png' : '/logo-light.jpeg';

  return (
    <div 
      className={`flex items-center justify-center overflow-hidden rounded-xl border border-white/5 shadow-sm ${className}`}
      style={{ 
        width: size, 
        height: size,
      }}
    >
      <img 
        src={logoSrc} 
        alt="Transfer Legacy logo mark" 
        className="w-full h-full object-cover transform scale-110"
      />
    </div>
  );
};

export const Logo: React.FC<LogoProps & { showText?: boolean; showTagline?: boolean }> = ({ 
  className = '', 
  size = 40, 
  showText = true,
  showTagline = false
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={size} />
      {showText && (
        <div className="flex flex-col leading-[0.9]">
          <span className="text-xl font-display font-bold text-primary tracking-tight">
            Transfer Legacy
          </span>
          {showTagline && (
            <span className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mt-1">
              Digital Succession
            </span>
          )}
        </div>
      )}
    </div>
  );
};

