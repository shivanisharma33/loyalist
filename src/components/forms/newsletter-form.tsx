"use client";

import { useActionState, useId } from "react";
import { subscribe, type FormState } from "@/app/actions";
import { ArrowRight } from "@/components/ui/icons";

const initial: FormState = { status: "idle", message: "" };

export function NewsletterForm({
  tone = "dark",
  showLabel = true,
}: {
  tone?: "dark" | "light";
  showLabel?: boolean;
}) {
  const [state, action, pending] = useActionState(subscribe, initial);
  const id = useId();
  const dark = tone === "dark";
  const error = state.fieldErrors?.email;

  if (state.status === "success") {
    return (
      <p
        role="status"
        className={`rounded-xs border-l-2 px-5 py-4 text-[0.9375rem] ${
          dark ? "border-gold-bright bg-white/5 text-ivory" : "border-gold-ink bg-black/5 text-ink-900"
        }`}
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate className="w-full">
      <label
        htmlFor={`${id}-email`}
        className={
          showLabel
            ? `mb-2 block text-xs font-semibold uppercase tracking-wider ${
                dark ? "text-stone-300" : "text-stone-600"
              }`
            : "sr-only"
        }
      >
        Email address
      </label>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          placeholder="Enter your email address"
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-msg`}
          className={`h-11 min-w-0 flex-1 rounded-xs border px-4 text-sm outline-none transition-colors ${
            dark
              ? "border-hair-dark-strong bg-white/[0.05] text-ivory placeholder:text-stone-400 focus:border-gold-bright"
              : "border-hair-strong bg-white text-ink-900 placeholder:text-stone-500 focus:border-gold-ink"
          } aria-[invalid=true]:border-[#e0806a]`}
        />
        {/* Honeypot: hidden from people, filled by bots. */}
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xs border border-gold-bright bg-gold-bright px-6 text-xs font-bold uppercase tracking-wider text-ink-950 transition-colors hover:bg-ivory hover:border-ivory disabled:opacity-60"
        >
          <span>{pending ? "Subscribing…" : "Subscribe"}</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      <p
        id={`${id}-msg`}
        role={state.status === "error" ? "alert" : undefined}
        className={`mt-2 min-h-5 text-xs ${dark ? "text-[#f0a493]" : "text-[#a13a22]"}`}
      >
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
