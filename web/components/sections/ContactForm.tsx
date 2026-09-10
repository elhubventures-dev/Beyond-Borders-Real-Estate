"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { contactSchema, type ContactFormData } from "@/lib/validations/forms";
import { submitContactForm } from "@/actions/contact";
import { site } from "@/content/site";

export function ContactForm({
  heading = "Request A Private Consultation",
  embedded = false,
}: {
  heading?: string;
  embedded?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: site.services[0],
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setStatus("idle");
    setError(null);
    const result = await submitContactForm(data);
    if (result.success) {
      setStatus("success");
      form.reset();
      return;
    }
    setStatus("error");
    setError(result.error);
  });

  const inner = (
    <div className="rounded-xl border border-bb-border bg-white p-6 md:p-10 shadow-sm">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-bb-bronze-dark">
        Advisory & Client Relations
      </span>
      <h2 className="mt-1 font-display text-3xl sm:text-4xl font-medium text-bb-obsidian">{heading}</h2>
      <p className="mt-2 text-sm text-slate-600">
        Connect with our Abuja acquisitions team or speak directly with our senior advisor at{" "}
        <a className="font-semibold text-bb-obsidian underline hover:text-bb-bronze-dark" href={`tel:${site.phone.replace(/\s/g, "")}`}>
          {site.phone}
        </a>
        .
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5" noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Full Name *" error={form.formState.errors.name?.message}>
            <input className="input-field" {...form.register("name")} autoComplete="name" placeholder="Chief / Dr. / Mr. / Mrs." />
          </Field>
          <Field label="Email Address *" error={form.formState.errors.email?.message}>
            <input className="input-field" type="email" {...form.register("email")} autoComplete="email" placeholder="name@domain.com" />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Phone Number (WhatsApp Active) *" error={form.formState.errors.phone?.message}>
            <input className="input-field" type="tel" {...form.register("phone")} autoComplete="tel" placeholder="+234 ..." />
          </Field>
          <Field label="Nature of Inquiry *" error={form.formState.errors.service?.message}>
            <select className="input-field" {...form.register("service")}>
              {site.services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Message or Investment Requirements" error={form.formState.errors.message?.message}>
          <textarea
            className="input-field min-h-28"
            {...form.register("message")}
            placeholder="Specify preferred estate (e.g. White City Beverly, Aspen 2), typology, or custom architectural request..."
          />
        </Field>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <button type="submit" className="btn-gold !text-xs !uppercase !tracking-wider" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting Inquiry…" : "Send Confidential Inquiry"}
          </button>

          <a
            href={`https://wa.me/${site.whatsapp}?text=Hello%20Beyond%20Borders,%20I%20would%20like%20to%20schedule%20a%20private%20consultation.`}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-slate-500 hover:text-bb-obsidian flex items-center gap-1.5"
          >
            <span>Or message us immediately on WhatsApp</span>
            <span>→</span>
          </a>
        </div>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded bg-emerald-50 border border-emerald-200 p-4 text-sm font-medium text-emerald-800"
              role="status"
            >
              Thank you. Your consultation request has been routed to our Abuja sales director. We will be in touch shortly.
            </motion.div>
          )}
          {status === "error" && error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded bg-red-50 border border-red-200 p-4 text-sm font-medium text-red-700"
              role="alert"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );

  if (embedded) return <div>{inner}</div>;

  return (
    <section className="bg-gradient-to-b from-white via-bb-stone to-bb-cream py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">{inner}</div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
      <span className="mb-2 block">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium normal-case tracking-normal text-red-600">{error}</span>}
    </label>
  );
}
