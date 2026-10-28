"use server";

import { API_ORIGIN } from "@/content/site";

// Form submissions are forwarded to the company CMS. The endpoints are configurable because the
// previous site's server actions were not inspectable; success is only reported on a 2xx response.
const NEWSLETTER_ENDPOINT = process.env.NEWSLETTER_ENDPOINT ?? `${API_ORIGIN}/api/subscribe`;
const CONTACT_ENDPOINT = process.env.CONTACT_ENDPOINT ?? `${API_ORIGIN}/api/messages`;

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "subject" | "message", string>>;
  values?: Partial<Record<"name" | "email" | "subject" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const field = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

async function post(endpoint: string, payload: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!res.ok) console.error(`[forms] ${endpoint} responded ${res.status}`);
    return res.ok;
  } catch (error) {
    console.error(`[forms] ${endpoint} failed:`, error instanceof Error ? error.message : error);
    return false;
  }
}

export async function subscribe(_prev: FormState, data: FormData): Promise<FormState> {
  if (field(data, "company_website")) return { status: "success", message: "Thank you for subscribing." }; // honeypot
  const email = field(data, "email");
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { status: "error", message: "Please enter a valid email address.", fieldErrors: { email: "Enter a valid email address." }, values: { email } };
  }
  const ok = await post(NEWSLETTER_ENDPOINT, { email, source: "website" });
  return ok
    ? { status: "success", message: "Thank you — you're subscribed to Loyalist press releases." }
    : {
        status: "error",
        message: "We couldn't complete your subscription right now. Please try again, or email info@loyalistexploration.com.",
        values: { email },
      };
}

export async function sendContact(_prev: FormState, data: FormData): Promise<FormState> {
  const values = { name: field(data, "name"), email: field(data, "email"), subject: field(data, "subject"), message: field(data, "message") };
  if (field(data, "company_website")) return { status: "success", message: "Thank you — your message has been sent." }; // honeypot

  const fieldErrors: FormState["fieldErrors"] = {};
  if (!values.name) fieldErrors.name = "Please enter your name.";
  else if (values.name.length > 120) fieldErrors.name = "Name must be 120 characters or fewer.";
  if (!EMAIL_RE.test(values.email)) fieldErrors.email = "Please enter a valid email address.";
  if (values.subject.length > 200) fieldErrors.subject = "Subject must be 200 characters or fewer.";
  if (values.message.length < 10) fieldErrors.message = "Please enter a message of at least 10 characters.";
  else if (values.message.length > 5000) fieldErrors.message = "Message must be 5,000 characters or fewer.";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please correct the highlighted fields.", fieldErrors, values };
  }

  const ok = await post(CONTACT_ENDPOINT, values);
  return ok
    ? { status: "success", message: "Thank you — your message has been sent. Our team will respond as soon as possible." }
    : {
        status: "error",
        message: "Your message could not be sent right now. Please try again, or email info@loyalistexploration.com directly.",
        values,
      };
}
