import { useEffect, useRef } from "react";

// Lightweight, GPU-friendly animated gradient mesh with floating glowing orbs.
// Reacts subtly to mouse movement. Disabled heavy motion under reduced-motion.
export const HeroBackground = () => {
  const wrapRef = useRef(null);
  const orbRefs = useRef([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      target.x = (e.clientX / w - 0.5) * 2;
      target.y = (e.clientY / h - 0.5) * 2;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        const depth = (i + 1) * 18;
        orb.style.transform = `translate3d(${current.x * depth}px, ${current.y * depth}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const orbs = [
    { c: "#7C3AED", size: 620, top: "-12%", left: "-6%", delay: "0s" },
    { c: "#EC4899", size: 520, top: "30%", left: "62%", delay: "-4s" },
    { c: "#22D3EE", size: 460, top: "58%", left: "8%", delay: "-8s" },
    { c: "#7C3AED", size: 380, top: "8%", left: "70%", delay: "-2s" },
  ];

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-ink" />
      {orbs.map((o, i) => (
        <div
          key={i}
          ref={(el) => (orbRefs.current[i] = el)}
          className="absolute rounded-full animate-float-slow will-change-transform"
          style={{
            width: o.size,
            height: o.size,
            top: o.top,
            left: o.left,
            background: o.c,
            filter: "blur(90px)",
            opacity: 0.5,
            animationDelay: o.delay,
          }}
        />
      ))}
      {/* fine grain / noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* vignette + bottom fade to blend into next section */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 10%, transparent 40%, rgba(11,11,18,0.6) 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
};

export default HeroBackground;
