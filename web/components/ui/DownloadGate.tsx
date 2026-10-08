"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { submitDownloadLead } from "@/actions/download";

type DownloadGateProps = {
  href: string;
  label: string;
  documentName: string;
  className?: string;
};

export function DownloadGate({ href, label, documentName, className }: DownloadGateProps) {
  const titleId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState({ name: "", email: "", phone: "" });
  const [invalid, setInvalid] = useState<{ name?: string; email?: string; phone?: string }>({});

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !pending) close();
    };
    document.addEventListener("keydown", onKey);
    nameRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, pending]);

  const close = () => {
    if (pending) return;
    setOpen(false);
    setError(null);
    setInvalid({});
    triggerRef.current?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextInvalid: { name?: string; email?: string; phone?: string } = {};
    const name = fields.name.trim();
    const email = fields.email.trim();
    const phone = fields.phone.trim();
    if (name.length < 2) nextInvalid.name = "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextInvalid.email = "Enter a valid email";
    if (phone.replace(/\D/g, "").length < 7) nextInvalid.phone = "Enter your phone number";
    setInvalid(nextInvalid);
    if (Object.keys(nextInvalid).length > 0) return;

    setPending(true);
    setError(null);
    const result = await submitDownloadLead({ name, email, phone, document: documentName, href });
    setPending(false);
    if (!result.success) {
      setError(result.error);
      return;
    }

    const link = document.createElement("a");
    link.href = href;
    link.download = "";
    link.rel = "noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setFields({ name: "", email: "", phone: "" });
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button ref={triggerRef} type="button" className={className} onClick={() => setOpen(true)}>
        {label}
      </button>
      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0b0f17]/70 p-4 sm:items-center"
              onClick={close}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="max-h-[min(40rem,calc(100dvh-2rem))] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_28px_70px_-24px_rgba(11,15,23,0.55)] sm:p-8"
                onClick={(event) => event.stopPropagation()}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-bb-bronze">
                  Document request
                </p>
                <h2 id={titleId} className="mt-1 font-display text-2xl font-medium text-bb-obsidian">
                  {documentName}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Let us meet you. Your download begins shortly.
                </p>
                <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-semibold text-bb-obsidian">Full name</span>
                    <input
                      ref={nameRef}
                      className="input-field"
                      name="name"
                      autoComplete="name"
                      required
                      value={fields.name}
                      onChange={(event) => setFields((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Your full name"
                      aria-invalid={Boolean(invalid.name)}
                    />
                    {invalid.name && <span className="text-xs text-red-700">{invalid.name}</span>}
                  </label>
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-semibold text-bb-obsidian">Email</span>
                    <input
                      className="input-field"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={fields.email}
                      onChange={(event) => setFields((current) => ({ ...current, email: event.target.value }))}
                      placeholder="name@email.com"
                      aria-invalid={Boolean(invalid.email)}
                    />
                    {invalid.email && <span className="text-xs text-red-700">{invalid.email}</span>}
                  </label>
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-semibold text-bb-obsidian">Phone number</span>
                    <input
                      className="input-field"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      value={fields.phone}
                      onChange={(event) => setFields((current) => ({ ...current, phone: event.target.value }))}
                      placeholder="+234 ..."
                      aria-invalid={Boolean(invalid.phone)}
                    />
                    {invalid.phone && <span className="text-xs text-red-700">{invalid.phone}</span>}
                  </label>
                  {error && <p className="text-sm text-red-700">{error}</p>}
                  <div className="mt-2 flex flex-wrap items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={close}
                      className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-bb-obsidian"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary !px-5 !py-2.5 !text-xs !uppercase !tracking-wider" disabled={pending}>
                      {pending ? "Please wait" : "Download"}
                    </button>
                  </div>
                </form>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
