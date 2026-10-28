import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { company, disclaimerText, navigation, socials } from "@/content/site";
import { projects } from "@/content/projects";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const investorLinks = navigation.find((n) => n.label === "Investors")?.children ?? [];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "inline-flex min-h-10 items-center text-[0.9375rem] text-stone-300 transition-colors hover:text-gold-bright";
  return href.startsWith("http") || href.endsWith(".pdf") ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="tech mb-4 border-b border-hair-dark pb-2 text-stone-300">{title}</h2>
      <ul className="grid gap-0.5">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-ink-950 text-ivory">
      <div className="shell relative z-[2] pt-s7">
        <div className="grid gap-s5 border-b border-hair-dark pb-s6 lg:grid-cols-12 lg:gap-s4">
          <div className="lg:col-span-4">
            <Image src="/logo-light-trim.webp" alt="Loyalist Exploration" width={2329} height={446} className="h-10 w-auto" sizes="210px" />
            <p className="measure-sm mt-s3 text-[0.9375rem] leading-relaxed text-stone-300">{company.description}</p>
            <a
              href={company.quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tech mt-6 inline-flex min-h-11 items-center gap-3 border border-gold-bright/40 px-4 text-gold-bright transition-colors hover:bg-gold-bright hover:text-ink-950"
            >
              {company.ticker} · {company.exchange}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            <Group title="Quick Links">
              <li><FooterLink href="/about/company-profile">About Us</FooterLink></li>
              <li><FooterLink href="/about/our-team">Our Team</FooterLink></li>
              <li><FooterLink href="/projects">Projects</FooterLink></li>
              <li><FooterLink href="/investors">Investors</FooterLink></li>
              <li><FooterLink href="/press-release">Press Release</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
              <li><FooterLink href="/disclaimer">Disclaimer</FooterLink></li>
            </Group>
            <Group title="Projects">
              {projects.map((p) => (
                <li key={p.slug}>
                  <FooterLink href={`/projects/${p.slug}`}>{p.name}</FooterLink>
                </li>
              ))}
            </Group>
            <Group title="Investors">
              {investorLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </Group>
            <Group title="Follow Us">
              {socials.map((s) => (
                <li key={s.href}>
                  <FooterLink href={s.href}>{s.label}</FooterLink>
                </li>
              ))}
            </Group>
          </div>
        </div>

        <div className="grid gap-s4 border-b border-hair-dark py-s5 md:grid-cols-12">
          <address className="not-italic md:col-span-5">
            <h2 className="tech mb-4 border-b border-hair-dark pb-2 text-stone-300">Contact</h2>
            <p className="text-[0.9375rem] leading-relaxed text-stone-300">
              {company.address.street}
              <br />
              {company.address.city}, {company.address.region}, {company.address.country} {company.address.postalCode}
            </p>
            <p className="mt-3 flex flex-col text-[0.9375rem]">
              <a className="inline-flex min-h-10 items-center text-ivory hover:text-gold-bright" href={`mailto:${company.email}`}>
                {company.email}
              </a>
              <a className="inline-flex min-h-10 items-center text-ivory hover:text-gold-bright" href={company.phoneHref}>
                {company.phoneDisplay}
              </a>
            </p>
          </address>
          <div className="md:col-span-7">
            <h2 className="tech mb-4 border-b border-hair-dark pb-2 text-stone-300">Disclaimer</h2>
            <p className="text-sm leading-relaxed text-stone-300">{disclaimerText}</p>
            <p className="caption mt-3 leading-relaxed text-stone">
              Landscape and mineral photography on this website is illustrative. Maps and figures captioned on project pages are Company materials.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-s4 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {company.legalName}. All rights reserved.
          </p>
          <p className="tech text-stone-300">{company.ticker}</p>
        </div>
      </div>
    </footer>
  );
}
