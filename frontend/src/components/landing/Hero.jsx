import { m as motion } from "framer-motion";
import { Fragment } from "react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import HeroBackground from "./HeroBackground";
import MagneticButton from "./MagneticButton";
import usePerformanceMotion from "../../hooks/use-performance-motion";

const headline = ["We", "make", "brands", "impossible", "to", "ignore."];
const logos = ["Quake", "Big Bull", "Monastery", "The Happy Yard", "Kompound"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const Hero = ({ onTalk, onWork }) => {
  const reduceMotion = usePerformanceMotion();

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { delay: 0.1, duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 glass px-4 py-1.5 text-sm text-textMuted"
          data-testid="hero-badge"
        >
          <Sparkles className="h-4 w-4 text-cyan" />
          Marketing & PR that turns heads
        </motion.div>

        <motion.h1
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "show"}
          className="font-display font-semibold leading-[0.95] tracking-tight text-textPrimary text-5xl sm:text-7xl lg:text-[5.8rem] max-w-5xl"
          data-testid="hero-headline"
          aria-label="We make brands impossible to ignore."
        >
          {headline.map((w, i) => (
            <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.08em]" aria-hidden="true">
                <motion.span
                  variants={reduceMotion ? undefined : word}
                  className={`inline-block ${i >= 2 && i <= 4 ? "text-gradient" : ""}`}
                >
                  {w}
                </motion.span>
              </span>{" "}
            </Fragment>
          ))}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { delay: 0.85, duration: 0.6 }}
          className="mt-7 max-w-xl text-lg text-textMuted"
          data-testid="hero-subhead"
        >
          Vibify is the marketing & PR agency that turns attention into momentum.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            onClick={onTalk}
            strength={0.3}
            data-testid="hero-primary-cta"
            className="group inline-flex items-center gap-2 rounded-full bg-vibe-gradient px-7 py-4 font-semibold text-white glow-violet transition-transform hover:scale-105"
          >
            Start your campaign
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <button
            onClick={onWork}
            data-testid="hero-secondary-cta"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-semibold text-textPrimary transition-colors hover:bg-white/5"
          >
            See our work
          </button>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={reduceMotion ? undefined : { delay: 1.3, duration: 0.8 }}
          className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4"
          data-testid="hero-logos"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-textMuted/70">Trusted by</span>
          {logos.map((l, i) => (
            <motion.span
              key={l}
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={reduceMotion ? undefined : { duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className="font-display text-lg font-medium text-textMuted/60"
            >
              {l}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#stats"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={reduceMotion ? undefined : { delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-textMuted"
        data-testid="scroll-indicator"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className={`h-5 w-5 ${reduceMotion ? "" : "animate-bounce-soft"}`} />
      </motion.a>
    </section>
  );
};

export default Hero;
