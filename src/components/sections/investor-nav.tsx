import Link from "next/link";
import { navigation } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/icons";

const items = navigation.find((n) => n.label === "Investors")?.children ?? [];

/** Sub-navigation shared by the investor pages. Clean, static in-page navigation bar. */
export function InvestorNav({ current }: { current: string }) {
  return (
    <nav aria-label="Investor resources" className="relative z-10 border-b border-hair bg-paper">
      <div className="shell">
        <ul className="flex items-center gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none]">
          <li className="shrink-0">
            <Link
              href="/investors"
              aria-current={current === "/investors" ? "page" : undefined}
              className={`inline-flex h-10 items-center rounded-xs px-3.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                current === "/investors"
                  ? "bg-ink-950 text-gold-bright shadow-xs"
                  : "text-stone-600 hover:bg-black/5 hover:text-ink-900"
              }`}
            >
              Overview
            </Link>
          </li>
          {items.map((item) => {
            const active = item.href === current;
            const external = item.href.endsWith(".pdf");
            const cls = `inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xs px-3.5 text-xs font-bold uppercase tracking-wider transition-colors ${
              active
                ? "bg-ink-950 text-gold-bright shadow-xs"
                : "text-stone-600 hover:bg-black/5 hover:text-ink-900"
            }`;
            return (
              <li key={item.href} className="shrink-0">
                {external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    <span>{item.label}</span>
                    <ArrowUpRight size={13} />
                  </a>
                ) : (
                  <Link href={item.href} aria-current={active ? "page" : undefined} className={cls}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
