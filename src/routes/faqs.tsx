import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/PageShell";

export const Route = createFileRoute("/faqs")({
  head: () => seo("FAQs | Jemack Properties", "Answers to common questions about buying land and homes with Jemack."),
  component: Faqs,
});

function Faqs() {
  
  return <PageShell eyebrow="Help" title="FAQs" intro="Answers to common questions about buying land and homes with Jemack." />;
}
