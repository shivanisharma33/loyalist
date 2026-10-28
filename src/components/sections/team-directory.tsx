"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Person, TeamMember } from "@/content/team";
import { ArrowRight, CloseIcon } from "@/components/ui/icons";

const initials = (name: string) =>
  name
    .split(",")[0]
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

/** Portrait, or an editorial monogram tile for people without a published photo. */
export function Portrait({ person, sizes, className = "" }: { person: Person; sizes: string; className?: string }) {
  if (person.image) {
    return (
      <div className={`relative overflow-hidden bg-ink-800 ${className}`}>
        <Image
          src={person.image}
          alt={`Portrait of ${person.name.split(",")[0]}`}
          fill
          sizes={sizes}
          quality={75}
          className="object-cover object-top grayscale-[35%] transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
        />
      </div>
    );
  }
  return (
    <div className={`geo-grid relative flex items-end overflow-hidden bg-ink-900 ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,rgba(212,178,72,0.16),transparent_70%)]" />
      <span className="serif-accent relative p-6 text-[clamp(3.5rem,8vw,5.5rem)] leading-none text-gold-bright/85 transition-transform duration-700 group-hover:-translate-y-1">
        {initials(person.name)}
      </span>
    </div>
  );
}

export function TeamDirectory({ groups, people }: { groups: { id: string; title: string; members: TeamMember[] }[]; people: Record<string, Person> }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [selected, setSelected] = useState<{ person: Person; role: string } | null>(null);

  const open = (person: Person, role: string, opener: HTMLElement) => {
    openerRef.current = opener;
    setSelected({ person, role });
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <div className="grid gap-s7">
        {groups.map((group, gi) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`}>
            <div className="mb-s5 flex items-end justify-between gap-6 border-b border-hair pb-s3">
              <h2 id={`group-${group.id}`} className="display-lg text-ink-900" data-reveal="">
                {group.title}
              </h2>
              <span className="numeral hidden text-5xl text-ink-900/10 sm:block">{String(gi + 1).padStart(2, "0")}</span>
            </div>
            <ul className="grid gap-x-s4 gap-y-s5 sm:grid-cols-2 lg:grid-cols-4">
              {group.members.map((m, i) => {
                const person = people[m.personId];
                return (
                  <li key={m.personId} data-reveal="" style={{ ["--reveal-delay" as string]: i * 90 }}>
                    <article className="group flex h-full flex-col">
                      <Portrait person={person} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" className="aspect-[4/5]" />
                      <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-ink-900">{person.name}</h3>
                      <p className="tech mt-1.5 text-gold-ink">{m.role}</p>
                      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-stone-600">{m.summary}</p>
                      {/* Full biography stays in the HTML (crawlable, find-in-page) and opens in the dialog. */}
                      {gi === groups.findIndex((g) => g.members.some((x) => x.personId === m.personId)) && (
                        <div hidden={"until-found" as unknown as boolean} className="mt-3 grid gap-3 text-[0.9375rem] leading-relaxed text-ink-800">
                          {person.bio.map((p, k) => (
                            <p key={k}>{p}</p>
                          ))}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={(e) => open(person, m.role, e.currentTarget)}
                        className="group/btn mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-ink-900 hover:text-gold-ink"
                        aria-haspopup="dialog"
                      >
                        Read bio<span className="sr-only">: {person.name}</span>
                        <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="bio-title"
        onClose={() => openerRef.current?.focus()}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto max-h-[min(90dvh,48rem)] w-[min(100vw-2rem,52rem)] overflow-hidden border border-hair bg-paper p-0 text-ink-900 shadow-2xl backdrop:bg-ink-950/80 backdrop:backdrop-blur-sm"
      >
        {selected && (
          <div className="grid max-h-[min(90dvh,48rem)] overflow-y-auto md:grid-cols-[16rem_1fr]">
            <Portrait person={selected.person} sizes="(min-width: 768px) 16rem, 100vw" className="aspect-[16/10] md:aspect-auto md:min-h-full" />
            <div className="relative p-6 sm:p-10">
              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center text-ink-900 hover:bg-ink-900/5"
                aria-label="Close biography"
                autoFocus
              >
                <CloseIcon size={20} />
              </button>
              <p className="tech pr-12 text-gold-ink">{selected.role}</p>
              <h2 id="bio-title" className="display-sm mt-2 pr-12">
                {selected.person.name}
              </h2>
              <div className="mt-6 grid gap-4 text-[0.9375rem] leading-relaxed text-ink-800">
                {selected.person.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
