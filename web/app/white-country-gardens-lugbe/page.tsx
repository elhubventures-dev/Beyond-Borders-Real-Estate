import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandsProjectBody } from "@/components/project/ProjectViews";
import { projects } from "@/content/projects";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const PATH = "/white-country-gardens-lugbe/";
const project = projects.find((p) => p.id === "lugbe");

const seo = getSeo(PATH);

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: absoluteUrl(PATH) },
};

export default function Page() {
  if (!project || !project.lands?.length) notFound();
  return <LandsProjectBody project={project} />;
}
