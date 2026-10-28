// Deterministic topographic contour lines, rendered on the server as a static SVG.
// Each line is a sum of low-frequency sine waves smoothed with Catmull-Rom splines, so it
// reads as geological mapping rather than decoration, and ships zero JavaScript.

type ContourProps = {
  className?: string;
  lines?: number;
  seed?: number;
  /** Animate the stroke drawing in (CSS, motion-safe only). */
  draw?: boolean;
  /** Slow drifting movement (CSS, motion-safe only). */
  drift?: boolean;
  strokeClassName?: string;
};

function rand(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function catmullRom(points: [number, number][]): string {
  let d = `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

export function contourPaths(lines: number, seed: number, width = 1600, height = 900): string[] {
  const r = rand(seed);
  const waves = Array.from({ length: 4 }, () => ({ f: 0.6 + r() * 2.2, p: r() * Math.PI * 2, a: 18 + r() * 46 }));
  const bulge = { x: 0.25 + r() * 0.5, w: 0.18 + r() * 0.2, a: 60 + r() * 90 };
  const paths: string[] = [];
  for (let l = 0; l < lines; l++) {
    const t = l / Math.max(1, lines - 1);
    const baseY = height * (0.08 + t * 0.9);
    const pts: [number, number][] = [];
    for (let i = 0; i <= 24; i++) {
      const x = (i / 24) * (width + 200) - 100;
      const u = x / width;
      let y = baseY;
      for (const w of waves) y += Math.sin(u * w.f * Math.PI * 2 + w.p + t * 1.3) * w.a * (0.55 + t * 0.6);
      y -= Math.exp(-((u - bulge.x) ** 2) / (2 * bulge.w ** 2)) * bulge.a * (1 - Math.abs(t - 0.5));
      pts.push([x, y]);
    }
    paths.push(catmullRom(pts));
  }
  return paths;
}

export function Contours({ className, lines = 14, seed = 7, draw = false, drift = false, strokeClassName = "stroke-gold-bright/25" }: ContourProps) {
  const paths = contourPaths(lines, seed);
  return (
    <svg
      className={className}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className={`${draw ? "contour-draw" : ""} ${drift ? "contour-drift" : ""}`}>
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeWidth={i % 5 === 0 ? 1.1 : 0.7}
            className={strokeClassName}
            style={{ ["--i" as string]: i }}
          />
        ))}
      </g>
    </svg>
  );
}
