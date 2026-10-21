import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/PageShell";

export const Route = createFileRoute("/our-agents")({
  head: () => seo("Our Agents | Jemack Properties", "Meet the Jemack Properties agents ready to guide your purchase."),
  component: Agents,
});

function Agents() {
  
  return <PageShell eyebrow="Team" title="Our Agents" intro="Meet the Jemack Properties agents ready to guide your purchase." />;
}
