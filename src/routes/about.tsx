import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/PageShell";

export const Route = createFileRoute("/about")({
  head: () => seo("About Jemack | Jemack Properties", "The real estate arm of Jemack Facilities & Engineering Services Ltd, serving since 2008."),
  component: About,
});

function About() {
  
  return <PageShell eyebrow="About us" title="About Jemack" intro="The real estate arm of Jemack Facilities & Engineering Services Ltd, serving since 2008." />;
}
