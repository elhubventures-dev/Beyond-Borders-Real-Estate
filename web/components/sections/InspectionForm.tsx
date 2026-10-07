"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  inspectionProjects,
  inspectionSchema,
  type InspectionFormData,
} from "@/lib/validations/forms";
import { earliestInspectionDate, inspectionScheduleIssue, inspectionTimeBounds } from "@/lib/inspection-slot";
import { submitInspectionForm } from "@/actions/inspection";

export function InspectionForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const form = useForm<InspectionFormData>({
    resolver: zodResolver(inspectionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      project: inspectionProjects[0],
      date: "",
      time: "",
    },
  });

  const selectedDate = form.watch("date");
  const now = new Date();
  const earliestDate = earliestInspectionDate(now);
  const timeBounds = selectedDate ? inspectionTimeBounds(selectedDate, now) : null;

  const onSubmit = form.handleSubmit(async (data) => {
    setStatus("idle");
    setError(null);
    const result = await submitInspectionForm(data);
    if (result.success) {
      setStatus("success");
      form.reset();
      return;
    }
    const fieldErrors = result.fields ?? {};
    (Object.keys(fieldErrors) as Array<keyof InspectionFormData>).forEach((key) => {
      const message = fieldErrors[key]?.[0];
      if (message) form.setError(key, { message });
    });
    setStatus("error");
    setError(fieldErrors.date?.[0] || fieldErrors.time?.[0] || result.error);
  });

  return (
    <div className="rounded-xl border border-bb-border bg-white p-6 shadow-sm md:p-8">
      <form onSubmit={onSubmit} className="grid gap-5" noValidate>
        <Field label="Full Name *" error={form.formState.errors.name?.message}>
          <input className="input-field" {...form.register("name")} autoComplete="name" placeholder="Chief / Dr. / Mr. / Mrs." />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email Address *" error={form.formState.errors.email?.message}>
            <input className="input-field" type="email" {...form.register("email")} autoComplete="email" placeholder="name@domain.com" />
          </Field>
          <Field label="Phone Number (WhatsApp Preferred) *" error={form.formState.errors.phone?.message}>
            <input className="input-field" type="tel" {...form.register("phone")} autoComplete="tel" placeholder="+234 ..." />
          </Field>
        </div>

        <Field label="Select Estate to Inspect *" error={form.formState.errors.project?.message}>
          <select className="input-field font-medium" {...form.register("project")}>
            {inspectionProjects.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Preferred Date (Mon – Sat) *" error={form.formState.errors.date?.message}>
            <input
              className="input-field"
              type="date"
              min={earliestDate}
              {...form.register("date", {
                onChange: (event) => {
                  const issue = inspectionScheduleIssue(event.target.value, "12:00", new Date());
                  if (issue?.path === "date") form.setError("date", { message: issue.message });
                  else form.clearErrors("date");
                },
              })}
            />
          </Field>
          <Field label="Preferred Time (9:00 AM – 5:00 PM) *" error={form.formState.errors.time?.message}>
            <input
              className="input-field"
              type="time"
              min={timeBounds?.min ?? "09:00"}
              max={timeBounds?.max ?? "17:00"}
              step={60}
              {...form.register("time", {
                onChange: (event) => {
                  const issue = inspectionScheduleIssue(form.getValues("date"), event.target.value, new Date());
                  if (!issue) {
                    form.clearErrors("time");
                    return;
                  }
                  form.setError(issue.path, { message: issue.message });
                },
              })}
            />
          </Field>
        </div>
        <p className="-mt-2 text-xs font-medium normal-case tracking-normal text-slate-500">
          Monday to Saturday, 9:00 AM – 5:00 PM. The earliest appointment is 6 hours from now.
        </p>

        <div className="pt-2">
          <button type="submit" className="btn-gold w-full sm:w-auto !text-xs !uppercase !tracking-wider" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Confirming Booking…" : "Confirm Inspection Appointment"}
          </button>
        </div>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded bg-emerald-50 border border-emerald-200 p-4 text-sm font-medium text-emerald-800"
              role="status"
            >
              Inspection request confirmed. A Beyond Borders site liaison officer has been assigned and will call you to confirm directions and gate clearance.
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
