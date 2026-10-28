import Link from "next/link";
import { navigation } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/icons";

const items = navigation.find((n) => n.label === "Investors")?.children ?? [];

/** Sticky sub-navigation shared by the investor pages. */
export function InvestorNav({ current }: { current: string }) {
  return (
    <nav aria-label="Investor resources" className="sticky top-[var(--header-h)] z-30 border-b border-ink-900/10 bg-paper/92 backdrop-blur-lg">
      <ul className="shell flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        <li className="shrink-0">
          <Link
            href="/investors"
            aria-current={current === "/investors" ? "page" : undefined}
            className={`inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors ${
              current === "/investors" ? "bg-ink-900 text-ivory" : "text-ink-800 hover:bg-ink-900/5"
            }`}
          >
            Overview
          </Link>
        </li>
        {items.map((item) => {
          const active = item.href === current;
          const external = item.href.endsWith(".pdf");
          const cls = `inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors ${
            active ? "bg-ink-900 text-ivory" : "text-ink-800 hover:bg-ink-900/5"
          }`;
          return (
            <li key={item.href} className="shrink-0">
              {external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {item.label}
                  <ArrowUpRight size={14} />
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
    </nav>
  );
}
