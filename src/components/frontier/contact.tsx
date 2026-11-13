import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { ArrowUpRight } from "@/components/ui/icons";
import { company, socials } from "@/content/site";
import { photos } from "@/content/imagery";
import { Chapter } from "./chapter";

export function Contact() {
  const photo = photos.shieldRiver;
  return (
    <section id="contact" aria-labelledby="contact-title" className="grain relative isolate overflow-hidden bg-ink-950 text-ivory">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image src={photo.src} alt="" fill sizes="100vw" className="object-cover object-[50%_60%] [filter:saturate(0.5)_contrast(1.1)_brightness(0.55)]" />
        <div className="absolute inset-0 bg-[#17110d] opacity-55 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,17,13,1)_0%,rgba(23,17,13,0.35)_30%,rgba(23,17,13,0.55)_70%,rgba(23,17,13,1)_100%)]" />
      </div>

      <div className="relative z-[2] mx-auto max-w-[110rem] px-[var(--gutter)] pb-24 pt-28 sm:pt-36">
        <Chapter n="08" label="Contact · Toronto head office" tone="dark" />

        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6">
            <h2 id="contact-title" className="display-3xl" data-reveal="">
              Talk <span className="serif-accent text-gold-bright">Timmins</span> with us.
            </h2>

            <dl className="mt-14 grid gap-8" data-reveal="">
              <div>
                <dt className="tech text-ivory/55">Email</dt>
                <dd>
                  <a href={`mailto:${company.email}`} className="display-md inline-block break-all text-ivory underline decoration-gold-bright/60 decoration-1 underline-offset-[0.2em] hover:text-gold-bright sm:break-normal">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="tech text-ivory/55">Telephone</dt>
                <dd>
                  <a href={company.phoneHref} className="display-md inline-block text-ivory hover:text-gold-bright">
                    {company.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <dt className="tech text-ivory/55">Head office</dt>
                  <dd className="mt-2 not-italic leading-relaxed text-ivory/85">
                    <address className="not-italic">
                      {company.address.street}
                      <br />
                      {company.address.city}, {company.address.region} {company.address.postalCode}
                      <br />
                      {company.address.country}
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="tech text-ivory/55">Follow</dt>
                  <dd className="mt-1">
                    <ul className="flex flex-wrap gap-x-4">
                      {socials.map((s) => (
                        <li key={s.href}>
                          <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-ivory/85 hover:text-gold-bright">
                            {s.label}
                            <ArrowUpRight size={12} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8" data-reveal="">
            <div className="limestone border-t-2 border-gold-bright p-6 text-ink-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-10">
              <p className="tech text-gold-ink">Correspondence</p>
              <h3 className="display-md mt-2">Send a message</h3>
              <p className="mb-8 mt-2 text-[0.9375rem] text-stone-600">Investor, media and general enquiries. Our team will respond as soon as possible.</p>
              <ContactForm />
            </div>
          </div>
        </div>

        <p className="tech mt-20 text-ivory/40">
          Plate III · {photo.caption.split(".")[0]} — illustrative · {photo.credit.author}, {photo.credit.license}
        </p>
      </div>
    </section>
  );
}
