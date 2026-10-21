import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/PageShell";

export const Route = createFileRoute("/properties_/$slug")({
  head: ({ params }) => seo(`${params.slug.replace(/-/g, " ")} | Jemack Properties`, "Details coming soon from Jemack Properties."),
  component: PropertyDetail,
});

function PropertyDetail() {
  const { slug } = Route.useParams();
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (m: string) => m.toUpperCase());
  return <PageShell eyebrow="Property" title={title} intro="Full details coming soon." />;
}
