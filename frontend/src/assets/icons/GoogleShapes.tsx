import React from 'react';

interface ShapeProps extends React.SVGProps<SVGSVGElement> { }

// 1. Wave shape — Bay Beach ripple (wavy top & bottom band)
export const WaveShape: React.FC<ShapeProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 100 100"
    className={`fill-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 42 C12 28 25 56 37 42 C50 28 62 56 75 42 C87 28 100 56 100 42 L100 58 C87 72 75 44 62 58 C50 72 37 44 25 58 C12 72 0 44 0 58 Z" opacity="0.65" />
    <path d="M0 48 C12 36 25 62 37 48 C50 36 62 62 75 48 C87 36 100 62 100 48 L100 62 C87 74 75 48 62 62 C50 74 37 48 25 62 C12 74 0 48 0 62 Z" opacity="0.35" />
  </svg>
);

// 2. Leaf shape — nature element
export const LeafShape: React.FC<ShapeProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 100 100"
    className={`fill-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M50 5 C 20 20, 5 50, 50 95 C 95 50, 80 20, 50 5 Z" />
    <path d="M50 25 L50 80" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
  </svg>
);

// 3. Flame shape — phoenix fire
export const FlameShape: React.FC<ShapeProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 100 100"
    className={`fill-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M50 5 C 35 25, 15 45, 25 70 C 30 80, 40 90, 50 95 C 60 90, 70 80, 75 70 C 85 45, 65 25, 50 5 Z" />
    <path d="M50 35 C 42 50, 35 60, 40 75 C 43 82, 47 88, 50 90 C 53 88, 57 82, 60 75 C 65 60, 58 50, 50 35 Z" opacity="0.4" />
  </svg>
);

// 4. Feather shape — phoenix feather
export const FeatherShape: React.FC<ShapeProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 100 100"
    className={`fill-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M50 5 C 30 15, 15 40, 20 70 C 22 80, 30 90, 50 95 C 45 75, 42 55, 50 35 C 58 55, 55 75, 50 95 C 70 90, 78 80, 80 70 C 85 40, 70 15, 50 5 Z" />
  </svg>
);

// Keep backwards compatibility aliases
export const GoogleCircle = WaveShape;
export const GoogleTriangle = FlameShape;
export const GoogleSquare = LeafShape;
export const GooglePill = FeatherShape;