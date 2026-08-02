import React from 'react';
import logoImg from '../assets/images/everyday_holidays_logo_1785645669619.jpg';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'emblem-only' | 'horizontal';
  lightText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const EverydayHolidaysLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  lightText = false,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24'
  };

  const textSizes = {
    sm: { title: 'text-lg', sub: 'text-[8px]' },
    md: { title: 'text-xl sm:text-2xl', sub: 'text-[9px] sm:text-[10px]' },
    lg: { title: 'text-2xl sm:text-3xl', sub: 'text-[11px] sm:text-[12px]' },
    xl: { title: 'text-3xl sm:text-4xl', sub: 'text-[13px] sm:text-[14px]' }
  };

  // Emblem rendered using the official logo image
  const Emblem = (
    <div className={`${sizeClasses[size]} shrink-0 rounded-full bg-white p-0.5 shadow-md border border-slate-200/30 overflow-hidden flex items-center justify-center`}>
      <img
        src={logoImg}
        alt="Everyday Holidays Singapore Logo"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
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
      {Emblem}

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className={`flex items-center font-extrabold ${textSizes[size].title} tracking-tight`}>
          <span className="text-[#009886]">everyday</span>
          <span className="text-[#ED7A23] ml-0.5">holidays</span>
        </div>
        <span className={`font-bold tracking-[0.2em] uppercase mt-1 ${textSizes[size].sub} ${
          lightText ? 'text-teal-300' : 'text-[#009886]'
        }`}>
          YOUR SINGAPORE JOURNEY
        </span>
      </div>
    </div>
  );
};

export default EverydayHolidaysLogo;
