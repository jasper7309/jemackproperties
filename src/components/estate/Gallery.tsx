import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const go = (d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length));
  const current = index === null ? null : images[index];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((img, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`group overflow-hidden rounded-3xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
            <img src={img.src} alt={img.alt} loading="lazy" className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          </button>
        ))}
      </div>
      <Dialog open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="max-w-5xl border-0 bg-primary p-2" onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}>
          <DialogTitle className="sr-only">{current?.alt ?? "Gallery image"}</DialogTitle>
          {current && <img src={current.src} alt={current.alt} className="max-h-[80vh] w-full rounded-2xl object-contain" />}
          <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-card text-primary"><ChevronLeft /></button>
          <button onClick={() => go(1)} aria-label="Next image" className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-card text-primary"><ChevronRight /></button>
          <p className="pb-1 text-center text-sm text-primary-foreground/80">{current?.alt} · {(index ?? 0) + 1}/{images.length}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
