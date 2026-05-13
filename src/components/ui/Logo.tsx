import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const LogoMark: React.FC<LogoProps> = ({ className = '', size = 32 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Transfer Legacy logo"
    >
      {/* Hexagon vault shape */}
      <path 
        d="M32 4 L56 18 L56 46 L32 60 L8 46 L8 18 Z"
        stroke="currentColor" 
        strokeWidth="2.5" 
        fill="none" 
        strokeLinejoin="round"
      />
      {/* Inner forward-pass arrow */}
      <path 
        d="M20 32 L40 32 M34 26 L40 32 L34 38"
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Small anchor dot — the family/heir mark */}
      <circle cx="18" cy="32" r="2.5" fill="currentColor"/>
    </svg>
  );
};

export const Logo: React.FC<LogoProps & { showText?: boolean; showTagline?: boolean }> = ({ 
  className = '', 
  size = 32, 
  showText = true,
  showTagline = false
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={size} className="text-brand-primary" />
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
