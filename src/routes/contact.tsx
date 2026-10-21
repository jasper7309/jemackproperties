import { createFileRoute } from "@tanstack/react-router";
import { PageShell, seo } from "@/components/site/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact & Book Inspection | Jemack Properties", "Book a free inspection or reach our team in Lagos, Asaba, Umuahia or Port Harcourt."),
  component: Contact,
});

function Contact() {
  
  return <PageShell eyebrow="Get in touch" title="Contact & Book Inspection" intro="Book a free inspection or reach our team in Lagos, Asaba, Umuahia or Port Harcourt." />;
}
