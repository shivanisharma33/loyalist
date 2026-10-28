import { PageHero } from "@/components/layout/page-hero";
import { ContactDetails, NewsletterBand } from "@/components/home/newsletter-contact";
import { ContactForm } from "@/components/forms/contact-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Have questions? We're here to help. Reach out to Loyalist Exploration via the form, by email or by phone — 110 Yonge Street, Suite 1601, Toronto, Ontario.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        eyebrow="Get in Touch"
        lede="Have questions? We're here to help. Reach out via the form or directly using the details below."
        image="/projects/desantis.png"
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <section aria-labelledby="form-title" className="on-light bg-ivory py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="rounded-[1.75rem] bg-paper p-6 shadow-[0_40px_80px_-50px_rgba(16,16,15,0.35)] sm:p-10 lg:col-span-7">
            <h2 id="form-title" className="display-md text-ink-900">
              Get in Touch
            </h2>
            <p className="mt-3 text-stone-600">Fields marked * are required.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          <div className="lg:col-span-5">
            <ContactDetails />
          </div>
        </div>
      </section>
      <NewsletterBand index="01" />
    </>
  );
}
