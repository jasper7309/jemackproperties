import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/PageShell";

export const Route = createFileRoute("/projects")({
  head: () => seo("Projects | Jemack Properties", "Selected estates and engineering projects delivered by Jemack."),
  component: Projects,
});

function Projects() {
  
  return <PageShell eyebrow="Portfolio" title="Projects" intro="Selected estates and engineering projects delivered by Jemack." />;
}
