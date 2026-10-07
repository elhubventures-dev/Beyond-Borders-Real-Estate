import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";
import type { ContactFormData, DownloadLeadData, InspectionFormData } from "@/lib/validations/forms";
import type { EmailDocument } from "./template";

export type FormEmail = {
  subject: string;
  document: EmailDocument;
};

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function greetingName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const honorific = /^(dr|mr|mrs|ms|miss|chief|engr|prof|alhaji|alhaja|pastor|rev|sir|lady)\.?$/i;
  return parts.find((part) => !honorific.test(part)) ?? parts[0] ?? "there";
}

function telHref(phone: string) {
  return `tel:${phone.trim().replace(/[^\d+]/g, "")}`;
}

function whatsappDigits(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 11) {
    digits = `234${digits.slice(1)}`;
  }
  return digits;
}

function whatsappHref(phone: string, text: string) {
  return `https://wa.me/${whatsappDigits(phone)}?text=${encodeURIComponent(text)}`;
}

function formatDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return value;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatTime(value: string) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return value;
  const hours = Number(match[1]);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${match[2]} ${suffix}`;
}

export function consultationInternalEmail(data: ContactFormData): FormEmail {
  const name = singleLine(data.name);
  const subject = `Consultation request from ${name}`;
  return {
    subject,
    document: {
      preheader: `${name} asked about ${data.service}.`,
      eyebrow: "Sales desk",
      title: "New consultation request",
      intro: "A visitor submitted the consultation form. Reply, call, or WhatsApp them from this message.",
      rows: [
        { label: "Name", value: data.name },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
        { label: "Service", value: data.service },
        { label: "Message", value: data.message },
      ],
      ctas: [
        {
          label: "Reply",
          href: `mailto:${data.email}?subject=${encodeURIComponent(`Re: ${subject}`)}`,
        },
        { label: "Call", href: telHref(data.phone) },
        {
          label: "WhatsApp",
          href: whatsappHref(
            data.phone,
            `Hello ${greetingName(data.name)}, this is Beyond Borders. We received your consultation request about ${data.service} and wanted to follow up.`,
          ),
        },
      ],
      note: "Replying to this email goes straight to the person who submitted the form.",
    },
  };
}

export function consultationCustomerEmail(data: ContactFormData): FormEmail {
  const name = greetingName(data.name);
  return {
    subject: "We received your consultation request",
    document: {
      preheader: `Thank you, ${name}. A Beyond Borders consultant will be in touch about ${data.service}.`,
      eyebrow: "Consultation",
      title: `Thank you, ${name}`,
      intro: `A consultant will be in touch shortly about ${data.service}. If you would rather speak now, call or WhatsApp the desk.`,
      rows: [
        { label: "Name", value: data.name },
        { label: "Phone", value: data.phone },
        { label: "Service", value: data.service },
        { label: "Message", value: data.message },
      ],
      ctas: [
        {
          label: "WhatsApp us",
          href: whatsappHref(
            site.whatsapp,
            `Hello Beyond Borders, I just submitted a consultation request about ${data.service}. My name is ${singleLine(data.name)}.`,
          ),
        },
        { label: "Call Abuja", href: telHref(site.phone) },
        { label: "Schedule an inspection", href: absoluteUrl("/schedule-an-inspection/") },
      ],
      note: "This note confirms we received your request. A consultant will follow up shortly.",
    },
  };
}

export function inspectionInternalEmail(data: InspectionFormData): FormEmail {
  const name = singleLine(data.name);
  const when = `${formatDate(data.date)} at ${formatTime(data.time)}`;
  const subject = `Inspection request — ${singleLine(data.project)}`;
  return {
    subject,
    document: {
      preheader: `${name} requested an inspection of ${data.project} on ${when}.`,
      eyebrow: "Sales desk",
      title: "New inspection request",
      intro: "A visitor asked to inspect a property. Reply, call, or WhatsApp them to confirm the visit.",
      rows: [
        { label: "Name", value: data.name },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
        { label: "Project", value: data.project },
        { label: "Preferred date", value: formatDate(data.date) },
        { label: "Preferred time", value: formatTime(data.time) },
      ],
      ctas: [
        {
          label: "Reply",
          href: `mailto:${data.email}?subject=${encodeURIComponent(`Re: ${subject}`)}`,
        },
        { label: "Call", href: telHref(data.phone) },
        {
          label: "WhatsApp",
          href: whatsappHref(
            data.phone,
            `Hello ${greetingName(data.name)}, this is Beyond Borders. We received your request to inspect ${data.project} on ${when} and wanted to confirm.`,
          ),
        },
      ],
      note: "Replying to this email goes straight to the person who submitted the form.",
    },
  };
}

export function downloadInternalEmail(data: DownloadLeadData): FormEmail {
  const name = singleLine(data.name);
  const subject = `Download request: ${singleLine(data.document)}`;
  return {
    subject,
    document: {
      preheader: `${name} requested ${data.document}.`,
      eyebrow: "Sales desk",
      title: "New document request",
      intro: "A visitor asked for a document. Reply, call, or WhatsApp them from this message.",
      rows: [
        { label: "Document", value: data.document },
        { label: "Name", value: data.name },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
      ],
      ctas: [
        {
          label: "Reply",
          href: `mailto:${data.email}?subject=${encodeURIComponent(`Re: ${subject}`)}`,
        },
        { label: "Call", href: telHref(data.phone) },
        {
          label: "WhatsApp",
          href: whatsappHref(
            data.phone,
            `Hello ${greetingName(data.name)}, this is Beyond Borders. We received your request for the ${data.document} and wanted to follow up.`,
          ),
        },
      ],
      note: "Replying to this email goes straight to the person who submitted the form.",
    },
  };
}

export function downloadCustomerEmail(data: DownloadLeadData): FormEmail {
  const name = greetingName(data.name);
  const fileUrl = data.href ? absoluteUrl(data.href) : undefined;
  return {
    subject: `Your ${singleLine(data.document)} from Beyond Borders`,
    document: {
      preheader: `Thank you, ${name}. Your ${data.document} request is with us.`,
      eyebrow: "Document",
      title: `Thank you, ${name}`,
      intro: `We received your request for the ${data.document}. The file should start downloading now. If it does not, use the link below or reply to this email.`,
      rows: [
        { label: "Document", value: data.document },
        { label: "Name", value: data.name },
        { label: "Phone", value: data.phone },
      ],
      ctas: [
        ...(fileUrl ? [{ label: "Open the document", href: fileUrl }] : []),
        {
          label: "WhatsApp us",
          href: whatsappHref(
            site.whatsapp,
            `Hello Beyond Borders, I just requested the ${data.document}. My name is ${singleLine(data.name)}.`,
          ),
        },
        { label: "Call Abuja", href: telHref(site.phone) },
      ],
      note: "A consultant may follow up about this document.",
    },
  };
}

export function inspectionCustomerEmail(data: InspectionFormData): FormEmail {
  const name = greetingName(data.name);
  const date = formatDate(data.date);
  const time = formatTime(data.time);
  return {
    subject: `Inspection request received — ${singleLine(data.project)}`,
    document: {
      preheader: `We have your request to visit ${data.project} on ${date} at ${time}.`,
      eyebrow: "Inspection",
      title: "Your inspection request is with us",
      intro: `Thank you, ${name}. We will confirm ${date} at ${time} for ${data.project}, or propose another slot.`,
      rows: [
        { label: "Project", value: data.project },
        { label: "Preferred date", value: date },
        { label: "Preferred time", value: time },
        { label: "Phone", value: data.phone },
      ],
      ctas: [
        {
          label: "WhatsApp us",
          href: whatsappHref(
            site.whatsapp,
            `Hello Beyond Borders, I just requested an inspection of ${data.project} on ${date} at ${time}. My name is ${singleLine(data.name)}.`,
          ),
        },
        { label: "Call Abuja", href: telHref(site.phone) },
        { label: "View our estates", href: absoluteUrl("/estates/") },
      ],
      note: "This confirms we received your preferred time. A site officer will call to confirm directions and gate clearance.",
    },
  };
}
