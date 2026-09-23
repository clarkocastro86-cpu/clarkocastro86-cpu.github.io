import React from 'react';

export const WashiTape: React.FC<{
  className?: string;
  color?: 'pink' | 'blue' | 'lavender' | 'yellow';
  rotation?: number;
}> = ({ className = '', color = 'pink', rotation = 0 }) => {
  const colorClass = {
    pink: 'washi-tape',
    blue: 'washi-tape washi-tape-blue',
    lavender: 'washi-tape washi-tape-lavender',
    yellow: 'washi-tape washi-tape-yellow',
  }[color];

  return (
    <div
      className={`${colorClass} ${className} pointer-events-none`}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    />
  );
};

export const DoodleStar: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`inline-block select-none pointer-events-none text-[#F4B266] ${className}`}
    aria-hidden="true"
  >
    <path d="M12 2L14.4 8.6L21 9.2L16 13.8L17.5 20.4L12 17L6.5 20.4L8 13.8L3 9.2L9.6 8.6L12 2Z" />
  </svg>
);

export const DoodleHeart: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`inline-block select-none pointer-events-none text-[#F4A7B9] ${className}`}
    aria-hidden="true"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const DoodleSparkle: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`inline-block select-none pointer-events-none text-[#93C5FD] ${className}`}
    aria-hidden="true"
  >
    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
  </svg>
);

export const ScrapbookSticker: React.FC<{
  text: string;
  emoji?: string;
  className?: string;
  bg?: string;
  rotation?: number;
}> = ({ text, emoji, className = '', bg = 'bg-[#FFF2D6] text-[#785434]', rotation = -2 }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-sm border border-black/5 select-none pointer-events-none ${bg} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {emoji && <span>{emoji}</span>}
      <span className="font-doodle tracking-normal text-sm sm:text-base">{text}</span>
    </div>
  );
};
