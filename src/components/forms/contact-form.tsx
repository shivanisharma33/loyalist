"use client";

import { useActionState, useId } from "react";
import { sendContact, type FormState } from "@/app/actions";
import { ArrowRight } from "@/components/ui/icons";

const initial: FormState = { status: "idle", message: "" };

type FieldName = "name" | "email" | "subject" | "message";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const id = useId();

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[1.5rem] border border-gold-ink/30 bg-ivory p-8">
        <p className="display-sm text-ink-900">Message sent</p>
        <p className="mt-3 text-stone-600">{state.message}</p>
      </div>
    );
  }

  const field = (name: FieldName, label: string, opts: { required?: boolean; type?: string; autoComplete?: string; placeholder: string; textarea?: boolean }) => {
    const error = state.fieldErrors?.[name];
    const inputId = `${id}-${name}`;
    const cls = `w-full rounded-2xl border bg-white px-4 text-base text-ink-900 outline-none transition-colors placeholder:text-stone focus:border-gold-ink ${
      error ? "border-[#a13a22]" : "border-ink-900/15"
    }`;
    const common = {
      id: inputId,
      name,
      required: opts.required,
      defaultValue: state.values?.[name],
      placeholder: opts.placeholder,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${inputId}-error` : undefined,
    };
    return (
      <div className={opts.textarea ? "sm:col-span-2" : undefined}>
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-ink-800">
          {label}
          {opts.required ? <span className="text-gold-ink"> *</span> : <span className="text-stone-600"> (optional)</span>}
        </label>
        {opts.textarea ? (
          <textarea {...common} rows={6} className={`${cls} min-h-40 py-3.5`} />
        ) : (
          <input {...common} type={opts.type ?? "text"} autoComplete={opts.autoComplete} className={`${cls} h-12`} />
        )}
        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-sm text-[#a13a22]">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form action={action} noValidate className="on-light grid gap-5 sm:grid-cols-2">
      {field("name", "Name", { required: true, autoComplete: "name", placeholder: "Enter your full name" })}
      {field("email", "Email", { required: true, type: "email", autoComplete: "email", placeholder: "Enter your email address" })}
      <div className="sm:col-span-2">{field("subject", "Subject", { placeholder: "How can we help you?" })}</div>
      {field("message", "Message", { required: true, textarea: true, placeholder: "Type your detailed message here..." })}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p role={state.status === "error" ? "alert" : undefined} className="min-h-5 text-sm text-[#a13a22]">
          {state.status === "error" ? state.message : ""}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-ink-900 px-7 text-[0.9375rem] font-semibold text-ivory transition-colors hover:bg-ink-700 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send Message"}
          <ArrowRight size={16} className="text-gold-bright transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
