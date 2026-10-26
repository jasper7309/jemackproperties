import { createFileRoute } from '@tanstack/react-router';
import { PageShell,seo } from '@/components/site/PageShell';
import { ProjectGallery } from '@/components/site/ProjectGallery';
import { projects,pageCopy } from '@/data/pages';
export const Route=createFileRoute('/projects')({head:()=>seo('Property & Engineering Projects | Jemack',pageCopy.projects.intro),component:Projects});
function Projects(){return <PageShell {...pageCopy.projects}>{projects.length>0&&<ProjectGallery filterable/>}</PageShell>;}
