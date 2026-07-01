interface CityDividerProps {
  variant?: 'stadium' | 'bridge' | 'skyline' | 'trees' | 'waves';
  flip?: boolean;
  className?: string;
}

const CityDivider = ({ variant = 'waves', flip = false, className = '' }: CityDividerProps) => {
  const renderPath = () => {
    switch (variant) {
      case 'stadium':
        return (
          <path
            d="M0,60 Q80,20 160,50 Q200,60 240,30 Q300,10 360,45 Q420,70 480,40 Q540,15 600,50 Q680,80 760,35 Q840,10 920,55 Q960,70 1000,45 L1000,120 L0,120 Z"
            fill="#61A644"
          />
        );
      case 'bridge':
        return (
          <path
            d="M0,80 Q100,30 200,60 Q300,90 400,50 Q500,10 600,55 Q700,90 800,45 Q900,20 1000,65 L1000,120 L0,120 Z"
            fill="#0C3C34"
          />
        );
      case 'skyline':
        return (
          <>
            <path
              d="M0,90 L50,90 L50,55 L70,55 L70,40 L90,40 L90,55 L120,55 L120,70 L150,70 L150,45 L165,45 L165,30 L180,30 L180,45 L200,45 L200,65 L250,65 L250,50 L280,50 L280,35 L300,35 L300,50 L330,50 L330,75 L380,75 L380,55 L400,55 L400,40 L420,40 L420,60 L470,60 L470,80 L520,80 L520,50 L540,50 L540,35 L555,25 L570,35 L570,50 L600,50 L600,70 L650,70 L650,55 L680,55 L680,40 L700,40 L700,60 L750,60 L750,80 L800,80 L800,55 L820,55 L820,38 L840,38 L840,55 L870,55 L870,75 L920,75 L920,60 L950,60 L950,45 L970,45 L970,65 L1000,65 L1000,120 L0,120 Z"
              fill="#0C3C34"
            />
            {/* Window lights */}
            {[75, 160, 170, 290, 410, 545, 555, 690, 830].map((x, i) => (
              <rect
                key={i}
                x={x}
                y={45 + (i % 3) * 8}
                width="3"
                height="3"
                fill="#E37100"
                rx="0.5"
              />
            ))}
          </>
        );
      case 'trees':
        return (
          <>
            <path
              d="M0,85 Q50,70 100,80 Q150,60 200,75 Q250,50 300,70 Q350,80 400,65 Q450,45 500,60 Q550,75 600,55 Q650,40 700,65 Q750,80 800,60 Q850,45 900,70 Q950,80 1000,75 L1000,120 L0,120 Z"
              fill="#0C3C34"
            />
            {/* Tree silhouettes */}
            {[80, 230, 450, 620, 870].map((x, i) => (
              <path
                key={i}
                d={`M${x},${70 - i * 2} L${x - 12},${90 - i * 2} L${x - 4},${85 - i * 2} L${x - 15},${100 - i * 2} L${x + 15},${100 - i * 2} L${x + 4},${85 - i * 2} L${x + 12},${90 - i * 2} Z`}
                fill="#61A644"
              />
            ))}
          </>
        );
      case 'waves':
      default:
        return (
          <path
            d="M0,60 C166,100 333,20 500,60 C666,100 833,20 1000,60 L1000,120 L0,120 Z"
            fill="#61A644"
          />
        );
    }
  };

  return (
    <div
      className={`city-divider select-none pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        transform: flip ? 'scaleY(-1)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {renderPath()}
      </svg>
    </div>
  );
};

export default CityDivider;
