import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/PageShell";

export const Route = createFileRoute("/properties")({
  head: () => seo("Properties | Jemack Properties", "Browse lands and houses with secure titles from Jemack Properties."),
  component: Properties,
});

function Properties() {
  
  return <PageShell eyebrow="Listings" title="Properties" intro="Browse lands and houses with secure titles from Jemack Properties." />;
}
