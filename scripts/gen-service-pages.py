from pathlib import Path

root = Path(r"F:\PROJECTS\Away\Beyond Borders Real Estate\web\app\our-projects")
services = [
    "architectural-design",
    "general-construction",
    "interior-design",
    "flooring-roofing",
    "int-ext-painting",
]

tpl = '''import type {{ Metadata }} from "next";
import {{ notFound }} from "next/navigation";
import {{ services }} from "@/content/pages";
import {{ PageHero, CTABand }} from "@/components/sections/ProjectParts";
import {{ getSeo }} from "@/content/seo";
import {{ absoluteUrl }} from "@/lib/utils";

const slug = "{slug}";
const service = services.find((s) => s.slug === slug);
const PATH = `/our-projects/${{slug}}/`;
const seo = getSeo(PATH);

export const metadata: Metadata = {{
  title: seo.title,
  description: seo.description,
  alternates: {{ canonical: absoluteUrl(PATH) }},
}};

export default function Page() {{
  if (!service) notFound();
  return (
    <>
      <PageHero title={{service.title}} subtitle={{service.summary}} />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-lg leading-relaxed text-bb-muted">{{service.body}}</p>
      </section>
      <CTABand />
    </>
  );
}}
'''

for slug in services:
    d = root / slug
    d.mkdir(parents=True, exist_ok=True)
    (d / "page.tsx").write_text(tpl.format(slug=slug), encoding="utf-8")
print("services ok")
