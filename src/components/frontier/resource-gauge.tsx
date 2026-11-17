import { tullyMre } from "@/content/frontier";

const S = 440;
const C = S / 2;
const R = 168; // data ring radius
const STROKE = 16;
const CIRC = 2 * Math.PI * R;
const GAP = 6; // px gap between arcs along the ring

const indicatedShare = tullyMre.indicated.koz / (tullyMre.indicated.koz + tullyMre.inferred.koz); // 0.7257

/**
 * Resource composition gauge: one ring split by confidence class, on a fine instrument scale.
 * It shows proportion only — the two categories are labelled separately and never summed.
 */
export function ResourceGauge({ className = "" }: { className?: string }) {
  const ind = CIRC * indicatedShare - GAP;
  const inf = CIRC * (1 - indicatedShare) - GAP;
  const ticks = Array.from({ length: 120 }, (_, i) => {
    const a = (i / 120) * Math.PI * 2 - Math.PI / 2;
    const major = i % 10 === 0;
    const r1 = R + 26;
    const r2 = r1 + (major ? 12 : 5);
    return { x1: C + Math.cos(a) * r1, y1: C + Math.sin(a) * r1, x2: C + Math.cos(a) * r2, y2: C + Math.sin(a) * r2, major };
  });

  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${S} ${S}`} className="mx-auto block h-auto w-full max-w-[30rem]" role="img" aria-labelledby="gauge-t">
        <title id="gauge-t">
          About 73 percent of Tully&apos;s contained ounces are classified Indicated (164,000 ounces) and 27 percent Inferred (62,000 ounces).
        </title>
        <defs>
          <filter id="gauge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Scale */}
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={t.major ? "rgba(239,233,222,0.45)" : "rgba(239,233,222,0.14)"} strokeWidth={t.major ? 1.5 : 1} />
        ))}
        <circle cx={C} cy={C} r={R - 34} fill="none" stroke="rgba(239,233,222,0.08)" />
        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(239,233,222,0.06)" strokeWidth={STROKE} />

        {/* Data arcs — start at 12 o'clock */}
        <g transform={`rotate(-90 ${C} ${C})`}>
          <circle
            className="gauge-arc"
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="#d4ab55"
            strokeWidth={STROKE}
            strokeDasharray={`${ind} ${CIRC}`}
            filter="url(#gauge-glow)"
            style={{ ["--len" as string]: ind }}
          />
          <circle
            className="gauge-arc"
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="#b5643a"
            strokeOpacity="0.85"
            strokeWidth={STROKE}
            strokeDasharray={`${inf} ${CIRC}`}
            strokeDashoffset={-(ind + GAP)}
            style={{ ["--len" as string]: inf, animationDelay: "500ms" }}
          />
        </g>

        {/* Readout */}
        <text x={C} y={C - 14} textAnchor="middle" fontFamily="var(--font-cormorant)" fontSize="88" fill="#efe9de">
          {tullyMre.indicatedShare}%
        </text>
        <text x={C} y={C + 30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="2" fill="rgba(239,233,222,0.6)">
          OF CONTAINED OUNCES
        </text>
        <text x={C} y={C + 52} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="2" fill="#d4ab55">
          INDICATED
        </text>
      </svg>

      <figcaption className="mt-6 grid grid-cols-2 gap-4 pt-2">
        <div className="border-t-2 border-gold-bright pt-3">
          <span className="tech block text-xs font-semibold text-gold-bright">Indicated</span>
          <span className="numeral mt-1 block text-xl sm:text-2xl text-ivory">164,000 oz</span>
          <span className="tech mt-0.5 block text-xs text-ivory/60">1.62 Mt @ 3.16 g/t</span>
        </div>
        <div className="border-t-2 border-oxide pt-3">
          <span className="tech block text-xs font-semibold text-oxide">Inferred</span>
          <span className="numeral mt-1 block text-xl sm:text-2xl text-ivory">62,000 oz</span>
          <span className="tech mt-0.5 block text-xs text-ivory/60">0.95 Mt @ 2.03 g/t</span>
        </div>
      </figcaption>
    </figure>
  );
}
