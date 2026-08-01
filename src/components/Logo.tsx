import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'emblem-only' | 'horizontal';
  lightText?: boolean;
}

export const EverydayHolidaysLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  lightText = false
}) => {
  // SVG Emblem
  const Emblem = (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background/Base Circle Glow optional */}
      
      {/* Teal Outer Leaf/Frond Curve */}
      <path 
        d="M75 35 C95 25, 120 28, 135 40 C120 42, 105 48, 92 60 C80 50, 75 42, 75 35 Z" 
        fill="#0B9B8A" 
      />
      <path
        d="M85 30 C100 20, 125 22, 142 32 C128 36, 112 44, 98 56 M95 38 L108 26 M110 44 L125 32 M122 50 L138 38 M78 48 L90 38"
        stroke="#0B9B8A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Orange Marina Bay Sands Towers & Skypark */}
      {/* Tower 1 */}
      <path d="M52 108 L58 72 L68 72 L64 108 Z" fill="#E57A32" />
      {/* Tower 2 */}
      <path d="M72 108 L76 72 L86 72 L83 108 Z" fill="#E57A32" />
      {/* Tower 3 */}
      <path d="M90 108 L94 72 L104 72 L101 108 Z" fill="#E57A32" />
      {/* Skypark Boat Top */}
      <path d="M46 72 C46 72, 75 66, 110 70 C110 70, 106 63, 48 66 Z" fill="#E57A32" />

      {/* Merlion (Teal Silhouette) */}
      <g fill="#0B9B8A">
        {/* Merlion Head */}
        <path d="M125 68 C120 62, 118 52, 126 46 C136 40, 146 50, 142 58 C148 56, 154 60, 152 68 C146 72, 138 72, 132 75 Z" />
        {/* Merlion Mane Details */}
        <path d="M122 55 C118 52, 114 58, 120 62 Z" />
        <path d="M125 48 C122 42, 128 38, 132 44 Z" />
        {/* Water Spout */}
        <path d="M148 62 C158 60, 166 65, 172 70 C166 68, 158 67, 148 66 Z" />
        {/* Merlion Body Scale Curve */}
        <path d="M128 75 C132 88, 125 102, 118 112 C128 108, 136 96, 134 82 Z" />
        {/* Eye dot */}
        <circle cx="134" cy="52" r="2" fill="#FFFFFF" />
      </g>

      {/* Bottom Teal Wave / Boat Hull Swoosh */}
      <path 
        d="M40 92 C32 108, 42 135, 75 142 C115 150, 145 132, 152 110 C138 126, 108 135, 75 128 C55 124, 45 110, 48 98 Z" 
        fill="#0B9B8A" 
      />
    </svg>
  );

  if (variant === 'emblem-only') {
    return (
      <div className={`relative inline-block ${className}`}>
        {Emblem}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem Icon Container */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center p-0.5 rounded-full bg-white/90 shadow-sm border border-slate-200/20">
        {Emblem}
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center font-extrabold text-xl sm:text-2xl tracking-tight">
          <span className="text-[#0B9B8A]">everyday</span>
          <span className="text-[#E57A32]">holidays</span>
        </div>
        <span className={`text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5 ${
          lightText ? 'text-teal-300/90' : 'text-[#0B9B8A]'
        }`}>
          YOUR SINGAPORE JOURNEY
        </span>
      </div>
    </div>
  );
};

export default EverydayHolidaysLogo;
