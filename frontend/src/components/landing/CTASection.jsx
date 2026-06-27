import { m as motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

export const CTASection = ({ onBook }) => {
  return (
    <section data-testid="cta-section" className="relative px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-vibe-gradient-animated animate-gradient-shift p-12 sm:p-20 text-center"
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white, transparent 40%)" }} />
        <div className="relative">
          <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white drop-shadow">
            Ready to get noticed?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
            Let's turn your brand into the one everyone's talking about. The first call is on us.
          </p>
          <MagneticButton
            onClick={onBook}
            strength={0.3}
            data-testid="cta-book-button"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold text-white transition-transform hover:scale-105"
          >
            Book a free strategy call
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
