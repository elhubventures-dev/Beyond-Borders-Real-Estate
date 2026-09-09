import type { Metadata } from "next";
import { faqs } from "@/content/pages";
import { PageHero, CTABand } from "@/components/sections/ProjectParts";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const seo = getSeo("/faqs/");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl("/faqs/") },
};

export default function FaqsPage() {
  return (
    <>
      <PageHero title="FAQs" subtitle="Practical answers about buying with Beyond Borders." />
      <section className="mx-auto max-w-3xl px-4 py-12">
        {faqs.map((group) => (
          <div key={group.category} className="mb-12">
            <h2 className="font-display text-2xl">{group.category}</h2>
            <div className="mt-6 space-y-4">
              {group.items.map((item) => (
                <details key={item.q} className="border border-bb-ink/10 bg-bb-white p-4 open:shadow-sm">
                  <summary className="cursor-pointer font-semibold">{item.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-bb-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>
      <CTABand />
    </>
  );
}
