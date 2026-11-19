import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { company, disclaimerText, mreDisclaimer, socials } from "@/content/site";
import { projects } from "@/content/projects";
import { imageryNote } from "@/content/frontier";
import { photoCredits } from "@/content/imagery";
import { ArrowUpRight, SocialIcon } from "@/components/ui/icons";
import { NewsletterForm } from "@/components/forms/newsletter-form";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "inline-flex min-h-9 items-center gap-1.5 text-[0.9375rem] text-ivory/70 transition-colors hover:text-gold-bright";
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

export function SiteFooter() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-ink-950 text-ivory">
      <div className="relative z-[2] mx-auto max-w-[110rem] px-[var(--gutter)]">
        {/* Main Footer Content */}
        <div className="grid gap-12 border-b border-hair-dark py-16 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand & Contact Information */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-light-trim.webp"
                alt="Loyalist Exploration"
                width={2329}
                height={446}
                className="h-10 w-auto"
                sizes="210px"
              />
            </Link>
            <p className="mt-5 max-w-[30em] text-[0.9375rem] leading-relaxed text-ivory/65">
              {company.description}
            </p>

            <div className="mt-8 border-t border-hair-dark pt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold-bright">
                Contact Information
              </h3>
              <address className="mt-4 grid gap-2.5 text-[0.9375rem] not-italic text-ivory/80">
                <div className="flex items-start gap-3">
                  <span className="w-18 shrink-0 text-xs font-bold uppercase tracking-wider text-ivory/45 pt-0.5">
                    Address:
                  </span>
                  <span className="leading-snug">
                    110 Yonge Street, Suite 1601, Toronto, Ontario M5C 1T4
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-18 shrink-0 text-xs font-bold uppercase tracking-wider text-ivory/45">
                    Email:
                  </span>
                  <a
                    href="mailto:efarr@loyalistexploration.com"
                    className="text-ivory hover:text-gold-bright transition-colors"
                  >
                    efarr@loyalistexploration.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-18 shrink-0 text-xs font-bold uppercase tracking-wider text-ivory/45">
                    Phone:
                  </span>
                  <a
                    href="tel:+16472961270"
                    className="text-ivory hover:text-gold-bright transition-colors"
                  >
                    +1 647‑296‑1270
                  </a>
                </div>
              </address>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 border-b border-hair-dark pb-3 text-xs font-bold uppercase tracking-wider text-ivory/60">
              Quick Links
            </h3>
            <ul className="grid">
              <li>
                <FooterLink href="/about/company-profile">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="/projects">Projects</FooterLink>
              </li>
              <li>
                <FooterLink href="/investors">Investors</FooterLink>
              </li>
              <li>
                <FooterLink href="/press-release">Press Release</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
              <li>
                <FooterLink href="/disclaimer">Disclaimer</FooterLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Projects */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 border-b border-hair-dark pb-3 text-xs font-bold uppercase tracking-wider text-ivory/60">
              Projects
            </h3>
            <ul className="grid">
              {projects.map((p) => (
                <li key={p.slug}>
                  <FooterLink href={`/projects/${p.slug}`}>
                    {p.name.replace(" Mine Property", "").replace(" Project", "")}
                  </FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/projects">All Projects</FooterLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Follow Us */}
          <div className="lg:col-span-3">
            <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-gold-bright">
              Subscribe to Our Newsletter
            </h3>
            <p className="mb-4 text-xs leading-relaxed text-ivory/60">
              Receive company updates, drilling releases, and regulatory announcements directly in your inbox.
            </p>
            <div className="mb-8">
              <NewsletterForm tone="dark" showLabel={false} />
            </div>

            <div className="border-t border-hair-dark pt-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ivory/60">
                Follow Us
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xs border border-hair-dark bg-white/5 text-ivory/70 transition-all hover:border-gold-bright hover:bg-gold-bright/10 hover:text-gold-bright"
                  >
                    <SocialIcon name={s.label} size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimers */}
        <div className="grid gap-8 border-b border-hair-dark py-10 text-[0.8125rem] leading-relaxed text-ivory/55 lg:grid-cols-12 lg:gap-8">
          <p className="lg:col-span-6">
            <strong className="font-semibold text-ivory/80">Disclaimer. </strong>
            {disclaimerText}
          </p>
          <div className="grid gap-3 lg:col-span-6">
            <p>
              <strong className="font-semibold text-ivory/80">Mineral resources. </strong>
              {mreDisclaimer} Historical estimates referenced for DeSantis and Loveland are not current and are not treated as current mineral
              resources by the Company.
            </p>
            <p>
              <strong className="font-semibold text-ivory/80">Imagery. </strong>
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

        {/* Bottom Bar */}
        <div className="flex flex-col gap-3 py-6 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {company.legalName}. All rights reserved.
          </p>
          <p className="font-semibold tracking-wide text-stone-400">
            {company.ticker} · Timmins Gold Camp · Ontario, Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
