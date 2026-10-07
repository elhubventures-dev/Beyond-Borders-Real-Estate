import { Resend } from "resend";

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

/** Inbox that receives every form notification. */
export const contactToEmail =
  process.env.CONTACT_TO_EMAIL ?? "info@beyondborders.ng";

/**
 * Sender address. Resend only delivers this after beyondborders.ng
 * is verified in the Resend dashboard.
 */
export const emailFrom =
  process.env.EMAIL_FROM ?? "Beyond Borders <info@beyondborders.ng>";
