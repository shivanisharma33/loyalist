import Link from "next/link";
import { navigation } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/icons";

const items = navigation.find((n) => n.label === "Investors")?.children ?? [];

/** Sticky sub-navigation shared by the investor pages. */
export function InvestorNav({ current }: { current: string }) {
  return (
    <nav aria-label="Investor resources" className="sticky top-[var(--header-h)] z-30 border-b border-hair bg-paper/92 backdrop-blur-lg">
      <ul className="shell flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        <li className="shrink-0">
          <Link
            href="/investors"
            aria-current={current === "/investors" ? "page" : undefined}
            className={`tech inline-flex h-11 items-center border-b-2 px-4 transition-colors ${
              current === "/investors" ? "border-gold text-ink-900" : "border-transparent text-stone-600 hover:text-ink-900"
            }`}
          >
            Overview
          </Link>
        </li>
        {items.map((item) => {
          const active = item.href === current;
          const external = item.href.endsWith(".pdf");
          const cls = `tech inline-flex h-11 items-center gap-1.5 whitespace-nowrap border-b-2 px-4 transition-colors ${
            active ? "border-gold text-ink-900" : "border-transparent text-stone-600 hover:text-ink-900"
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
