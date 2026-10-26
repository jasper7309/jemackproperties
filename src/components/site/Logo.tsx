export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary font-display text-lg font-bold text-accent">J</span>
      <span className="leading-none">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-highlight">Jemack</span>
        <span className={`block font-display text-lg font-semibold ${inverted ? "text-primary-foreground" : "text-primary"}`}>Properties</span>
      </span>
    </span>
  );
}
