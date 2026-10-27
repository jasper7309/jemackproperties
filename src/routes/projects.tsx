import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/PageShell";
import { ProjectGallery } from "@/components/site/ProjectGallery";
import { ClientLogos } from "@/components/site/ClientLogos";
import { pageCopy } from "@/data/pages";

export const Route = createFileRoute("/projects")({
  head: () => seo("Property & Engineering Projects | Jemack", pageCopy.projects.metaDescription),
  component: Projects,
});

function Projects() {
  return (
    <PageShell {...pageCopy.projects}>
      <ProjectGallery filterable />
      <ClientLogos />
    </PageShell>
  );
}
