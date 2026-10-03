import React from 'react';

interface PrismaticStarProps {
  className?: string;
  size?: number;
}

export const PrismaticStar: React.FC<PrismaticStarProps> = ({
  className = '',
  size = 24,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="prismaticGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFAA80" />
          <stop offset="35%" stopColor="#FF4D6D" />
          <stop offset="70%" stopColor="#C724B1" />
          <stop offset="100%" stopColor="#7928CA" />
        </linearGradient>
      </defs>
      {/* 4-point concave star matching reference icon exactly */}
      <path
        d="M12 1.5C12 7.29899 7.29899 12 1.5 12C7.29899 12 12 16.701 12 22.5C12 16.701 16.701 12 22.5 12C16.701 12 12 7.29899 12 1.5Z"
        fill="url(#prismaticGrad)"
      />
    </svg>
  );
};
