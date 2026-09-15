import { BrandGallery } from "@/components/sections/BrandGallery";
import {
  CTABand,
  EstateFaqs,
  EstateFees,
  FeatureList,
  ProjectPageHeader,
  UnitPricing,
} from "@/components/sections/ProjectParts";
import type { Project } from "@/content/projects";

function ProjectProgressGallery({ project }: { project: Project }) {
  if (!project.progressGallery?.length) return null;
  return (
    <BrandGallery
      items={project.progressGallery}
      eyebrow="Project Updates"
      title="Site Progress"
      subtitle={`Live construction at ${project.name} — ${project.distanceBadge}, ${project.locationBadge}.`}
    />
  );
}

export function HousesProjectBody({ project }: { project: Project }) {
  const units = project.houses.length > 0 ? project.houses : (project.lands ?? []);
  const kind = project.houses.length > 0 ? "houses" : "lands";
  return (
    <>
      <ProjectPageHeader project={project} kind={kind} />
      <UnitPricing
        title={
          kind === "houses"
            ? `${project.name} — Residential Residences`
            : `${project.name} — Land Investment Plots`
        }
        units={units}
        kind={kind}
        projectName={project.name}
        toggleHref={kind === "houses" ? project.landsSlug : undefined}
        toggleLabel={
          kind === "houses" && project.landsSlug
            ? "Explore Available Land Parcels"
            : undefined
        }
      />
      <ProjectProgressGallery project={project} />
      <EstateFees project={project} />
      <FeatureList features={project.features} />
      <EstateFaqs project={project} />
      <CTABand />
    </>
  );
}

export function LandsProjectBody({ project }: { project: Project }) {
  const lands = project.lands ?? [];
  return (
    <>
      <ProjectPageHeader project={project} kind="lands" />
      <UnitPricing
        title={`${project.name} — Demarcated Land Plots`}
        units={lands}
        kind="lands"
        projectName={project.name}
        toggleHref={
          project.housesSlug !== project.landsSlug ? project.housesSlug : undefined
        }
        toggleLabel={
          project.housesSlug !== project.landsSlug
            ? "Explore Residential House Units"
            : undefined
        }
      />
      <ProjectProgressGallery project={project} />
      <EstateFees project={project} />
      <FeatureList features={project.features} />
      <EstateFaqs project={project} />
      <CTABand />
    </>
  );
}
