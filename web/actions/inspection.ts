"use server";

import { headers } from "next/headers";
import { inspectionSchema } from "@/lib/validations/forms";
import { contactToEmail, emailFrom, getResend } from "@/lib/email/resend";
import { rateLimit } from "@/lib/rate-limit";
import type { ActionResult } from "./contact";

export async function submitInspectionForm(data: unknown): Promise<ActionResult> {
  const parsed = inspectionSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the form fields.",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`inspection:${ip}`);
  if (!limited.ok) {
    return { success: false, error: "Too many requests. Please try again shortly." };
  }

  const resend = getResend();
  const { name, email, phone, project, date, time } = parsed.data;

  if (!resend) {
    console.info("[inspection form]", parsed.data);
    return { success: true };
  }

  try {
    await resend.emails.send({
      from: emailFrom,
      to: contactToEmail,
      replyTo: email,
      subject: `Inspection request — ${project}`,
      html: `
        <h2>New inspection request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Project:</strong> ${escapeHtml(project)}</p>
        <p><strong>Preferred date:</strong> ${escapeHtml(date)}</p>
        <p><strong>Preferred time:</strong> ${escapeHtml(time)}</p>
      `,
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Could not send your request. Please call or WhatsApp us." };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
