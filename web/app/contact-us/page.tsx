import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHero } from "@/components/sections/ProjectParts";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";
import { site } from "@/content/site";

const seo = getSeo("/contact-us/");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl("/contact-us/") },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" subtitle="We love to hear from you." />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Our office addresses</h2>
          <div className="mt-3 space-y-5 text-bb-muted">
            <p>
              <span className="block text-xs font-bold uppercase tracking-wider text-bb-bronze-dark">
                Jahi (Primary)
              </span>
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
            <p>
              <span className="block text-xs font-bold uppercase tracking-wider text-bb-bronze-dark">
                Plot 84, Jahi
              </span>
              {site.addressAlt.line1}
              <br />
              {site.addressAlt.line2}
            </p>
            <p>
              <span className="block text-xs font-bold uppercase tracking-wider text-bb-bronze-dark">
                Port Harcourt
              </span>
              {site.addressPh.line1}
              <br />
              {site.addressPh.line2}
            </p>
          </div>
          <h2 className="mt-8 font-display text-2xl">Talk to us</h2>
          <ul className="mt-3 space-y-2 text-bb-muted">
            <li>
              Email:{" "}
              <a className="text-bb-accent-deep" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              {" · "}
              <a className="text-bb-accent-deep" href={`mailto:${site.emailAlt}`}>
                {site.emailAlt}
              </a>
            </li>
            <li>
              Abuja:{" "}
              <a className="text-bb-accent-deep" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </a>
              {" · "}
              <a className="text-bb-accent-deep" href={`tel:${site.phoneAlt.replace(/\s/g, "")}`}>
                {site.phoneAlt}
              </a>
              {" · "}
              <a className="text-bb-accent-deep" href={`tel:${site.phoneExtra.replace(/\s/g, "")}`}>
                {site.phoneExtra}
              </a>
            </li>
            <li>
              Port Harcourt:{" "}
              <a className="text-bb-accent-deep" href={`tel:${site.phonePh.replace(/\s/g, "")}`}>
                {site.phonePh}
              </a>
              {" · "}
              <a className="text-bb-accent-deep" href={`tel:${site.phonePhAlt.replace(/\s/g, "")}`}>
                {site.phonePhAlt}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                className="text-bb-accent-deep"
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                {site.phone}
              </a>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.downloads.companyProfile}
              download
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-bb-bronze-dark hover:underline"
            >
              Download company profile →
            </a>
            <a
              href={site.downloads.portfolioFlyer}
              download
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-bb-bronze-dark hover:underline"
            >
              Download portfolio flyer →
            </a>
          </div>
        </div>
        <div className="md:pt-2">
          <ContactForm heading="Send a message" embedded />
        </div>
      </section>
    </>
  );
}
