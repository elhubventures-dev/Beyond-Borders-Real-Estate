import os

APP = "web/app"

PAGE_HOUSES = """import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HousesProjectBody } from "@/components/project/ProjectViews";
import { projects } from "@/content/projects";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const PATH = "__PATH__";
const project = projects.find((p) => p.id === "__ID__");

const seo = getSeo(PATH);

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl(PATH) },
};

export default function Page() {
  if (!project) notFound();
  return <HousesProjectBody project={project} />;
}
"""

PAGE_LANDS = """import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandsProjectBody } from "@/components/project/ProjectViews";
import { projects } from "@/content/projects";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const PATH = "__PATH__";
const project = projects.find((p) => p.id === "__ID__");

const seo = getSeo(PATH);

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl(PATH) },
};

export default function Page() {
  if (!project) notFound();
  return <LandsProjectBody project={project} />;
}
"""

houses = [
    ("houses-white-city-beverly", "beverly", "/houses-white-city-beverly/"),
    ("houses-white-city-savanah", "savanah", "/houses-white-city-savanah/"),
    ("houses-white-city-dallas", "dallas", "/houses-white-city-dallas/"),
    ("houses-royal-city-beverly", "royal-beverly", "/houses-royal-city-beverly/"),
    ("houses-royal-city-dallas", "royal-dallas", "/houses-royal-city-dallas/"),
    ("houses-white-city-aspen-1", "aspen-1", "/houses-white-city-aspen-1/"),
    ("houses-white-city-aspen-2", "aspen-2", "/houses-white-city-aspen-2/"),
    ("houses-white-country-parks", "ketti", "/houses-white-country-parks/"),
    ("houses-kingscity-davos", "davos", "/houses-kingscity-davos/"),
    ("houses-white-court", "white-court", "/houses-white-court/"),
]

lands = [
    ("lands-white-city-beverly", "beverly", "/lands-white-city-beverly/"),
    ("lands-white-city-savanah", "savanah", "/lands-white-city-savanah/"),
    ("lands-white-city-dallas", "dallas", "/lands-white-city-dallas/"),
    ("lands-royal-city-beverly", "royal-beverly", "/lands-royal-city-beverly/"),
    ("lands-royal-city-dallas", "royal-dallas", "/lands-royal-city-dallas/"),
    ("lands-white-city-aspen-1", "aspen-1", "/lands-white-city-aspen-1/"),
    ("lands-white-city-aspen-2", "aspen-2", "/lands-white-city-aspen-2/"),
    ("lands-white-country-parks", "ketti", "/lands-white-country-parks/"),
    ("lands-kingscity-davos", "davos", "/lands-kingscity-davos/"),
    ("lands-kingscity-manhattan", "manhattan", "/lands-kingscity-manhattan/"),
    ("lands-kingscity-parks-gardens", "parks-ph", "/lands-kingscity-parks-gardens/"),
    ("lands-kingscity-los-angeles", "los-angeles", "/lands-kingscity-los-angeles/"),
]

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
app = os.path.join(root, APP)


def write_page(folder: str, pid: str, path: str, template: str) -> None:
    d = os.path.join(app, folder)
    os.makedirs(d, exist_ok=True)
    content = template.replace("__PATH__", path).replace("__ID__", pid)
    with open(os.path.join(d, "page.tsx"), "w", encoding="utf-8") as f:
        f.write(content)
    print(folder)


for folder, pid, path in houses:
    write_page(folder, pid, path, PAGE_HOUSES)

for folder, pid, path in lands:
    write_page(folder, pid, path, PAGE_LANDS)
