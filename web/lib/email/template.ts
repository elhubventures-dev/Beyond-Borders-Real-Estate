/**
 * Branded transactional layout for every form email.
 *
 * A new form does not add an HTML file. In its server action, build two
 * EmailDocument values — one for the sales desk, one for the person who
 * submitted — and send each with sendBrandedEmail:
 *
 *   const internal = consultationInternalEmail(data);
 *   await sendBrandedEmail({
 *     to: contactToEmail,
 *     replyTo: data.email,
 *     subject: internal.subject,
 *     document: internal.document,
 *   });
 */
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";
import { emailFrom, getResend } from "./resend";

const FONT_SANS = "'Segoe UI', Helvetica, Arial, sans-serif";
const FONT_SERIF = "Georgia, 'Times New Roman', Times, serif";

const color = {
  forest: "#0a4c04",
  forestDeep: "#073803",
  leafSoft: "#c6e7c2",
  cream: "#f5f8f5",
  sand: "#e4ebe4",
  white: "#ffffff",
  ink: "#111827",
  body: "#3c4a42",
  muted: "#64748b",
  obsidian: "#0b0f17",
  footer: "#d7e0d8",
  footerMuted: "#9aab9c",
} as const;

export type EmailCta = {
  label: string;
  href: string;
};

export type EmailRow = {
  label: string;
  value: string;
};

export type EmailDocument = {
  preheader: string;
  eyebrow: string;
  title: string;
  intro: string;
  rows: EmailRow[];
  ctas?: EmailCta[];
  note?: string;
};

export type EmailRenderOptions = {
  /** Public logo URL. Defaults to the live site lockup. */
  logoUrl?: string;
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value: string) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function formatValue(value: string) {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br />");
}

function safeHref(href: string) {
  const trimmed = href.trim();
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return absoluteUrl("/");
}

function logoSrc(options?: EmailRenderOptions) {
  return options?.logoUrl ?? absoluteUrl(site.logo);
}

function button(cta: EmailCta, variant: "primary" | "secondary") {
  const href = escapeAttr(safeHref(cta.href));
  const label = escapeHtml(cta.label);
  const filled = variant === "primary";
  const background = filled ? color.forest : color.white;
  const text = filled ? color.white : color.forest;
  const border = `1px solid ${color.forest}`;
  const link = `display:block;padding:16px 18px;font-family:${FONT_SANS};font-size:12px;font-weight:700;letter-spacing:0.12em;line-height:16px;text-transform:uppercase;text-align:center;text-decoration:none;background-color:${background};color:${text};transition:background-color 180ms ease,color 180ms ease;`;
  const kind = filled ? "bb-btn-fill" : "bb-btn-line";

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
    <tr>
      <td align="center" width="100%" bgcolor="${background}" style="width:100%;background-color:${background};border:${border};border-radius:2px;">
        <a class="bb-btn ${kind}" href="${href}" style="${link}">${label}</a>
      </td>
    </tr>
  </table>`;
}

function renderButtons(ctas: EmailCta[] | undefined) {
  if (!ctas?.length) return "";
  const rows = ctas
    .map((cta, index) => {
      const pad = index === ctas.length - 1 ? "0" : "0 0 10px 0";
      return `<tr><td width="100%" style="width:100%;padding:${pad};">${button(cta, index === 0 ? "primary" : "secondary")}</td></tr>`;
    })
    .join("");
  return `<tr>
    <td style="padding:8px 32px 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">${rows}</table>
    </td>
  </tr>`;
}

function renderRows(rows: EmailRow[]) {
  const visible = rows.filter((row) => row.value.trim());
  if (!visible.length) return "";
  const body = visible
    .map((row, index) => {
      const border = index === visible.length - 1 ? "none" : `1px solid ${color.sand}`;
      return `<tr>
        <td style="padding:14px 0;border-bottom:${border};">
          <p style="margin:0;font-family:${FONT_SANS};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${color.muted};">${escapeHtml(row.label)}</p>
          <p style="margin:6px 0 0;font-family:${FONT_SANS};font-size:16px;line-height:1.5;color:${color.ink};">${formatValue(row.value)}</p>
        </td>
      </tr>`;
    })
    .join("");
  return `<tr>
    <td style="padding:8px 32px 12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">${body}</table>
    </td>
  </tr>`;
}

function renderNote(note: string | undefined) {
  if (!note?.trim()) return "";
  return `<tr>
    <td style="padding:0 32px 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:${color.cream};">
        <tr>
          <td style="padding:16px 18px;font-family:${FONT_SANS};font-size:14px;line-height:1.6;color:${color.body};">${formatValue(note)}</td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function footerBlock() {
  const emailHref = escapeAttr(`mailto:${site.email}`);
  const abujaTel = escapeAttr(`tel:${site.phone.replace(/[^\d+]/g, "")}`);
  const phTel = escapeAttr(`tel:${site.phonePh.replace(/[^\d+]/g, "")}`);
  return `<tr>
    <td bgcolor="${color.obsidian}" style="background-color:${color.obsidian};padding:28px 32px 32px;">
      <p style="margin:0;font-family:${FONT_SERIF};font-size:18px;line-height:1.3;color:${color.white};">${escapeHtml(site.legalName)}</p>
      <p style="margin:6px 0 0;font-family:${FONT_SERIF};font-size:14px;font-style:italic;color:${color.leafSoft};">${escapeHtml(site.tagline)}</p>
      <p style="margin:22px 0 0;font-family:${FONT_SANS};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${color.footerMuted};">Abuja</p>
      <p style="margin:6px 0 0;font-family:${FONT_SANS};font-size:14px;line-height:1.6;color:${color.footer};">${escapeHtml(site.address.line1)}<br />${escapeHtml(site.address.line2)}</p>
      <p style="margin:6px 0 0;font-family:${FONT_SANS};font-size:14px;line-height:1.6;"><a href="${abujaTel}" style="color:${color.white};text-decoration:none;">${escapeHtml(site.phone)}</a></p>
      <p style="margin:18px 0 0;font-family:${FONT_SANS};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${color.footerMuted};">Port Harcourt</p>
      <p style="margin:6px 0 0;font-family:${FONT_SANS};font-size:14px;line-height:1.6;color:${color.footer};">${escapeHtml(site.addressPh.line1)}<br />${escapeHtml(site.addressPh.line2)}</p>
      <p style="margin:6px 0 0;font-family:${FONT_SANS};font-size:14px;line-height:1.6;"><a href="${phTel}" style="color:${color.white};text-decoration:none;">${escapeHtml(site.phonePh)}</a></p>
      <p style="margin:22px 0 0;font-family:${FONT_SANS};font-size:14px;line-height:1.6;"><a href="${emailHref}" style="color:${color.white};text-decoration:none;">${escapeHtml(site.email)}</a></p>
    </td>
  </tr>`;
}

export function renderBrandedEmail(document: EmailDocument, options?: EmailRenderOptions) {
  const logo = escapeAttr(logoSrc(options));
  const preheader = escapeHtml(document.preheader);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(document.title)}</title>
  <style>
    .bb-btn { transition: background-color 180ms ease, color 180ms ease; }
    .bb-btn-fill:hover { background-color: ${color.forestDeep} !important; }
    .bb-btn-line:hover { background-color: ${color.forest} !important; color: ${color.white} !important; }
    @media (prefers-reduced-motion: reduce) {
      .bb-btn { transition: none !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${color.cream};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${color.cream};opacity:0;">
    ${preheader}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${color.cream};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center"><tr><td><![endif]-->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:${color.white};border:1px solid ${color.sand};">
          <tr>
            <td bgcolor="${color.forest}" style="background-color:${color.forest};height:6px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;background-color:${color.white};">
              <img src="${logo}" alt="${escapeAttr(`${site.name}. ${site.tagline}`)}" width="220" style="display:block;width:220px;max-width:100%;height:auto;border:0;" />
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px 8px;">
              <p style="margin:0;font-family:${FONT_SANS};font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${color.forest};">${escapeHtml(document.eyebrow)}</p>
              <h1 style="margin:10px 0 0;font-family:${FONT_SERIF};font-size:28px;font-weight:500;line-height:1.25;color:${color.ink};">${escapeHtml(document.title)}</h1>
              <p style="margin:14px 0 0;font-family:${FONT_SANS};font-size:16px;line-height:1.65;color:${color.body};">${formatValue(document.intro)}</p>
            </td>
          </tr>
          ${renderRows(document.rows)}
          ${renderButtons(document.ctas)}
          ${renderNote(document.note)}
          ${footerBlock()}
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderBrandedEmailText(document: EmailDocument) {
  const lines = [
    site.name,
    site.tagline,
    "",
    document.eyebrow.toUpperCase(),
    document.title,
    "",
    document.intro,
    "",
    ...document.rows
      .filter((row) => row.value.trim())
      .flatMap((row) => [`${row.label}: ${row.value}`, ""]),
  ];

  if (document.ctas?.length) {
    for (const cta of document.ctas) {
      lines.push(`${cta.label}: ${safeHref(cta.href)}`);
    }
    lines.push("");
  }

  if (document.note?.trim()) {
    lines.push(document.note, "");
  }

  lines.push(
    "—",
    site.legalName,
    `Abuja: ${site.address.line1}, ${site.address.line2}`,
    site.phone,
    `Port Harcourt: ${site.addressPh.line1}, ${site.addressPh.line2}`,
    site.phonePh,
    site.email,
  );

  return lines.join("\n").replace(/\n{3,}/g, "\n\n");
}

export async function sendBrandedEmail(input: {
  to: string;
  replyTo?: string;
  subject: string;
  document: EmailDocument;
}) {
  const resend = getResend();
  if (!resend) {
    throw new Error("Email is not configured");
  }

  const { error } = await resend.emails.send({
    from: emailFrom,
    to: input.to,
    replyTo: input.replyTo,
    subject: input.subject,
    html: renderBrandedEmail(input.document),
    text: renderBrandedEmailText(input.document),
  });

  if (error) {
    throw new Error(error.message);
  }
}
