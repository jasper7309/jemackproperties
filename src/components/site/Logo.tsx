export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-1 sm:gap-2">
      <span className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-accent">J</span>
      <span className="leading-none">
        <span className="block text-[10px] font-semibold uppercase tracking-normal text-accent-text">Jemack</span>
        <span className={`block font-display text-lg font-semibold ${inverted ? "text-primary-foreground" : "text-primary"}`}>Properties</span>
      </span>
    </span>
  );
}
