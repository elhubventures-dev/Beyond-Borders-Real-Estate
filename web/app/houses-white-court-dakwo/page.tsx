import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HousesProjectBody } from "@/components/project/ProjectViews";
import { projects } from "@/content/projects";
import { getSeo } from "@/content/seo";
import { absoluteUrl } from "@/lib/utils";

const PATH = "/houses-white-court-dakwo/";
const project = projects.find((p) => p.id === "dakwo");

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
