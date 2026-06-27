import { sineWavePath, WAVE_TILE } from './waveUtils';

interface WaveLayerProps {
  amplitude: number;
  period: number;
  baseline: number;
  fill: string;
  opacity?: number;
  duration: number;
  reverse?: boolean;
  height?: number;
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}

/**
 * One horizontally scrolling wave layer.
 * Two identical tiles side-by-side animate as a seamless loop.
 */
const WaveLayer = ({
  amplitude,
  period,
  baseline,
  fill,
  opacity = 1,
  duration,
  reverse = false,
  height = 120,
  className = '',
  stroke,
  strokeWidth,
}: WaveLayerProps) => {
  const path = sineWavePath(WAVE_TILE, height, amplitude, period, baseline);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="bay-wave-track flex h-full w-[200%]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {[0, 1].map((i) => (
          <svg
            key={i}
            viewBox={`0 0 ${WAVE_TILE} ${height}`}
            preserveAspectRatio="none"
            className="block h-full flex-[0_0_50%]"
            aria-hidden="true"
          >
            <path
              d={path}
              fill={fill}
              fillOpacity={opacity}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default WaveLayer;
