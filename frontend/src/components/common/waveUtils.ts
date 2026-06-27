/** Tile width — every wave path must loop cleanly at x=0 and x=TILE_WIDTH */
export const WAVE_TILE = 1440;

/**
 * Seamless sine-wave fill path using SVG Q/T commands.
 * `period` must divide WAVE_TILE evenly.
 */
export function sineWavePath(
  width: number,
  height: number,
  amplitude: number,
  period: number,
  baseline: number,
): string {
  const half = period / 2;
  const quarter = period / 4;
  const segments = width / half;

  let d = `M0,${baseline} Q${quarter},${baseline - amplitude} ${half},${baseline}`;

  for (let i = 1; i < segments; i++) {
    d += ` T${(i + 1) * half},${baseline}`;
  }

  d += ` L${width},${height} L0,${height} Z`;
  return d;
}

export interface WaveLayerConfig {
  amplitude: number;
  period: number;
  baseline: number;
  fill: string;
  opacity: number;
  duration: number;
  reverse?: boolean;
}
