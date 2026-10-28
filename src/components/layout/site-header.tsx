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
        className="fixed left-4 top-3 z-[70] -translate-y-24 rounded-full bg-gold-bright px-4 py-2 text-sm font-semibold text-ink-950 transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid ? "border-b border-white/10 bg-ink-950/88 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="relative z-[60] -m-2 shrink-0 p-2" aria-label="Loyalist Exploration — home">
            <Image src="/logo-light-trim.webp" alt="Loyalist Exploration" width={2329} height={446} preload className="h-8 w-auto sm:h-9" sizes="190px" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const active = isActive(pathname, item);
                const open = openDropdown === item.label;
                return (
                  <li key={item.label} className="group relative" data-dropdown>
                    <div className="flex items-center">
                      <NavLink
                        href={item.href}
                        className={`relative inline-flex h-11 items-center px-3 text-[0.875rem] font-medium tracking-[-0.005em] transition-colors ${
                          active ? "text-ivory" : "text-stone-300 hover:text-ivory"
                        }`}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={`absolute inset-x-3 bottom-1.5 h-px origin-left bg-gold-bright transition-transform duration-500 ease-out ${
                            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </NavLink>
                      {item.children && (
                        <button
                          type="button"
                          className="-ml-2 inline-flex h-11 w-8 items-center justify-center text-stone-300 hover:text-gold-bright"
                          aria-expanded={open}
                          aria-controls={`menu-${item.label}`}
                          aria-label={`${item.label} submenu`}
                          onClick={() => setOpenDropdown(open ? null : item.label)}
                        >
                          <ChevronDown size={14} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
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
                        <ul className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/96 p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <NavLink
                                href={child.href}
                                onClick={() => setOpenDropdown(null)}
                                className="group/item flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.05] focus-visible:bg-white/[0.05]"
                              >
                                <span>
                                  <span className={`block text-sm font-semibold ${pathname === child.href ? "text-gold-bright" : "text-ivory"}`}>
                                    {child.label}
                                  </span>
                                  {child.description && <span className="mt-0.5 block text-xs text-stone-300">{child.description}</span>}
                                </span>
                                <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-stone transition-colors group-hover/item:text-gold-bright" />
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

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={company.quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex h-11 items-center gap-2 text-stone-300 transition-colors hover:text-gold-bright"
            >
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-gold-bright" />
              </span>
              {company.ticker}
            </a>
            <a
              href={company.presentation.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-gold-bright/50 px-5 text-sm font-semibold text-gold-bright transition-colors hover:bg-gold-bright hover:text-ink-950"
            >
              Corporate Presentation
              <ArrowUpRight size={15} />
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="relative z-[60] -mr-2 inline-flex h-11 items-center gap-3 rounded-full px-3 text-sm font-semibold text-ivory lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
            <span aria-hidden="true" className="flex w-6 flex-col gap-1.5">
              <span className="h-px w-6 bg-current" />
              <span className="h-px w-4 self-end bg-gold-bright" />
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
            className="-mr-2 inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-ivory"
          >
            Close
            <CloseIcon size={20} />
          </button>
        </div>
        <nav aria-label="Mobile" className="shell flex-1 pb-8 pt-4">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {navigation.map((item, i) => (
              <li
                key={item.label}
                className={`py-4 transition-[opacity,transform] duration-700 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms" }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="eyebrow w-6 text-gold-bright tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <NavLink
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`display-sm inline-flex min-h-11 items-center ${isActive(pathname, item) ? "text-gold-bright" : "text-ivory"}`}
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
          <div className="mt-8 grid gap-1 text-sm text-stone-300">
            <a className="inline-flex min-h-11 items-center hover:text-gold-bright" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <a className="inline-flex min-h-11 items-center hover:text-gold-bright" href={company.phoneHref}>
              {company.phoneDisplay}
            </a>
            <a className="eyebrow inline-flex min-h-11 items-center text-gold-bright" href={company.quoteUrl} target="_blank" rel="noopener noreferrer">
              {company.ticker}
            </a>
          </div>
          <a
            href={company.presentation.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-bright px-6 text-[0.9375rem] font-semibold text-ink-950"
          >
            Corporate Presentation
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </>
  );
}
