"use server";

import { headers } from "next/headers";
import { downloadLeadSchema } from "@/lib/validations/forms";
import { downloadCustomerEmail, downloadInternalEmail } from "@/lib/email/messages";
import { contactToEmail, getResend } from "@/lib/email/resend";
import { sendBrandedEmail } from "@/lib/email/template";
import { rateLimit } from "@/lib/rate-limit";

export type DownloadLeadResult = { success: true } | { success: false; error: string };

export async function submitDownloadLead(data: unknown): Promise<DownloadLeadResult> {
  const parsed = downloadLeadSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Name, email, and phone are required." };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`download:${ip}`);
  if (!limited.ok) {
    return { success: false, error: "Too many requests. Please try again shortly." };
  }

  const lead = parsed.data;
  const resend = getResend();

  if (!resend) {
    if (process.env.NODE_ENV === "production") {
      console.error("[download lead] RESEND_API_KEY is missing");
      return { success: false, error: "Could not send your request. Please call or WhatsApp us." };
    }
    console.info("[download lead]", lead);
    return { success: true };
  }

  const internal = downloadInternalEmail(lead);
  const customer = downloadCustomerEmail(lead);

  try {
    await sendBrandedEmail({
      to: contactToEmail,
      replyTo: lead.email,
      subject: internal.subject,
      document: internal.document,
    });
    await sendBrandedEmail({
      to: lead.email,
      replyTo: contactToEmail,
      subject: customer.subject,
      document: customer.document,
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Could not send your request. Please call or WhatsApp us." };
  }
}
