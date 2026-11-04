import { Link } from '@tanstack/react-router';
import { estates } from '@/data/estates';
import { experience } from '@/data/experience';
import { Button } from '@/components/ui/button';
export function InspectionCTA({ className = '' }: {className?: string}) {
  const estate = estates[0];
  if (!estate) return null;
  return <Button asChild className={`h-auto min-h-11 rounded-full bg-highlight hover:bg-highlight/90 px-5 py-3 text-highlight-foreground ${className}`}><Link to="/properties/$slug" params={{slug: estate.slug}} hash="book"><span className="sm:hidden">{experience.shortInspection}</span><span className="hidden sm:inline">{experience.inspection}</span></Link></Button>;
}
export function ClosingCTA() {return <section className="mt-16 border-t py-12"><h2 className="mb-6 text-3xl text-primary">{experience.closing}</h2><InspectionCTA/></section>;}