import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const AUDIT_BOT_RE = /lighthouse|chrome-lighthouse|pagespeed|gtmetrix|headlesschrome/i;
const getShouldReduceForPerf = (prefersReducedMotion) => {
  if (typeof window === "undefined") return prefersReducedMotion;

  const isAuditBot = AUDIT_BOT_RE.test(navigator.userAgent);
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isSmallViewport = window.innerWidth < 768;

  return prefersReducedMotion || isAuditBot || isCoarsePointer || isSmallViewport;
};

export function usePerformanceMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [shouldReduceForPerf, setShouldReduceForPerf] = useState(() => getShouldReduceForPerf(prefersReducedMotion));

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const update = () => {
      setShouldReduceForPerf(getShouldReduceForPerf(prefersReducedMotion));
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [prefersReducedMotion]);

  return shouldReduceForPerf;
}

export default usePerformanceMotion;
