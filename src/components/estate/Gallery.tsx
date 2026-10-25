import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
type Image = {src:string;alt:string;caption?:string};
function Lightbox({images,index,onIndex}:{images:Image[];index:number;onIndex:(index:number)=>void}) {
 const [ref,api]=useEmblaCarousel({loop:true,startIndex:index});
 useEffect(()=>{if(!api)return;const select=()=>onIndex(api.selectedScrollSnap());api.on('select',select);return()=>{api.off('select',select);};},[api,onIndex]);
 return <DialogContent aria-describedby={undefined} className="max-w-5xl border-0 bg-primary p-2" onKeyDown={e=>{if(e.key==='ArrowRight')api?.scrollNext();if(e.key==='ArrowLeft')api?.scrollPrev();}}><DialogTitle className="sr-only">{images[index]?.alt}</DialogTitle><div ref={ref} className="overflow-hidden"><div className="flex touch-pan-y">{images.map(image=><div key={image.src} className="min-w-0 flex-[0_0_100%]"><img src={image.src} alt={image.alt} width={1536} height={1024} className="max-h-[75vh] w-full object-contain"/></div>)}</div></div><Button variant="outline" size="icon" onClick={()=>api?.scrollPrev()} aria-label="Previous image" className="absolute left-4 top-1/2 h-11 w-11 rounded-full bg-card text-primary"><ChevronLeft/></Button><Button variant="outline" size="icon" onClick={()=>api?.scrollNext()} aria-label="Next image" className="absolute right-4 top-1/2 h-11 w-11 rounded-full bg-card text-primary"><ChevronRight/></Button><p className="pb-2 text-center text-sm text-primary-foreground">{images[index]?.caption??images[index]?.alt} · {index+1}/{images.length}</p></DialogContent>;
}
export function Gallery({images}:{images:Image[]}) {
 const distinct=images.filter((image,i)=>images.findIndex(x=>x.src===image.src)===i);const [index,setIndex]=useState<number|null>(null);
 return <><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{distinct.map((image,i)=><Button key={image.src} variant="ghost" onClick={()=>setIndex(i)} aria-label={`Open ${image.alt}`} className="group relative block h-auto overflow-hidden rounded-3xl p-0"><img src={image.src} alt={image.alt} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition group-hover:scale-105"/><span className="absolute inset-x-0 bottom-0 whitespace-normal bg-primary/90 px-3 py-3 text-sm text-primary-foreground">{image.caption??image.alt}</span></Button>)}</div><Dialog open={index!==null} onOpenChange={open=>{if(!open)setIndex(null);}}>{index!==null&&<Lightbox images={distinct} index={index} onIndex={setIndex}/>}</Dialog></>;
}
