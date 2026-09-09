"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validations/forms";
import { contactToEmail, emailFrom, getResend } from "@/lib/email/resend";
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
  const { name, email, phone, service, message } = parsed.data;

  if (!resend) {
    console.info("[contact form]", parsed.data);
    return { success: true };
  }

  try {
    await resend.emails.send({
      from: emailFrom,
      to: contactToEmail,
      replyTo: email,
      subject: `Consultation request from ${name}`,
      html: `
        <h2>New consultation request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Service:</strong> ${escapeHtml(service)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Could not send your message. Please call or WhatsApp us." };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
