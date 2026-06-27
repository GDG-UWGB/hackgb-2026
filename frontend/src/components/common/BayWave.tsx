import WaveLayer from './WaveLayer';

interface BayWaveProps {
  /** Dark fill for transitions into the footer */
  variant?: 'light' | 'dark';
  className?: string;
}

const BayWave = ({ variant = 'light', className = '' }: BayWaveProps) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={`bay-wave-divider relative w-full overflow-hidden select-none pointer-events-none z-10 ${className}`}
      aria-hidden="true"
      style={{ height: 'clamp(2.5rem, 6vw, 4rem)', marginTop: '-1px', marginBottom: '-1px' }}
    >
      <WaveLayer
        amplitude={10}
        period={360}
        baseline={64}
        fill={isDark ? '#0C3C34' : '#61A644'}
        opacity={isDark ? 1 : 0.14}
        duration={22}
        height={100}
      />
    </div>
  );
};

export default BayWave;
