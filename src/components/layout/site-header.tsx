"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { company, navigation, type NavItem } from "@/content/site";
import { ArrowUpRight, ChevronDown, CloseIcon } from "@/components/ui/icons";

const sectionOf = (href: string) => "/" + (href.split("/")[1] ?? "");

function isActive(pathname: string, item: NavItem) {
  if (item.href.endsWith(".pdf")) return false;
  return pathname === item.href || pathname.startsWith(sectionOf(item.href) + "/") || pathname === sectionOf(item.href);
}

function NavLink({ href, className, children, onClick }: { href: string; className?: string; children: React.ReactNode; onClick?: () => void }) {
  if (href.endsWith(".pdf") || href.startsWith("http")) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever the route changes (state adjustment during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setOpenDropdown(null);
  }

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Mobile menu: scroll lock, initial focus, focus trap and Escape-to-close.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.classList.add("menu-open");
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusables = menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [menuOpen, closeMenu]);

  // Desktop dropdowns close on Escape or outside click.
  useEffect(() => {
    if (!openDropdown) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenDropdown(null);
    const onClick = (e: MouseEvent) => !(e.target as Element).closest("[data-dropdown]") && setOpenDropdown(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [openDropdown]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[70] -translate-y-24 bg-gold-bright px-4 py-2 text-sm font-semibold text-ink-950 transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-3 sm:top-5 z-50 px-3 sm:px-6 pointer-events-none">
        <div
          className={`mx-auto max-w-7xl rounded-2xl border transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 pointer-events-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 ${
            solid
              ? "border-white/20 bg-ink-950/92 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
              : "border-white/15 bg-ink-950/75 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          }`}
        >
          <div className="flex items-center">
            <Link href="/" className="relative z-[60] -m-1 shrink-0 p-1" aria-label="Loyalist Exploration — home">
              <Image src="/logo-light-trim.webp" alt="Loyalist Exploration" width={2329} height={446} priority className="h-7 sm:h-8 w-auto" sizes="170px" />
            </Link>
            <span className="hidden md:block h-5 w-px bg-white/20 ml-4 mr-1" />
          </div>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {navigation.map((item) => {
                const active = isActive(pathname, item);
                const open = openDropdown === item.label;
                return (
                  <li key={item.label} className="group relative" data-dropdown>
                    <div className="flex items-center">
                      <NavLink
                        href={item.href}
                        className={`relative inline-flex h-9 items-center px-3 text-[0.875rem] font-medium tracking-normal transition-colors ${
                          active ? "text-white" : "text-stone-300 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </NavLink>
                      {item.children && (
                        <button
                          type="button"
                          className="-ml-1 inline-flex h-9 w-6 items-center justify-center text-stone-400 hover:text-gold-bright transition-colors"
                          aria-expanded={open}
                          aria-controls={`menu-${item.label}`}
                          aria-label={`${item.label} submenu`}
                          onClick={() => setOpenDropdown(open ? null : item.label)}
                        >
                          <ChevronDown size={13} className={`transition-transform duration-300 ${open ? "rotate-180 text-gold-bright" : ""}`} />
                        </button>
                      )}
                    </div>
                    {item.children && (
                      <div
                        id={`menu-${item.label}`}
                        className={`absolute left-0 top-full w-80 pt-2 transition-[opacity,transform,visibility] duration-300 ease-out ${
                          open
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-1 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                        }`}
                      >
                        <ul className="overflow-hidden rounded-xl border border-white/15 bg-ink-950/95 backdrop-blur-xl shadow-2xl">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <NavLink
                                href={child.href}
                                onClick={() => setOpenDropdown(null)}
                                className="group/item flex items-start justify-between gap-4 border-b border-white/10 px-5 py-3 transition-colors last:border-b-0 hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
                              >
                                <span>
                                  <span className={`block text-sm font-semibold ${pathname === child.href ? "text-gold-bright" : "text-ivory"}`}>
                                    {child.label}
                                  </span>
                                  {child.description && <span className="caption mt-0.5 block text-xs text-stone-300">{child.description}</span>}
                                </span>
                                <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-stone transition-colors group-hover/item:text-gold-bright" />
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={company.quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tech inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 text-xs font-mono font-medium text-stone-200 transition-colors hover:border-gold-bright/50 hover:text-gold-bright"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-bright opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-bright" />
              </span>
              {company.ticker}
            </a>
            <a
              href={company.presentation.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#e8be56] via-[#dfad43] to-[#d69f3d] px-4 text-xs font-bold uppercase tracking-wider text-ink-950 shadow-[0_2px_14px_rgba(223,173,67,0.35)] transition-all hover:shadow-[0_4px_22px_rgba(223,173,67,0.55)] hover:brightness-105 active:scale-[0.98]"
            >
              <span>Corporate Presentation</span>
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="tech relative z-[60] inline-flex h-9 items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3 text-xs text-ivory lg:hidden hover:border-gold-bright/40"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
            <span aria-hidden="true" className="flex w-5 flex-col gap-1">
              <span className="h-px w-5 bg-current" />
              <span className="h-px w-3.5 self-end bg-gold-bright" />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-[65] flex flex-col overflow-y-auto bg-ink-950 text-ivory transition-[opacity,visibility,clip-path] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden ${
          menuOpen ? "visible opacity-100 [clip-path:inset(0_0_0_0)]" : "invisible opacity-0 [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between">
          <Image src="/logo-light-trim.webp" alt="" width={2329} height={446} className="h-8 w-auto" sizes="170px" />
          <button
            ref={closeRef}
            type="button"
            onClick={closeMenu}
            className="tech -mr-2 inline-flex h-11 items-center gap-2 px-3 text-ivory"
          >
            Close
            <CloseIcon size={20} />
          </button>
        </div>
        <nav aria-label="Mobile" className="shell flex-1 pb-8 pt-4">
          <ul className="divide-y divide-hair-dark border-y border-hair-dark">
            {navigation.map((item, i) => (
              <li
                key={item.label}
                className={`py-4 transition-[opacity,transform] duration-700 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms" }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="numeral w-7 text-base text-gold-bright">{String(i + 1).padStart(2, "0")}</span>
                  <NavLink
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`display-md inline-flex min-h-11 items-center ${isActive(pathname, item) ? "text-gold-bright" : "text-ivory"}`}
                  >
                    {item.label}
                  </NavLink>
                </div>
                {item.children && (
                  <ul className="mt-1 grid gap-0.5 pl-10">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <NavLink
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          className={`inline-flex min-h-11 items-center text-[0.9375rem] ${pathname === child.href ? "text-gold-bright" : "text-stone-300"}`}
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-s4 grid gap-1 text-sm text-stone-300">
            <a className="inline-flex min-h-11 items-center hover:text-gold-bright" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <a className="inline-flex min-h-11 items-center hover:text-gold-bright" href={company.phoneHref}>
              {company.phoneDisplay}
            </a>
            <a className="tech inline-flex min-h-11 items-center text-gold-bright" href={company.quoteUrl} target="_blank" rel="noopener noreferrer">
              {company.ticker}
            </a>
          </div>
          <a
            href={company.presentation.href}
            target="_blank"
            rel="noopener noreferrer"
            className="tech mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-gold-bright px-6 text-ink-950"
          >
            Corporate Presentation
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </>
  );
}
