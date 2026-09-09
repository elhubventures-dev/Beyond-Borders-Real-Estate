import {
  CTABand,
  FeatureList,
  ProjectPageHeader,
  UnitPricing,
} from "@/components/sections/ProjectParts";
import type { Project } from "@/content/projects";

export function HousesProjectBody({ project }: { project: Project }) {
  return (
    <>
      <ProjectPageHeader project={project} kind="houses" />
      <UnitPricing
        title={`${project.name} — Residential Residences`}
        units={project.houses}
        kind="houses"
        projectName={project.name}
        toggleHref={project.landsSlug}
        toggleLabel={project.landsSlug ? "Explore Available Land Parcels" : undefined}
      />
      <FeatureList features={project.features} />
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
        toggleHref={project.housesSlug}
        toggleLabel="Explore Residential House Units"
      />
      <FeatureList features={project.features} />
      <CTABand />
    </>
  );
}
