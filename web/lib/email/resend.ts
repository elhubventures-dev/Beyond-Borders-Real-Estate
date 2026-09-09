import { Resend } from "resend";

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export const contactToEmail =
  process.env.CONTACT_TO_EMAIL ?? "info@beyondborders.ng";

export const emailFrom =
  process.env.EMAIL_FROM ?? "Beyond Borders <onboarding@resend.dev>";
