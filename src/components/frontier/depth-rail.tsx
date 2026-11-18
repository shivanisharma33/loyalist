"use client";

import { useEffect, useState } from "react";

const stations = [
  { id: "surface", label: "Surface" },
  { id: "prologue", label: "District" },
  { id: "strategy", label: "Strategy" },
  { id: "district", label: "Map" },
  { id: "people", label: "People" },
  { id: "investors", label: "Investors" },
  { id: "news", label: "News" },
  { id: "contact", label: "Contact" },
];

/**
 * Borehole log navigation for the homepage: each chapter is a station down the hole. It tracks
 * the chapter in view and jumps to any station. Rendered with `mix-blend-difference` so it stays
 * legible over both the limestone and forest grounds. Desktop only.
 */
export function DepthRail() {
  const [active, setActive] = useState("surface");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = stations.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav aria-label="Homepage chapters" className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 text-[#efe9de] mix-blend-difference 2xl:block">
      <div className="relative pr-4">
        <span aria-hidden="true" className="absolute right-0 top-0 h-full w-px bg-current opacity-30" />
        <span aria-hidden="true" className="absolute right-0 top-0 w-px origin-top bg-current" style={{ height: "100%", transform: `scaleY(${progress})` }} />
        <ol className="pointer-events-auto grid gap-1">
          {stations.map((s, i) => {
            const on = s.id === active;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`group flex min-h-7 items-center justify-end gap-2 font-mono text-[0.625rem] uppercase tracking-[0.1em] transition-opacity ${on ? "opacity-100" : "opacity-45 hover:opacity-100"}`}
                >
                  <span className={`transition-[max-width,opacity] duration-300 ${on ? "max-w-24 opacity-100" : "max-w-0 overflow-hidden opacity-0 group-hover:max-w-24 group-hover:opacity-100 group-focus-visible:max-w-24 group-focus-visible:opacity-100"}`}>
                    {s.label}
                  </span>
                  <span className="tabular-nums">{String(i).padStart(2, "0")}</span>
                  <span aria-hidden="true" className={`h-px bg-current transition-[width] ${on ? "w-4" : "w-2"}`} />
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
