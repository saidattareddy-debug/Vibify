import { useEffect, useRef, useState } from "react";

const logos = ["Quake", "Big Bull", "Monastery", "The Happy Yard", "Kompound"];

export const LogoMarquee = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const row = [...logos, ...logos];

  // Only start the CSS marquee animation when the section enters the viewport,
  // so it doesn't add layout/composite work during initial paint.
  useEffect(() => {
    if (!ref.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-testid="logo-marquee"
      className="relative border-y border-white/10 bg-surface/40 py-8 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent z-10" />
      <div
        className={`flex w-max gap-16 pr-16 ${active ? "animate-marquee" : ""}`}
        style={active ? undefined : { transform: "translateX(0)" }}
      >
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
