import {
  CTABand,
  EstateFaqs,
  EstateFees,
  FeatureList,
  ProjectPageHeader,
  UnitPricing,
} from "@/components/sections/ProjectParts";
import type { Project } from "@/content/projects";

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
      <EstateFees project={project} />
      <FeatureList features={project.features} />
      <EstateFaqs project={project} />
      <CTABand />
    </>
  );
}
