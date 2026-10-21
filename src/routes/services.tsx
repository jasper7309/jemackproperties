import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/PageShell";

export const Route = createFileRoute("/services")({
  head: () => seo("Services | Jemack Properties", "Engineering and facilities services from Jemack Facilities & Engineering."),
  component: Services,
});

function Services() {
  
  return <PageShell eyebrow="Engineering" title="Services" intro="Engineering and facilities services from Jemack Facilities & Engineering." />;
}
