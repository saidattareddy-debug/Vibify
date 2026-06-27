import { useScroll, m as motion, useSpring } from "framer-motion";
import usePerformanceMotion from "../../hooks/use-performance-motion";

export const ScrollProgress = () => {
  const reduceMotion = usePerformanceMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  if (reduceMotion) return null;
  return (
    <motion.div
      data-testid="scroll-progress-bar"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-vibe-gradient"
    />
  );
};

export default ScrollProgress;
