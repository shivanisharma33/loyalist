import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { company, disclaimerText, mreDisclaimer, navigation, socials } from "@/content/site";
import { projects } from "@/content/projects";
import { imageryNote } from "@/content/frontier";
import { photoCredits } from "@/content/imagery";
import { ArrowUpRight } from "@/components/ui/icons";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const investorLinks = navigation.find((n) => n.label === "Investors")?.children ?? [];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "inline-flex min-h-10 items-center gap-1.5 text-[0.9375rem] text-ivory/70 transition-colors hover:text-gold-bright";
  return href.startsWith("http") || href.endsWith(".pdf") ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowUpRight size={11} className="opacity-60" />
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="tech mb-4 border-b border-hair-dark pb-3 text-ivory/50">
        {title}
      </h2>
      <ul className="grid">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-ink-950 text-ivory">
      <div className="relative z-[2] mx-auto max-w-[110rem] px-[var(--gutter)]">
        <div className="grid gap-12 border-b border-hair-dark py-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Image src="/logo-light-trim.webp" alt="Loyalist Exploration" width={2329} height={446} className="h-10 w-auto" sizes="210px" />
            <p className="mt-6 max-w-[30em] text-[0.9375rem] leading-relaxed text-ivory/65">{company.description}</p>
            <address className="mt-6 grid text-[0.9375rem] not-italic text-ivory/80">
              <span>
                {company.address.street}, {company.address.city}, {company.address.region} {company.address.postalCode}
              </span>
              <a className="inline-flex min-h-10 items-center hover:text-gold-bright" href={`mailto:${company.email}`}>
                {company.email}
              </a>
              <a className="inline-flex min-h-10 items-center hover:text-gold-bright" href={company.phoneHref}>
                {company.phoneDisplay}
              </a>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            <Column title="Company">
              <li><FooterLink href="/about/company-profile">Company profile</FooterLink></li>
              <li><FooterLink href="/about/our-team">Our team</FooterLink></li>
              <li><FooterLink href="/press-release">Press releases</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
              <li><FooterLink href="/disclaimer">Disclaimer</FooterLink></li>
            </Column>
            <Column title="Projects">
              {projects.map((p) => (
                <li key={p.slug}>
                  <FooterLink href={`/projects/${p.slug}`}>{p.name.replace(" Mine Property", "").replace(" Project", "")}</FooterLink>
                </li>
              ))}
              <li><FooterLink href="/projects">All projects</FooterLink></li>
            </Column>
            <Column title="Investors">
              {investorLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label.replace("Financial Statements & MD&A", "Financials & MD&A")}</FooterLink>
                </li>
              ))}
              <li><FooterLink href={company.quoteUrl}>{company.ticker} quote</FooterLink></li>
            </Column>
            <Column title="Follow">
              {socials.map((s) => (
                <li key={s.href}>
                  <FooterLink href={s.href}>{s.label}</FooterLink>
                </li>
              ))}
            </Column>
          </div>
        </div>

        {/* Regulatory */}
        <div className="grid gap-8 border-b border-hair-dark py-10 text-[0.8125rem] leading-relaxed text-ivory/55 lg:grid-cols-12 lg:gap-8">
          <p className="lg:col-span-6">
            <strong className="font-medium text-ivory/80">Disclaimer. </strong>
            {disclaimerText}
          </p>
          <div className="grid gap-3 lg:col-span-6">
            <p>
              <strong className="font-medium text-ivory/80">Mineral resources. </strong>
              {mreDisclaimer} Historical estimates referenced for DeSantis and Loveland are not current and are not treated as current mineral
              resources by the Company.
            </p>
            <p>
              <strong className="font-medium text-ivory/80">Imagery. </strong>
              {imageryNote}{" "}
              {photoCredits.map((c, i) => (
                <span key={c.source}>
                  {c.caption}:{" "}
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline decoration-ivory/30 underline-offset-2 hover:text-gold-bright">
                    {c.author}
                  </a>
                  ,{" "}
                  <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-ivory/30 underline-offset-2 hover:text-gold-bright">
                    {c.license}
                  </a>
                  {c.license.startsWith("CC") ? " (resized and colour-graded)" : ""}
                  {i < photoCredits.length - 1 ? "; " : "."}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {company.legalName}. All rights reserved.
          </p>
          <p className="tech">
            {company.ticker} · 48.48° N 81.33° W
          </p>
        </div>
      </div>
    </footer>
  );
}
