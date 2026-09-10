import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandsProjectBody } from "@/components/project/ProjectViews";
import { projects } from "@/content/projects";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const PATH = "/lands-white-city-aspen-1/";
const project = projects.find((p) => p.id === "aspen-1");

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
