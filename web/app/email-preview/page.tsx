import type { Metadata } from "next";
import { headers } from "next/headers";
import { site } from "@/content/site";
import {
  consultationCustomerEmail,
  consultationInternalEmail,
  downloadCustomerEmail,
  downloadInternalEmail,
  inspectionCustomerEmail,
  inspectionInternalEmail,
} from "@/lib/email/messages";
import { renderBrandedEmail } from "@/lib/email/template";
import { inspectionProjects } from "@/lib/validations/forms";

export const metadata: Metadata = {
  title: "Email preview",
  robots: { index: false, follow: false },
};

const consultation = {
  name: "Adaeze Okonkwo",
  email: "adaeze@example.com",
  phone: "+234 803 000 0000",
  service: site.services[0],
  message:
    "I would like to discuss a buy-and-build package in Abuja.\nPlease call after 2pm.",
};

const inspection = {
  name: "Chief Chinedu Bassey",
  email: "chinedu@example.com",
  phone: "08050000000",
  project: inspectionProjects[0],
  date: "2026-10-18",
  time: "11:00",
};

export default async function EmailPreviewPage() {
  const headerList = await headers();
  const host = (headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3010")
    .split(",")[0]
    .trim();
  const proto =
    headerList.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  const logoUrl = `${proto}://${host}${site.logo}`;

  const download = {
    name: "Ngozi Adeyemi",
    email: "ngozi@example.com",
    phone: "+234 809 000 0000",
    document: "Company Profile",
    href: site.downloads.companyProfile,
  };

  const samples = [
    { label: "Sales desk — consultation", email: consultationInternalEmail(consultation) },
    { label: "Visitor — consultation", email: consultationCustomerEmail(consultation) },
    { label: "Sales desk — inspection", email: inspectionInternalEmail(inspection) },
    { label: "Visitor — inspection", email: inspectionCustomerEmail(inspection) },
    { label: "Sales desk — document", email: downloadInternalEmail(download) },
    { label: "Visitor — document", email: downloadCustomerEmail(download) },
  ];

  return (
    <div className="bg-bb-cream px-4 py-14">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-bb-forest">
          Unlisted review
        </p>
        <h1 className="mt-2 font-display text-3xl text-bb-ink">Email templates</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-bb-muted">
          Sample messages sent when someone submits a form. These use fictional details and are
          not linked from the site.
        </p>
        <div className="mt-10 space-y-12">
          {samples.map((sample) => (
            <section key={sample.label}>
              <h2 className="font-display text-xl text-bb-ink">{sample.label}</h2>
              <p className="mt-1 text-sm text-bb-muted">Subject: {sample.email.subject}</p>
              <iframe
                title={sample.label}
                srcDoc={renderBrandedEmail(sample.email.document, { logoUrl })}
                className="mt-4 h-[980px] w-full border border-bb-sand bg-white"
                sandbox="allow-same-origin allow-popups"
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
