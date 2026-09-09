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
          <h2 className="font-display text-2xl">Our office address</h2>
          <p className="mt-3 text-bb-muted">
            {site.address.line1}
            <br />
            {site.address.line2}
          </p>
          <h2 className="mt-8 font-display text-2xl">Talk to us</h2>
          <ul className="mt-3 space-y-2 text-bb-muted">
            <li>
              Email:{" "}
              <a className="text-bb-accent-deep" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a className="text-bb-accent-deep" href={`tel:${site.phoneAlt.replace(/\s/g, "")}`}>
                {site.phoneAlt}
              </a>
            </li>
            <li>
              WhatsApp only:{" "}
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
        </div>
        <div className="md:pt-2">
          <ContactForm heading="Send a message" embedded />
        </div>
      </section>
    </>
  );
}
