import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TARGET = "Vibify";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#$%&@01";
const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

export const Preloader = ({ onDone }) => {
  const [display, setDisplay] = useState("\u00A0".repeat(TARGET.length));
  const [resolved, setResolved] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading -> resolved -> done
  const doneRef = useRef(false);

  // window load tie-in (with safety timeout)
  useEffect(() => {
    if (document.readyState === "complete") {
      setLoaded(true);
      return;
    }
    const on = () => setLoaded(true);
    window.addEventListener("load", on);
    const t = setTimeout(() => setLoaded(true), 2500);
    return () => {
      window.removeEventListener("load", on);
      clearTimeout(t);
    };
  }, []);

  // text scramble — resolve left to right (~1.2s)
  useEffect(() => {
    let frame = 0;
    const totalFrames = 38;
    const id = setInterval(() => {
      frame += 1;
      const revealCount = Math.floor((frame / totalFrames) * TARGET.length);
      let out = "";
      for (let i = 0; i < TARGET.length; i += 1) {
        out += i < revealCount ? TARGET[i] : rand();
      }
      setDisplay(out);
      if (frame >= totalFrames) {
        clearInterval(id);
        setDisplay(TARGET);
        setResolved(true);
      }
    }, 32);
    return () => clearInterval(id);
  }, []);

  // progress counter (creeps, locks to 100 when resolved + loaded)
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const target = resolved && loaded ? 100 : 92;
        if (p >= target) return p;
        return Math.min(target, p + Math.random() * 7 + 2);
      });
    }, 45);
    return () => clearInterval(id);
  }, [resolved, loaded]);

  // completion → gradient sweep → reveal hero
  useEffect(() => {
    if (resolved && loaded && !doneRef.current) {
      doneRef.current = true;
      setPhase("resolved");
      setProgress(100);
      const t = setTimeout(() => {
        setPhase("done");
        onDone();
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [resolved, loaded, onDone]);

  const loading = phase === "loading";

  return (
    <motion.div
      data-testid="preloader"
      initial={{ opacity: 1 }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink"
      style={{ clipPath: "inset(0 0 0% 0)", willChange: "clip-path" }}
    >
      {/* drifting orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-violet/30 blur-[100px] animate-float-slow" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan/20 blur-[100px] animate-float-slow" style={{ animationDelay: "-6s" }} />
        <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-magenta/20 blur-[100px] animate-float-slow" style={{ animationDelay: "-3s" }} />
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center">
        {/* glitch wordmark */}
        <div className={`relative font-display text-7xl sm:text-8xl font-semibold tracking-tight ${loading ? "vibify-scan" : ""}`}>
          {loading && (
            <>
              <span aria-hidden="true" className="absolute inset-0 text-[#EC4899] mix-blend-screen vibify-rgb-r">{display}</span>
              <span aria-hidden="true" className="absolute inset-0 text-[#22D3EE] mix-blend-screen vibify-rgb-b">{display}</span>
            </>
          )}
          <span className={loading ? "relative text-textPrimary" : "relative vibify-sweep"} data-testid="preloader-wordmark">
            {display}
          </span>
        </div>

        {/* progress bar + counter */}
        <div className="mt-10 flex w-56 items-center gap-3">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-vibe-gradient transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <span className="w-10 text-right font-display text-sm tabular-nums text-textMuted" data-testid="preloader-progress">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
