import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { company } from "@/content/site";

export function NewsletterBand({ index = "09" }: { index?: string }) {
  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="grain relative isolate overflow-hidden bg-ink-950 py-20 text-ivory sm:py-28">
      <Image src="/projects/gold-rush.png" alt="" fill sizes="100vw" quality={60} className="-z-10 object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,16,15,0.96)_20%,rgba(16,16,15,0.7))]" />
      <div className="shell relative z-[2] grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <SectionIndex index={index} label="Stay Informed" tone="dark" />
          <SplitHeading id="newsletter-title" className="display-md mt-6" lines={["Newsletter Subscription"]} />
          <p className="lede mt-4 text-stone-300" data-reveal="">
            Stay updated with our latest press releases.
          </p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8" data-reveal="">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}

export function ContactDetails() {
  const items = [
    { icon: MailIcon, label: "Email Us", body: "For inquiries about projects or corporate info, email us at:", value: company.email, href: `mailto:${company.email}` },
    { icon: PhoneIcon, label: "Call Us", body: "Reach our team during business hours:", value: company.phoneDisplay, href: company.phoneHref },
  ];
  return (
    <div className="grid gap-4">
      {items.map(({ icon: Icon, ...i }) => (
        <div key={i.label} className="flex gap-4 rounded-[1.25rem] border border-ink-900/10 bg-white p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-gold-ink">
            <Icon size={18} />
          </span>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-ink-900">{i.label}</h3>
            <p className="mt-1 text-sm text-stone-600">{i.body}</p>
            <a href={i.href} className="mt-1 inline-flex min-h-10 items-center break-all font-semibold text-ink-900 underline-offset-4 hover:text-gold-ink hover:underline">
              {i.value}
            </a>
          </div>
        </div>
      ))}
      <div className="flex gap-4 rounded-[1.25rem] bg-ink-900 p-5 text-ivory">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-gold-bright">
          <PinIcon size={18} />
        </span>
        <address className="not-italic">
          <h3 className="font-display font-semibold">Visit Us</h3>
          <p className="mt-1 text-sm text-stone-300">Loyalist Exploration HQ — Head Office</p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed">
            {company.address.street}
            <br />
            {company.address.city}, {company.address.region}, {company.address.country} {company.address.postalCode}
          </p>
        </address>
      </div>
    </div>
  );
}

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="on-light bg-ivory py-24 sm:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionIndex index="10" label="Contact" />
          <SplitHeading id="contact-title" className="display-lg mt-6 text-ink-900" lines={["Contact Us"]} />
          <p className="lede mt-5 text-ink-800" data-reveal="">
            Have questions? We&apos;re here to help. Reach out via the form or directly using the details below.
          </p>
          <div className="mt-10" data-reveal="">
            <ContactDetails />
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-paper p-6 shadow-[0_40px_80px_-50px_rgba(16,16,15,0.35)] sm:p-10 lg:col-span-6 lg:col-start-7" data-reveal="">
          <h3 className="display-sm text-ink-900">Send a message</h3>
          <p className="mt-2 text-sm text-stone-600">Fields marked * are required.</p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
