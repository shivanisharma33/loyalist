"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not(.is-in), [data-reveal-group]:not(.is-in)";

/**
 * One shared IntersectionObserver for every scroll reveal on the page. Elements opt in
 * with `data-reveal` (or `data-reveal-group` for line-mask headings); CSS only hides them
 * when `html.js` is set and motion is allowed, so content never depends on this running.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.documentElement.classList.remove("js");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    const scan = (root: ParentNode = document) => root.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    scan();
    // Streamed or client-rendered sections (Suspense, route changes) arrive later.
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && (n.matches(SELECTOR) ? io.observe(n) : scan(n)));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
