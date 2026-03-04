import React from 'react';

// Interface extends standard SVG props so you can pass className, onClick, etc.
interface ShapeProps extends React.SVGProps<SVGSVGElement> {}

// 1. The Circle
export const GoogleCircle: React.FC<ShapeProps> = ({ className, ...props }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`fill-current ${className}`} // "fill-current" allows Tailwind text-color to work
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="50" cy="50" r="50" />
  </svg>
);

// 2. The Triangle
export const GoogleTriangle: React.FC<ShapeProps> = ({ className, ...props }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`fill-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M50 15 L100 85 L0 85 Z" />
  </svg>
);

<path d="M372.7 186.3 320 160l-26.3-52.7a60 60 0 0 0-107.4 0L160 160l-52.7 26.3a60 60 0 0 0 0 107.4L160 320l26.3 52.7a60 60 0 0 0 107.4 0L320 320l52.7-26.3a60 60 0 0 0 0-107.4Z" fill="#808"></path>


// 3. The Square (with "Google" styling - slight rounded corners)
export const GoogleSquare: React.FC<ShapeProps> = ({ className, ...props }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`fill-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="10" y="10" width="80" height="80" rx="15" />
  </svg>
);

// 4. The Pill/Half-Circle (Common in Google Branding)
export const GooglePill: React.FC<ShapeProps> = ({ className, ...props }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`fill-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="20" y="10" width="60" height="80" rx="30" />
  </svg>
);