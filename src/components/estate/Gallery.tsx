import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const go = useCallback(
    (d: number) =>
      setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  const current = index === null ? null : images[index];

  // Embla carousel for swipe in lightbox
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: index ?? 0 });

  // Keep index in sync when embla scrolls (swipe)
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // When lightbox opens, scroll embla to the right slide
  useEffect(() => {
    if (emblaApi && index !== null) emblaApi.scrollTo(index, true);
  }, [emblaApi, index]);

  return (
    <>
      {/* Thumbnail grid — masonry-style, first image spans 2×2 */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Open image: ${img.caption ?? img.alt}`}
            className={`group relative overflow-hidden rounded-3xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              i === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={i === 0 ? "eager" : "lazy"}
              className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            {/* Visible caption overlay on hover / focus */}
            {img.caption && (
              <span className="absolute bottom-0 left-0 right-0 translate-y-full bg-primary/80 px-3 py-1.5 text-xs font-medium text-primary-foreground transition-transform group-hover:translate-y-0 group-focus-visible:translate-y-0">
                {img.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent
          className="max-w-5xl border-0 bg-primary p-2"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft")  go(-1);
          }}
        >
          <DialogTitle className="sr-only">
            {current?.caption ?? current?.alt ?? "Gallery image"}
          </DialogTitle>

          {/* Embla swipe container */}
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {images.map((img, i) => (
                <div key={i} className="min-w-0 shrink-0 grow-0 basis-full">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="max-h-[75vh] w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-card text-primary shadow-soft transition hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-card text-primary shadow-soft transition hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Caption + counter */}
          <div className="pb-1 text-center">
            {current?.caption && (
              <p className="text-sm font-medium text-primary-foreground">{current.caption}</p>
            )}
            <p className="text-xs text-primary-foreground/70">
              {current?.alt} · {(index ?? 0) + 1}/{images.length}
            </p>
          </div>

          {/* Larger close button — 48×48px minimum */}
          <button
            onClick={() => setIndex(null)}
            aria-label="Close gallery"
            className="absolute right-3 top-3 grid h-12 w-12 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition hover:bg-primary-foreground/25 focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
