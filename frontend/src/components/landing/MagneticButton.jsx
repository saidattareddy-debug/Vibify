import { useRef, useState } from "react";
import { m as motion } from "framer-motion";
import usePerformanceMotion from "../../hooks/use-performance-motion";

export const MagneticButton = ({ children, className = "", strength = 0.4, ...props }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduceMotion = usePerformanceMotion();

  const handleMove = (e) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPos({ x, y });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={reduceMotion ? undefined : handleMove}
      onMouseLeave={reduceMotion ? undefined : () => setPos({ x: 0, y: 0 })}
      animate={reduceMotion ? undefined : { x: pos.x, y: pos.y }}
      transition={reduceMotion ? undefined : { type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
