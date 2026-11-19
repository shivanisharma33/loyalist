import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { SocialIcon } from "@/components/ui/icons";
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

      <div className="relative z-[2] mx-auto max-w-[110rem] px-[var(--gutter)] py-24 sm:py-32">
        <Chapter n="08" label="Contact · Toronto head office" tone="dark" />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-x-12 sm:mt-16">
          <div className="lg:col-span-6">
            <h2 id="contact-title" className="display-lg text-balance" data-reveal="">
              Talk <span className="serif-accent text-gold-bright">Timmins</span> with us.
            </h2>

            <dl className="mt-12 grid gap-8" data-reveal="">
              <div>
                <dt className="tech text-xs uppercase tracking-wider text-ivory/55">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${company.email}`} className="display-md inline-block break-all text-ivory underline decoration-gold-bright/60 decoration-1 underline-offset-[0.2em] hover:text-gold-bright transition-colors sm:break-normal">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="tech text-xs uppercase tracking-wider text-ivory/55">Telephone</dt>
                <dd className="mt-1">
                  <a href={company.phoneHref} className="display-md inline-block text-ivory hover:text-gold-bright transition-colors">
                    {company.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 pt-2 border-t border-hair-dark">
                <div>
                  <dt className="tech text-xs uppercase tracking-wider text-ivory/55">Head office</dt>
                  <dd className="mt-2 not-italic leading-relaxed text-ivory/85 text-[0.9375rem]">
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
                  <dt className="text-xs uppercase tracking-wider text-ivory/55 font-semibold">Follow</dt>
                  <dd className="mt-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {socials.map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          title={s.label}
                          className="flex h-10 w-10 items-center justify-center rounded-xs border border-hair-dark bg-white/5 text-ivory/75 transition-all hover:border-gold-bright hover:bg-gold-bright/10 hover:text-gold-bright"
                        >
                          <SocialIcon name={s.label} size={18} />
                        </a>
                      ))}
                    </div>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8" data-reveal="">
            <div className="limestone border-t-2 border-gold-bright p-6 text-ink-900 shadow-2xl sm:p-10">
              <p className="tech text-xs uppercase tracking-wider text-gold-ink">Correspondence</p>
              <h3 className="display-md mt-2">Send a message</h3>
              <p className="mb-6 mt-2 text-[0.9375rem] leading-relaxed text-stone-600">Investor, media and general enquiries. Our team will respond as soon as possible.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
