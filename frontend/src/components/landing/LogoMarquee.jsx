const logos = ["NOVA", "Lumen", "Pulse", "Vertex", "Halo", "Drift", "Orbit", "Flux", "Ember", "Zenith"];

export const LogoMarquee = () => {
  const row = [...logos, ...logos];
  return (
    <section data-testid="logo-marquee" className="relative border-y border-white/10 bg-surface/40 py-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent z-10" />
      <div className="flex w-max animate-marquee gap-16 pr-16">
        {row.map((l, i) => (
          <span
            key={i}
            className="font-display text-2xl font-medium text-textMuted/50 hover:text-textPrimary transition-colors whitespace-nowrap"
          >
            {l}
          </span>
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
