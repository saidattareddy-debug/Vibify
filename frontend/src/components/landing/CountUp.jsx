import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";
import usePerformanceMotion from "../../hooks/use-performance-motion";

export const CountUp = ({ to = 100, duration = 2, decimals = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const reduceMotion = usePerformanceMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(to.toFixed(decimals));
      return undefined;
    }

    const controls = animate(mv, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, to, duration, decimals, mv, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default CountUp;
