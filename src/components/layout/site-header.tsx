"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { company, navigation, socials, type NavItem } from "@/content/site";
import { ArrowRight, ArrowUpRight, ChevronDown, CloseIcon, SocialIcon } from "@/components/ui/icons";

const sectionOf = (href: string) => "/" + (href.split("/")[1] ?? "");
const isFile = (href: string) => href.endsWith(".pdf") || href.startsWith("http");

function isActive(pathname: string, item: NavItem) {
  if (isFile(item.href)) return false;
  return pathname === item.href || pathname.startsWith(sectionOf(item.href) + "/") || pathname === sectionOf(item.href);
}

function NavLink({ href, className, children, onClick, ...rest }: { href: string; className?: string; children: React.ReactNode; onClick?: () => void } & Omit<React.ComponentProps<"a">, "href">) {
  if (isFile(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

/** One line of context per section, used in the dropdown panels and the menu overlay. */
const sectionNotes: Record<string, string> = {
  About: "A Timmins-focused developer advancing toward production — strategy, mission and the people behind it.",
  Projects: "Four properties in the Timmins–Porcupine gold camp, led by the Tully Gold Project.",
  Investors: "Capital structure, financial statements, NI 43-101 technical reports and meeting materials.",
  "Press Releases": "Every Company news release, newest first.",
  Contact: "Toronto head office · info@loyalistexploration.com",
};

const projectImages: Record<string, string> = {
  "/projects/tully": "/projects/tully.png",
  "/projects/loveland": "/projects/loveland.png",
  "/projects/gold-rush": "/projects/gold-rush.png",
  "/projects/desantis": "/projects/desantis.png",
};

/* ───────────────────────── Dropdown panels ───────────────────────── */

function PanelLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const file = isFile(item.href);
  return (
    <NavLink href={item.href} onClick={onNavigate} className="group flex items-start justify-between gap-6 border-b border-hair-dark py-4">
      <span>
        <span className="block font-display text-[1.1875rem] leading-snug text-ivory transition-colors group-hover:text-gold-bright">{item.label}</span>
        {item.description && <span className="mt-1 block text-[0.8125rem] text-ivory/55">{item.description}</span>}
      </span>
      {file ? (
        <ArrowUpRight size={15} className="mt-1.5 shrink-0 text-gold-bright" />
      ) : (
        <ArrowRight size={15} className="mt-1.5 shrink-0 text-ivory/40 transition-[transform,color] group-hover:translate-x-1 group-hover:text-gold-bright" />
      )}
    </NavLink>
  );
}

function Panel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const children = item.children ?? [];
  const intro = (
    <div className="lg:col-span-3">
      <p className="tech text-gold-bright">{item.label}</p>
      <p className="mt-4 max-w-[22em] text-[0.9375rem] leading-relaxed text-ivory/65">{sectionNotes[item.label]}</p>
      <NavLink href={item.href} onClick={onNavigate} className="btn-label group mt-6 inline-flex min-h-11 items-center gap-2 text-ivory hover:text-gold-bright">
        {item.label === "Projects" ? "All projects" : `${item.label} overview`}
        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
      </NavLink>
    </div>
  );

  if (item.label === "Projects") {
    return (
      <div className="grid gap-8 lg:grid-cols-12">
        {intro}
        <ul className="grid grid-cols-4 gap-5 lg:col-span-9">
          {children.map((c) => (
            <li key={c.href}>
              <NavLink href={c.href} onClick={onNavigate} className="group block">
                <span className="relative block aspect-[4/3] overflow-hidden bg-ink-850">
                  <Image
                    src={projectImages[c.href] ?? "/hero.webp"}
                    alt=""
                    fill
                    sizes="18vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </span>
                <span className="display-sm mt-3 block text-ivory transition-colors group-hover:text-gold-bright">{c.label.replace(" Project", "").replace(" Mine Property", "")}</span>
                <span className="mt-1 block text-[0.8125rem] text-ivory/55">{c.description}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (item.label === "Investors") {
    const deck = children.find((c) => isFile(c.href));
    const pages = children.filter((c) => !isFile(c.href));
    return (
      <div className="grid gap-8 lg:grid-cols-12">
        {intro}
        <ul className="grid grid-cols-2 gap-x-8 border-t border-hair-dark lg:col-span-6">
          {pages.map((c) => (
            <li key={c.href}>
              <PanelLink item={c} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
        {deck && (
          <a
            href={deck.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className="group flex flex-col justify-between border border-gold-bright/40 p-6 transition-colors hover:border-gold-bright lg:col-span-3"
          >
            <span>
              <span className="tech text-gold-bright">PDF · Updated {company.presentation.updated}</span>
              <span className="display-sm mt-3 block text-ivory">Corporate presentation</span>
            </span>
            <span className="btn-label mt-6 inline-flex items-center gap-2 text-ivory group-hover:text-gold-bright">
              Download
              <ArrowUpRight size={13} />
            </span>
          </a>
        )}
      </div>
    );
  }

  // About
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {intro}
      <ul className="border-t border-hair-dark lg:col-span-5">
        {children.map((c) => (
          <li key={c.href}>
            <PanelLink item={c} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
      <figure className="border-l border-hair-dark pl-8 lg:col-span-4">
        <blockquote className="display-sm text-ivory/85">“We intend to be future miners.”</blockquote>
        <figcaption className="tech mt-4 text-ivory/50">Errol Farr · President &amp; CEO</figcaption>
      </figure>
    </div>
  );
}

/* ───────────────────────── Header ───────────────────────── */

/**
 * Editorial navigation. Logo left, section links centred, actions right. About, Projects and
 * Investors open full-width panels on hover or keyboard focus. The bar compacts once scrolled,
 * draws a reading-progress hairline, hides while reading downward and returns on scroll up.
 * "Menu" opens a full-screen contents page at every width.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [focusGroup, setFocusGroup] = useState(navigation[1].label);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Set while Escape returns focus to a trigger, so that focus does not reopen its panel.
  const suppressFocusOpen = useRef(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 24);
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > window.innerHeight * 0.6);
          last = y;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Close everything whenever the route changes (state adjustment during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(null);
  }

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  const openPanel = (label: string | null) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setMenu(label);
  };
  const scheduleClose = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setMenu(null), 140);
  };

  // Panels close on Escape (returning focus to their link) and on outside clicks.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = document.querySelector<HTMLElement>(`[data-menu-trigger="${menu}"]`);
      setMenu(null);
      suppressFocusOpen.current = true;
      trigger?.focus();
      suppressFocusOpen.current = false;
    };
    const onDown = (e: PointerEvent) => !(e.target as Element).closest("header") && setMenu(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [menu]);

  // Menu overlay: scroll lock, initial focus, focus trap, Escape.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("menu-open");
    const raf = requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = [...dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const solid = scrolled || open || menu !== null;
  const group = navigation.find((n) => n.label === focusGroup) ?? navigation[0];

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[80] -translate-y-24 bg-gold-bright px-4 py-2 text-sm font-semibold text-ink-950 transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        onPointerLeave={scheduleClose}
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden && !open && !menu ? "-translate-y-full" : "translate-y-0"
        } ${solid ? "border-b border-hair-dark bg-ink-950/92 backdrop-blur-xl" : "border-b border-transparent bg-gradient-to-b from-ink-950/60 to-transparent"}`}
      >
        <div
          className={`mx-auto grid max-w-[110rem] grid-cols-[1fr_auto] items-center gap-6 px-[var(--gutter)] text-ivory transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] xl:grid-cols-[1fr_auto_1fr] ${
            scrolled ? "h-16" : "h-[var(--header-h)]"
          }`}
        >
          <Link href="/" className="-m-1 justify-self-start p-1" aria-label="Loyalist Exploration — home">
            <Image
              src="/logo-light-trim.webp"
              alt="Loyalist Exploration"
              width={2329}
              height={446}
              preload
              className={`w-auto transition-[height] duration-500 ${scrolled ? "h-7" : "h-7 sm:h-8"}`}
              sizes="190px"
            />
          </Link>

          <nav
            aria-label="Main"
            className="hidden xl:block"
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setMenu(null)}
          >
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const active = isActive(pathname, item);
                const expanded = menu === item.label;
                const hasPanel = !!item.children;
                return (
                  <li
                    key={item.label}
                    onPointerEnter={() => openPanel(hasPanel ? item.label : null)}
                    onFocus={() => !suppressFocusOpen.current && openPanel(hasPanel ? item.label : null)}
                  >
                    <NavLink
                      href={item.href}
                      data-menu-trigger={item.label}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={hasPanel ? expanded : undefined}
                      aria-controls={hasPanel ? `panel-${item.label}` : undefined}
                      className={`group relative inline-flex h-11 items-center gap-1.5 px-4 text-[0.875rem] font-medium tracking-[0.02em] transition-colors ${
                        active || expanded ? "text-ivory" : "text-ivory/70 hover:text-ivory"
                      }`}
                    >
                      {item.label}
                      {hasPanel && <ChevronDown size={12} className={`opacity-60 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-4 bottom-1 h-px origin-center bg-gold-bright transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          active || expanded ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </NavLink>

                    {hasPanel && (
                      <div
                        id={`panel-${item.label}`}
                        className={`absolute inset-x-0 top-full border-b border-hair-dark bg-ink-950 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] transition-[opacity,transform,visibility] duration-300 ease-out ${
                          expanded ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                        }`}
                      >
                        <div className="mx-auto max-w-[110rem] px-[var(--gutter)] py-10">
                          <Panel item={item} onNavigate={() => setMenu(null)} />
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end gap-3">
            <a
              href={company.quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tech hidden h-10 items-center gap-2 text-ivory/65 transition-colors hover:text-gold-bright 2xl:inline-flex"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-bright" />
              {company.ticker}
              <span className="sr-only">(share quote, opens in a new tab)</span>
            </a>
            <a
              href={company.presentation.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden h-10 items-center gap-2 bg-gold-bright px-5 text-[0.8125rem] font-semibold tracking-[0.02em] text-ink-950 transition-colors hover:bg-ivory lg:inline-flex"
            >
              Investor Presentation
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="site-index"
              onClick={() => {
                setMenu(null);
                setOpen(true);
              }}
              className="group inline-flex h-10 items-center gap-3 border border-hair-dark-strong pl-4 pr-3.5 text-[0.8125rem] font-medium tracking-[0.02em] text-ivory transition-colors hover:border-ivory/70"
            >
              Menu
              <span aria-hidden="true" className="flex w-[18px] flex-col items-end gap-[5px]">
                <span className="h-px w-[18px] bg-current" />
                <span className="h-px w-3 bg-gold-bright transition-[width] duration-300 group-hover:w-[18px]" />
              </span>
            </button>
          </div>
        </div>

        {/* Reading progress */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-[-1px] h-px origin-left bg-gold-bright transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* ───────── Menu overlay ───────── */}
      <div
        id="site-index"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-[70] overflow-y-auto bg-ink-950 text-ivory ${
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
        // Visible immediately on open (so focus can land), hidden only after the wipe on close.
        style={{ transition: `clip-path 700ms cubic-bezier(0.76,0,0.24,1), visibility 0s linear ${open ? "0s" : "700ms"}` }}
      >
        <div className="mx-auto flex min-h-full max-w-[110rem] flex-col px-[var(--gutter)]">
          <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-hair-dark">
            <Image src="/logo-light-trim.webp" alt="" width={2329} height={446} className="h-7 w-auto sm:h-8" sizes="190px" />
            <p className="text-xs text-ivory/60 hidden md:block">Timmins, Ontario · {company.ticker}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="-mr-1 inline-flex h-10 items-center gap-2 border border-hair-dark-strong px-4 text-[0.8125rem] font-medium text-ivory transition-colors hover:border-ivory/70"
            >
              Close
              <CloseIcon size={16} />
            </button>
          </div>

          <div className="grid flex-1 gap-10 py-10 lg:grid-cols-12 lg:gap-8 lg:py-16">
            <nav aria-label="Site menu" className="lg:col-span-6">
              <ul>
                {navigation.map((item, i) => {
                  const active = isActive(pathname, item);
                  const focused = focusGroup === item.label;
                  return (
                    <li
                      key={item.label}
                      className={`border-t border-hair-dark transition-[opacity,transform] duration-700 last:border-b ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                      style={{ transitionDelay: open ? `${180 + i * 70}ms` : "0ms" }}
                    >
                      <NavLink
                        href={item.href}
                        onClick={() => setOpen(false)}
                        onMouseEnter={() => setFocusGroup(item.label)}
                        onFocus={() => setFocusGroup(item.label)}
                        aria-current={active ? "page" : undefined}
                        className="group flex items-center justify-between gap-6 py-3 sm:py-4"
                      >
                        <span className={`display-xl transition-[color,transform] duration-500 group-hover:translate-x-2 ${active || focused ? "text-ivory" : "text-ivory/40"}`}>
                          {item.label}
                        </span>
                        <ArrowRight
                          size={22}
                          className={`shrink-0 transition-[opacity,transform] duration-500 ${active || focused ? "translate-x-0 text-gold-bright opacity-100" : "-translate-x-3 opacity-0"}`}
                        />
                      </NavLink>
                      {item.children && (
                        <ul className="-mt-1 flex flex-wrap gap-x-5 pb-4 lg:hidden">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <NavLink href={c.href} onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center text-[0.9375rem] text-ivory/60 hover:text-gold-bright">
                                {c.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop: the focused section's contents. */}
            <div className="hidden lg:col-span-3 lg:block" aria-live="polite">
              <p className="tech text-gold-bright">{group.label}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ivory/60">{sectionNotes[group.label]}</p>
              {group.children ? (
                <ul className="mt-8 border-t border-hair-dark">
                  {group.children.map((c) => (
                    <li key={c.href}>
                      <PanelLink item={c} onNavigate={() => setOpen(false)} />
                    </li>
                  ))}
                </ul>
              ) : (
                <NavLink href={group.href} onClick={() => setOpen(false)} className="btn-label mt-8 inline-flex min-h-11 items-center gap-2 text-ivory hover:text-gold-bright">
                  Open {group.label}
                  <ArrowRight size={14} />
                </NavLink>
              )}
            </div>

            <aside className="grid content-start gap-8 border-t border-hair-dark pt-8 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <p className="tech text-ivory/50">Flagship · Tully Gold Project</p>
                <p className="figure-lg mt-3 text-gold-bright">164,000 oz</p>
                <p className="mt-1 text-sm text-ivory/60">Indicated at 3.16 g/t Au · plus 62,000 oz Inferred at 2.03 g/t Au</p>
                <p className="mt-2 text-xs leading-relaxed text-ivory/40">2026 MRE, effective June 15, 2026. Mineral Resources are not Mineral Reserves.</p>
              </div>
              <div className="grid gap-1 text-[0.9375rem]">
                <a className="inline-flex min-h-11 items-center hover:text-gold-bright" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                <a className="inline-flex min-h-11 items-center hover:text-gold-bright" href={company.phoneHref}>
                  {company.phoneDisplay}
                </a>
              </div>
              <a
                href={company.presentation.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-between gap-2 bg-gold-bright px-5 text-[0.8125rem] font-semibold text-ink-950 hover:bg-ivory"
              >
                Investor Presentation
                <ArrowUpRight size={15} />
              </a>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xs border border-hair-dark bg-white/5 text-ivory/70 transition-all hover:border-gold-bright hover:bg-gold-bright/10 hover:text-gold-bright"
                  >
                    <SocialIcon name={s.label} size={18} />
                  </a>
                ))}
              </div>
            </aside>
          </div>

          <p className="display-sm border-t border-hair-dark py-6 text-ivory/50">Buy Timmins, Mine Timmins.</p>
        </div>
      </div>
    </>
  );
}
