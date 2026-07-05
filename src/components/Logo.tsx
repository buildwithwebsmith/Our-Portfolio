import React from 'react';

type LogoVariant = 'light' | 'dark' | 'mono';

interface LogoMarkProps {
  size?: number;
  className?: string;
  variant?: LogoVariant;
}

const getLogoColors = (variant: LogoVariant = 'dark') => {
  switch (variant) {
    case 'light':
      return {
        primary: '#1B1814',
        accent: '#EB781C',
      };
    case 'mono':
      return {
        primary: 'currentColor',
        accent: 'currentColor',
      };
    case 'dark':
    default:
      return {
        primary: '#FBF8F3',
        accent: '#EB781C',
      };
  }
};

export const LogoMark: React.FC<LogoMarkProps> = ({
  size = 40,
  className = '',
  variant = 'dark' as LogoVariant,
}) => {
  const { primary, accent } = getLogoColors(variant);
  const width = size * 2.18;

  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 300 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polyline
        points="52 30 20 70 52 110"
        stroke={primary}
        strokeWidth="14"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <polyline
        points="248 30 280 70 248 110"
        stroke={primary}
        strokeWidth="14"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <polyline
        points="78 22 116 116 150 66 184 116 222 22"
        stroke={primary}
        strokeWidth="20"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <line
        x1="150"
        y1="12"
        x2="150"
        y2="78"
        stroke={accent}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle
        cx="150"
        cy="12"
        r="12"
        stroke={accent}
        strokeWidth="8"
      />
      <circle
        cx="150"
        cy="78"
        r="10"
        stroke={accent}
        strokeWidth="8"
      />
    </svg>
  );
};

interface LogoProps {
  variant?: LogoVariant;
  showText?: boolean;
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark' as LogoVariant,
  showText = true,
  className = '',
  size = 40,
}) => {
  const { primary, accent } = getLogoColors(variant);
  const textSize = Math.round(size * 0.94);
  const dotSize = Math.max(4, Math.round(size * 0.14));
  const gap = Math.max(8, Math.round(size * 0.18));

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      style={{ gap: `${gap}px` }}
    >
      <LogoMark size={size} variant={variant} />

      {showText && (
        <span
          className="font-sans font-bold leading-none"
          style={{ color: primary, fontSize: `${textSize}px` }}
        >
          <span>Websm</span>
          <span className="relative inline-block">
            <span>{'\u0131'}</span>
            <span
              className="absolute rounded-full"
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                backgroundColor: accent,
                top: `${Math.round(size * 0.12)}px`,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          </span>
          <span>th</span>
        </span>
      )}
    </div>
  );
};
