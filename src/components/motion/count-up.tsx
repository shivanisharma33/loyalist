"use client";

import { useEffect, useRef, useState } from "react";

type Props = { value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number };

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Counts up to `value` when scrolled into view. The final figure is server-rendered (and
 * exposed to assistive tech), so crawlers, no-JS and reduced-motion visitors always see it.
 */
export function CountUp({ value, prefix = "", suffix = "", decimals = 0, duration = 1800 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    // Already on screen at load: leave the final value alone rather than flashing to zero.
    if (rect.top < window.innerHeight && rect.bottom > 0) return;
    setDisplay(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(value * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const final = `${prefix}${format(value, decimals)}${suffix}`;
  return (
    <span ref={ref}>
      <span className="sr-only">{final}</span>
      <span aria-hidden="true">
        {prefix}
        {format(display, decimals)}
        {suffix}
      </span>
    </span>
  );
}
