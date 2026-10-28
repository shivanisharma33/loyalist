"use client";

import { useActionState, useId } from "react";
import { subscribe, type FormState } from "@/app/actions";
import { ArrowRight } from "@/components/ui/icons";

const initial: FormState = { status: "idle", message: "" };

export function NewsletterForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [state, action, pending] = useActionState(subscribe, initial);
  const id = useId();
  const dark = tone === "dark";
  const error = state.fieldErrors?.email;

  if (state.status === "success") {
    return (
      <p role="status" className={`rounded-2xl border px-5 py-4 text-[0.9375rem] ${dark ? "border-gold-bright/40 text-ivory" : "border-gold-ink/30 text-ink-900"}`}>
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate className="w-full">
      <label htmlFor={`${id}-email`} className={`mb-2 block text-sm font-medium ${dark ? "text-stone-300" : "text-stone-600"}`}>
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-msg`}
          className={`h-12 min-w-0 flex-1 rounded-full border px-5 text-base outline-none transition-colors ${
            dark
              ? "border-white/20 bg-white/[0.04] text-ivory placeholder:text-stone focus:border-gold-bright"
              : "border-ink-900/20 bg-white text-ink-900 placeholder:text-stone focus:border-gold-ink"
          } aria-[invalid=true]:border-[#e0806a]`}
        />
        {/* Honeypot: hidden from people, filled by bots. */}
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-gold-bright px-6 text-[0.9375rem] font-semibold text-ink-950 transition-colors hover:bg-gold-mineral disabled:opacity-60"
        >
          {pending ? "Subscribing…" : "Subscribe"}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      <p id={`${id}-msg`} role={state.status === "error" ? "alert" : undefined} className={`mt-3 min-h-5 text-sm ${dark ? "text-[#f0a493]" : "text-[#a13a22]"}`}>
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
