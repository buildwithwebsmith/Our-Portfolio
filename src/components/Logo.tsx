import React from 'react';

interface LogoMarkProps {
  size?: number | string;
  className?: string;
  variant?: 'light' | 'dark' | 'mono';
}

export const LogoMark: React.FC<LogoMarkProps> = ({
  size = 40,
  className = '',
  variant = 'light',
}) => {
  // Determine colors based on variant
  const anvilFill = 
    variant === 'light' 
      ? '#1B1814' // Near-black charcoal
      : variant === 'dark' 
      ? '#FBF8F3' // Cream parchment
      : 'currentColor';

  const highlightFill = 
    variant === 'mono' 
      ? 'currentColor' 
      : '#C2622D'; // Gilded copper top plate

  // ID for linear gradient to prevent conflicts
  const gradientId = `spark-gradient-${variant}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`logo-mark select-none transition-transform duration-300 ${className}`}
    >
      <defs>
        {variant !== 'mono' ? (
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#C2622D" />
            <stop offset="100%" stopColor="#E08A4F" />
          </linearGradient>
        ) : null}
      </defs>

      {/* Modern, Geometric Anvil Silhouette */}
      <path
        d="M 15,46 L 85,46 L 85,54 L 62,54 Q 58,64 58,72 L 68,72 L 72,80 L 28,80 L 32,72 L 42,72 Q 42,64 38,54 L 15,46 Z"
        fill={anvilFill}
      />

      {/* Gilded Top Accent (gilded deck highlight) */}
      {variant !== 'mono' && (
        <path
          d="M 24,46 L 76,46 L 76,49 L 24,49 Z"
          fill={highlightFill}
        />
      )}

      {/* Spark Embers (styled flame / starburst marks) */}
      <g 
        className="spark-ember" 
        fill={variant === 'mono' ? 'currentColor' : `url(#${gradientId})`}
      >
        {/* Center large dynamic starburst spark */}
        <path d="M 50,12 L 53,22 L 63,25 L 53,28 L 50,38 L 47,28 L 37,25 L 47,22 Z" />
        {/* Left small spark */}
        <path d="M 32,23 L 33.5,27 L 37.5,28 L 33.5,29 L 32,33 L 30.5,29 L 26.5,28 L 30.5,27 Z" />
        {/* Right small spark */}
        <path d="M 68,17 L 69.5,21 L 73.5,22 L 69.5,23 L 68,27 L 66.5,23 L 62.5,22 L 66.5,21 Z" />
      </g>
    </svg>
  );
};

interface LogoProps {
  variant?: 'light' | 'dark' | 'mono';
  showText?: boolean;
  className?: string;
  size?: number | string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  showText = true,
  className = '',
  size = 40,
}) => {
  const textClass = 
    variant === 'light' 
      ? 'text-nearblack' 
      : variant === 'dark' 
      ? 'text-parchment' 
      : 'text-current';

  return (
    <div className={`flex items-center gap-2.5 group no-underline select-none ${className}`}>
      {/* Interactive frame for the logo mark */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-[1.05] overflow-hidden shrink-0 ${
        variant === 'dark' 
          ? 'bg-[#1C1815] border-white/10 shadow-md' 
          : 'bg-parchment border-nearblack/10 shadow-xs'
      }`}>
        <LogoMark size={size} variant={variant} />
      </div>

      {showText && (
        <span className={`font-serif font-extrabold text-xl tracking-[0.08em] flex items-center ${textClass}`}>
          <span>WEB</span>
          <span className="relative text-copper ml-0.5">
            SMITH
            {/* Animated copper underline on entire group hover */}
            <span className="absolute bottom-[-2px] left-0 w-full h-[2.5px] bg-copper scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </span>
        </span>
      )}
    </div>
  );
};
