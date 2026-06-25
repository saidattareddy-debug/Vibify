import { useEffect, useRef, useState } from "react";

// A living, GPU-accelerated aurora/fluid background:
// - flowing animated mesh gradient (violet/magenta/cyan) on midnight
// - 5 morphing, blurred orbs floating on independent loops
// - slow rotating conic sweep + animated grain for depth
// - gentle mouse parallax on desktop
// Fully static under prefers-reduced-motion.
const ORBS = [
  { c: "#7C3AED", size: 640, top: "-14%", left: "-8%", dur: 18, delay: 0, dir: "normal", depth: 26 },
  { c: "#EC4899", size: 520, top: "26%", left: "60%", dur: 22, delay: -5, dir: "reverse", depth: 40 },
  { c: "#22D3EE", size: 460, top: "56%", left: "6%", dur: 20, delay: -9, dir: "normal", depth: 34 },
  { c: "#7C3AED", size: 400, top: "4%", left: "68%", dur: 26, delay: -3, dir: "reverse", depth: 52 },
  { c: "#EC4899", size: 360, top: "62%", left: "72%", dur: 24, delay: -12, dir: "normal", depth: 46 },
];

const AURORA =
  "radial-gradient(at 18% 28%, rgba(124,58,237,0.55) 0px, transparent 50%)," +
  "radial-gradient(at 82% 18%, rgba(236,72,153,0.45) 0px, transparent 50%)," +
  "radial-gradient(at 62% 80%, rgba(34,211,238,0.42) 0px, transparent 50%)," +
  "radial-gradient(at 28% 72%, rgba(124,58,237,0.35) 0px, transparent 50%)";

export const HeroBackground = () => {
  const [animate, setAnimate] = useState(false);
  const wrapRefs = useRef([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!reduced);
    if (reduced) return;

    let raf;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.045;
      current.y += (target.y - current.y) * 0.045;
      wrapRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = ORBS[i].depth;
        el.style.transform = `translate3d(${current.x * d}px, ${current.y * d}px, 0)`;
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

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-ink" />

      {/* flowing aurora mesh */}
      <div
        className={`absolute -inset-[20%] ${animate ? "animate-gradient-shift" : ""}`}
        style={{
          backgroundImage: AURORA,
          backgroundSize: "200% 200%",
          filter: "blur(40px)",
          opacity: 0.8,
          animationDuration: "16s",
        }}
      />

      {/* slow rotating conic sweep for depth */}
      <div
        className={`absolute left-1/2 top-1/3 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 ${animate ? "animate-spin-slow" : ""}`}
        style={{
          background:
            "conic-gradient(from 0deg, rgba(124,58,237,0.10), rgba(236,72,153,0.06), rgba(34,211,238,0.10), rgba(124,58,237,0.10))",
          opacity: 0.5,
          filter: "blur(30px)",
        }}
      />

      {/* morphing floating orbs */}
      {ORBS.map((o, i) => (
        <div
          key={i}
          ref={(el) => (wrapRefs.current[i] = el)}
          className="absolute will-change-transform"
          style={{ top: o.top, left: o.left, width: o.size, height: o.size }}
        >
          <div
            className={`h-full w-full ${animate ? "animate-blob" : "rounded-full"}`}
            style={{
              background: o.c,
              filter: "blur(95px)",
              opacity: 0.55,
              animationDuration: `${o.dur}s`,
              animationDelay: `${o.delay}s`,
              animationDirection: o.dir,
            }}
          />
        </div>
      ))}

      {/* animated grain / noise */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* vignette + text-contrast overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(125% 90% at 50% 8%, transparent 38%, rgba(11,11,18,0.66) 100%)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
};

export default HeroBackground;
