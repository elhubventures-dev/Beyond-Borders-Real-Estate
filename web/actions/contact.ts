"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validations/forms";
import { contactToEmail, getResend } from "@/lib/email/resend";
import { consultationCustomerEmail, consultationInternalEmail } from "@/lib/email/messages";
import { sendBrandedEmail } from "@/lib/email/template";
import { rateLimit } from "@/lib/rate-limit";

export type ActionResult =
  | { success: true }
  | { success: false; error: string; fields?: Record<string, string[]> };

export async function submitContactForm(data: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the form fields.",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.ok) {
    return { success: false, error: "Too many requests. Please try again shortly." };
  }

  const resend = getResend();
  const lead = parsed.data;

  if (!resend) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact form] RESEND_API_KEY is missing");
      return { success: false, error: "Could not send your message. Please call or WhatsApp us." };
    }
    console.info("[contact form]", lead);
    return { success: true };
  }

  const internal = consultationInternalEmail(lead);
  const customer = consultationCustomerEmail(lead);

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
    return { success: false, error: "Could not send your message. Please call or WhatsApp us." };
  }
}
