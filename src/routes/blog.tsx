import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/PageShell";

export const Route = createFileRoute("/blog")({
  head: () => seo("Blog | Jemack Properties", "Property insights and guides from Jemack Properties."),
  component: Blog,
});

function Blog() {
  
  return <PageShell eyebrow="Insights" title="Blog" intro="Property insights and guides from Jemack Properties." />;
}
