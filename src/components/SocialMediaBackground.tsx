import React from 'react';

export type BackgroundTheme = 'dark' | 'light';

interface SocialMediaBackgroundProps {
  theme?: BackgroundTheme;
}

/**
 * Website Background strictly matching Reference Image 4:
 * - Rich dark social-media atmosphere (#08090f to #0e111a) with spatial ambient depth
 * - Subtle micro-dot matrix pattern across the entire canvas with soft radial falloff
 * - Subtle ambient studio spotlight at top center
 * - Matte textured surface feel (no flat digital emptiness)
 * - Seamless full-viewport coverage continuing behind all major sections
 * - Cohesive Light Theme with clean porcelain studio tone and high text contrast
 */
export const SocialMediaBackground: React.FC<SocialMediaBackgroundProps> = ({
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none transition-colors duration-500 ${
        isLight ? 'bg-[#f8fafc]' : 'bg-[#08090f]'
      }`}
      aria-hidden="true"
    >
      {/* 1. Ambient Studio Depth & Lighting */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse 90% 65% at 50% -5%, rgba(226, 232, 240, 0.85) 0%, rgba(241, 245, 249, 0.45) 55%, rgba(248, 250, 252, 0) 100%)'
            : 'radial-gradient(ellipse 90% 65% at 50% -10%, rgba(32, 38, 58, 0.55) 0%, rgba(14, 17, 27, 0.8) 50%, rgba(8, 9, 15, 0.98) 100%)',
        }}
      />

      {/* 2. Micro-dot Grid Pattern Texture (Reference Image 4 Dark Social-Media Pattern) */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: isLight
            ? 'radial-gradient(rgba(15, 23, 42, 0.08) 1.25px, transparent 1.25px)'
            : 'radial-gradient(rgba(255, 255, 255, 0.09) 1.25px, transparent 1.25px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0',
          maskImage: 'radial-gradient(ellipse 95% 85% at 50% 35%, black 45%, rgba(0,0,0,0.35) 85%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 35%, black 45%, rgba(0,0,0,0.35) 85%, transparent 100%)',
        }}
      />

      {/* 3. Subtle Vignette Edge Shadow */}
      <div
        className="absolute inset-0"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse at center, transparent 65%, rgba(226, 232, 240, 0.4) 100%)'
            : 'radial-gradient(ellipse at center, transparent 60%, rgba(5, 6, 10, 0.85) 100%)',
        }}
      />

      {/* 4. Fine Organic Matte Noise Texture Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="social-bg-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#social-bg-grain)" />
      </svg>
    </div>
  );
};
