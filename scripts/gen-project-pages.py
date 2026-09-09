from pathlib import Path

root = Path(r"F:\PROJECTS\Away\Beyond Borders Real Estate\web\app")

houses = [
    ("houses-white-city-idu", "/houses-white-city-idu/", "idu"),
    ("houses-white-court-dakwo", "/houses-white-court-dakwo/", "dakwo"),
    ("houses-white-city-kuje", "/houses-white-city-kuje/", "kuje"),
    ("houses-white-city-giri", "/houses-white-city-giri/", "giri"),
    ("white-coutry-gardens-lugbe", "/white-coutry-gardens-lugbe/", "lugbe"),
]
lands = [
    ("lands-white-city-idu", "/lands-white-city-idu/", "idu"),
    ("lands-white-city-kuje", "/lands-white-city-kuje/", "kuje"),
    ("lands-white-city-giri", "/lands-white-city-giri/", "giri"),
    ("white-country-gardens-lugbe", "/white-country-gardens-lugbe/", "lugbe"),
]

house_tpl = '''import type {{ Metadata }} from "next";
import {{ notFound }} from "next/navigation";
import {{ HousesProjectBody }} from "@/components/project/ProjectViews";
import {{ projects }} from "@/content/projects";
import {{ getSeo }} from "@/content/seo";
import {{ absoluteUrl }} from "@/lib/utils";

const PATH = "{path}";
const project = projects.find((p) => p.id === "{id}");

const seo = getSeo(PATH);

export const metadata: Metadata = {{
  title: seo.title,
  description: seo.description,
  alternates: {{ canonical: absoluteUrl(PATH) }},
}};

export default function Page() {{
  if (!project) notFound();
  return <HousesProjectBody project={{project}} />;
}}
'''

land_tpl = '''import type {{ Metadata }} from "next";
import {{ notFound }} from "next/navigation";
import {{ LandsProjectBody }} from "@/components/project/ProjectViews";
import {{ projects }} from "@/content/projects";
import {{ getSeo }} from "@/content/seo";
import {{ absoluteUrl }} from "@/lib/utils";

const PATH = "{path}";
const project = projects.find((p) => p.id === "{id}");

const seo = getSeo(PATH);

export const metadata: Metadata = {{
  title: seo.title,
  description: seo.description,
  alternates: {{ canonical: absoluteUrl(PATH) }},
}};

export default function Page() {{
  if (!project || !project.lands?.length) notFound();
  return <LandsProjectBody project={{project}} />;
}}
'''

for folder, path, pid in houses:
    (root / folder).mkdir(parents=True, exist_ok=True)
    (root / folder / "page.tsx").write_text(house_tpl.format(path=path, id=pid), encoding="utf-8")
for folder, path, pid in lands:
    (root / folder).mkdir(parents=True, exist_ok=True)
    (root / folder / "page.tsx").write_text(land_tpl.format(path=path, id=pid), encoding="utf-8")
print("done")
