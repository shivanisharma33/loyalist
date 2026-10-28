import { ContactForm } from "@/components/forms/contact-form";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { SectionIndex, SplitHeading } from "@/components/ui/primitives";
import { company } from "@/content/site";

/**
 * Subscription band. Type and a coordinate grid only — a photograph held at 30% opacity
 * behind a form reads as muddy rather than cinematic.
 */
export function NewsletterBand({ index = "09" }: { index?: string }) {
  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="grain section-tight relative isolate overflow-hidden bg-ink-950 text-ivory">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gold/40" />
      <div className="shell relative z-[2] grid gap-s4 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <SectionIndex index={index} label="Stay Informed" tone="dark" />
          <SplitHeading id="newsletter-title" className="display-md mt-s3" lines={["Newsletter Subscription"]} />
          <p className="measure-sm mt-s2 text-[0.9375rem] leading-relaxed text-stone-300" data-reveal="">
            Stay updated with our latest press releases.
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7" data-reveal="">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}

export function ContactDetails() {
  const items = [
    { icon: MailIcon, label: "Email us", body: "For inquiries about projects or corporate information:", value: company.email, href: `mailto:${company.email}` },
    { icon: PhoneIcon, label: "Call us", body: "Reach our team during business hours:", value: company.phoneDisplay, href: company.phoneHref },
  ];
  return (
    <div>
      {items.map(({ icon: Icon, ...i }) => (
        <div key={i.label} className="flex gap-s3 border-t border-hair py-s3">
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-hair text-gold-ink">
            <Icon size={17} />
          </span>
          <div className="min-w-0">
            <h3 className="tech text-stone-600">{i.label}</h3>
            <p className="caption mt-1 text-stone-600">{i.body}</p>
            <a href={i.href} className="mt-1 inline-flex min-h-10 items-center break-all font-display font-semibold text-ink-900 underline-offset-4 hover:text-gold-ink hover:underline">
              {i.value}
            </a>
          </div>
        </div>
      ))}
      <div className="flex gap-s3 border-t border-hair bg-ink-950 p-5 text-ivory">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-hair-dark text-gold-bright">
          <PinIcon size={17} />
        </span>
        <address className="not-italic">
          <h3 className="tech text-stone-300">Visit us</h3>
          <p className="caption mt-1 text-stone-300">Loyalist Exploration HQ — Head Office</p>
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
    <section id="contact" aria-labelledby="contact-title" className="on-light section bg-ivory">
      <div className="shell grid gap-s6 lg:grid-cols-12 lg:gap-s5">
        <div className="lg:col-span-5">
          <SectionIndex index="10" label="Contact" />
          <SplitHeading id="contact-title" className="display-lg mt-s4 text-ink-900" lines={["Contact Us"]} />
          <p className="lede measure mt-s3 text-ink-800" data-reveal="">
            Have questions? Reach out via the form or directly using the details below.
          </p>
          <div className="mt-s5" data-reveal="">
            <ContactDetails />
          </div>
        </div>
        <div className="border-t-2 border-gold bg-paper p-6 sm:p-10 lg:col-span-6 lg:col-start-7" data-reveal="">
          <h3 className="display-sm text-ink-900">Send a message</h3>
          <p className="caption mt-2 text-stone-600">Fields marked * are required.</p>
          <div className="mt-s4">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
